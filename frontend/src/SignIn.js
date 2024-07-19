import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';



export const onSubmit = (data) => {
  console.log(getValues)
 console.log('send')
};
export default function SignIn() { 
  const { register, handleSubmit,getValues, formState: { errors } } = useForm();
 

  return (
    <div className='flex justify-center items-center flex-col lg:ml-64 sm:ml-6 md:ml-20'>
      <form className='flex flex-col mt-10 mx-4 sm:mt-20 sm:mx-30 md:mx-40 lg:mx-72 h-96 w-96 bg-white rounded-lg' onClick={()=>getValues()} onSubmit={handleSubmit(onSubmit)}>
        <input
          id='title'
          type='email'
          placeholder='email'
          className='border-b-2 w-72 ml-8 mr-8 py-1 px-3 border-slate-500 text-black mt-14'
          {...register('email', { required: true })}
        />
        {errors.email && <p className='text-red-800 ml-8'>This field is required</p>}

        <input
          id='title'
          type='password'
          placeholder='password'
          className='border-b-2 w-72 ml-8 mr-8 py-1 px-3 border-slate-500 text-black mt-14'
          {...register('password', {
            required: true,
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long"
            }
          })}
        />
        {errors.password && <p className='text-red-800 ml-8'>{errors.password.message}</p>}

        <div className='w-full ml-16 mr-16 py-2 px-3 rounded mt-10 h-11 flex flex-col'>
          <button className='w-48 h-8 rounded-2xl bg-red-600 hover:bg-red-900 text-white mt-2'>Sign In</button>
          <Link to="/signup">
            <div className='flex flex-row mt-6'>
              <h1 className='text-black'>New Registration?</h1>
              <button className='ml-1 text-blue-900'>Sign Up</button>
            </div>
          </Link>
        </div>
        
      </form>
      <div className='w-full ml-30 mr-16 py-2 px-3 rounded mt-8 h-11 flex justify-center'></div>
    </div>
  );
}
