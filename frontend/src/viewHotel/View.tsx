import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HotelFormData } from '../Hotel/AddHotel';
import { FaStar, FaMapMarkerAlt, FaUser, FaDollarSign } from 'react-icons/fa';
import '../App.css';
import { Link } from 'react-router-dom';

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
                        <div key={hotel.userId} className='individualItem'>
                            <p className='text-black'>giving hotel id of each hotel{hotel._id}</p>
                            <div className='flex flex-shrink'>
                                    <img src='https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg' className='item-center' width='400' height='200' alt='Hotel'/>
                                        <div className='flex flex-col'>
                                        <h1 className='text-black text-2xl text-center font-bold mt-10'>Description</h1>
                                        <p className='item-description'>{hotel.description.substring(0,300) } . . .</p>
                                    </div>
                             </div>
                        
                            <div className='indvidual'>
                                <h2 className='text-center text-3xl text-red-800 mt-5 font-bold'>{hotel.name}</h2>
                                <div className='flex flex-col'>
                                    <p className='item-description ' ><strong>Price Per Night : </strong> <FaDollarSign style={{ color: 'gray' }} className='mt-1 pl-5' />    {hotel.pricePerNight}</p>
                                    <strong className='item-description'>Rating : <FaStar className='text-yellow-400  ml-4'/> {hotel.starRating}</strong>
                                </div>
                                <div className='flex flex-row'>
                                    <section>
                                        <p className='item-description'><strong className=''>Location : </strong> <FaMapMarkerAlt style={{ color: 'red' }} /> {hotel.city} , {hotel.country}</p>
                                        <p className='item-description'><strong>Type : </strong> <p className='ml-3' >{hotel.type}</p></p>
                                         <p className='item-description'><FaUser style={{ color: 'blue' }} className=' mr-6'/>   {hotel.adultCount} Adults ,  {hotel.childCount} Children </p>
                                   
                                    </section>
                                    <div className='item-description'>
                                        <div className='facilities-list'>
                                        
                                        <strong className='text-black ml-10'>Facilities:</strong>
                                            <br />
                                            {hotel.facilities.map((facility, index) => (
                                                <span key={index} className='facility-item'>{facility}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                           <Link to={`/api/hotel/view/${hotel._id}`}>
                             <button  className='button-item'>Edit Detail</button>
                           </Link>
                                <button  className='delete-item'>Delete Item</button>     
                            
                            </div>
                           
                        </div>
                    ))
                ) : (
                    <p className='text-black text-3xl mt-10'>No hotel details available</p>
                )}
                {error && <p className='text-red-500'>{error}</p>}
            </div>
        </div>
    );
}
