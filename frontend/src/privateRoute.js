import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const PrivateRoute=()=>{
    const {userInfo}=useSelector((state)=>state.auth1);
    return userInfo?
        (<Outlet/>):
        (<Navigate to='/' replace/>)


    
}
export default PrivateRoute;