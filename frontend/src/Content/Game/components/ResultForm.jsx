import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import catchError from '../../../assets/js/catchError';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    playerName: yup
      .string()
      .required("Player Name is required"),
  })
  .required();

export default function ResultForm({time}) {

    const navigate = useNavigate();

  // Sends POST Request to backend API to make a new post
  const apiSubmit = async(data) => {
    try {
      const formData = new FormData();
      formData.append('player', data.playerName);
      formData.append('timeTaken', time.currentTime);
      const response = await axios.post(`${import.meta.env.VITE_REACT_SERVER_URL}/score/setScore`, formData);
      console.log(response.data);
      flash("Time saved successfully");
      navigate("/");
    } catch (e) {
      catchError(e);
    }
  }  

    const onSubmit = (data) => { 
        console.log(data);
        apiSubmit(data);
    }

    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  return (
    <div className="absolute z-10 w-full h-full inset-0">
        <div className="absolute w-full sm:w-[30vw] h-full sm:h-auto sm:aspect-square bg-[#3a3a3a] border-[1.5vw] border-orange-900 border-b-orange-700 outline outline-4 outline-stone-900 sm:left-[35vw] sm:top-[15vw] font-bold text-center p-[0.2vw] magic-center justify-center">
            <p>Congratulations!</p>
            <p>Your Time: {time.currentTime}</p>

            <form
                onSubmit={handleSubmit(onSubmit)}                
            >
                <Controller
                    name="playerName"
                    control={control}
                    render={({ field }) => (
                        <input
                        {...field}
                        type="text"
                        onChange={(e) => {
                            field.onChange(e); // Ensure react-hook-form handles the change
                        }}
                        placeholder="Enter Name"
                        className='w-[90%] m-3 text-center text-black'          
                        ></input>
                    )}
                />          

                <button className='button-style' type='submit' >Post</button>
            </form>            

        </div>
    </div>
  )
}
