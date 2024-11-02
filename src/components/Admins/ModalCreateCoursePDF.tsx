import React, { useCallback, useState } from "react";

import { Input, Modal } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload/interface";
import axiosInstance from "../../config/Api";
import type { UploadFile } from "antd/es/upload/interface";
import { toast } from "react-hot-toast";

import { Admin } from "./ModalCreateAdmin";
import { useUserContext } from "../../config/UserContext";

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

  const { data } = useUserContext();

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

    const formData = new FormData();
    formData.append("pdf", selectedFile);
    formData.append("title", formCourse.courseName);

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
    } catch (error) {
      console.error("Erreur lors du téléchargement du PDF :", error);
      toast.error("Erreur lors du téléchargement du PDF");
    } finally {
      setFormCourse((prevState) => ({ ...prevState, isUploading: false }));
    }
  }, [formCourse.courseName, selectedFile, handleCancel]);

  const handleOk = () => {
    handleUploadPDF();
  };

  const uploadProps: UploadProps = {
    name: "file",
    showUploadList: false,
    onChange: handleFileChange,
    beforeUpload: () => false,
  };

  return (
    <div>
      <Modal
        title="Create New Courses PDF "
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
            Click to Upload
          </Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default ModalCreateCoursePDF;
