import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';

export type BookFormData={
  userId:string,
  _id:string,
  firstName:string,
  lastName:string,
  email:string,
  night:Number,
  checkIn:string,
  checkOut:string
}

export default function MyBooking() {
  const {id}=useParams<{id:string}>();
  const [BookHotel, setBookHotel] = useState<BookFormData | null>(null);
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`/api/hotel/MyBooking/${id}`);
        setBookHotel(response.data);
        console.log(`Hotel data: ${JSON.stringify(response.data)}`);
      } catch (error) {
        console.error('Error fetching booking data', error);
      }
    };

    fetchHotel();
  }, [id]);

  return (
    <div>
    <section className='BookingSection'>
      <strong className='text-3xl text-center'>My Booking</strong>
      <section className='IndividualBooking'>
          
      </section>
    </section>
  </div>
  )
}
