import React from 'react'
import { useLoaderData } from 'react-router-dom';
import catchError from '../../assets/js/catchError';
import axios from 'axios';

export default function Score() {

  const data = useLoaderData();

  return (
    <div className='relative'>
        <div className="absolute w-[30vw] aspect-square bg-[#3a3a3a] border-[1.5vw] border-orange-900 border-b-orange-700 outline outline-4 outline-stone-900 left-[35vw] top-[15vw] font-bold text-center p-[0.2vw]">
          <p className='text-2xl'>Leaderboards</p>
          {
            data.map((item, index) => (
              <div className="flex w-full px-[1vw] justify-between" key={index}>
                <p>{item.player}</p>
                <p>{item.timeTaken}</p>
              </div>
            ))
          }
        </div>
        <img src="/assets/Score.jpg" alt="Game_Start" className='object-contain' />
    </div>
  )
}

Score.loader = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_SERVER_URL}/score/fetchScores`
    );
    console.log(response.data);
    return response.data;
  } 
  catch (e) {
    catchError(e);
  }  
}
