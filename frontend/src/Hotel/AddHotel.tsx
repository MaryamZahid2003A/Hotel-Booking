import React from 'react';
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './hotel.css';
import { useForm,FormProvider } from 'react-hook-form';
import Details from './details.tsx';
import Facility from './Facility.tsx';
import TypeForm from './TypeForm.tsx';
import Guest from './Guest.tsx';
import { useDispatch, UseDispatch,useSelector } from 'react-redux';
import { setHotelCredentials } from '../store/slice/HotelSlice.js';
import { useAddHotelMutation } from '../store/slice/HotelApiSlice.js';
export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};


function AddHotel() {
  
  const method=useForm<HotelFormData>();
  const { handleSubmit, formState: { errors } } = method;
  const dispatch=useDispatch();
  const [addHotel]=useAddHotelMutation();
 const onsubmit=handleSubmit(async(JsonData: HotelFormData)=>{
  const formData=new FormData();
  formData.append('name',JsonData.name);
  console.log(JsonData.name)

  formData.append('city',JsonData.city);
  console.log(JsonData.city)

  formData.append('country',JsonData.country);
  console.log(JsonData.country)

  formData.append('description',JsonData.description);
  console.log(JsonData.description)

  formData.append('type',JsonData.type);
  console.log(JsonData.type)

  formData.append("pricePerNight", JsonData.pricePerNight.toString());
  console.log(JsonData.pricePerNight)

    formData.append("starRating", JsonData.starRating.toString());
  console.log(JsonData.starRating)

    formData.append("adultCount", JsonData.adultCount.toString());
  console.log(JsonData.adultCount)

    formData.append("childCount", JsonData.childCount.toString());
  console.log(JsonData.childCount)


  JsonData.facilities.map((facility,index)=>{
    formData.append(`facilities${index}`,facility)
  })
 
try{
  const res=await addHotel({formData}).unwrap();
  dispatch(setHotelCredentials({...res}))
  toast.success('Hotel Added Sucessfully !');
}
 catch(error){
  console.error(error?.data?.message || error.message)
 }


 })
  return (
    <FormProvider {...method} >
    <div className="hotel">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg pt-10" onSubmit={onsubmit}>
        <h1 className="text-black text-center bg-white text-3xl font-bold mt-6">
          Add Hotel
        </h1>
      
          <Details/>
          <TypeForm/>
          <Facility/>
          <Guest/>
      
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="button"
          >
            Save
          </button>
        </div>
      </form>
    </div>
    </FormProvider>
  );
}


export default AddHotel;