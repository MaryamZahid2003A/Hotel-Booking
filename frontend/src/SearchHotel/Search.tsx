import React from 'react';
import { FaStar, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Booking from './Booking.tsx';



export default function Search({ hotel }) {
  return (
    <div className='SearchItemGrid'>
      <div className='w-full h-[300px] overflow-hidden'>
        <img 
          src={hotel.imageurls} 
          alt='Hotel Image'
          className='w-full h-full object-cover object-center mt-10 ' 
        />
      </div>
      <div className='flex flex-col ml-10 mt-5 '>
        <div className='grid grid-rows-[1fr_2fr_1fr]'>
          <div className='flex flex-row justify-between'>
            <div>
              <div className='flex flex-col mt-1'>
                <div className='flex flex-row'>
                  <div className='flex flex-row mt-1'>
                    {Array.from({ length: hotel.starRating }).map((_, index) => (
                      <FaStar key={index} className='text-yellow-300 ml-5' />
                    ))}
                  </div>
                  <p className='ml-1'>{hotel.type}</p>
                </div>
                <h2 className='text-2xl font-bold mb-2'>{hotel.name}</h2>
                <p className='flex'>{hotel.adultCount} Adults, {hotel.childCount} Children</p>
              </div> 
            </div>
            <div>
              <p className='flex mt-10 mr-10'> 
                <FaMapMarkerAlt style={{ color: 'red' }} className='mt-1' /> 
                {hotel.city}, {hotel.country}
              </p>
            </div> 
          </div>
          <div className='mt-10'>
            <p className='text-gray-700'>{hotel.description.substring(0, 280)} . . .</p>
          </div>
          <div className='flex flex-row justify-between mt-10'>
            <div className='flex flex-row flex-wrap gap-2'>
              {hotel.facilities.map((facility, index) => (
                <div key={index} className='facility'>
                  {facility}
                </div>
              ))}
            </div>
            <div className='flex flex-col'>
              <div className='font-bold pr-10 mr-10'>$ {hotel.pricePerNight} Per Night</div>
              <Link to={ `/booking/${hotel._id}`} state={{hotel}}>
                <button className='Booking-button'>Book</button></Link>
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
