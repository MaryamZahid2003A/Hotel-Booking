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
            <Route path="/booking" element={<Booking />} />
            <Route path="/hotel" element={<Hotel />} />

        
          </Routes>

        </div>
        <ToastContainer/>
    </div>
  );
}

export default App;
