import logo from './logo.svg';
import './App.css';
import React from 'react';
import Layout from './layout';
import Header from './Header';
import {Routes,Route} from 'react-router-dom'
import SignUp from './SignUp';
import Reserve from './Reserve';
import { ToastContainer } from 'react-toastify';
import SignIn from './SignIn';
import Booking from './Booking';
import { Manage } from './Hotel/Manage.tsx';
import PrivateRoute from './privateRoute';
import ViewHotel from './viewHotel/View.tsx';
import ReadMore from './viewHotel/ReadMore.tsx';
function App() {
  return (
    <div className='main'>
        <div className='section'>
          <Layout/>
          <Routes>
            <Route path='/' element={<Header/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/reserve' element={<Reserve/>}/>
            <Route path="/login" element={<SignIn />} />
            <Route path='/' element={<PrivateRoute/>}>
                <Route path="/Managehotel" element={<Manage />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/view/:id" element={<ViewHotel />} />
                <Route path="/view/:hotelId" element={<ReadMore />} />


            </Route>
          </Routes>

        </div>
        <ToastContainer/>
    </div>
  );
}

export default App;
