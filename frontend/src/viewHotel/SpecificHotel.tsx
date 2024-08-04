import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HotelFormData } from '../Hotel/AddHotel';
import { FaStar, FaMapMarkerAlt, FaUser, FaDollarSign } from 'react-icons/fa';
import '../App.css';
import { Link } from 'react-router-dom';

export default function SpecificHotel() {
    const [hotels, setHotel] = useState<HotelFormData | null>(null);
    const { id } = useParams<{ id: string }>();
    const { hotelId } = useParams<{ hotelId: string }>();

    useEffect(()=>{
       const fetchHotel=async()=>{
        const hotel=await axios.get(`/api/hotel/check/${id}/${hotelId}`)
        setHotel(hotel.data)
       }
        fetchHotel();
    },[id,hotelId])

    if (!hotels) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1 className='text-white text-3xl mt-20 text-center'>Hotel Details</h1>
            <h1 className='text-black text-4xl mt-10 ml-10 font-bold text-center'>My Hotel</h1>
            <div className='grid grid-cols-1'>
               
                        <div key={id} className='individualItem'>
                             <h2 className='text-3xl text-red-800 mt-5 font-bold ml-10'>{hotels.name}</h2>
                                <p className='ml-10 mt-10'>{hotels.description.substring(0,700) } . . .</p>    
                            <div className='indvidual'>
                                <div className='flex flex-row'>
                                    <p className='item-description ' ><strong>Price Per Night : </strong> <FaDollarSign style={{ color: 'gray' }} className='mt-1 pl-5' />    {hotels.pricePerNight}</p>
                                    <strong className='item-description'><FaStar className='text-yellow-300  ml-5'/> {hotels.starRating} Rating</strong>
                                    <p className='item-description'><strong className=''>Location : </strong> <FaMapMarkerAlt style={{ color: 'red' }} /> {hotels.city} , {hotels.country}</p>
                                    <p className='item-description'><strong>Type : </strong> <p className='ml-3' >{hotels.type}</p></p>
                                    <p className='item-description'><FaUser style={{ color: 'blue' }} className=' mr-6'/>   {hotels.adultCount} Adults ,  {hotels.childCount} Children </p>
                                    <div className='item-description'>
                                        <div className='facilities-list'>
                                            {hotels.facilities.map((facility, index) => (
                                                <span key={index} className='facility-item'>{facility} ,</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                               
                           
                            
                            </div>
                           
                  </div>
            </div>
        </div>
    );
}
