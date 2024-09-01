import React, { useEffect } from 'react'
import styles from './urlPage.module.css'
import Clipboard from 'clipboard';


function UrlPage({ address, baseUrl }: {address: string, baseUrl: string}) {
    useEffect(() => {
        new Clipboard('.copy-button');
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                 <a className={styles.span} target="_blank" href={`https://dial.to/?action=solana-action%3A${baseUrl}/api/action/approve?squad=${address}`}>Your Link</a>
            </div>
        </div>
    )
}

export default UrlPage
