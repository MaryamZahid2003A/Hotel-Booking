import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from './store/slice/UserApiSlice.js';
import { setCredentials } from './store/slice/UserSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      toast.success('Login Successful!');
      navigate('/'); // Navigate to the home page or desired route after login
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className='flex justify-center items-center flex-col sm:ml-6 md:ml-20 mt-20'>
      <form className='  flex flex-col mt-10 mx-4 sm:mt-20 sm:mx-30 md:mx-40 lg:mx-72 h-96 w-96 bg-black rounded-lg border-b-2 border-b-gray-800' onSubmit={handleSubmit(handleLogin)}>
        <input
          id='email'
          type='email'
          placeholder='Email'
          className='border-b-2 w-72 ml-8 mr-8 py-1 px-3 border-slate-500 text-white mt-14 bg-black'
          {...register('email', { required: true })}
        />
        {errors.email && <p className='text-yellow-300 ml-8'>This field is required</p>}

        <input
          id='password'
          type='password'
          placeholder='Password'
          className='border-b-2 w-72 ml-8 mr-8 py-1 px-3 border-slate-500 text-white mt-14 bg-black'
          {...register('password', {
            required: true,
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long"
            }
          })}
        />
        {errors.password && <p className='text-yellow-300 ml-8'>{errors.password.message}</p>}

        <div className='w-full ml-16 mr-16 py-2 px-3 rounded mt-10 h-11 flex flex-col'>
          <button className='w-48 h-8 rounded-2xl bg-red-600 hover:bg-red-900 text-white mt-2' type="submit">Sign In</button>
          <Link to="/signup">
            <div className='flex flex-row mt-6'>
              <h1 className='text-white'>New Registration?</h1>
              <button className='ml-1 text-yellow-300'>Sign Up</button>
            </div>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
