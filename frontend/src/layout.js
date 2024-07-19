import React from 'react';
import './inner.css';
import Header from './Header';
import { Link } from 'react-router-dom';
export default function Layout() {
  return (
    <div className='layout-header'>
      <div className='flex justify-between items-center w-full'>
      <Link to='/'>
        <div className='ml-10 flex flex-row'>
          <img src="https://cdn-icons-png.flaticon.com/128/1090/1090663.png" width='70' height='30' className='mt-3'/>
          <h1 className='text-white text-2xl ml-10 mt-8 font-serif italic'>
            <span className='font-bold text-2xl'>Hill Town</span> Resort
          </h1> 
        </div>
        </Link>
        <Link to='/signup'>
              <button className='w-28 h-14 mt-6 bg-yellow-400 font-bold text-black mr-14 hover:bg-yellow-600 hover:text-black transition ease-in-out delay-200 '>
                Sign Up
              </button>
        </Link>
      </div>
      
    </div>
  );
}
