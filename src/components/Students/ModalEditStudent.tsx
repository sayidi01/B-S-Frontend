import React, { useCallback, useEffect, useState } from "react";
import { Input, Modal, Select } from "antd";
import axiosInstance from "../../config/Api";
import { toast } from "react-hot-toast";
import { FormDataStudent, Student } from "./typesStudent";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";

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
  const [formData, setFormData] = useState<FormDataStudent | null>(null);

  useEffect(() => {
    if (editStudent) {
      setFormData({
        firstName: editStudent.firstName,
        lastName: editStudent.lastName,
        email: editStudent.email,
        password: editStudent.password,
        phone: editStudent.phone,
        accountExpiryDate: editStudent.accountExpiryDate,
        myCourses: editStudent.myCourses || [],
        learningMode: editStudent.learningMode || "online",
      });
    }
  }, [editStudent]);

  const handleChangeEditStudent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  // EDIT DATA STUDENT

  const handleSumbitStudent = useCallback(() => {
    if (!editStudent) {
      console.error("No Student selected for editing.");
      return;
    }

    axiosInstance
      .put(`/student/${editStudent._id}`, { ...formData })
      .then(({ data }) => {
        console.log(data);
        setListStudents((prev) =>
          prev.map((student) =>
            student._id === editStudent._id
              ? { ...student, ...formData }
              : student
          )
        );
        toast.success("Teacher updated successfully");
        handleEditCancelStudent();
      })
      .catch((err) => {
        toast.error("Error in updating Student", err);
      });
  }, [formData, setListStudents, editStudent]);

  console.log(formData);
  if (formData && formData.accountExpiryDate) {
    console.log(
      "yes",
      new Date(formData.accountExpiryDate).toISOString().slice(0, 10)
    );
  }

  

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
              style={{ marginTop: "23px", marginBottom: "23px" }}
            />
            <Flatpickr
              value={
                formData.accountExpiryDate
                  ? new Date(formData.accountExpiryDate).toLocaleDateString(
                      "en-CA"
                    ) // YYYY-MM-DD in local time
                  : undefined
              }
              options={{
                dateFormat: "Y-m-d",
                position: "auto left",
              }}
              className="form-input"
              onChange={(date) =>
                setFormData((prev) =>
                  !prev
                    ? prev
                    : {
                        ...prev,
                        accountExpiryDate: new Date(date[0]).toLocaleDateString(
                          "en-CA"
                        ),
                      }
                )
              }
            />
          </>
        )}
        <Select
          style={{ marginTop: "23px", width: "100%" }}
          placeholder="Select Learning Mode"
          value={formData?.learningMode}
          onChange={(value) =>
            setFormData((prev) =>
              prev
                ? { ...prev, learningMode: value as "on-site" | "online" }
                : prev
            )
          }
        >
          <Select.Option value="on-site">On-site</Select.Option>
          <Select.Option value="online">Online</Select.Option>
        </Select>

        
      </Modal>
    </div>
  );
};

export default ModalEditStudent;
