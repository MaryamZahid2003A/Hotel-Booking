import React from 'react'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './hotel.css';
import {TypeConfig,hotelFacilities} from '../config/typeConfig.tsx';
import { useFormContext } from 'react-hook-form';


export default function TypeForm() {
    const {register, watch, formState: { errors } } = useFormContext();
    const typeWatch = watch('type');
  return (
    <div>
          <div>
          <h2 className="text-2xl font-bold mb-3 mt-10 ml-10">Type</h2>
          <div className="TypeGrid">
            {TypeConfig.map((type) => (
              <label
                key={type}
                className={
                  typeWatch === type ? "typeHoverLabel" : "typeLabel"
                }
              >
                <input
                  type="radio"
                  value={type}
                  {...register("type", {
                    required: "This field is required",
                  })}
                  className="hidden"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
          {errors.type && <p className='text-red-800 ml-8'>This Field is required</p>}
        </div>
      
    </div>
  )
}
