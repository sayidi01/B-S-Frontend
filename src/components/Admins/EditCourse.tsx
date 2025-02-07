import React, { useCallback, useEffect, useState } from "react";
import { Input,  Upload,Button } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import axiosInstance from "../../config/Api";
import { toast } from "react-hot-toast";
import type { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { Admin } from "./ModalCreateAdmin";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useUserContext } from "../../config/UserContext";


interface ApiResponseCourseEdit {
  _id: string;
  title: string;
  description: string;
  imageCourse?: string;
}



const EditCourse: React.FC =  (
 
) => {
  const [formData, setFormData] = useState<Admin | null>(null);

  const [editTitleCourse, setEditTitleCourse] = useState<Admin | null>(null);

  const { setTitleCourses } = useUserContext();

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

  const handleChangeEditdescriptionCourse = (content: string) => {
    setFormData((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          description: content,
        };
      }
      return prevState; 
    });
  };
  

  // EDIT COURSE

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
 
      })
      .catch((err) => {
        toast.error("Error in updating Course", err);
      });
  }, [formData, setTitleCourses, editTitleCourse , selectedImage]);

  return (
    <div>
    {formData && (
      <>
      
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
      </>
    )}
    
    <Button
      type="primary"
      style={{ marginTop: "1rem" }}
      onClick={handleSumbitEditTitle}
    >
      Submit
    </Button>
  </div>
  );
};

export default EditCourse;
