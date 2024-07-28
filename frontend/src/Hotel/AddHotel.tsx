import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './hotel.css';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Details from './details.tsx';
import Facility from './Facility.tsx';
import TypeForm from './TypeForm.tsx';
import Guest from './Guest.tsx';
import Image from './Image.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { setHotelCredentials } from '../store/slice/HotelSlice.js';
import { useAdd_hotelMutation } from '../store/slice/HotelApiSlice.js';

export type HotelFormData = {
  _id:number,
  userId:number,
  name: string;
  city: string;
  country: string;
  description: string
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageurls:string[];
  adultCount: number;
  childCount: number;
};

function AddHotel() {
  const methods = useForm<HotelFormData>();
  const { handleSubmit, formState: { errors } } = methods;
  const dispatch = useDispatch();
  const [addHotel] = useAdd_hotelMutation();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data: HotelFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('city', data.city);
    formData.append('country', data.country);
    formData.append('description', data.description);
    formData.append('type', data.type);
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("starRating", data.starRating.toString());
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childCount", data.childCount.toString());

    data.facilities.forEach((facility) => {
      formData.append('facilities', facility);
    });
    
    Array.from(data.imageFiles).forEach((file) => {
      formData.append('imageFiles', file);
    });

    try {
      const res = await addHotel(formData).unwrap(); 
      const hotelId = res._id;
      console.log(`hotel id ${hotelId}`)
      dispatch(setHotelCredentials({ ...res }));
      toast.success('Hotel Added Successfully!');
    } catch (error) {
      console.error(error?.data?.message || error.message);
    }
  });

  return (
    <FormProvider {...methods}>
      <div className="hotel">
        <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg pt-10" onSubmit={onSubmit} >
          <h1 className="text-black text-center bg-white text-3xl font-bold mt-6">
            Add Hotel
          </h1>
          <Details />
          <TypeForm />
          <Facility />
          <Guest />
          <Image />
          <div className="flex justify-center mt-10">
            <button type="submit" className="button" disabled={isLoading} >
              {isLoading? "Saving...": "Save"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </FormProvider>
  );
}

export default AddHotel;
