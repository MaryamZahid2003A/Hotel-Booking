import React from "react";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./AddHotel.ts";

function Image(){
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();


  return (
  
    <div className="ml-10 mt-7 mr-10">
        <hr className='bg-gray-500'/>
        <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div>
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (value) => {
              const imageFiles = value as FileList;
              const totalLength = imageFiles.length

              if (totalLength === 0) {
                return "At least one image should be added";
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }

              return true;
            },
          })}
        />
              {errors.imageFiles && <p className='text-red-800 ml-5'>{errors.imageFiles.message}</p>}
              </div>
    </div>
  );
};

export default Image;