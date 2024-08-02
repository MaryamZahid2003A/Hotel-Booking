import React from 'react';

type StarRate = {
  selectMaxPrice: number;
  onChange: (value ?: number) => void;
}

const MaxPrice = ({ selectMaxPrice, onChange }: StarRate) => {
  return (
    <div className="border-2 border-gray-600 rounded-sm p-5">
      <h1 className="text-center mt-5">Maximum Price</h1>
      <select 
        className="ml-10 pl-2 mt-2 cursor-pointer w-full"
        value={selectMaxPrice}
        onChange={(event) => onChange(parseInt(event.target.value)) }
      >
        {['100', '70', '50', '30', '15'].map((price) => (
          <option
            key={price}
            className="font-thin"
            value={price}
          >
            $ {price}
          </option>
        ))}
      </select>
      <hr className="bg-slate-900 ml-10 my-5" />
    </div>
  );
};

export default MaxPrice;
