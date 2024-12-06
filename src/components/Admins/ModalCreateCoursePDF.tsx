import React, { useCallback, useState } from "react";


import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Upload,  Input, Modal  } from "antd";
import type { UploadChangeParam , UploadFile } from "antd/es/upload/interface";
import axiosInstance from "../../config/Api";

import { toast } from "react-hot-toast";

import { Admin } from "./ModalCreateAdmin";


interface ModalCreatePDFProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  setTitleCourses: React.Dispatch<React.SetStateAction<Admin[]>>;
}

interface CourseResponse {
  course: Admin;
}

const ModalCreateCoursePDF: React.FC<ModalCreatePDFProps> = ({
  isModalOpen,
  handleCancel,
  setTitleCourses,
}) => {
  const [formCourse, setFormCourse] = useState({
    courseName: "",
    isUploading: false,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);



  console.log(formCourse);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormCourse((prevState) => ({
      ...prevState,
      courseName: e.target.value,
    }));
  };

  const handleFileChange: (info: UploadChangeParam<UploadFile>) => void = (
    info
  ) => {
    if (info.fileList.length > 0) {
      setSelectedFile(info.fileList[0].originFileObj as File);
    }
  };


  const handleImageChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.fileList.length > 0) {
      setSelectedImage(info.fileList[0].originFileObj as File);
    }
  };


  const handleUploadPDF = useCallback(async () => {
    if (!formCourse.courseName) {
      toast.error("Veuillez entrer un nom de cours avant de télécharger.");
      return;
    }
    if (!selectedFile) {
      toast.error("Veuillez sélectionner un fichier avant de télécharger.");
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      toast.error("Veuillez sélectionner un fichier PDF valide.");
      return;
    }

    if (selectedImage && !selectedImage.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image valide.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", selectedFile);
    formData.append("title", formCourse.courseName);
    if (selectedImage) {
      formData.append("imageCourse", selectedImage);
    }

    setFormCourse((prevState) => ({ ...prevState, isUploading: true }));

    try {
      const response = await axiosInstance.post<CourseResponse>(
        "/course/pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.course);
      const newCourseTitle = response.data.course;

      setTitleCourses((prev: Admin[]) => [...prev, newCourseTitle]);
      toast.success("Course added Succefully");
      handleCancel();
      setFormCourse({ courseName: "", isUploading: false });
      setSelectedFile(null);
      setSelectedImage(null);
    } catch (error) {
      console.error("Erreur lors du téléchargement du PDF :", error);
      toast.error("Erreur lors du téléchargement du PDF");
    } finally {
      setFormCourse((prevState) => ({ ...prevState, isUploading: false }));
    }
  }, [formCourse.courseName, selectedFile, handleCancel, selectedImage]);

  const handleOk = () => {
    handleUploadPDF();
  };

  const uploadProps: UploadProps = {
    name: "file",
    showUploadList: false,
    onChange: handleFileChange,
    beforeUpload: () => false,
  };

  const imageUploadProps: UploadProps = {
    name: "image",
    showUploadList: false,
    onChange: handleImageChange,
    beforeUpload: () => false,
  };

  return (
    <div>
      <Modal
        title="Create New Course PDF "
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okButtonProps={{
          loading: formCourse.isUploading,
        }}
      >
        <Input
          placeholder="Name Courses"
          style={{ marginTop: "1rem" }}
          value={formCourse.courseName}
          onChange={handleChange}
        />
        <div style={{ display: "flex", gap: "1rem" }}>
        <Upload {...uploadProps}>
          <Button
            style={{
              backgroundColor: "#e3f2fd",
              color: '"#e3f2fd',
              marginTop: "2rem",
            }}
            icon={<UploadOutlined />}
            disabled={formCourse.isUploading || !formCourse.courseName}
          >
             Upload Course PDF
          </Button>
        </Upload>

        <Upload {...imageUploadProps}>
          <Button
            style={{
              backgroundColor: "#e3f2fd",
              marginTop: "2rem",
            }}
            icon={<UploadOutlined />}
            disabled={formCourse.isUploading || !formCourse.courseName}
          >
           Upload Image Course
          </Button>
        </Upload>
        </div>
      </Modal>
    </div>
  );
};

export default ModalCreateCoursePDF;
