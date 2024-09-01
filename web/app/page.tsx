"use client"
import styles from './homePage.module.css';
import { useState } from 'react';
import UrlPage from '@/components/urlPage/UrlPage';

export default function Page() {
  const [address, setAddress] = useState("");
  const [showUrlPage, setShowUrlPage] = useState(true);

  const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  }

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowUrlPage(false);
  };

  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://blinks-ecru.vercel.app'
    : 'http://localhost:3000';

  const items = Array.from({ length: 500 }, () => "SqUiNt&nbsp;");

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.bodyText}>
          {items.map((item, i) => (
            <span key={`bodyText-${i}`} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </div>
        <div className={styles.oppDir}>
          {items.map((item, i) => (
            <p key={`oppDir-${i}`} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </div>
      </div>
      {showUrlPage ? (
        <div className={styles.formWrapper}>
          <div className={styles.weirdHeader}>SqUinT</div>
          <form className={styles.form} action="" method="get">
            <h1 className={styles.header}>Enter your wallet address</h1>
            <input
              className='bg-transparent border-solid border-2 border-black rounded-xl w-96 h-9'
              type="text"
              value={address}
              id="address"
              onChange={handleAddress}
            />
            <button className={styles.submitButton} onClick={handleOnClick}>
              Submit
            </button>
          </form>
        </div>
      ) : (
        <UrlPage address={address} baseUrl={baseUrl} />
      )}
    </div>
  );
}
