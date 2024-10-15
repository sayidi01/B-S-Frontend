import React, { useContext, useEffect } from 'react'

import UserContext, { useUserContext } from "../config/UserContext"

import { Spin } from "antd";

import axiosInstance from '../config/Api';
import { useNavigate , Outlet} from 'react-router-dom';



type AdminData = {
    name: string;
    email: string;
  };

export default function PrivateRoutes() {

    const { setData ,isConnected, setIsConnected, setCurrentAdmin } = useUserContext();

    const navigate = useNavigate()

    useEffect(() => {
     
        if (!isConnected && setIsConnected && setData) {
          axiosInstance
            .post<{ data: AdminData }>("/auth/admin/signin/token") 
            .then((response) => {
              const data = response.data;
              console.log(data);
              setIsConnected(true);
              setData(data);
            })
            .catch((error) => {
              console.error("Admin not connected", error);
              navigate("/");
            });
        }
      }, [isConnected, navigate, setData, setIsConnected]);

    if(!isConnected) return <Spin/>
    return <Outlet/>
 
}


