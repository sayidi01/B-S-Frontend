import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IRootState } from "../../store";
import {
  toggleRTL,
  toggleTheme,
  toggleSidebar,
} from "../../store/themeConfigSlice";
import i18next from "i18next";
import Dropdown from "../Dropdown";
import IconMenu from "../Icon/IconMenu";

import IconSearch from "../Icon/IconSearch";
import IconXCircle from "../Icon/IconXCircle";
import IconSun from "../Icon/IconSun";
import IconMoon from "../Icon/IconMoon";
import IconLaptop from "../Icon/IconLaptop";

import IconUser from "../Icon/IconUser";

import IconLogout from "../Icon/IconLogout";

import { useUserContext } from "../../config/UserContext";
import axiosInstance, { imageURL } from "../../config/Api";
import { toast } from "react-hot-toast";

import logoHeader from "../Icon/Logo-BS-Dash.png"
import { useTranslation } from "react-i18next";



const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { setIsConnected, currentAdmin, setCurrentAdmin, isConnected } =
    useUserContext();

  useEffect(() => {
    console.log("Current Admin:", currentAdmin);
  }, [currentAdmin]);

  const location = useLocation();
  useEffect(() => {
    const selector = document.querySelector(
      'ul.horizontal-menu a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add("active");
      const all: any = document.querySelectorAll(
        "ul.horizontal-menu .nav-link.active"
      );
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove("active");
      }
      const ul: any = selector.closest("ul.sub-menu");
      if (ul) {
        let ele: any = ul.closest("li.menu").querySelectorAll(".nav-link");
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add("active");
          });
        }
      }
    }
  }, [location]);

  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
      ? true
      : false;

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const dispatch = useDispatch();

  const [search, setSearch] = useState(false);

  const setLocale = (flag: string) => {
    setFlag(flag);
    if (flag.toLowerCase() === "ae") {
      dispatch(toggleRTL("rtl"));
    } else {
      dispatch(toggleRTL("ltr"));
    }
  };
  const [flag, setFlag] = useState(themeConfig.locale);

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected, navigate]);

  // LOGOUT ADMIN

  const LogoutAdmin = useCallback(() => {
    axiosInstance
      .post("auth/admin/logout", { withCredentials: true })
      .then((data) => {
        console.log(data);
        setIsConnected(false);
        setCurrentAdmin(null);
        localStorage.setItem("isConnected", "false");
        toast.success("You are offline");
        navigate("/");
      })
      .catch((err) => {
        console.error("Erreur lors de la déconnexion:", err);
      });
  }, [navigate]);

  return (
    <header
      className={`z-40 ${
        themeConfig.semidark && themeConfig.menu === "horizontal" ? "dark" : ""
      }`}
    >
      <div className="shadow-sm">
        <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
          <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
            <img
              className="w-10 ltr:-ml-1 rtl:-mr-1 inline"
              src={logoHeader}
              alt="logo"
            />
             <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
                {t("Institute")}
              </span>

            <button
              type="button"
              className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
              onClick={() => {
                dispatch(toggleSidebar());
              }}
            >
              <IconMenu className="w-5 h-5" />
            </button>
          </div>

          <div className="ltr:mr-2 rtl:ml-2 hidden sm:block">
            <ul className="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]"></ul>
          </div>
          <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
            <div className="sm:ltr:mr-auto sm:rtl:ml-auto">
              <form
                className={`${
                  search && "!block"
                } sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden`}
                onSubmit={() => setSearch(false)}
              >
                <div className="relative">
                  <div style={{ display: "flex", gap: 10 }}>
                    {/* <Link to={'/Dashbord/calendar'}>
                    <IconCalendar />
                    </Link> */}

                    {/* <Link to={'/Dashbord/chat'}>
                    <IconChatNotification />
                    </Link> */}
                  </div>
                  <button
                    type="button"
                    className="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2"
                    onClick={() => setSearch(false)}
                  >
                    <IconXCircle />
                  </button>
                </div>
              </form>
              <button
                type="button"
                onClick={() => setSearch(!search)}
                className="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
              >
                <IconSearch className="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
              </button>
             
            </div>
            {/* <IconBellBing/> */}
            <div>
              {themeConfig.theme === "light" ? (
                <button
                  className={`${
                    themeConfig.theme === "light" &&
                    "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  }`}
                  onClick={() => {
                    dispatch(toggleTheme("dark"));
                  }}
                >
                  <IconSun />
                </button>
              ) : (
                ""
              )}
              {themeConfig.theme === "dark" && (
                <button
                  className={`${
                    themeConfig.theme === "dark" &&
                    "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  }`}
                  onClick={() => {
                    dispatch(toggleTheme("system"));
                  }}
                >
                  <IconMoon />
                </button>
              )}
              {themeConfig.theme === "system" && (
                <button
                  className={`${
                    themeConfig.theme === "system" &&
                    "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  }`}
                  onClick={() => {
                    dispatch(toggleTheme("light"));
                  }}
                >
                  <IconLaptop />
                </button>
              )}
            </div>
            {/* <div className="dropdown shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                button={
                  <img
                    className="w-5 h-5 object-cover rounded-full"
                    src={`/assets/images/flags/${flag.toUpperCase()}.svg`}
                    alt="flag"
                  />
                }
              >
                <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                  {themeConfig.languageList.map((item: any) => {
                    return (
                      <li key={item.code}>
                        <button
                          type="button"
                          className={`flex w-full hover:text-primary rounded-lg ${
                            i18next.language === item.code
                              ? "bg-primary/10 text-primary"
                              : ""
                          }`}
                          onClick={() => {
                            i18next.changeLanguage(item.code);

                            setLocale(item.code);
                          }}
                        >
                          <img
                            src={`/assets/images/flags/${item.code.toUpperCase()}.svg`}
                            alt="flag"
                            className="w-5 h-5 object-cover rounded-full"
                          />
                          <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </Dropdown>
            </div> */}
            <div className="dropdown shrink-0"></div>
            <div className="dropdown shrink-0"></div>
            <div className="dropdown shrink-0 flex">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                btnClassName="relative group block"
                button={
                  currentAdmin && currentAdmin.image ? (
                    <img
                      className="w-9 h-9 rounded-full saturate-50"
                      src={`${imageURL}profile-images/${currentAdmin.image}`}
                      alt="userProfile"
                    />
                  ) : (
                    <span className="w-9 h-9 rounded-full bg-slate-400 text-white flex justify-center items-center text-xl">
                      {currentAdmin?.fullName.charAt(0).toUpperCase()}
                    </span>
                  )
                }
              >
                <ul className="text-dark dark:text-white-dark !py-0 min-w-[230px] max-w-[400px] font-semibold dark:text-white-light/90">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      <span className="flex justify-center items-center w-12 h-12 text-center rounded-full bg-slate-400 text-xl text-white mr-3">
                        {currentAdmin && currentAdmin.image ? (
                          <img
                            src={`${imageURL}profile-images/${currentAdmin.image}`}
                            alt="Admin Profile"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : currentAdmin ? (
                          <span className="text-xl text-white">
                            {currentAdmin.fullName.charAt(0).toUpperCase()}
                          </span>
                        ) : null}
                      </span>
                      <div className="ltr:pl-4 rtl:pr-4 truncate">
                        <h4 className="text-base">
                          {currentAdmin?.fullName
                            ?.split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase()
                            )
                            .join(" ")}
                          <span className="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2">
                            Admin
                          </span>
                        </h4>
                        <button
                          type="button"
                          className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                        >
                          {currentAdmin?.email
                            ?.split("@")
                            .map((part, index) =>
                              index === 0
                                ? part.charAt(0).toUpperCase() +
                                  part.slice(1).toLowerCase()
                                : part
                            )
                            .join("@")}
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link
                      to="/Dashbord/Admin"
                      className="dark:hover:text-white"
                    >
                      <IconUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                      Profile
                    </Link>
                  </li>

                  <li className="border-t border-white-light dark:border-white-light/10">
                    <button
                      onClick={LogoutAdmin}
                      className="text-danger !py-3 flex items-center"
                    >
                      <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
