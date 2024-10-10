import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { setPageTitle } from "../../store/themeConfigSlice";
import { useDispatch } from "react-redux";
import IconHome from "../../components/Icon/IconHome";
import IconPhone from "../../components/Icon/IconPhone";
import axiosInstance from "../../config/Api";
import { AdminResponse } from "./ListAdmins";
import { Admin } from "./ModalCreateAdmin";
import { toast } from "react-hot-toast";
import { useUserContext } from "../../config/UserContext";



const AccountAdmins = () => {
    const {  currentAdmin, setCurrentAdmin} = useUserContext();

  const [formDataAdmin, setFormDataAdmin] = useState({
    fullName: '',
    email: '',
    phone: ''
  })

  console.log(formDataAdmin)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Account Admins"));
  });
  const [tabs, setTabs] = useState<string>("home");
  const toggleTabs = (name: string) => {
    setTabs(name);
  };

  // GET CURRENT ADMIN

  useEffect(() => {
    axiosInstance
      .get<AdminResponse>("/admin/current")
      .then((response) => {
        console.log(response.data);
        setCurrentAdmin(response.data.admin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  // EDIT CURRENT ADMIN 

  const handleEditCurrentAdmin = useCallback(() => {
    if (!currentAdmin) return;

    axiosInstance
      .put(`/admin/${currentAdmin._id}`, { ...formDataAdmin })
      .then(({ data }) => {
        console.log(data);
        toast.success("Admin updated successfully");
        setCurrentAdmin({ ...currentAdmin, ...formDataAdmin });
      })
      .catch((err) => {
        toast.error("Error in updating Admin: " + err.message);
      });
  }, [currentAdmin, formDataAdmin]);


// INITIALISE
  useEffect(() => {
    if (currentAdmin) {
      setFormDataAdmin({
        fullName: currentAdmin.fullName || '',
        email: currentAdmin.email || '',
        phone: currentAdmin.phone || ''
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

            <li className="inline-block">
              <button
                onClick={() => toggleTabs("danger-zone")}
                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${
                  tabs === "danger-zone" ? "!border-primary text-primary" : ""
                }`}
              >
                <IconPhone />
                Danger Zone
              </button>
            </li>
          </ul>
        </div>
        {tabs === "home" ? (
          <div>
            <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
              <h6 className="text-lg font-bold mb-5">General Information</h6>
              <div className="flex flex-col sm:flex-row">
                <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                  <img
                    src="/assets//images/profile-34.jpeg"
                    alt="img"
                    className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto"
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
                    <button onClick={handleEditCurrentAdmin} type="button" className="btn btn-primary">
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

        {tabs === "danger-zone" ? (
          <div className="switch">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="panel space-y-5">
                <h5 className="font-semibold text-lg mb-4">Purge Cache</h5>
                <p>
                  Remove the active resource from the cache without waiting for
                  the predetermined cache expiry time.
                </p>
                <button className="btn btn-secondary">Clear</button>
              </div>
              <div className="panel space-y-5">
                <h5 className="font-semibold text-lg mb-4">
                  Deactivate Account
                </h5>
                <p>
                  You will not be able to receive messages, notifications for up
                  to 24 hours.
                </p>
                <label className="w-12 h-6 relative">
                  <input
                    type="checkbox"
                    className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                    id="custom_switch_checkbox7"
                  />
                  <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                </label>
              </div>
              <div className="panel space-y-5">
                <h5 className="font-semibold text-lg mb-4">Delete Account</h5>
                <p>
                  Once you delete the account, there is no going back. Please be
                  certain.
                </p>
                <button className="btn btn-danger btn-delete-account">
                  Delete my account
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    
    </div>
  );
  
};

export default AccountAdmins;
