import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { setCredentials } from './store/slice/UserSlice';
import { useRegisterMutation } from './store/slice/UserApiSlice';
import { useDispatch } from 'react-redux';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function SignIn() { 
  const { register, handleSubmit,getValues, formState: { errors } } = useForm();
  const dispatch=useDispatch()
 const [registerApi]=useRegisterMutation();
 const navigate=useNavigate();
 

const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      const res = await registerApi({ email, name, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Registered Successfully', { autoClose: 2000 }); 
      navigate('/login'); 
    } catch (error) {
      toast.error(error?.data?.message || error.message, { autoClose: 2000 });
      console.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className='flex justify-center items-center flex-col lg:ml-64 sm:ml-6 md:ml-20'>
      <form className='flex flex-col mt-10 mx-4 sm:mt-20 sm:mx-30 md:mx-40 lg:mx-72 h-96 w-96 bg-white rounded-lg' onSubmit={handleSubmit(onSubmit)}>
      <input
          id='title'
          type='name'
          placeholder='Name'
          className='border-b-2 w-72 ml-8 mr-8 py-1 px-3 border-slate-500 text-black mt-8'
          {...register('name', { required: true })}
        />
        {errors.name && <p className='text-red-800 ml-8'>This field is required</p>}
        
       
       
        <input
          id='title'
          type='email'
          placeholder='Email'
          className='border-b-2 w-72 ml-8 mr-8 py-1 px-3 border-slate-500 text-black mt-8'
          {...register('email', { required: true })}
        />
        {errors.email && <p className='text-red-800 ml-8'>This field is required</p>}

        <input
          id='title'
          type='password'
          placeholder='Password'
          className='border-b-2 w-72 ml-8 mr-8 py-1 px-3 border-slate-500 text-black mt-8'
          {...register('password', {
            required: true,
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long"
            }
          })}
        />
        {errors.password && <p className='text-red-800 ml-8'>{errors.password.message}</p>}

        <div className='w-full ml-16 mr-16 py-2 px-3 rounded mt-7 h-11 flex flex-col'>
          <button className='w-48 h-8 rounded-2xl bg-red-600 hover:bg-red-900 text-white mt-2'>Sign Up</button>
          <Link to="/login">
            <div className='flex flex-row mt-4'>
              <h1 className='text-black'>Already Register?</h1>
              <button className='ml-1 text-blue-900'>Sign In </button>
            </div>
          </Link>
        </div>
      </form>
      <div className='w-full ml-30 mr-16 py-2 px-3 rounded mt-8 h-11 flex justify-center'></div>
      <ToastContainer/>
    </div>
  );
}
