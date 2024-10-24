import { useUserContext } from "../config/UserContext";

import iconsHello from "../../public/icons-hello.png"

const Index = () => {
  const { currentAdmin, setCurrentAdmin } = useUserContext();

  return (
    <div>
     <h1
        style={{
          fontFamily: "Roboto",
          fontSize: "25px",
          marginTop: "2rem",
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
        {currentAdmin ? currentAdmin.fullName : "Admin non trouvé"},
        bienvenue sur votre plateforme éducative.
      </h1>
    </div>
  );
};

export default Index;
