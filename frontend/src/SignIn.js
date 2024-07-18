import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'

export default function SignIn() { 
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
    const SubmitHandle=()=>{
        console.log("Hello Sign In")
    } 
  return (
    <div className='flex justify-center items-center flex-col lg:ml-64 sm:ml-6 md:ml-20'>
      <form className='flex flex-col mt-10 mx-4 sm:mt-20 sm:mx-30 md:mx-40 lg:mx-72 h-96 w-96  bg-white  rounded-lg' onSubmit={SubmitHandle}>
      <input
              id='title'
              name='title'
              type='email'
          className='border-b-2 w-72 ml-8 mr-8 py-1 px-3 border-slate-500 text-black mt-14'
              placeholder='Email'
             required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}            
            />
        <input
              id='title'
              name='title'
              type='password'
          className='border-b-2 w-72 ml-8 mr-8 py-1 px-3 border-slate-500 text-black mt-14'
              placeholder='Password'
           required
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
             
              
            />
            <div className='w-full ml-16 mr-16  py-2 px-3 rounded mt-10  h-11 flex flex-col'>
                <button  className='w-48 h-8 rounded-2xl bg-red-600 hover:bg-red-900 text-white mt-2' >Sign In</button>
                <Link to="/signup">
                    <div className='flex flex-row mt-6'>
                        <h1 className='text-black '>New Registration ?  </h1>
                        <button className=' ml-1 text-blue-900'> Sign Up</button>
                    </div>
                </Link>
            </div>
      </form>
      <div className='w-full ml-30 mr-16 py-2 px-3 rounded mt-8 h-11 flex justify-center'>
          
         
        </div>
    </div>
  )
}
