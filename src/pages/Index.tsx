import { useUserContext } from "../config/UserContext";

import iconsHello from "../../public/icons-hello.png";

import IconMenuUsers from "../components/Icon/Menu/IconMenuUsers";

import IconUser from "../components/Icon/IconUser";
import IconUserPlus from "../components/Icon/IconUserPlus";

import OverviewListStudents from "../components/Students/OverviewListStudents";

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
        {currentAdmin
          ? currentAdmin.fullName
              ?.split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")
          : "Admin non trouvé"}
        , bienvenue sur votre plateforme éducative.
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
        <Card style={{ width: 250, backgroundColor: "#e3f2fd" }}>
          <div style={{ fontSize: 20, fontFamily: "Roboto", color: "#1e88e5" }}>
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
      <div style={{ marginTop: "7rem", marginBottom: "5rem" }}>
        <RevenueChart />
      </div>
      <div>
        <OverviewListStudents />
      </div>
     
    </div>
  );
};

export default Index;
