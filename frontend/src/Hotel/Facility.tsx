import React from 'react'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './hotel.css';
import {TypeConfig,hotelFacilities} from '../config/typeConfig.tsx';
import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './AddHotel.tsx';


function Facility() {
  const { register,formState: { errors } } = useFormContext<HotelFormData>();

  return (
   
      <div className='flex flex-wrap'>
          <div className="mt-8">
            <label htmlFor="rating" className="label">Star Rating</label>
            <input
              type="number"
              
              min="1"
              max="5"
              className="input"
              placeholder="Select a Rating"
              {...register('starRating', { required: true })}
            />
            {errors.starRating && <p className='text-red-800 ml-8 font-bold'>This Field is required</p>}
          </div>
          <div>
      <h2 className="text-1xl  font-bold mb-3 ml-10 mt-7">Facilities</h2>
      <div className="grid grid-cols-5 gap-3 ml-10">
        {hotelFacilities.map((facility) => (
          <label className="text-sm flex gap-1 text-gray-700">
            <input
              type="checkbox"
              key={facility}
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && <p className='text-red-800 ml-8 font-bold'>This Field is required</p>}


      
    </div>
  </div>
    
  )
}
export default Facility;
