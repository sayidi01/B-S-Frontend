import PerfectScrollbar from "react-perfect-scrollbar";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { toggleSidebar } from "../../store/themeConfigSlice";
import AnimateHeight from "react-animate-height";
import { IRootState } from "../../store";
import { useState, useEffect } from "react";
import IconCaretsDown from "../Icon/IconCaretsDown";
import IconCaretDown from "../Icon/IconCaretDown";
import IconMenuDashboard from "../Icon/Menu/IconMenuDashboard";
import IconMinus from "../Icon/IconMinus";
import Logo from "../Icon/Logo-BS-Dash.png";
import IconMenuUsers from "../Icon/Menu/IconMenuUsers";

import iconsStudents from "../../../public/icons-students.png";
import iconsTeachers from "../../../public/icons-teacher.png";

import iconsAdmins from "../../../public/icons-admis.png";

const Sidebar = () => {
  const [currentMenu, setCurrentMenu] = useState<string>("");
  const [errorSubMenu, setErrorSubMenu] = useState(false);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = useSelector(
    (state: IRootState) => state.themeConfig.semidark
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add("active");
      const ul: any = selector.closest("ul.sub-menu");
      if (ul) {
        let ele: any =
          ul.closest("li.menu").querySelectorAll(".nav-link") || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className={semidark ? "dark" : ""}>
      <nav
        className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${
          semidark ? "text-white-dark" : ""
        }`}
      >
        <div className="bg-white dark:bg-black h-full">
          <div className="flex justify-between items-center px-4 py-3">
            <NavLink to="/" className="main-logo flex items-center shrink-0">
              <img className="w-10 ml-[5px] flex-none" src={Logo} alt="logo" />
              <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
                {t("Institut")}
              </span>
            </NavLink>

            <button
              type="button"
              className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconCaretsDown className="m-auto rotate-90" />
            </button>
          </div>
          <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
            <ul className="relative font-semibold space-y-0.5 p-4 py-0">
              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "dashboard" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("dashboard")}
                >
                  <div className="flex items-center">
                    <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("dashboard")}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu !== "dashboard"
                        ? "rtl:rotate-90 -rotate-90"
                        : ""
                    }
                  >
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "dashboard" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/">{t("sales")}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/analytics">{t("analytics")}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/finance">{t("finance")}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/crypto">{t("crypto")}</NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>

              <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                <IconMinus className="w-4 h-5 flex-none hidden" />
                <span>{t("Admins")}</span>
              </h2>

              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "Admins" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("Admins")}
                >
                  <div className="flex items-center">
                    <img
                      src={iconsAdmins}
                      alt="Admins Icon"
                      className="group-hover:!text-primary shrink-0 w-7 h-7"
                    />
                    <span  style={{ fontSize: 15 }} className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("Admins")}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu !== "Students"
                        ? "rtl:rotate-90 -rotate-90"
                        : ""
                    }
                  >
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "Admins" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/Dashbord/ListAdmin">{t("List")}</NavLink>
                    </li>
                    <li>
                      <NavLink to="/Dashbord/Admin">
                        {t("account_settings")}
                      </NavLink>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>

              <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                <IconMinus className="w-4 h-5 flex-none hidden" />
                <span>{t("teachers")}</span>
              </h2>

              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "Teachers" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("Teachers")}
                >
                  <div className="flex items-center">
                    <img
                      src={iconsTeachers}
                      alt="Teachers Icon"
                      className="group-hover:!text-primary shrink-0 w-7 h-7"
                    />
                    <span  style={{ fontSize: 15 }} className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                      {t("Teachers")}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu !== "Teachers"
                        ? "rtl:rotate-90 -rotate-90"
                        : ""
                    }
                  >
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "Teachers" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/Dashbord/ListTeacher">{t("List")}</NavLink>
                    </li>
                   
                  </ul>
                </AnimateHeight>
              </li>

              <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                <IconMinus className="w-4 h-5 flex-none hidden" />
                <span>{t("Students and pages")}</span>
              </h2>

              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "Students" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("Students")}
                >
                  <div className="flex items-center">
                    <img
                      src={iconsStudents}
                      alt="Students Icon"
                      className="group-hover:!text-primary shrink-0 w-7 h-7"
                    />
                    <span
                      style={{ fontSize: 15 }}
                      className="ltr:pl-3 rtl:pr-3 leading-none text-black dark:text-[#506690] dark:group-hover:text-white-dark"
                    >
                      {t("Students")}
                    </span>
                  </div>

                  <div
                    className={
                      currentMenu !== "Students"
                        ? "rtl:rotate-90 -rotate-90"
                        : ""
                    }
                  >
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "Students" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <NavLink to="/Dashbord/ListStudent">{t("List")}</NavLink>
                    </li>
                  
                  </ul>
                </AnimateHeight>
              </li>

              <li className="menu nav-item"></li>

              <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                <IconMinus className="w-4 h-5 flex-none hidden" />
                <span>{t("supports")}</span>
              </h2>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
