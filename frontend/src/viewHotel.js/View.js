import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
export default function View() {
    const [hotel,setHotel]=useState([])
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchHotel=async()=>{
            try{
                const view=await axios.get('/api/hotel/view')
                setHotel(view.data)
            }
            catch(error){
                setError(error.message);
            }
        }
        fetchHotel()
    },[])
  return (
    <div>
      <p className='text-white'>{setHotel.name}</p>
    </div>
  )
}
