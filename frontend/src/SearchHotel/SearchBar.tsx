import React, { FormEvent } from "react";
import { useState,useEffect } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';
import DatePicker from 'react-datepicker';
import { MdTravelExplore } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useQuery } from "react-query";
import { SearchPage } from "../../../backend/controller/SearchController";
import Search from "./Search.tsx";
import Hotel from "../../../backend/models/HotelModel";
import Pagination from "../viewHotel/pagination.tsx";

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
  starRating?: string[];
  Types?: string[];
  facilities?: string[];
  sortOption?:string;
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
    param.append('page', search.page || '1');
    param.append('sortOption', search.sortOption || '');

    search.starRating?.forEach((star)=> (
      param.append('starRating',star)
      
    ));
    search.facilities?.forEach((facility)=> (
      param.append('facilities',facility)
      
    ));
    search.Types?.forEach((type)=> (
      param.append('Types',type)
      
    ));
    

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
    { 
      enabled: !!search.page,
    }
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    SaveHotel(destination, checkIn, checkOut, adultCount, childCount);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const totalPages = data?.pagination?.pages ?? 0;
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

      {/* Showing Filter and Search Results */}
      <div className="ShowingFilter">
        <div className="filter ">
            <div className="space-y-5">
              <h1 className="text-1xl ">Filter By : </h1>
            </div>
        </div>
        <div className="HotelsBar">
          <div className="flex flex-col gap-5 ">
                <strong className="text-2xl ml-10 ">
                    {data?.pagination.total} Hotels Found   
              </strong>
            </div>
            <div>
              {
                data?.data.map((hotel)=>(
                  <div>
                    <Search hotel={hotel}/>
                    
                    </div>
                ))
              }
            <Pagination
              page={data?.pagination.page}
              pages={data?.pagination.pages}
              onpageChange={(page)=>setPage(page)}
            />
            </div>
          
          </div>
       
          
      </div>
     
    </div>
  );
}
 