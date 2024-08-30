"use client"
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

  const handleOnClick = (e) => {
    e.preventDefault()
    setShowUrlPage(false)
    console.log(`http://localhost:3000/api/action/approve?squad=${address}`)
  };

  return (
    <div className="flex h-screen bg-pink-500">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        {showUrlpage ? (
          <form action="" method="get" >
          <div>
            <label htmlFor="address">Enter your email: </label>
            <input type="text" value={address} id="address" onChange={handleAddress} />
          </div>
          <div>
            <input type="submit" value="Submit" onClick={handleOnClick} />
          </div>
        </form>
        ) : <UrlPage address={address} />}
      </div>
    </div>
  );
}