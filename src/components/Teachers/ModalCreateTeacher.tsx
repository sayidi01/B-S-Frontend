import React, { useCallback, useEffect, useState } from "react";
import { Input, Modal } from "antd";
import axiosInstance from "../../config/Api";
import { toast } from "react-hot-toast";
import { useUserContext } from "../../config/UserContext";
import isObject from "lodash/isObject";
import { FormDataTeacher } from "../Teachers/typesTeacher";

interface ModalCreateTeacherProps {
  isModalOpen: boolean;
  handleCancel: () => void;
}

const ModalCreateTeacher: React.FC<ModalCreateTeacherProps> = ({
  isModalOpen,
  handleCancel,
}) => {

    const { data } = useUserContext();

  const [formdataTeacher, setFormDataTeacher] = useState<FormDataTeacher>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  console.log(formdataTeacher)


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



// CREATE NEW TEACHER 

  const handleChangeFormTeacher = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataTeacher((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlesubmitTeacher = useCallback(() => {
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
    .post('/teacher', {...formdataTeacher})
    .then(({data}) => {
        console.log(data)
        toast.success("Admin added successfully");
    })
    .catch((err) => {
        console.log(err)
        toast.error("Error in Create New Admin");
    })

  },[formdataTeacher])

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
