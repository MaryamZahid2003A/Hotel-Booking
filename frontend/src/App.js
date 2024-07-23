import logo from './logo.svg';
import './App.css';
import Layout from './layout';
import Header from './Header';
import {Routes,Route} from 'react-router-dom'
import SignUp from './SignUp';
import Reserve from './Reserve';
import { ToastContainer } from 'react-toastify';
import SignIn from './SignIn';
import Booking from './Booking';
import Hotel from './Hotel';
import AddHotel from './Hotel/AddHotel';
import ManageHotel from './Hotel/ManageHotel';
import PrivateRoute from './privateRoute';

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
                <Route path="/Managehotel" element={<ManageHotel />} />
                <Route path="/booking" element={<Booking />} />

            </Route>


        
          </Routes>

        </div>
        <ToastContainer/>
    </div>
  );
}

export default App;
