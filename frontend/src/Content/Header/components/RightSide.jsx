import React from 'react'
import followerData from './FollowerData'
import UserBit from '../../Components/UserBit';

export default function RightSide() {
    const data = followerData;
  return (
    <div className="sm:p-2 lg:p-10 md:w-full max-w-96">
        <div className="hidden md:flex flex-col gap-5">
            <div className="magic-border text-gray-500 p-2">There is Nothing to seacrh</div>

            <div className="magic-border p-5">
                <p className='text-lg font-bold'>There is no premium.</p>

                <p>Can't buy premium if there is no premium. :peeposmort:</p>

                <img className="magic-border" src="/1m06z4.jpg" alt="you_cant_if_you_dont.jpg" />
            </div>


            {/* {data.map((item, index) => (
                <div className="flex" key={index}>
                    <UserBit user={data}/>
                    <button className='button-style'>Follow</button>
                </div>
            ))} */}
        </div>  
    </div>
  )
}
