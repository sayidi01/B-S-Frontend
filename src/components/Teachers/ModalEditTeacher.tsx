import React, { useCallback, useEffect, useState } from "react";
import { Input, Modal } from "antd";
import axiosInstance from "../../config/Api";
import { toast } from "react-hot-toast";
import { FormDataTeacher, Teacher } from "./typesTeacher";


interface ModalEditTeacherProps {
    isModalEditOpen: boolean;
    handleEditCancel: () => void;
    setListTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
    editTeacher: Teacher | null;
  }

  const ModalEditTeacher: React.FC<ModalEditTeacherProps> = ({
    isModalEditOpen,
    handleEditCancel,
    setListTeachers,
    editTeacher,

}) => {
    const [formData, setFormData] = useState< FormDataTeacher| null>(null);

    useEffect(() => {
        if (editTeacher) {
          setFormData({
            firstName: editTeacher.firstName,
            lastName: editTeacher.lastName,
            email: editTeacher.email,
            password: editTeacher.password,
            phone: editTeacher.phone,
          });
        }
      }, [editTeacher]);
    
      const handleChangeEditTeacher = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (formData) {
          setFormData({ ...formData, [name]: value });
        }
      };


      // EDIT DATA TEACHER

      const handleSumbitTeacher = useCallback(() => {
        if (!editTeacher) {
          console.error("No Teacher selected for editing.");
          return;
        }
    
        axiosInstance
          .put(`/teacher/${editTeacher._id}`, { ...formData })
          .then(({ data }) => {
            console.log(data);
            setListTeachers((prev) => prev.map((teacher) => teacher._id === editTeacher._id?{ ...teacher, ...formData } : teacher))
            toast.success("Teacher updated successfully");
            handleEditCancel();
          })
          .catch((err) => {
            toast.error("Error in updating Teacher", err);
          });
      }, [formData, setListTeachers, editTeacher]);
    

  return (
    <div>
      <Modal
        title="Edit Teacher"
        open={isModalEditOpen}
        onCancel={handleEditCancel}
        onOk={handleSumbitTeacher}
      >
        {formData && (
          <>
            <Input
            value={formData.firstName}
              name="firstName"
              placeholder="First Name"
              onChange={handleChangeEditTeacher}
            />
             <Input
             value={formData.lastName}
              name="lastName"
              placeholder="Last Name"
              onChange={handleChangeEditTeacher}
              style={{ marginTop: "23px" }}
            />
            <Input
            value={formData.email}
             onChange={handleChangeEditTeacher}
              name="email"
              type="email"
              placeholder="Email"
              style={{ marginTop: "23px" }}
            />
            <Input
            value={formData.password}
             onChange={handleChangeEditTeacher}
              name="password"
              type="password"
              placeholder="Password"
              style={{ marginTop: "23px" }}
            />
            <Input
            value={formData.phone}
             onChange={handleChangeEditTeacher}
              placeholder="Phone"
              name="phone"
             
              style={{ marginTop: "23px" }}
            />
          </>
        )}
      </Modal>
    </div>
  )
}

export default ModalEditTeacher
