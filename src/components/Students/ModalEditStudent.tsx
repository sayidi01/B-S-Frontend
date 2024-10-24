import React, { useCallback, useEffect, useState } from "react";
import { Input, Modal } from "antd";
import axiosInstance from "../../config/Api";
import { toast } from "react-hot-toast";
import { FormDataStudent, Student } from "./typesStudent";



interface ModalEditStudentProps {
    isModalEditOpen: boolean;
    handleEditCancelStudent: () => void;
    setListStudents: React.Dispatch<React.SetStateAction<Student[]>>;
    editStudent: Student | null;
  }

  const ModalEditStudent: React.FC<ModalEditStudentProps> = ({
    isModalEditOpen,
    handleEditCancelStudent,
    setListStudents,
    editStudent,

}) => {
    const [formData, setFormData] = useState< FormDataStudent| null>(null);

    useEffect(() => {
        if ( editStudent) {
          setFormData({
            firstName: editStudent.firstName,
            lastName: editStudent.lastName,
            email: editStudent.email,
            password: editStudent.password,
            phone: editStudent.phone,
          });
        }
      }, [editStudent]);
    
      const handleChangeEditStudent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (formData) {
          setFormData({ ...formData, [name]: value });
        }
      };


      // EDIT DATA TEACHER

      const handleSumbitStudent = useCallback(() => {
        if (!editStudent) {
          console.error("No Student selected for editing.");
          return;
        }
    
        axiosInstance
          .put(`/student/${editStudent._id}`, { ...formData })
          .then(({ data }) => {
            console.log(data);
            setListStudents((prev) => prev.map((student) => student._id === editStudent._id?{ ...student, ...formData } : student))
            toast.success("Teacher updated successfully");
            handleEditCancelStudent();
          })
          .catch((err) => {
            toast.error("Error in updating Student", err);
          });
      }, [formData, setListStudents, editStudent]);
    

  return (
    <div>
      <Modal
        title="Edit Student"
        open={isModalEditOpen}
        onCancel={handleEditCancelStudent}
        onOk={handleSumbitStudent}
      >
        {formData && (
          <>
            <Input
            value={formData.firstName}
              name="firstName"
              placeholder="First Name"
              onChange={handleChangeEditStudent}
            />
             <Input
             value={formData.lastName}
              name="lastName"
              placeholder="Last Name"
              onChange={handleChangeEditStudent}
              style={{ marginTop: "23px" }}
            />
            <Input
            value={formData.email}
            onChange={handleChangeEditStudent}
              name="email"
              type="email"
              placeholder="Email"
              style={{ marginTop: "23px" }}
            />
            <Input
            value={formData.password}
            onChange={handleChangeEditStudent}
              name="password"
              type="password"
              placeholder="Password"
              style={{ marginTop: "23px" }}
            />
            <Input
            value={formData.phone}
            onChange={handleChangeEditStudent}
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

export default ModalEditStudent
