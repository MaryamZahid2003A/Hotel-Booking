import React from "react";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./AddHotel.ts";

function Image(){
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();

  const existingurl=watch('imageurls')
  return (
  
    <div className="ml-10 mt-7 mr-10">
        <hr className='bg-gray-500'/>
        <h2 className="text-2xl font-bold mb-3">Images</h2>
        <div className="border rounded p-4 flex flex-cols gap-4">
        {existingurl && 
              <div className="grid grid-cols-6 gap-4">
                {existingurl.map((url)=>(
                    <div className="relative group">
                      <img src={url}  className="min-h-full object-cover" height='500' width='200'/>
                      {/* <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50  opacity-0 group-hover:opacity-900 text-white">Delete</button> */}
                      </div>
                ))}
                </div>
        }
        </div>
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
              console.log(`Here is the totala length ${totalLength}`)

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
              {errors.imageFiles && <p className='text-red-800 ml-5 font-bold'>{errors.imageFiles.message}</p>}
              </div>
    </div>
  );
};

export default Image;