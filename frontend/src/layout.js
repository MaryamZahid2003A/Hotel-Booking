import React from 'react';
import './inner.css';
import Header from './Header';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from './store/slice/UserSlice';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from './store/slice/UserApiSlice';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Layout() {
  const dispatch=useDispatch();
  const [logutApi]=useLogoutMutation();
  const navigate=useNavigate();
  const {userInfo}=useSelector((state)=>state.auth1)

  const logoutHandle=async()=>{
    try{
        await logutApi().unwrap();
        dispatch(logout())
        toast.success('Logout Successfully ! ')
    }
    catch(error){
      console.log(error?.data?.message || error.message)
    }
  }
  return (
    <div className='layout-header'>
      <div className='flex justify-between items-center w-full'>
      <Link to='/'>
        <div className='ml-10 flex flex-row'>
          <img src="https://cdn-icons-png.flaticon.com/128/13133/13133986.png" width='70' height='30' className='mt-3'/>
          <h1 className='text-white text-3xl ml-10 font-sans   mt-6 hidden sm:block md:inline-block '>
            <span className='font-bold text-4xl '>Hotel's Booking</span> 
          </h1> 
        </div>
        </Link>
        {!userInfo?
        (  <Link to='/signup'>
          <button className='w-28 h-14 mt-6 bg-yellow-400 font-bold text-black mr-14 rounded-sm hover:bg-yellow-600 hover:text-black transition ease-in-out delay-200 '>
            Sign Up
          </button>
      </Link>):
        (
        <div className='flex flex-row '>
              <div className='flex flex-col sm:flex-row '>
                  <Link to={`/MyBooking/${userInfo._id}`}>
                  <button className='w-28 h-10 mt-6 bg-yellow-400 font-bold text-black mr-14 rounded-sm hover:bg-yellow-600 hover:text-black transition ease-in-out delay-200 '>
                    My Booking
                  </button>
                  </Link>
                  <Link to='/ManageHotel'>
                      <button className='w-24 h-10 mt-6 bg-yellow-400 font-bold text-black mr-14 rounded-sm hover:bg-yellow-600 hover:text-black transition ease-in-out delay-200 '>
                        Add Hotel
                      </button>
                  </Link>
                  <Link to={`/view/${userInfo._id}`}>
                      <button className='w-24 h-10 mt-6 bg-yellow-400 font-bold text-black mr-14 rounded-sm hover:bg-yellow-600 hover:text-black transition ease-in-out delay-200 '>
                        My Hotels
                      </button>
                  </Link>
              </div>
              <div>
                <h1 className='text-2xl text-white mr-14 mt-1'>{userInfo.name}</h1>
                  <button className='w-20 h-10 mt-3 mb-3 bg-yellow-400 font-bold text-black mr-14 rounded-sm hover:bg-yellow-600 hover:text-black transition ease-in-out delay-200 ' onClick={logoutHandle}> Logout</button>
              </div>
          </div>
        )
      }
        
      </div>
      <ToastContainer/>
    </div>
  );
}
