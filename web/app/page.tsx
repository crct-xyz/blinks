"use client"
import styles from './homePage.module.css';
import { useState } from 'react';
import UrlPage from '@/components/urlPage/UrlPage';
// import {Image} from "next/image";

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
      {showUrlPage ? (


<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-center">
    <img src="https://ucarecdn.com/2666eeb6-5215-4271-bfc8-261a0f8291ba/-/preview/199x199/" alt="" />
    <p className="mb-3  text-gray-700 dark:text-gray-400">GM Blinker!
      Thanks for using our service!
      To have the best blinker experience please take following steps:</p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">1. Enter the multi-sig account number and submit.</p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">2. You will be redirected to the blink where you can approve your Squads multi-sig transaction.</p>
    <h2 className="mb-3 font-normal text-gray-700 dark:text-gray-400">Enter your Multisig Account Key:</h2>
    <input
        className='bg-transparent border-solid border-2 border-black rounded-xl h-9'
        type="text"
        value={address}
        id="address"
        onChange={handleAddress}
      />
      <button className={styles.submitButton} onClick={handleOnClick}>
        Submit
      </button>
    </div>
      ) : (
        <UrlPage address={address} baseUrl={baseUrl} />
      )}
    </div>
    </div>
    )}
