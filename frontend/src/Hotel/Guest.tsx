import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './hotel.css';
import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './AddHotel.tsx';


function Guest() {
  const {  register, formState: { errors } } = useFormContext<HotelFormData>();

  return (
    <div>
       <label htmlFor="guests" className="text-2xl text-black font-bold ml-10">
          Guests
        </label>
        <div className="guest">
          <div className="flex flex-wrap mb-6 mx-2 mt-3">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0 ml-8 mt-5">
              <label htmlFor="adult" className="label">Adult</label>
              <input
                type="number"
                min="1"
                className="input"
                placeholder="Adult"
                {...register('adultCount', { required: true })}
              />
              {errors.adultCount && <p className='text-red-800 ml-8'>This Field is required</p>}
            </div>
            <div className="w-full md:w-1/2 px-2 ml-8 mr-8 mt-5">
              <label htmlFor="children" className="label">Children</label>
              <input
                type="number"
                min="1"
                className="input"
                placeholder="Children"
                {...register('childCount')}
              />
              {errors.childCount && <p className='text-red-800 ml-8'>This Field is required</p>}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Guest;