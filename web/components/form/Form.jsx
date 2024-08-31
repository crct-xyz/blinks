import React from 'react'
import styles from './form.module.css'

function Form() {
  return (
    <div className={styles.container}>
        <form action="" method="get" >
          <div>
            <label htmlFor="address">Enter your email: </label>
            <input type="text" value={address} id="address" onChange={handleAddress} />
          </div>
          <div>
            <input type="submit" value="Submit" onClick={handleOnClick} />
          </div>
        </form>
    </div>
  )
}

export default Form