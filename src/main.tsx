import React, { Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

// Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// Tailwind CSS
import "./tailwind.css";

// i18n (needs to be bundled)
import "./i18n";

// Router
import { RouterProvider } from "react-router-dom";
import router from "./router/index";

// Redux
import { Provider } from "react-redux";
import store from "./store/index";
import { Toaster } from "react-hot-toast";
import UserContext from "./config/UserContext";
import { MantineProvider } from "@mantine/core";
import { Admin } from "./components/Admins/ModalCreateAdmin";
import axiosInstance from "./config/Api";
import { AdminResponse } from "./components/Admins/ListAdmins";

const App = () => {
  const [data, setData] = useState({});
  const [isConnected, setIsConnected] = useState<boolean | null>(false);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    axiosInstance
      .get<AdminResponse>("/admin/current")
      .then(({ data }) => {
        setCurrentAdmin(data.admin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        data,
        setData,
        isConnected,
        setIsConnected,
        currentAdmin,
        setCurrentAdmin,
      }}
    >
      <RouterProvider router={router} />
      <Toaster />
    </UserContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense>
      <Provider store={store}>
        <MantineProvider>
          <App />
        </MantineProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
