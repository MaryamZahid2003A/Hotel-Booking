import React from 'react';
import './hotel.css';
import { HotelFormData } from "./AddHotel.tsx";
import { useFormContext } from 'react-hook-form';

function Details() {
  const { register, formState: { errors } } = useFormContext<HotelFormData>();

  return (
    <div>
      <div className="mb-6">
        <label htmlFor="name" className="label">Name</label>
        <input
          id="name"
          className="input"
          placeholder="Name"
          {...register('name', { required: true })}
        />
        {errors.name && <p className='text-red-800 ml-8'>This Field is required</p>}
      </div>

      {/* City and Country */}
      <div className="flex flex-wrap mb-6 mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0 ml-8">
          <label htmlFor="city" className="label">City</label>
          <input
            id="city"
            className="input"
            placeholder="City"
            {...register('city', { required: true })}
          />
          {errors.city && <p className='text-red-800 ml-8'>This Field is required</p>}
        </div>
        <div className="w-full md:w-1/2 px-2 ml-8 mr-8">
          <label htmlFor="country" className="label">Country</label>
          <input
            id="country"
            className="input"
            placeholder="Country"
            {...register('country', { required: true })}
          />
          {errors.country && <p className='text-red-800 ml-8'>This Field is required</p>}
        </div>
      </div>

      {/* Description */}
      <div className="mt-8">
        <label htmlFor="description" className="label">Description</label>
        <textarea
          id="description"
          className="textinput"
          placeholder="Add Hotel Description"
          {...register('description', { required: true })}
        />
        {errors.description && <p className='text-red-800 ml-8'>This Field is required</p>}
      </div>

      {/* Price Per Night */}
      <div className="mt-8">
        <label htmlFor="price" className="label">Price Per Night</label>
        <input
          className="input"
          placeholder="Price Per Night"
          {...register('pricePerNight', { required: true })}
        />
        {errors.pricePerNight && <p className='text-red-800 ml-8'>This Field is required</p>}
      </div>
    </div>
  );
}

export default Details;
