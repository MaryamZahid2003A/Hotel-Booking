import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Hotel/hotel.css';
import { useForm, FormProvider } from 'react-hook-form';
import Details from '../Hotel/details.tsx';
import Facility from '../Hotel/Facility.tsx';
import TypeForm from '../Hotel/TypeForm.tsx';
import Guest from '../Hotel/Guest.tsx';
import Image from '../Hotel/Image.tsx';
import { HotelFormData } from '../Hotel/AddHotel';

function ReadMore() {
  const [error, setError] = useState<string | null>(null);
  const { id, hotelId } = useParams<{ id: string; hotelId: string }>();
  const methods = useForm<HotelFormData>();
  const { handleSubmit, reset } = methods;
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(`/api/hotel/check/${id}/${hotelId}`);
        const hotelData = response.data;
        console.log('Fetched Hotel Data:', hotelData);

        if (hotelData) {
          const formattedData = {
            name: hotelData.name,
            city: hotelData.city,
            country: hotelData.country,
            description: hotelData.description,
            type: hotelData.type,
            pricePerNight: hotelData.pricePerNight,
            starRating: hotelData.starRating,
            adultCount: hotelData.adultCount,
            childCount: hotelData.childCount,
            facilities: hotelData.facilities,
            imageurls: hotelData.imageurls
          };
          console.log('Formatted Data for Reset:', formattedData);
          reset(formattedData);
        } else {
          setError('Hotel data not found');
        }
      } catch (error) {
        setError('Error fetching hotel data');
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchHotelData();
  }, [id, hotelId, reset]);

  const onSubmit = handleSubmit(async (data: HotelFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('city', data.city);
    formData.append('country', data.country);
    formData.append('description', data.description);
    formData.append('type', data.type);
    formData.append('pricePerNight', data.pricePerNight.toString());
    formData.append('starRating', data.starRating.toString());
    formData.append('adultCount', data.adultCount.toString());
    formData.append('childCount', data.childCount.toString());
    const flattenedFacilities = data.facilities.flat();
    flattenedFacilities.forEach((facility) => {
      formData.append('facilities', facility);
    });

    if (data.imageFiles && data.imageFiles.length > 0) {
      Array.from(data.imageFiles).forEach((file) => {
        formData.append('imageFiles', file);
      });
    }

    try {
      setLoading(true);
      const res = await axios.put(`/api/hotel/check/${id}/${hotelId}`, formData);
      console.log('Response from API:', res);
      toast.success('Hotel Updated Successfully!');
    } catch (error) {
      console.error('Failed to update hotel:', error);
      toast.error('Failed to update hotel.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <FormProvider {...methods}>
      <div className="hotel">
        <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg pt-10" onSubmit={onSubmit}>
          <h1 className="text-black text-center bg-white text-3xl font-bold mt-6">
            Update Hotel
          </h1>
          {error && <p className="error">{error}</p>}
          <Details />
          <TypeForm />
          <Facility />
          <Guest />
          <Image />
          <div className="flex justify-center mt-10">
            <button type="submit" className="button" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </FormProvider>
  );
}

export default ReadMore;
