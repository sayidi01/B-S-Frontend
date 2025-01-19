import React, { Suspense, useState } from "react";
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

import { ICourse } from "./types/course";
import APIClient from "./api";
import CourseAPIClient from "./api/CourseAPIClient";

const apiClient = new APIClient();
const courseApiClient = new CourseAPIClient();

const App = () => {
  const [data, setData] = useState({});
  const [isConnected, setIsConnected] = useState<boolean | null>(false);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [courses, setCourses] = useState<ICourse[]>([]);

  return (
    <UserContext.Provider
      value={{
        data,
        setData,
        isConnected,
        setIsConnected,
        currentAdmin,
        setCurrentAdmin,
        courses,
        setCourses,
        apiClient,
        courseApiClient,
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
