import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useDispatch, UseDispatch,useSelector } from 'react-redux';
import { useAdd_bookMutation } from '../store/slice/BookApiSlice';
import { useForm } from 'react-hook-form';
import { setBookCredentials } from '../store/slice/BookSlice';
import { toast,ToastContainer } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



export default function Booking() {
  const [checkIn, setCheckIn] = useState<Date>(new Date(sessionStorage.getItem('checkIn') || new Date().toISOString()));
  const [checkOut, setCheckOut] = useState<Date>(new Date(sessionStorage.getItem('checkOut') || new Date().toISOString()))
  const {handleSubmit,formState:{errors},}=useForm();
  const dispatch=useDispatch();
  const location = useLocation();
  const [booking]=useAdd_bookMutation();
  const { hotel } = location.state || {};
  let [result,setResult]=useState(hotel.pricePerNight);
  const [night,setNight]=useState(1);
  const [firstName,setFirstName]=useState('');
  const [lastName,setlastName]=useState('');
  const [email,setEmail]=useState('');
  const hotelId=hotel._id;
  const userId=hotel.userId;
 
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  

  const onSubmit=handleSubmit(async()=>{
    try{
      const res=await booking({hotelId,userId,firstName,lastName,email,night,checkIn,checkOut}).unwrap();
      dispatch(setBookCredentials({...res}));
      toast.success('Booked Successfully!')
    }
    catch(error){
      console.error("error in booking hotel")
    }
  })
  useEffect(() => {
    if (hotel) {
      setResult(hotel.pricePerNight * night);
    }
  }, [night, hotel]);

  return (
    <div>
      <section className='flex flex-col'>
        <form onSubmit={onSubmit}>
        <header className="BookingName">
          Booked Hotel's By Tourists
        </header>
        <section className="flex flex-row mb-10">
          <section className="Booking1">
            <h1 className='font-serif'>
              <strong className='text-center text-2xl'>Your Booking Details</strong>
            </h1>
            <div className='flex flex-col mt-5'>  
              <div>
                  <h1 className='heading'>Location : </h1>
                  <p className='paragraph'>{hotel.city}, {hotel.country}</p>
              </div>
              <div className='mt-5 flex flex-row'>
                    <div>
                      <h1 className='heading'>Price Per Night : </h1>
                      <p className='paragraph'>$ {hotel.pricePerNight} Per Night</p>
                      </div>
                    <div className='flex flex-col ml-10 '>
                        <label>
                            <strong>Nights:</strong>
                          </label>
                          <input
                              type="number"
                              placeholder="Nights"
                              min={1}
                              max={20}
                              value={night}
                              onChange={(e)=>setNight(parseInt(e.target.value))}
                              className="paragraph1"
                              required
                            />
                    </div>
              </div>
              <div className='flex flex-col  mt-5'>
                      <div className="paragraph">
                        <p className="heading">Check In: </p>
                        <DatePicker
                          selected={checkIn}
                          onChange={(date) => setCheckIn(date as Date)}
                          selectsStart
                          startDate={checkIn}
                          endDate={checkOut}
                          minDate={minDate}
                          maxDate={maxDate}
                          placeholderText="Check In Date"
                          className='cursor-pointer'
                        />
                    </div>
                    <div className="paragraph">
                      <p className="heading"> Check Out: </p>
                      <DatePicker
                        selected={checkOut}
                        onChange={(date) => setCheckOut(date as Date)}
                        selectsEnd
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={minDate}
                        maxDate={maxDate}
                        placeholderText="Check Out Date"
                        wrapperClassName="min-w-full"
                        className='cursor-pointer'
                      />
                    </div>
              </div>
              <p className='taxesDate'>Adjust your Check-In and Check-Out Date According To your Stay!</p>
             
              <div className='mt-10'>
                  <h1 className='heading'>Guests </h1>
                  <p className='paragraph'>Adult {hotel.adultCount} & Child {hotel.childCount}</p>
              </div>
            </div>
          </section>
          <section className="Booking2 ">
            <strong className='text-2xl text-center'>Confirm Your Details</strong>
            <div className='flex flex-flex-row'>
                  <div className='mt-5'>
                    <h1 className='heading'>First Name </h1>
                    <input type='text' className='paragraphInput' placeholder='First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                   
                  </div>
                  <div className='ml-10 mt-5'>
                    <h1 className='heading'>Last Name </h1>
                    <input type='text' className='paragraphInput' placeholder='Last Name' value={lastName} onChange={(e)=>setlastName(e.target.value)} required/>
                  </div>
            </div>
            <div className='mt-10'>
              <h1 className='heading'>E-Mail </h1>
              <input type='email' className='paragraphEmail' placeholder='E-Mail'  value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <h1 className='text-2xl mt-5 '>Your Price Summary</h1>
            <div className='PriceSummary'>
              <h1>Total Cost : $ {result} </h1>
              <p className='taxes'>Including taxes and charges</p>
              <p className='taxes'>Night Stay : {night}</p>

            </div>
            <div className='mt-20'>
              <button type="submit" className="Search-button">Confirm</button>
            </div>
          </section>

        </section>
        </form>
      </section>
      <ToastContainer/>
    </div>
  );
}
