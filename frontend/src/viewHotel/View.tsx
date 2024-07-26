import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HotelFormData } from '../Hotel/AddHotel';

export default function ViewHotel() {
    const [hotels, setHotels] = useState<HotelFormData[]>([]); // Changed to array
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await axios.get(`/api/hotel/view/${id}`);
                setHotels(Array.isArray(response.data) ? response.data : [response.data]);
            } catch (error) {
                setError('Error fetching hotel data');
                console.error('Error fetching hotel data:', error);
            }
        };
        fetchHotel();
    }, [id]);

    return (
        <div>
            <h1 className='text-white mt-20'>Hotel Details</h1>
            {hotels.length > 0 ? (
                <ul className="mt-20">
                    {hotels.map((hotel) => (
                        <li key={hotel.userId}>
                            <h2 className='text-white'>{hotel.name}</h2>
                            <p className='text-white'>{hotel.city}</p>
                            <p className='text-white'>{hotel.country}</p>
                            <p className='text-white'>{hotel.description}</p>
                            <p className='text-white'>{hotel.type}</p>
                            <p className='text-white'>{hotel.pricePerNight}</p>
                            <p className='text-white'>{hotel.starRating}</p>
                            <p className='text-white'>{hotel.facilities}</p>
                            <p className='text-white'>{hotel.adultCount}</p>
                            <p className='text-white'>{hotel.childCount}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-white'>No hotel details available</p>
            )}
            {error && <p className='text-red-500'>{error}</p>}
        </div>
    );
}
