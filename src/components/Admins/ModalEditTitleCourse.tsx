import React, { useCallback, useEffect, useState } from "react";
import { Input, Modal, Upload,Button } from "antd";
import axiosInstance from "../../config/Api";
import { toast } from "react-hot-toast";
import type { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { Admin } from "./ModalCreateAdmin";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";


interface ApiResponseCourseEdit {
  _id: string;
  title: string;
  description: string;
  content?: string;
  imageCourse?: string;
}

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

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (editTitleCourse) {
      setFormData(editTitleCourse);
      setSelectedImage(null); 
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


  const handleImageChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj as File;
      console.log("Selected file:", file);
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };


  const imageUploadProps: UploadProps = {
    name: "imageCourse",
    showUploadList: false,
    onChange: handleImageChange,
    beforeUpload: () => false, 
  };

  const handleChangeEditdescriptionCourse = (
    e: React.ChangeEvent<HTMLTextAreaElement>
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

    if (!formData?.title || !formData?.description) {
      toast.error("Title and description are required");
      return;
    }

    const formDataToSend = new FormData();
    if (formData) {
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
    }
    if (selectedImage) {
      console.log("Image to upload:", selectedImage);
      formDataToSend.append("imageCourse", selectedImage);
    }

    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
  
   

    axiosInstance
      .put<ApiResponseCourseEdit>(`/course/${editTitleCourse._id}`, formDataToSend,{headers: {
        "Content-Type": "multipart/form-data", 
      },})
      .then(({ data }) => {
        console.log(data);
        setTitleCourses((prev) =>
          prev.map((course) =>
            course._id === editTitleCourse._id
              ? { ...course, ...formData,  imageCourse: data.imageCourse ,}
              : course
          )
        );
        toast.success("Course updated successfully");
        handleEditCancel();
      })
      .catch((err) => {
        toast.error("Error in updating Course", err);
      });
  }, [formData, setTitleCourses, editTitleCourse , selectedImage]);

  return (
    <div>
      <Modal
        title="Edit Course "
        open={isModalEditTitleOpen}
        onCancel={handleEditCancel}
        onOk={handleSumbitEditTitle}
        style={{ marginTop: 3 }}
      >
        {formData && (
          <>
            <Input
              style={{ marginTop: 5, marginBottom: 10 }}
              onChange={handleChangeEditTitleCourse}
              value={formData.title}
              name="title"
              placeholder="Title"
            />

            <Input.TextArea
              style={{ marginTop: 5, marginBottom: 10 }}
              onChange={handleChangeEditdescriptionCourse}
              maxLength={72}
              value={formData.description}
              name="description"
              placeholder="Description"
              rows={4}
            />
          </>
        )}
         <Upload {...imageUploadProps}>
              <Button
                style={{
                  backgroundColor: "#e3f2fd",
                  marginTop: "2rem",
                }}
                icon={<UploadOutlined />}
              >
                Edit Image Course
              </Button>
            </Upload>
      </Modal>
    </div>
  );
};

export default ModalEditTitleCourse;
