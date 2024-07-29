import React, { FormEvent } from "react";
import { useState } from "react";
export type SearchHotel={
    destination:string,
    checkIn:Date,
    checkOut:Date,
    adultCount:number,
    childCount:number,
    hotelId:string,
    SaveHotel:{
        destination:string,
        checkIn:Date,
        checkOut:Date,
        adultCount:number,
        childCount:number,
        hotelId:string

    }
}
export default function Search() {
    const[destination,setDestination]=useState<string>('');
    const [checkIn,setCheckIn]=useState<Date>(new Date());
    const [checkOut,setCheckOut]=useState<Date>(new Date());
    const [adultCount,setAdultCount]=useState<number>(1)
    const [childCount,setChildCount]=useState<number>(0);
    const SaveHotel=(destination:string,checkIn:Date,checkOut:Date,adultCount:number,childCount:number)=>{
        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount)
    }

    const handleSubmit=(event: FormEvent)=>{
        event.preventDefault();
        SaveHotel(destination,checkIn,checkOut,adultCount,childCount)
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>

      </form>
    </div>
  )
}
