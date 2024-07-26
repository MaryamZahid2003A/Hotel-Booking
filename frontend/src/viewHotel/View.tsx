import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HotelFormData } from '../Hotel/AddHotel';
import { FaStar, FaMapMarkerAlt, FaUser, FaDollarSign } from 'react-icons/fa';
import '../App.css';

export default function ViewHotel() {
    const [hotels, setHotels] = useState<HotelFormData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await axios.get(`/api/hotel/view/${id}`);
                setHotels(response.data)
            } catch (error) {
                setError('Error fetching hotel data');
                console.error('Error fetching hotel data:', error);
            }
        };
        fetchHotel();
    }, [id]);
   
    return (
        <div className="container">
            <h1 className='text-white text-3xl mt-20 text-center'>Hotel Details</h1>
            <div className='item'>
                {hotels.length > 0 ? (
                    hotels.map((hotel) => (
                        <div key={hotel.userId} className='bg-white rounded-2xl shadow-2xl relative mt-10 lg:w-96 h-80 ml-10 mr-10 p-2'>
                            <img src='https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg' className='flex-1 rounded-2xl mt-4 ml-10 items-center' width='300' height='300' alt='Hotel'/>
                            <div className='individualItem'>
                                <h2 className='text-center text-2xl text-red-300 mt-5'>{hotel.name}</h2>
                                <p className='item-description'><strong className='text-1xl mr-10 '>Description:</strong>  {hotel.description.substring(0, 30)} .. .</p>

                                <div className='flex justify-between'>
                                    <p className='item-description ' ><strong>Price Per Night : </strong> <FaDollarSign style={{ color: 'gray' }} className='mt-1 pl-5' />    {hotel.pricePerNight}</p>
                                    <strong className='item-description'>Rating : <FaStar className='text-yellow-400  mt-1 ml-4'/> {hotel.starRating}</strong>

                                </div>
                                <p className='item-description'><strong className=''>Location : </strong> <FaMapMarkerAlt style={{ color: 'red' }} className='mt-1 '/> {hotel.city}, {hotel.country}</p>

                                <p className='item-description'><strong>Type:</strong> <p className='ml-10'>{hotel.type}</p></p>
                                <div className='item-description'>
                                    <strong>Facilities:</strong>
                                    <div className='facilities-list ml-10'>
                                        {hotel.facilities.map((facility, index) => (
                                            <span key={index} className='facility-item'>{facility}</span>
                                        ))}
                                    </div>
                                </div>
                                <p className='item-description'><FaUser style={{ color: 'blue' }} className='mt-1 mr-6'/>   {hotel.adultCount} Adults ,  {hotel.childCount} Children </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-white'>No hotel details available</p>
                )}
                {error && <p className='text-red-500'>{error}</p>}
            </div>
        </div>
    );
}
