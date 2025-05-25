import React, { useCallback, useEffect, useState } from "react";
import { Input, Upload, Button } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import axiosInstance from "../../config/Api";
import { toast } from "react-hot-toast";
import type { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useUserContext } from "../../config/UserContext";
import { useNavigate, useParams } from "react-router-dom";

interface ApiResponseCourseEdit {
  _id: string;
  title: string;
  description: string;
  imageCourse?: string;
}




interface CourseData {
  _id: string;
  title: string;
  description: string;
  imageCourse?: string;
}

interface EditCourseProps {
  courseView: CourseData;
}

const EditCourse: React.FC<EditCourseProps> = ({ courseView}) => {
  const [formData, setFormData] = useState<CourseData>(courseView);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { setTitleCourses } = useUserContext();

  const {id} =useParams<{ id: string }>();

 

  const navigate = useNavigate()

  useEffect(() => {
    setFormData(courseView);
  }, [courseView]);

  

  const handleChangeEditTitleCourse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj as File;
      setSelectedImage(file);
      setFormData((prevState) => ({
        ...prevState,
        imageCourse: URL.createObjectURL(file),
      }));
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

  const handleChangeEditdescriptionCourse = (content: string) => {
    setFormData((prevState) => ({
      ...prevState,
      description: content,
    }));
  };

  const handleSumbitEditTitle = useCallback(() => {
   

    if (!formData.title || !formData.description) {
      toast.error("Title and description are required");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    if (selectedImage) {
      formDataToSend.append("imageCourse", selectedImage);
    }

    axiosInstance
      .put<ApiResponseCourseEdit>(`/course/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        setTitleCourses((prev) =>
          prev.map((course) =>
            course._id === formData._id
              ? { ...course, ...formData, imageCourse: data.imageCourse }
              : course
          )
        );
        setFormData((prevState) => ({
          ...prevState,
          imageCourse: data.imageCourse
        }));
        toast.success("Course updated successfully");
        navigate('/Dashbord/courses')
       
      })
      .catch((err) => {
        toast.error("Error in updating Course", err);
      });
  }, [formData, setTitleCourses, selectedImage]);

  return (
    <div>
      <Input
        style={{ marginTop: 5, marginBottom: 10 }}
        onChange={handleChangeEditTitleCourse}
        value={formData.title}
        name="title"
        placeholder="Title"
      />

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
          <div className="mt-5">
      <Editor
        apiKey="hs596mfw1xm1lq4bvoeyrjzc5tkl2mhsax8ecy6oi8guqxpd"
        value={formData.description}
        onEditorChange={handleChangeEditdescriptionCourse}
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
        style={{ marginTop: "1rem" }}
        onClick={handleSumbitEditTitle}
      >
        Save
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

export default EditCourse;