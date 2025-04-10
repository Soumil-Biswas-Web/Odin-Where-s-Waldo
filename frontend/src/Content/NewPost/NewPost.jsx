import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller } from 'react-hook-form'

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  })
  .required();

export default function NewPost() {

  const onSubmit = (data) => { 
    // console.log(data);
    apiLogin(data);
  }
  
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="new-post-form"
      className='flex flex-col gap-3 items-start w-full p-3'
    >
      <Controller
        name="postText"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            type="textArea"
            onChange={(e) => {
                localStorage.setItem("postText", e.target.value);
                field.onChange(e); // Ensure react-hook-form handles the change
            }}
            placeholder="What's on your mind?..."
            className="w-full h-32 magic-border p-3"
          ></textarea>
        )}
      />

      <button className='button-style' type='submit' >Post</button>
    </form>
  )
}
