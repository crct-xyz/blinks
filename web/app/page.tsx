"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [address, setAddress] = useState("");
    const router  = useRouter();
    const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);

    }

    const handleOnClick = (e) => {
        e.preventDefault()
        router.push(`/api/action/approve?squad=${address}`)
    };

  return (
    <div className="flex h-screen bg-pink-500">
      <div className="w-screen h-screen flex flex-col justify-center items-center">
       <form action="" method="get" >
        <div>
        <label htmlFor="address">Enter your email: </label>
        <input type="text" value={address} id="address" onChange={handleAddress}  />
        </div>
        <div>
            <input type="submit" value="Submit" onClick={handleOnClick}   />
  </div>
</form>

      </div>
    </div>
  );
}
