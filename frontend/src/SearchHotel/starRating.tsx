import React from 'react'

type starRate={
    selectedStar:string[];
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void

}

const StarRating=({selectedStar,onChange}:starRate)=> {
  return (
    <div className="border-2 border-gray-600 rounded-sm">
        <h1 className='text-center mt-5'>Property Rating</h1>
        {['5','4','3','2','1'].map((star)=>(
            <label className="flex flex-row ml-10 pl-10 mt-2 cursor-pointer">
                <input
                type='checkbox'
                value={star}
                className='flex flex-col text-center ml-10 font-thin'
                checked={selectedStar.includes(star)}
                onChange={onChange}
                />
                  <span className="text-color">{star} Stars</span>
             </label>
        ))}
            <hr className="bg-slate-900 ml-10 p-10" />

      
    </div>
  )
}

export default StarRating;
