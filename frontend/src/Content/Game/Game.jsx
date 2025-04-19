import React, { useEffect, useRef, useState } from 'react'
import timer from '../../utils/timer';
import axios from 'axios';
import catchError from '../../assets/js/catchError';
import ResultForm from './components/ResultForm';

export default function Game() {
  
  const timerInterval = useRef();
  const [winner, setWinner] = useState(false);
  const [time, setTime] = useState({
    startTime: new Date(),
    currentTime: `00:00:00`,
  });  
  const [findObjects, setFindObjects] = useState({
    'Sherrif Star': false,
    'Diamond Ore': false,
    'Onion Ring': false,
    'Habeneroman': false,
    'Gold Ore': false,
  });

  
  function handleWinner(item) {
    console.log("item: ", item);
    if (item !== undefined) {
      setFindObjects(prev => ({
        ...prev,
        [item]: true
      }));
    }
  }

  async function apiSetCoord(coords) {
    console.log(coords);
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_SERVER_URL}/game/matchCoords`, {params: {coords}});
      console.log(response.data);
      const {message, item} = response.data;
      flash(`${message}${(item !== undefined) ? item : ''}`);
      handleWinner(item)
    } catch (e) {
      catchError(e);
    }  
  }
  
  function handleMouseClick(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    const target = e.target;
    let targetWidth = target.width;
    let targetHeight = target.height;
  
    const clickCoords = {
      x: Math.round((offsetX / targetWidth) * 1920),
      y: Math.round((offsetY / targetHeight) * 1080),
    };
    if(!winner) apiSetCoord(clickCoords);
  }  

  useEffect(() => {
    timerInterval.current = setInterval(() => {
      if (winner) {
        clearInterval(timerInterval.current);
        return;
      }
      timer(time, setTime);
    }, 10);
    return () => {
      clearInterval(timerInterval.current);
    };
  }, [winner]);

  useEffect(() => {
    console.log(findObjects);
    const allFound = Object.values(findObjects).every(val => val === true);
    if (allFound) {
      setWinner(true);
      console.log("🎉 All objects found! Winner set to true.");
    }
  }, [findObjects]);  

  return (
    <div className='relative'>
      {winner &&       
        <ResultForm time={time}/>
      }
      <div className='absolute font-bold bottom-[7vw] left-[16vw]'>{time.currentTime}</div>
      <div className="absolute bottom-[5vw] left-[27vw] flex gap-[1vw]">
        {
          Object.values(findObjects).map((value, index) => (
            <img src="/assets/ticky.png" alt="tick" className={`w-[5vw] ${!value && "opacity-0"}`} key={index}/>
          ))
        }
      </div>
      <img src="/assets/Game.jpg" alt="Game_Start" className='object-contain' 
        onClick={(e) => {
          handleMouseClick(e);
          }}        
      />
    </div>
  )
}
