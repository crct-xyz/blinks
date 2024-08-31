import React, { useEffect } from 'react'
import styles from './urlPage.module.css'
import Clipboard from 'clipboard';
import { FaCopy } from "react-icons/fa";


function UrlPage({ address }) {
    useEffect(() => {
        new Clipboard('.copy-button');
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {/* <div className={styles.text1}>Your link:</div> */}
                {/* <div className={styles.box}>
                    <div className={styles.link}>{`https://blinks-ecru.vercel.app/api/action/approve?squad=${address}`}</div>
                    <div className='copy-button cursor-pointer' data-clipboard-text={`https://blinks-ecru.vercel.app/api/action/approve?squad=${address}`}><FaCopy /></div>
                </div> */}
                 <a className={styles.span} target="_blank" href={`https://dial.to/developer?url=https://blinks-ecru.vercel.app/api/action/approve?squad=${address}`}>Your Link</a>
            </div>
        </div>
    )
}

export default UrlPage
