import React, { useCallback, useEffect, useState } from "react";
import { Input, Modal } from "antd";
import axiosInstance from "../../config/Api";
import { toast } from "react-hot-toast";

import { Admin } from "./ModalCreateAdmin";


interface ModalEditTitleCourseProps {
  isModalEditTitleOpen: boolean;
  handleEditCancel: () => void;
  setTitleCourses: React.Dispatch<React.SetStateAction<Admin[]>>;
  editTitleCourse: Admin | null;
}

const ModalEditTitleCourse: React.FC<ModalEditTitleCourseProps> = ({
  isModalEditTitleOpen,
  handleEditCancel,
  setTitleCourses,
  editTitleCourse,
}) => {
  const [formData, setFormData] = useState<Admin | null>(null);

  useEffect(() => {
    if (editTitleCourse) {
      setFormData(editTitleCourse);
    }
  }, [editTitleCourse]);

  const handleChangeEditTitleCourse = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  // EDIT TITLE COURSE

  const handleSumbitEditTitle = useCallback(() => {
    if (!editTitleCourse) {
      console.error("No  Title selected for editing.");
      return;
    }

    axiosInstance
      .put(`/course/${editTitleCourse._id}`, { ...formData })
      .then(({ data }) => {
        console.log(data);
        setTitleCourses((prev) =>
          prev.map((course) =>
            course._id === editTitleCourse._id
              ? { ...course, ...formData }
              : course
          )
        );
        toast.success("Admin updated successfully");
        handleEditCancel();
      })
      .catch((err) => {
        toast.error("Error in updating Admin", err);
      });
  }, [formData, setTitleCourses, editTitleCourse]);

  return (
    <div>
      <Modal
        title="Edit Title Course "
        open={isModalEditTitleOpen}
        onCancel={handleEditCancel}
        onOk={handleSumbitEditTitle}
        style={{marginTop: 3}}
      >
        {formData && (
          <>
            <Input
            style={{marginTop: 5, marginBottom: 10}}
              onChange={handleChangeEditTitleCourse}
              value={formData.title}
              name="title"
              placeholder="Title"
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default ModalEditTitleCourse;
