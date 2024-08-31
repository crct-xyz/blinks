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
                <div className={styles.text1}>Your link:</div>
                <div className={styles.box}>
                    <div className={styles.link}>{`http://localhost:3000/api/action/approve?squad=${address}`}</div>
                    <div className='copy-button cursor-pointer' data-clipboard-text={`http://localhost:3000/api/action/approve?squad=${address}`}><FaCopy /></div>
                </div>
                <div className={styles.text2}>Paste the link <a className={styles.span} href='https://dial.to/'>here</a> to generate your blink</div>
            </div>
        </div>

    )
}

export default UrlPage