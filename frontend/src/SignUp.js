import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const SignUpHandle=()=>{
    console.log('Hello World Sign Up')
 }

  return (
    <div className='flex justify-center items-center flex-col lg:ml-64 sm:ml-6'>
      <form className='flex flex-col mx-4 sm:mt-20 sm:mx-30 md:mx-40 lg:mx-72 h-96 w-96 bg-white rounded-lg ' onSubmit={SignUpHandle}>
        <input
          id='name'
          name='name'
          type='text'
          className='border-b-2 w-72 ml-8 mr-8 py-1 px-3 border-slate-500 text-black mt-14'
          placeholder='Name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          id='email'
          name='email'
          type='email'
          className='border-b-2 w-72 ml-8 mr-8 py-1 px-3 border-slate-500 text-black mt-14'
          placeholder='E-mail'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id='password'
          name='password'
          type='password'
          className='border-b-2 w-72 ml-8 mr-8 py-1 px-3 border-slate-500 text-black mt-14'
          placeholder='Password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='w-full ml-16 mr-16 py-2 px-3 rounded mt-6 h-11 flex flex-col'>
          <button className='w-48 rounded-2xl bg-red-600 hover:bg-red-900 text-white mt-2'>Sign Up</button>
          <Link to="/login">
            <div className='flex flex-row mt-4'>
              <h1 className='text-black'>Already have an account?</h1>
              <button className='ml-1 text-blue-900'>Login In</button>
            </div>
          </Link>
        </div>
      </form>
     
     
    </div>
  );
}
