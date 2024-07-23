import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './hotel.css';

export default function AddHotel() {
  return (
    <div className="hotel ">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-black text-center bg-white text-2xl font-bold  mt-6">
          Add Hotel
        </h1>

        {/* Name */}
        <div className="mb-6">
           
            <label htmlFor="name" className="label">
                Name
            </label>
            <input
                id="name"
                name="name"
                className="input"
                placeholder="Name"
            />
        </div>

        {/* City and Country */}
        <div className="flex flex-wrap mb-6 mx-2  ">
          <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0 ml-8">
            <label htmlFor="city" className="label">
              City
            </label>
            <input
              id="city"
              name="city"
              className="input"
              placeholder="City"
            />
          </div>
          <div className="w-full md:w-1/2 px-2 ml-8 mr-8">
            <label htmlFor="country" className="label">
              Country
            </label>
            <input
              id="country"
              name="country"
              className="input"
              placeholder="Country"
            />
          </div>
        </div>

        {/* Description */}
        <div className=" mt-8">
          <label htmlFor="description" className="label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="textinput"
            placeholder="Add Hotel Description"
          />
        </div>

        {/* Price Per Night */}
        <div className=" mt-8">
          <label htmlFor="price" className="label">
            Price Per Night
          </label>
          <input
            id="price"
            name="price"
            type="number"
            className="input"
            placeholder="Price Per Night"
          />
        </div>

        {/* Type */}
        <div className=" mt-8">
          <label htmlFor="type" className="label">
            Type
          </label>
          <input
            id="type"
            name="type"
            className="input"
            placeholder="Type"
          />
        </div>

        {/* Facilities */}
        <div className='flex flex-wrap'>
        <div className="mt-8">
            <label htmlFor="rating" className="label">
                Star Rating
            </label>
            <input
                id="rating"
                name="rating"
                type="number"
                min="1"
                max="5"
                className="input"
                placeholder="Select a Rating"
            />
         </div>
            <div className=" mt-8 ml-10">
            <label htmlFor="facilities" className="label">
                Facilities
            </label>
            <div className="flex items-center mb-2 ml-8">
                <input
                id="facility1"
                name="facilities"
                type="checkbox"
                className='mt-6'
                />
                <label htmlFor="facility1" className="text-black ml-8 mt-6">Free Wifi</label>
            </div>
            <div className="flex items-center mb-2  ml-8">
                <input
                id="facility2"
                name="facilities"
                type="checkbox"
                />
                <label htmlFor="facility2" className="text-black ml-8 ">Parking</label>
            
            </div>
            <div className="flex items-center mb-2  ml-8">
                <input
                id="facility2"
                name="facilities"
                type="checkbox"
                />
                <label htmlFor="facility2" className="text-black ml-8">Airport Shuttle</label>
            
            </div>
            <div className="flex items-center mb-2  ml-8">
                <input
                id="facility2"
                name="facilities"
                type="checkbox"
                />
                <label htmlFor="facility2" className="text-black ml-8">Family Rooms</label>
            
            </div>
            <div className="flex items-center mb-2  ml-8">
                <input
                id="facility2"
                name="facilities"
                type="checkbox"
                />
                <label htmlFor="facility2" className="text-black ml-8">Outdoor Pool</label>
            
            </div>
            <div className="flex items-center mb-2  ml-8">
                <input
                id="facility2"
                name="facilities"
                type="checkbox"
                />
                <label htmlFor="facility2" className="text-black ml-8">Spa</label>
            
            </div>
            <div className="flex items-center mb-2  ml-8">
                <input
                id="facility2"
                name="facilities"
                type="checkbox"
                className='pr-3'
                />
                <label htmlFor="facility2" className="text-black ml-8">Fitness Center</label>
            
            </div>
          </div>

         

        </div>
        <label htmlFor="facilities" className="text-2xl text-black font-bold ml-10">
                Guests
            </label>
        <div className="guest">
        <div className="flex flex-wrap mb-6 mx-2 mt-3  ">
          <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0 ml-8 mt-5">
            <label htmlFor="city" className="label">
              Adult
            </label>
            <input
              id="adult"
              name="adult"
              className="input"
              placeholder="Adult"
            />
          </div>
          <div className="w-full md:w-1/2 px-2 ml-8 mr-8 mt-5">
            <label htmlFor="country" className="label">
              Children
            </label>
            <input
              id="children"
              name="children"
              className="input"
              placeholder="Children"
            />
          </div>
        </div>

            
         </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="bg-blue-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
