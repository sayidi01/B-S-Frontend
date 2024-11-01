import React, { useCallback, useEffect, useState } from "react";
import { Input, Modal } from "antd";
import axiosInstance from "../../config/Api";
import { toast } from "react-hot-toast";
import { useUserContext } from "../../config/UserContext";
import isObject from "lodash/isObject";
import { FormDataStudent, Student } from "./typesStudent";


interface ModalCreateStudentProps {
    isModalOpen: boolean;
    handleCancel: () => void;
    setListStudents: React.Dispatch<React.SetStateAction<Student[]>>;
    setVisiblePasswords: React.Dispatch<
      React.SetStateAction<Record<string, boolean>>
    >;
  }

const ModalCreateStudent: React.FC<ModalCreateStudentProps> = ({
    isModalOpen,
    handleCancel,
    setListStudents,
    setVisiblePasswords,
  }) => {

    const { data } = useUserContext();

    const [formdataStudent, setFormDataStudent] = useState<FormDataStudent>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    });
  
    console.log(formdataStudent);
  
    // Function to generate a random password Student
    const generateRandomPasswordStudent = (length: number) => {
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
        const generatedPassword = generateRandomPasswordStudent(10);
        setFormDataStudent((prevState) => ({
          ...prevState,
          password: generatedPassword,
        }));
      }
    }, [isModalOpen]);
  
  
  
    const handleChangeFormStudent = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
    
      setFormDataStudent((prevState) => ({
        ...prevState,
        [name]: name === "firstName" ? value.charAt(0).toUpperCase() + value.slice(1) : value,
      }));
    };


    // CREATE NEW STUDENT SEND EMAIL 

    const handlesubmitStudent = useCallback(() => {
        if (!data || !isObject(data)) {
          toast.error("Students data is not available or not valid");
          return;
        }
        if (
          !formdataStudent.firstName ||
          !formdataStudent.lastName ||
          !formdataStudent.email ||
          !formdataStudent.phone
        ) {
          toast.error("Please fill in all fields");
          return;
        }
        axiosInstance
          .post("/student", { ...formdataStudent })
          .then(({ data }) => {
            console.log(data);
            if (
              isObject(data) &&
              "data" in data &&
              isObject(data.data) &&
              "student" in data.data &&
              isObject(data.data.student)
            ) {
              const newStudent = { ...data.data.student } as Student;
    
              setListStudents((prev: Student[]) => [...prev, newStudent]);
              setVisiblePasswords((prev) => ({
                ...prev,
                [newStudent.email]: false,
              }));
              toast.success("Student added successfully");
              setFormDataStudent({
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
            toast.error("Error in Create New Student");
          });
      }, [formdataStudent,  setListStudents]);
    

  return (
    <div>
         <Modal
        title="Create New Teacher"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handlesubmitStudent}
      >
        <Input
          name="firstName"
          placeholder="First Name"
          value={formdataStudent.firstName}
          onChange={handleChangeFormStudent}
       
        />
        <Input
         value={formdataStudent.lastName}
         onChange={handleChangeFormStudent}
          name="lastName"
          placeholder="Last Name"
          style={{ marginTop: "23px" }}
        />
        <Input
          name="email"
           value={formdataStudent.email} 
           onChange={handleChangeFormStudent}
          type="email"
          placeholder="Email"
          style={{ marginTop: "23px" }}
        />
        <Input
           onChange={handleChangeFormStudent}
           value={formdataStudent.password}
          name="password"
          type="password"
          placeholder="Password"
          style={{ marginTop: "23px" }}
        />
        <Input
           onChange={handleChangeFormStudent}
           value={formdataStudent.phone}
          placeholder="Phone"
          name="phone"
          style={{ marginTop: "23px" }}
        />
      </Modal>
      
    </div>
  )
}

export default ModalCreateStudent
