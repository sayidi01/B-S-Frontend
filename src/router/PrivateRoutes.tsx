import { useEffect } from "react";

import { useUserContext } from "../config/UserContext";

import { Spin } from "antd";

import axiosInstance from "../config/Api";
import { useNavigate, Outlet } from "react-router-dom";
import { AdminResponse } from "../components/Admins/ListAdmins";

export default function PrivateRoutes() {
  const { isConnected, setIsConnected, setCurrentAdmin } =
    useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    const isConnectedLocalStr = localStorage.getItem("isConnected");

    if (!isConnected && isConnectedLocalStr == "true")
      axiosInstance
        .get<AdminResponse>("/admin/current")
        .then(({ data }) => {
          setCurrentAdmin(data.admin);
          setIsConnected(true);
          localStorage.setItem("isConnected", "true");
        })
        .catch((err) => {
          navigate('/')
          console.log(err);
        });
  }, [isConnected]);

  if (!isConnected) return <Spin />;
  return <Outlet />;
}
