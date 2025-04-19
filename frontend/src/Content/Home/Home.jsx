import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import catchError from '../../assets/js/catchError';

export default function Home() {

  const apiWakeUp = async() => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_SERVER_URL}/game/start`, {
      });
      console.log(response.data);
    } catch (e) {
      catchError(e);
    }
  }      

    return (
        <div className='relative'>
            <Link className='absolute px-[7vw] py-[2vw] bottom-[19%] left-[33.5vw]' to="score"></Link>
            <Link className='absolute px-[7vw] py-[2vw] bottom-[19%] right-[33.5vw]' to="game" onClick={apiWakeUp}></Link>
            <img src="/assets/Start.jpg" alt="Game_Start" className='object-contain' />
        </div>
    )
}
