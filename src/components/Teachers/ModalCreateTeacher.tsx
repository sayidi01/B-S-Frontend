import React, { useCallback, useEffect, useState } from "react";
import { Input, Modal } from "antd";
import axiosInstance from "../../config/Api";
import { toast } from "react-hot-toast";
import { useUserContext } from "../../config/UserContext";
import isObject from "lodash/isObject";
import { FormDataTeacher, Teacher } from "../Teachers/typesTeacher";

interface ModalCreateTeacherProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  setListTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
  setVisiblePasswords: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

const ModalCreateTeacher: React.FC<ModalCreateTeacherProps> = ({
  isModalOpen,
  handleCancel,
  setListTeachers,
  setVisiblePasswords,
}) => {
  const { data } = useUserContext();

  const [formdataTeacher, setFormDataTeacher] = useState<FormDataTeacher>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  console.log(formdataTeacher);

  // Function to generate a random password
  const generateRandomPassword = (length: number) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  useEffect(() => {
    if (isModalOpen) {
      const generatedPassword = generateRandomPassword(10);
      setFormDataTeacher((prevState) => ({
        ...prevState,
        password: generatedPassword,
      }));
    }
  }, [isModalOpen]);



  const handleChangeFormTeacher = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setFormDataTeacher((prevState) => ({
      ...prevState,
      [name]: name === "firstName" ? value.charAt(0).toUpperCase() + value.slice(1) : value,
    }));
  };
  
    // CREATE NEW TEACHER SEND EMAIL

  const handlesubmitTeacher = useCallback(() => {
    if (!data || !isObject(data)) {
      toast.error("Teachers data is not available or not valid");
      return;
    }
    if (
      !formdataTeacher.firstName ||
      !formdataTeacher.lastName ||
      !formdataTeacher.email ||
      !formdataTeacher.phone
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    axiosInstance
      .post("/teacher", { ...formdataTeacher })
      .then(({ data }) => {
        console.log(data);
        if (
          isObject(data) &&
          "data" in data &&
          isObject(data.data) &&
          "teacher" in data.data &&
          isObject(data.data.teacher)
        ) {
          const newTeacher = { ...data.data.teacher } as Teacher;

          setListTeachers((prev: Teacher[]) => [...prev, newTeacher]);
          setVisiblePasswords((prev) => ({
            ...prev,
            [newTeacher.email]: false,
          }));
          toast.success("Teacher added successfully");
          setFormDataTeacher({
            firstName: "",
            lastName: "",
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
        toast.error("Error in Create New Teacher");
      });
  }, [formdataTeacher,  setListTeachers]);


  

  return (
    <div>
      <Modal
        title="Create New Teacher"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handlesubmitTeacher}
      >
        <Input
          name="firstName"
          placeholder="First Name"
          value={formdataTeacher.firstName}
          onChange={handleChangeFormTeacher}
        />
        <Input
          onChange={handleChangeFormTeacher}
          value={formdataTeacher.lastName}
          name="lastName"
          placeholder="Last Name"
          style={{ marginTop: "23px" }}
        />
        <Input
          name="email"
          value={formdataTeacher.email}
          onChange={handleChangeFormTeacher}
          type="email"
          placeholder="Email"
          style={{ marginTop: "23px" }}
        />
        <Input
          name="password"
          value={formdataTeacher.password}
          onChange={handleChangeFormTeacher}
          type="password"
          placeholder="Password"
          style={{ marginTop: "23px" }}
        />
        <Input
          placeholder="Phone"
          onChange={handleChangeFormTeacher}
          value={formdataTeacher.phone}
          name="phone"
          style={{ marginTop: "23px" }}
        />
      </Modal>
    </div>
  );
};

export default ModalCreateTeacher;
