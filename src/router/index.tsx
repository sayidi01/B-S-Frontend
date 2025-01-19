import { createBrowserRouter } from "react-router-dom";
import BlankLayout from "../components/Layouts/BlankLayout";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import { publicRoutes, routes } from "./routes";

const finalRoutes = publicRoutes.concat(
  routes.map((route) => {
    return {
      ...route,
      element:
        route.layout === "blank" ? (
          <BlankLayout>{route.element}</BlankLayout>
        ) : (
          <DefaultLayout>{route.element}</DefaultLayout>
        ),
    };
  })
);

const router = createBrowserRouter(finalRoutes);

export default router;
