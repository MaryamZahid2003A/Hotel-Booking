import React from 'react'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <div className='items-center mt-56'>
        <h1 className='flex-2 text-4xl text-red-700 font-bold ml-10 pb-4 '>Spend Quality <span className='text-black'>Holiday With Us  . . . </span>  </h1>
        <p className='flex-5 text-1xl mt-5 ml-10 text-black text-center'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum facere ullam eum iure? Sit porro iusto incidunt 
        </p>
        <p className='flex-5 text-1xl mt-4 ml-10 text-black '>
        in ipsa. Dolores nihil recusandae sit? At iste natus a nulla omnis. At.
        </p>

        <Link to='/reserve'>
        <div className='items-center'>
            <button className='w-36 h-14 text-black mr-14 border-4 ml-10 border-black  transition ease-in-out delay-80 mt-6 hover:bg-gray-300 hover:text-black'>
            Book Hotel
            </button>
            </div>
        </Link>
       
    </div>
  )
}
