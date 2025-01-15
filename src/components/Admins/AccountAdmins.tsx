import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { setPageTitle } from "../../store/themeConfigSlice";
import { useDispatch } from "react-redux";
import IconHome from "../../components/Icon/IconHome";
import IconPhone from "../../components/Icon/IconPhone";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import axiosInstance from "../../config/Api";
import { toast } from "react-hot-toast";
import { useUserContext } from "../../config/UserContext";

import ProfileImg from "./ProfileImg";
import { IFormDataAdmin } from "./types";
import { isObject } from "lodash";
import { Admin } from "./ModalCreateAdmin";
import { Input } from "antd";

const AccountAdmins = () => {
  const { currentAdmin, setCurrentAdmin } = useUserContext();
  const [isProfileImgEditing, setIsProfileImgEditing] = useState(false);

 

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [formDataAdmin, setFormDataAdmin] = useState<IFormDataAdmin>({
    fullName: "",
    email: "",
    phone: "",
    img: null,
    password: "",
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Account Admins"));
  });
  const [tabs, setTabs] = useState<string>("home");
  const toggleTabs = (name: string) => {
    setTabs(name);
  };

  // EDIT CURRENT ADMIN

  const handleEditCurrentAdmin = useCallback(() => {
    if (!currentAdmin) return;

    const formData = new FormData();

    if (formDataAdmin.img) {
      const uploadedBlob = formDataAdmin.img.originFileObj as Blob;
      formData.append("image", uploadedBlob);
    }

    Object.keys(formDataAdmin)
      .filter((key) => key != "img")
      .forEach((key) => {
        const value = formDataAdmin[key];
        console.log(key);
        if (value && key !== "img") {
          formData.append(key, value as any);
        }
      });

    axiosInstance
      .put(`/admin/${currentAdmin._id}`, formDataAdmin, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        console.log("data", data);
        toast.success("Admin updated successfully");
        if (isObject(data) && "admin" in data) {
          const adminData = data.admin;
          if (isObject(adminData))
            setCurrentAdmin((prev) => ({ ...prev, ...(adminData as Admin) }));

          setIsProfileImgEditing(false);
        }
      })
      .catch((err) => {
        toast.error("Error in updating Admin: " + err.message);
      });
  }, [currentAdmin, formDataAdmin]);

  // INITIALISE
  useEffect(() => {
    if (currentAdmin) {
      setFormDataAdmin({
        fullName: currentAdmin.fullName || "",
        email: currentAdmin.email || "",
        phone: currentAdmin.phone || "",
        password: currentAdmin.password || "",
        img: null,
      });
    }
  }, [currentAdmin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormDataAdmin((prev) => ({
      ...prev,
      [id]: value,
    }));
    console.log(`Input changed: ${id} = ${value}`);
  };

  if (!currentAdmin) return null;

  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="#" className="text-primary hover:underline">
            Admins
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Account Admins</span>
        </li>
      </ul>
      <div className="pt-5">
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">
            Settings
          </h5>
        </div>
        <div>
          <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
            <li className="inline-block">
              <button
                onClick={() => toggleTabs("home")}
                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${
                  tabs === "home" ? "!border-primary text-primary" : ""
                }`}
              >
                <IconHome />
                Home
              </button>
            </li>

            
          </ul>
        </div>
        {tabs === "home" ? (
          <div>
            <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
              <h6 className="text-lg font-bold mb-5">General Information</h6>
              <div className="flex flex-col sm:flex-row">
                <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-3/12 mb-5 flex justify-center items-center">
                  <ProfileImg
                    setFormDataAdmin={setFormDataAdmin}
                    isProfileImgEditing={isProfileImgEditing}
                    setIsProfileImgEditing={setIsProfileImgEditing}
                  />
                </div>
                {currentAdmin && (
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        id="fullName"
                        type="text"
                        value={formDataAdmin.fullName}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="text"
                        value={formDataAdmin.email}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="password">Password</label>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Input
                          id="password"
                          type={isPasswordVisible ? "text" : "password"}
                          value={formDataAdmin.password}
                          onChange={handleInputChange}
                          className="form-input"
                          suffix={
                            isPasswordVisible ? (
                              <EyeInvisibleOutlined
                                onClick={togglePasswordVisibility}
                                style={{ cursor: "pointer" }}
                              />
                            ) : (
                              <EyeOutlined
                                onClick={togglePasswordVisibility}
                                style={{ cursor: "pointer" }}
                              />
                            )
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone">Phone</label>
                      <input
                        id="phone"
                        type="text"
                        value={formDataAdmin.phone}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>

                    <div className="sm:col-span-2 mt-3">
                      <button
                        onClick={handleEditCurrentAdmin}
                        type="button"
                        className="btn btn-primary"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        ) : (
          ""
        )}

      
      </div>
    </div>
  );
};

export default AccountAdmins;
