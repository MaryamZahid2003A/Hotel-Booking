import React, { FormEvent, useState, useEffect } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';
import DatePicker from 'react-datepicker';
import { MdTravelExplore } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useQuery } from "react-query";
import Search from "./Search.tsx";
import Pagination from "../viewHotel/pagination.tsx";
import StarRating from "./starRating.tsx";
import Facility from "./Facility.tsx";
import Types from './Types.tsx';
import MaxPrice from "./MaxPrice.tsx";



export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  starRating?: string[];
  Types?: string[];
  facilities?: string[];
  maxPrice?: string;
  page: string;
  sortOption:string
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
   
    search.starRating?.forEach(star => param.append('starRating', star));
    search.Types?.forEach(type => param.append('Types', type));
    search.facilities?.forEach(facility => param.append('facilities', facility));
    param.append('sortOption', search.sortOption || '');


    console.log(param.toString()); // Debugging

    const SearchPage = await axios.get(`/api/search/Searches?${param.toString()}`);
    return SearchPage.data;
  } catch (error) {
    console.log('Error in fetching Searches');
  }
};

export default function SearchBar() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [destination, setDestination] = useState<string>(()=>sessionStorage.getItem('destination') || '');
  const [checkIn, setCheckIn] = useState<Date>(new Date(sessionStorage.getItem('checkIn') || new Date().toISOString()));
  const [checkOut, setCheckOut] = useState<Date>(new Date(sessionStorage.getItem('checkOut') || new Date().toISOString()))
  const [adultCount, setAdultCount] = useState<number>(()=>parseInt(sessionStorage.getItem('adultCount') || '1'));
  const [childCount, setChildCount] = useState<number>(()=>parseInt(sessionStorage.getItem('childCount') || '0'));
  const [selectedStar, setSelectedStar] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<string[]>([]);
  const [selectMaxPrice, setMaxPrice] = useState<number>(500)
  const [sortOption,setSortOption]=useState<string>('');

  const SaveHotel = (destination: string, checkIn: Date, checkOut: Date, adultCount: number, childCount: number) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    sessionStorage.setItem("destination",destination)
    sessionStorage.setItem("checkIn",checkIn.toISOString())
    sessionStorage.setItem("checkOut",checkOut.toISOString())
    sessionStorage.setItem('adultCount',adultCount.toString())
    sessionStorage.setItem('childCount',childCount.toString())
  };

  const search = {
    destination: destination,
    checkIn: checkIn.toISOString(),
    checkOut: checkOut.toISOString(),
    adultCount: adultCount.toString(),
    childCount: childCount.toString(),
    page: page.toString(),
    maxPrice: selectMaxPrice.toString(),
    starRating: selectedStar,
    Types: selectedType,
    facilities: selectedFacility,
    sortOption
  };

  const changeSelectedStar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStar((prevStar) => (
      event.target.checked ? [...prevStar, starRating] : prevStar.filter((star) => star !== starRating)
    ));
  };

  const changeSelectedType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value;
    setSelectedType((prevType) => (
      event.target.checked ? [...prevType, type] : prevType.filter((types) => types !== type)
    ));
  };

  const changeSelectedFacility = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;
    setSelectedFacility((prev) => (
      event.target.checked ? [...prev, facility] : prev.filter((star) => star !== facility)
    ));
  };

  const handlePrice = (value : number) => {
    setMaxPrice(value);
  };

  const { data, error, isLoading, refetch } = useQuery(
    ['hotelled', search],
    () => SearchParam(search),
    { enabled: !!search.page }
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
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check Out Date"
              className="w-64 text-center"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="button-search">
            <button type="submit" className="Search-button">Search </button>
            <button type="button" className="clear-button">Clear</button>
          </div>
        </div>
      </form>

      <div className="ShowingFilter">
        <div className="filter ">
          <div className="space-y-5">
            <h1 className="text-2xl text-center  mb-10">Filter By : </h1>
            <hr className="bg-slate-700 ml-10 p-10" />
            <StarRating selectedStar={selectedStar} onChange={changeSelectedStar}/> 
            <Facility selectedFacility={selectedFacility } onChange={changeSelectedFacility}/>
            <Types selectedType={selectedType} onChange={changeSelectedType}/>
           
          </div>
        </div>
        <div className="HotelsBar">
          <div className="flex flex-row gap-5 justify-between">
            <strong className="text-2xl ml-10 ">Total {data?.pagination.total} Hotels </strong>
            <select className="sortingOption" value={sortOption} onChange={(e)=>setSortOption(e.target.value)}>
              <option>Sort By</option>
              <option value="starRating">Star Rating</option>
              <option value="LowToHigh">Price Low To High</option>
              <option value="HighToLow">Price High To Low</option>
            </select>
          </div>
          <div>
            {data?.data.map((hotel) => (
              <div key={hotel.hotelId}>
                <Search hotel={hotel} />
              </div>
            ))}
            <Pagination
              page={data?.pagination.page}
              pages={data?.pagination.pages}
              onpageChange={(page) => setPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
