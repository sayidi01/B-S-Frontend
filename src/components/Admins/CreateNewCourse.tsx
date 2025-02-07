import React, { useCallback, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Upload, Input, Modal } from "antd";
import type { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import axiosInstance from "../../config/Api";

import { toast } from "react-hot-toast";

import { Admin } from "./ModalCreateAdmin";

import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../config/UserContext";

interface CourseResponse {
  course: Admin;
}

const CreateNewCourse: React.FC = () => {
  const [formCourse, setFormCourse] = useState({
    courseName: "",
    description: "",
    isUploading: false,
  });

  const { setTitleCourses } = useUserContext();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  console.log(formCourse);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormCourse((prevState) => ({
      ...prevState,
      courseName: e.target.value,
    }));
  };

  const handleDescriptionChange = (content: string) => {
    setFormCourse((prevState) => ({
      ...prevState,
      description: content,
    }));
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

    if (selectedImage && !selectedImage.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image valide.");
      return;
    }

    const formData = new FormData();

    formData.append("title", formCourse.courseName);
    formData.append("description", formCourse.description);
    if (selectedImage) {
      formData.append("imageCourse", selectedImage);
    }

    setFormCourse((prevState) => ({ ...prevState, isUploading: true }));

    try {
      const response = await axiosInstance.post<CourseResponse>(
        "/course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.course);
      const newCourseTitle = response.data.course;

      if (setTitleCourses) {
        setTitleCourses((prev: Admin[]) => [...prev, newCourseTitle]);
      }
      navigate(`/Dashbord/courses/${response.data.course._id}/edit`);
      setFormCourse({ courseName: "", description: "", isUploading: false });
      setSelectedImage(null);
    } catch (error) {
      console.error("Erreur lors du téléchargement du PDF :", error);
      toast.error("Erreur lors du téléchargement du PDF");
    } finally {
      setFormCourse((prevState) => ({ ...prevState, isUploading: false }));
    }
  }, [formCourse.courseName, formCourse.description, selectedImage]);

  const imageUploadProps: UploadProps = {
    name: "image",
    showUploadList: false,
    onChange: handleImageChange,
    beforeUpload: () => false,
  };

  return (
    <div>
      <h1
        style={{ fontSize: 20, fontWeight: "bold", fontFamily: "sans-serif" }}
      >
        Create New Course
      </h1>
      <Input
        placeholder="Name Course"
        style={{ marginTop: "2rem" }}
        value={formCourse.courseName}
        onChange={handleChange}
      />
      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        <Upload {...imageUploadProps}>
          <Button
            style={{ backgroundColor: "#e3f2fd" }}
            icon={<UploadOutlined />}
            disabled={formCourse.isUploading || !formCourse.courseName}
          >
            Upload Image Course
          </Button>
        </Upload>
      </div>
      <div className="mt-5">
        <Editor
          apiKey="hs596mfw1xm1lq4bvoeyrjzc5tkl2mhsax8ecy6oi8guqxpd"
          value={formCourse.description}
          onEditorChange={handleDescriptionChange}
          init={{
            height: 900,
            plugins: [
              "anchor",
              "autolink",
              "charmap",
              "codesample",
              "emoticons",
              "image",
              "link",
              "lists",
              "media",
              "searchreplace",
              "table",
              "visualblocks",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | forecolor backcolor | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            textcolor_map: [
              "000000",
              "Black", // Noir
              "FFFFFF",
              "White", // Blanc
              "003366",
              "Dark Blue", // Bleu foncé
              "2566e8",
              "Blue", // Bleu
              "046307",
              "Green", // Vert
              "c02424",
              "Red", // Rouge
            ],
            color_map: [
              "000000",
              "Black", // Noir
              "FFFFFF",
              "White", // Blanc
              "003366",
              "Dark Blue", // Bleu foncé
              "2566e8",
              "Blue", // Bleu
              "046307",
              "Green", // Vert
              "c02424",
              "Red", // Rouge
            ],
            font_formats:
              "Times New Roman=Times New Roman, serif; Montserrat=Montserrat, sans-serif;",
            font_family_formats:
              "Times New Roman=Times New Roman, serif; Montserrat=Montserrat, sans-serif;",
          }}
        />
      </div>

      <Button
        type="primary"
        onClick={handleUploadPDF}
        loading={formCourse.isUploading}
        style={{ marginTop: "1rem" }}
      >
        Continue
      </Button>
      <style>
        {`
          .tox-toolbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .tox-editor-container {
            margin-top: 60px; /* Ajuste cette valeur en fonction de la hauteur de la barre d'outils */
          }
        `}
      </style>
    </div>
  );
};

export default CreateNewCourse;
