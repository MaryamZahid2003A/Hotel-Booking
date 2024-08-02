import React from 'react';
import { hotelFacilities } from '../config/typeConfig.tsx';


type starRate={
  selectedFacility:string[];
  onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void

}


const Facility = ({selectedFacility,onChange}:starRate) => {
  return (
    <div className="border-2 border-gray-600 rounded-sm p-5">
      <h1 className="text-center mt-5">Facilities</h1>
      {hotelFacilities.map((facility) => (
        <label key={facility} className="flex items-center ml-10 my-2 mt-2">
          <input
            type="checkbox"
            value={facility}
            className="mr-2"
            checked={selectedFacility.includes(facility)}
            onChange={onChange}
          />
          <span className="text-color">{facility}</span>
        </label>
      ))}
      <hr className="bg-slate-900 ml-10 my-5" />
    </div>
  );
};

export default Facility;
