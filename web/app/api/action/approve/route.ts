import {
  Action,
  ActionGetRequest,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from '@solana/actions';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import * as multisig from '@sqds/multisig';
import * as anchor from '@coral-xyz/anchor';
import { redirect } from 'next/navigation';
import { publicKey } from '@coral-xyz/anchor/dist/cjs/utils';
import { BlinksightsClient } from 'blinksights-sdk';

require('dotenv').config();
const client = new BlinksightsClient(process.env.BLINKSITES as string);

async function validateQueryParams(requestUrl: URL) {
  const connection = new Connection(clusterApiUrl('mainnet-beta'));
  let squad: PublicKey = new PublicKey(
    'Gr5FaqkMmypxUJfADQsoYN3moknprc5LzMF2qh3SiP8m'
  );

  let publicAddress = requestUrl.searchParams.get('publicAddress');
  let action: string | null = requestUrl.searchParams.get('action');
  let transactionIndex = 1;

  try {
    if (requestUrl.searchParams.get('squad')) {
      squad = new PublicKey(requestUrl.searchParams.get('squad')!);
    }
  } catch (err) {
    throw err;
  }

  const multisigInfo = await multisig.accounts.Multisig.fromAccountAddress(
    connection,
    squad
  );

  transactionIndex = Number(multisigInfo.transactionIndex);

  try {
    if (requestUrl.searchParams.get('tx')) {
      transactionIndex = Number(requestUrl.searchParams.get('tx')!);
    }
  } catch (err) {
    throw err;
  }

  return {
    squad,
    transactionIndex,
    action,
    publicAddress,
  };
}

export const GET = async (request: Request) => {
  try {
    const requestUrl = new URL(request.url);

    const { squad, transactionIndex, publicAddress } =
      await validateQueryParams(requestUrl);

    const baseHref = new URL(
      `/api/action/approve?squad=${squad}&tx=${transactionIndex}&publicAddress=${publicAddress}`,
      requestUrl.origin
    ).toString();

    const vault = multisig.getVaultPda({
      multisigPda: new PublicKey(squad!),
      index: 0,
    });

    const multisigInfo = await fetch(
      `https://v4-api.squads.so/multisig/${vault[0].toString()}`
    ).then((res) => res.json());

    const meta = multisigInfo.metadata;

// Construct the action object
const action: ActionGetResponse = {
  title: `Approve ${meta.name} Transaction`,
  icon: 'https://ucarecdn.com/2666eeb6-5215-4271-bfc8-261a0f8291ba/-/preview/199x199/',
  description: `Cast your vote on transaction #${transactionIndex} for ${meta.name}`,
  label: 'SquadsTransaction',
  links: {
      actions: [
          {
              label: 'Approve',
              href: `${baseHref}&action=Approve`,
          },
          {
              label: 'Reject',
              href: `${baseHref}&action=Reject`,
          },
          {
              label: 'Approve & Execute',
              href: `${baseHref}&action=ApproveExecute`,
          },
      ],
  },
};

// Create the response payload
const payload = await client.createActionGetResponseV1(request.url, action);

// Return the response as JSON
return new Response(JSON.stringify(payload), {
  status: 200,
  headers: ACTIONS_CORS_HEADERS,
});

  } catch (err) {
    console.error('Error in GET request:', err);
    return new Response('Failed to process the request.', {
      status: 500,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};
;

export const OPTIONS = GET;

export const POST = async (request: Request) => {
  try {
    const requestUrl = new URL(request.url);
    let { squad, transactionIndex, action } = await validateQueryParams(
      requestUrl
    );

    const body: ActionPostRequest = await request.json();

    // validating the client provider input
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      throw err;
    }

    const connection = new Connection(clusterApiUrl('mainnet-beta'));
    const vault = multisig.getVaultPda({
      multisigPda: new PublicKey(squad!),
      index: 0,
    });
    const multisigInfo = await fetch(
      `https://v4-api.squads.so/multisig/${vault[0].toString()}`
    ).then((res) => res.json());

    const meta = multisigInfo.metadata;

    const transaction = new Transaction();
    transaction.feePayer = account;

    if (action == 'Approve') {
      transaction.add(
        await multisig.instructions.proposalApprove({
          multisigPda: squad,
          transactionIndex: BigInt(transactionIndex),
          member: account,
          programId: multisig.PROGRAM_ID,
        })
      );
    } else if (action == 'Reject') {
      transaction.add(
        await multisig.instructions.proposalReject({
          multisigPda: squad,
          transactionIndex: BigInt(transactionIndex),
          member: account,
          programId: multisig.PROGRAM_ID,
        })
      );
    } else if (action == 'ApproveExecute') {
      transaction.add(
        await multisig.instructions.proposalApprove({
          multisigPda: squad,
          transactionIndex: BigInt(transactionIndex),
          member: account,
          programId: multisig.PROGRAM_ID,
        }),
        (
          await multisig.instructions.vaultTransactionExecute({
            connection,
            multisigPda: squad,
            transactionIndex: BigInt(transactionIndex),
            member: account,
            programId: multisig.PROGRAM_ID,
          })
        ).instruction
      );
    } else if (action == 'Simulate') {
      const [transaction, txBump] = await PublicKey.findProgramAddressSync(
        [
          Buffer.from('multisig'),
          new PublicKey(squad!).toBuffer(),
          Buffer.from('transaction'),
          new anchor.BN(transactionIndex!).toArrayLike(Buffer, 'le', 8),
        ],
        multisig.PROGRAM_ID
      );
      const transactionInfo =
        await multisig.accounts.VaultTransaction.fromAccountAddress(
          connection,
          transaction
        )!;
      const message = transactionInfo.serialize();
      return redirect(`https://explorer.solana.com/tx/inspector/${message}`);
    } else {
      return new Response('no supported action was selected', {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      });
    }

    // set the end user as the fee payer
    transaction.feePayer = account;

    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `${
          action === 'Approve'
            ? 'Approved'
            : action === 'Reject'
            ? 'Rejected'
            : 'Approved and executed'
        } transaction #${transactionIndex} for ${meta.name}`,
      },
    });

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    console.log(err);
  }
};
