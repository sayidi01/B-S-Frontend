import React, { useCallback, useState } from "react";
import { Input, Modal } from "antd";
import axiosInstance from "../../config/Api";
import { toast } from "react-hot-toast";
import { useUserContext } from "../../config/UserContext";
import isObject from "lodash/isObject";

interface ModalCreateAdminProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  setListAdmins: React.Dispatch<React.SetStateAction<Admin[]>>;
  setVisiblePasswords: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export interface FormData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface Admin {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  image?: string; 
  title: string
  course: []
  url: string
  imageCourse?: string
}

const ModalCreateAdmin: React.FC<ModalCreateAdminProps> = ({
  isModalOpen,
  handleCancel,
  setListAdmins,
  setVisiblePasswords,
}) => {
  const { data } = useUserContext();

  const [formdata, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  console.log(formdata);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    if (name === "fullName") {
      const capitalizedFullName = value.charAt(0).toUpperCase() + value.slice(1);
      setFormData((prevState) => ({ ...prevState, [name]: capitalizedFullName }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handlesubmit = useCallback(() => {
    if (!data || !isObject(data)) {
      toast.error("Admin data is not available or not valid");
      return;
    }
    if (
      !formdata.fullName ||
      !formdata.email ||
      !formdata.password ||
      !formdata.phone
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    axiosInstance
      .post("/admin", { ...formdata, adminData: data })
      .then(({ data }) => {
        console.log(data);

        if (
          isObject(data) &&
          "data" in data &&
          isObject(data.data) &&
          "admin" in data.data &&
          isObject(data.data.admin)
        ) {
          const newAdmin = { ...data.data.admin,  } as Admin;

          setListAdmins((prev: Admin[]) => [...prev, newAdmin]);
          setVisiblePasswords((prev) => ({
            ...prev,
            [newAdmin.email]: false,
          }));
          toast.success("Admin added successfully");
          setFormData({
            fullName: "",
            email: "",
            password: "",
            phone: "",
          });
          handleCancel();
        } else {
          toast.error("Invalid server error");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error in Create New Admin");
      });
  }, [formdata, data, setListAdmins]);

  return (
    <Modal
      title="Create New Admin"
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={handlesubmit}
    >
      <Input
        name="fullName"
        value={formdata.fullName}
        onChange={handleChange}
        placeholder="Full Name"
      />
      <Input
        name="email"
        type="email"
        value={formdata.email}
        placeholder="Email"
        onChange={handleChange}
        style={{ marginTop: "23px" }}
      />
      <Input
        name="password"
        value={formdata.password}
        type="password"
        onChange={handleChange}
        placeholder="Password"
        style={{ marginTop: "23px" }}
      />
      <Input
        placeholder="Phone"
        name="phone"
        value={formdata.phone}
        onChange={handleChange}
        style={{ marginTop: "23px" }}
      />
    </Modal>
  );
};

export default ModalCreateAdmin;
