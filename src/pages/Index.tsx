import { useUserContext } from "../config/UserContext";

import iconsHello from "../../public/icons-hello.png";

import IconMenuUsers from "../components/Icon/Menu/IconMenuUsers";


import IconUser from "../components/Icon/IconUser";
import IconUserPlus from '../components/Icon/IconUserPlus';

import { Card } from "antd";
import { Student } from "../components/Students/typesStudent";

import RevenueChart from "./Chart";

const Index = () => {
  const { currentAdmin } = useUserContext();

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
        <Card style={{ width: 250, backgroundColor: "#e3f2fd" }}>
          <div style={{ fontSize: 20, fontFamily: "Roboto", color: "#1e88e5" }}>
          <IconMenuUsers/>
            Total Admins : 4
          </div>
        </Card>
        <Card style={{ width: 250, backgroundColor: "#e8f5e9" }}>
          <div style={{ fontSize: 20, fontFamily: "Roboto", color: "#43a047" }}>
          <IconUser/>
            Total Teachers : 6
          </div>
        </Card>
        <Card style={{ width: 250, backgroundColor: "#fffde7" }}>
          <div style={{ fontSize: 20, fontFamily: "Roboto", color: "#fbc02d" }}>
          <IconUserPlus/>
            Total Students : 5
          </div>
        </Card>
      </div>
      <div style={{marginTop: '7rem'}}>
      <RevenueChart/>
      </div>
    </div>
  );
};

export default Index;
