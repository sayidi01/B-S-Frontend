import { useEffect } from "react";

import { useUserContext } from "../config/UserContext";

import { Spin } from "antd";

import axiosInstance from "../config/Api";
import { useNavigate, Outlet } from "react-router-dom";
import { AdminResponse } from "../components/Admins/ListAdmins";

export default function PrivateRoutes() {
  const { setData, isConnected, setIsConnected, setCurrentAdmin } =
    useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected)
      axiosInstance
        .get<AdminResponse>("/admin/current")
        .then(({ data }) => {
          setCurrentAdmin(data.admin);
          setData(data.admin);
          setIsConnected(true);
        })
        .catch((err) => {
          navigate('/')
          console.log(err);
        });
  }, [isConnected]);

  if (!isConnected) return <Spin />;
  return <Outlet />;
}
