import { useUserContext } from "../config/UserContext";

import iconsHello from "../../public/icons-hello.png";

import IconMenuUsers from "../components/Icon/Menu/IconMenuUsers";

import IconUser from "../components/Icon/IconUser";
import IconUserPlus from "../components/Icon/IconUserPlus";

import { Card } from "antd";


import RevenueChart from "./Chart";
import { useEffect, useState } from "react";

import axiosInstance from "../config/Api";

const Index = () => {
  const { currentAdmin, isConnected } = useUserContext();

  const [totaleAdmins, setTotalAdmins] = useState<number | null>(null);

  const [totaleTeachers, setTotalTeachers] = useState<number | null>(null);

  const [totaleStudents, setTotalStudents] = useState<number | null>(null);

  // TOTAL ADMINS NUMBER

  useEffect(() => {
    const isConnectedLocalStr = localStorage.getItem("isConnected");
    if (isConnected && isConnectedLocalStr == "true") {
      console.log("Hello", currentAdmin, isConnected);
      axiosInstance
        .get<{ total: number }>("/admin/total")
        .then(({ data }) => {
          console.log(data);
          setTotalAdmins(data.total);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des administrateurs",
            error
          );
        });
    }
  }, []);

  // TOTAL TEACHERS NUMBER

  useEffect(() => {
    const isConnectedLocalStr = localStorage.getItem("isConnected");
    if (isConnected && isConnectedLocalStr == "true") {
      axiosInstance
        .get<{ total: number }>("/teacher/total")
        .then(({ data }) => {
          console.log(data);
          setTotalTeachers(data.total);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des Professeurs",
            error
          );
        });
    }
  }, []);

  // TOTAL STUDNETS NUMBER

  useEffect(() => {
    const isConnectedLocalStr = localStorage.getItem("isConnected");
    if (isConnected && isConnectedLocalStr == "true") {
      axiosInstance
        .get<{ total: number }>("/student/total")
        .then(({ data }) => {
          console.log(data);
          setTotalStudents(data.total);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des ètudiants", error);
        });
    }
  }, []);

  return (
    <div>
      <h1
        style={{
          fontFamily: "Roboto",
          fontSize: "25px",
          marginTop: "2px",
          paddingLeft: "3rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        Bonjour{" "}
        <img
          src={iconsHello}
          alt="Icône Bonjour"
          style={{
            width: "30px",
            height: "30px",
            margin: "0 0.5rem",
          }}
        />{" "}
        {currentAdmin ? currentAdmin.fullName : "Admin non trouvé"}, bienvenue
        sur votre plateforme éducative.
      </h1>
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
          marginTop: "3rem",
        }}
      >
        <Card style={{ width: 250, backgroundColor: "#e8f5e9" }}>
          <div style={{ fontSize: 20, fontFamily: "Roboto", color: "#43a047" }}>
            <IconMenuUsers />
            Total Admins : {totaleAdmins}
          </div>
        </Card>
        <Card style={{ width: 250,backgroundColor: "#e3f2fd" }}>
          <div style={{ fontSize: 20, fontFamily: "Roboto",color: "#1e88e5" }}>
            <IconUser />
            Total Teachers : {totaleTeachers}
          </div>
        </Card>
        <Card style={{ width: 250, backgroundColor: "#fffde7" }}>
          <div style={{ fontSize: 20, fontFamily: "Roboto", color: "#fbc02d" }}>
            <IconUserPlus />
            Total Students : {totaleStudents}
          </div>
        </Card>
      </div>
      <div style={{ marginTop: "7rem", marginBottom: '5rem' }}>
        <RevenueChart />
      </div>

      <div className="panel h-full">
                        <div className="flex items-center justify-between dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg">Summary</h5>
                           
                        </div>
                        <div className="space-y-9">
                           
                            
                            <div className="flex items-center">
                                <div className="w-9 h-9 ltr:mr-3 rtl:ml-3">
                                    <div className="bg-warning-light dark:bg-warning text-warning dark:text-warning-light rounded-full w-9 h-9 grid place-content-center">
                                        <IconUserPlus/>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex font-semibold text-white-dark mb-2">
                                        <h6>Progress Students</h6>
                                    </div>
                                    <div className="w-full rounded-full h-2 bg-dark-light dark:bg-[#1b2e4b] shadow">
                                        <div className="bg-gradient-to-r from-[#f09819] to-[#ff5858] w-full h-full rounded-full" style={{ width: '80%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    </div>
  );
};

export default Index;
