import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';

export type BookFormData={
  userId:string,
  _id:string,
  hotelId:string,
  firstName:string,
  lastName:string,
  email:string,
  night:Number,
  checkIn:string,
  checkOut:string
}

export default function MyBooking() {
  const {id}=useParams<{id:string}>();
  const [BookHotel, setBookHotel] = useState<BookFormData[]>([]);
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
        {BookHotel.map((book)=>(
           <section className='Book'>
                <div>
                    <strong className='text-1xl '>Visitor Detail</strong>
                    <h1 className='Bookheading'><strong>First Name : </strong>{book.firstName}</h1>
                    <h1 className='Bookheading'><strong>Last Name : </strong>{book.lastName}</h1>
                    <h1 className='Bookheading'><strong>E-Mail : </strong>{book.email}</h1>
                    <h1 className='Bookheading'><strong>Nights : </strong>{book.night.toString()}</h1>
                    <h1 className='Bookheading'><strong>Check In : </strong>{book.checkIn}</h1>
                    <h1 className='Bookheading'><strong>Check Out : </strong>{book.checkOut}</h1>
                  </div>
                <div className='flex flex-col'>
                <strong className='text-1xl '>Check Hotel Detail</strong>
                <Link to={`/hotel/${book.userId}/${book.hotelId}`} >
                <button className='w-24 h-10 mt-6 ml-10 bg-yellow-400 font-bold text-black mr-14 rounded-sm hover:bg-yellow-600 hover:text-black transition ease-in-out delay-200 '>
                View Detail
                </button>
                </Link>

                </div>
            </section>
        ))}
          
      </section>
    </section>
  </div>
  )
}
