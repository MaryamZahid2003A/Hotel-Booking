import React, { FormEvent } from "react";
import { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';
import DatePicker from 'react-datepicker';
import { MdTravelExplore } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useQuery } from "react-query";

export type SearchHotel = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  SaveHotel: {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    hotelId: string;
  }
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page: string;
};

const SearchParam = async (search: SearchParams) => {
  try {
    const param = new URLSearchParams();
    param.append('destination', search.destination || '');
    param.append('checkIn', search.checkIn || '');
    param.append('checkOut', search.checkOut || '');
    param.append('adultCount', search.adultCount || '');
    param.append('childCount', search.childCount || '');

    const SearchPage = await axios.get(`/api/search/Searches?${param}`);
    return SearchPage.data;
  } catch (error) {
    console.log('Error in fetching Searches');
  }
};

export default function SearchBar() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [destination, setDestination] = useState<string>('');
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(new Date());
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);

  const SaveHotel = (destination: string, checkIn: Date, checkOut: Date, adultCount: number, childCount: number) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
  };
//convert to string
  const search = {
    destination: destination,
    checkIn: checkIn.toISOString(),
    checkOut: checkOut.toISOString(),
    adultCount: adultCount.toString(),
    childCount: childCount.toString(),
    page: page.toString()
  };

  const { data, error, isLoading, refetch } = useQuery(
    ['hotelled', search],
    () => SearchParam(search),
    { enabled: false }
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    SaveHotel(destination, checkIn, checkOut, adultCount, childCount);
    refetch();
  };

  const refresh=(data:SearchHotel)=>{
    
  }

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="Search">
          <div className="page">
            <MdTravelExplore className="icon" />
            <input
              type="text"
              placeholder="Where You Want To Go?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="count">
            <label>
              <strong>Adult:</strong>
              <input
                type="number"
                placeholder="Adult"
                min={1}
                max={20}
                value={adultCount}
                className="p-10"
                onChange={(e) => setAdultCount(Number(e.target.value))}
              />
            </label>
            <label>
              <strong>Child:</strong>
              <input
                type="number"
                placeholder="Child"
                min={0}
                max={20}
                value={childCount}
                className="p-10"
                onChange={(e) => setChildCount(Number(e.target.value))}
              />
            </label>
          </div>
          <div className="checkin">
            <strong className="text-center">CheckIn: </strong>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check In Date"
              className="w-64 text-center"
            />
          </div>
          <div className="checkout">
            <strong className="text-center"> CheckOut: </strong>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date as Date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn}
              maxDate={maxDate}
              placeholderText="Check Out Date"
              className="w-64 text-center"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="button-search">
            <button type="submit" className="Search-button">Search </button>
            <button
              type="button"
              className="clear-button"
            >
    
              Clear
            </button>
          </div>
          
        </div>
      </form>
    </div>
  );
}
