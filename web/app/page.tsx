"use client"
import styles from './homePage.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { redirect } from "next/navigation";
import UrlPage from '@/components/urlPage/UrlPage';

export default function Page() {
  const [address, setAddress] = useState("");
  const [showUrlpage, setShowUrlPage] = useState(true);
  const router = useRouter();
  const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  }

  const handleOnClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    setShowUrlPage(false)
    console.log(`http://localhost:3000/api/action/approve?squad=${address}`)
  };

  const items = Array.from({ length: 500 }, (_, i) => i);

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {/* <div className={styles.bodyText}>
          {items.map((_, i) => (
            <>SqUiNt&nbsp;</>
          ))}
        </div>
        <div className={styles.oppDir}>
          {items.map((_, i) => (
            <p>SqUiNt&nbsp;</p>
          ))}
        </div>
        <div className={styles.bodyText}>
          {items.map((_, i) => (
            <>SqUiNt&nbsp;</>
          ))}
        </div>
        <div className={styles.oppDir}>
          {items.map((_, i) => (
            <p>SqUiNt&nbsp;</p>
          ))}
        </div> */}
      </div>
        {showUrlpage ? (
          <div className={styles.formWrapper}>
            <div className={styles.weirdHeader}>SqUinT</div>
            <form className={styles.form} action="" method="get" >
              <h1 className={styles.header}>Enter your Multisig Account key:</h1>
              <input className='bg-transparent border-solid border-2 border-black rounded-xl w-96 h-9' type="text" value={address} id="address" onChange={handleAddress} />
              <input className={styles.submitButton} type="submit" value="Submit" onClick={handleOnClick} />
          </form>
          </div>
        ) : <UrlPage address={address} />}
      </div>
  );
}
