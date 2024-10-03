import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setPageTitle, toggleRTL } from "../store/themeConfigSlice";
import Dropdown from "../components/Dropdown";
import { IRootState } from "../store";
import i18next from "i18next";
import IconCaretDown from "../components/Icon/IconCaretDown";
import IconMail from "../components/Icon/IconMail";
import IconLockDots from "../components/Icon/IconLockDots";


import object1 from "../../public/assets/auth/coming-soon-object1.png";
import object2 from "../../public/assets/auth/coming-soon-object2.png";
import object3 from "../../public/assets/auth/coming-soon-object3.png";
import object4 from "../../public/assets/auth/polygon-object.svg";
import Logo from "../../public/assets/auth/logo-white.svg";
import Loginsvg from "../../public/assets/auth/login.svg";
import Logo2 from "../../public/assets/images/logo.svg";
import bg from "../../public/assets/auth/bg-gradient.png";
import imagemap from "../../public/assets/auth/map.png";
import LogoSilver from "../../public/Silver Logo Sans BG.png";
import BG from "../../public/BG.webp";
import axiosInstance from "../config/Api";
import { useUserContext } from "../config/UserContext";

import { toast } from "react-hot-toast";


interface Signin {
  email: string;
  password: string;
}

const Signin = () => {
    
    const { data, setData, setIsConnected , isConnected} = useUserContext() 

    const navigate = useNavigate()


  const [signinAdmin, setSigninAdmin] = useState<Signin>({
    email: "",
    password: "",
  });

  console.log(signinAdmin)

  const handleChangeSignin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSigninAdmin((prevState) => ({ ...prevState, [name]: value }));
  };


  useEffect(() => {
    if (isConnected) {
      navigate("/Dashbord"); 
    }
  }, [isConnected]);


  const handleSigninAdmin = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosInstance
    .post("/auth/admin/signin", {...signinAdmin})
    .then((res) => {
        console.log(res.data);
        setData(data)
        setIsConnected(true)
        navigate('/Dashbord')
        toast.success("Vous êtes connecté");
    })
    .catch((err) => {
        console.log("erreur connexion", err)
        toast.error("Une erreur s'est produite lors de la connexion Admin")
    })
  }, [signinAdmin]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Login Cover"));
  });

  const isRtl =
    useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl"
      ? true
      : false;
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const setLocale = (flag: string) => {
    setFlag(flag);
    if (flag.toLowerCase() === "ae") {
      dispatch(toggleRTL("rtl"));
    } else {
      dispatch(toggleRTL("ltr"));
    }
  };
  const [flag, setFlag] = useState(themeConfig.locale);

  return (
    <div>
      <div className="absolute inset-0">
        <img src={bg} alt="image" className="h-full w-full object-cover" />
      </div>
      <div
        style={{ backgroundImage: `url(${imagemap})` }}
        className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16"
      >
        <img
          src={object1}
          alt={object1}
          className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2"
        />
        <img
          src={object2}
          alt={object2}
          className="absolute left-24 top-0 h-40 md:left-[30%]"
        />
        <img
          src={object3}
          alt={object3}
          className="absolute right-0 top-0 h-[300px]"
        />
        <img
          src={object4}
          alt={object4}
          className="absolute bottom-0 end-[28%]"
        />
        <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
          <div
            style={{ backgroundImage: `url(${BG})` }}
            className="relative hidden w-full items-center justify-center _0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]"
          >
            <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
            <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
              <Link to="/" className="w-48 block lg:w-72 ms-10">
                <img src={LogoSilver} alt={Logo} className="w-full" />
              </Link>
              <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                <img src={Loginsvg} alt="Cover Image" className="w-full" />
              </div>
            </div>
          </div>
          <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
            <div className="flex w-full max-w-[440px] items-center gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
              <Link to="/" className="w-8 block lg:hidden">
                <img src={Logo2} alt="Logo" className="mx-auto w-10" />
              </Link>
              <div className="dropdown ms-auto w-max">
                <Dropdown
                  offset={[0, 8]}
                  placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                  btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                  button={
                    <>
                      <div>
                        <img
                          src={`/assets/images/flags/${flag.toUpperCase()}.svg`}
                          alt="image"
                          className="h-5 w-5 rounded-full object-cover"
                        />
                      </div>
                      <div className="text-base font-bold uppercase">
                        {flag}
                      </div>
                      <span className="shrink-0">
                        <IconCaretDown />
                      </span>
                    </>
                  }
                >
                  <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                    {themeConfig.languageList.map((item: any) => {
                      return (
                        <li key={item.code}>
                          <button
                            type="button"
                            className={`flex w-full hover:text-primary rounded-lg ${
                              flag === item.code
                                ? "bg-primary/10 text-primary"
                                : ""
                            }`}
                            onClick={() => {
                              i18next.changeLanguage(item.code);
                              // setFlag(item.code);
                              setLocale(item.code);
                            }}
                          >
                            <img
                              src={`/assets/images/flags/${item.code.toUpperCase()}.svg`}
                              alt="flag"
                              className="w-5 h-5 object-cover rounded-full"
                            />
                            <span className="ltr:ml-3 rtl:mr-3">
                              {item.name}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </Dropdown>
              </div>
            </div>
            <div className="w-full max-w-[440px] lg:mt-16">
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">
                  Sign in
                </h1>
                <p className="text-base font-bold leading-normal text-white-dark">
                  Enter your email and password to login
                </p>
              </div>
              <form className="space-y-5 dark:text-white"  onSubmit={handleSigninAdmin}>
                <div>
                  <label htmlFor="Email">Email</label>
                  <div className="relative text-white-dark">
                    <input
                    onChange={handleChangeSignin}
                      id="Email"
                      type="email"
                      name="email"
                      value={signinAdmin.email}
                      placeholder="Enter Email"
                      className="form-input ps-10 placeholder:text-white-dark"
                    />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconMail fill={true} />
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="Password">Password</label>
                  <div className="relative text-white-dark">
                    <input
                       onChange={handleChangeSignin}
                      id="Password"
                      name="password"
                      type="password"
                      value={signinAdmin.password}
                      placeholder="Enter Password"
                      className="form-input ps-10 placeholder:text-white-dark"
                    />
                    <span className="absolute start-4 top-1/2 -translate-y-1/2">
                      <IconLockDots fill={true} />
                    </span>
                  </div>
                </div>
                <div>
                  <label className="flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox bg-white dark:bg-black"
                    />
                    <span className="text-white-dark">
                      Subscribe to weekly newsletter
                    </span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                >
                  Sign in
                </button>
              </form>
            </div>
            <p className="absolute bottom-6 w-full text-center dark:text-white">
              © {new Date().getFullYear()}B&S Institute All Rights Reserved.
              Design & Develop by{" "}
              <a href="https://touchtarget.net/">Touch Target</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
