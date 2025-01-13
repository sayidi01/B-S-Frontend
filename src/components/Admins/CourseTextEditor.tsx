import React, { useCallback, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../config/UserContext";
import { ICourse } from "../../types/course";
import { LoadingOverlay } from "@mantine/core";
import { toast } from "react-hot-toast";

function CourseTextEditor() {
  const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null);
  const [editorText, setEditorText] = useState("");

  const navigate = useNavigate();

  const params = useParams();
  const { apiClient } = useUserContext();

  useEffect(() => {
    const fetchingCourse = async () => {
      if (params.id) {
        const response = (await apiClient.getCourseData(params.id)) as ICourse;
        console.log("response", response);
        setCurrentCourse(response);
        setEditorText(response.content ?? "");
      }
    };

    fetchingCourse();
  }, []);

  const saveTextEditor = useCallback(async () => {
    if (!currentCourse) return;
    try {
      const response = await apiClient.updateCourseContent(
        currentCourse._id,
        editorText
      );
      console.log("sdsdf", response);

      toast.success("Course content is saved correctly.");
      navigate("/Dashbord/courses");
    } catch (error) {
      console.log("error", error);
      toast.error("Error saving content, try again later!");
    }
  }, [editorText, currentCourse]);

  if (!currentCourse) return <LoadingOverlay />;

  return (
    <div>
      <Editor
        apiKey="hs596mfw1xm1lq4bvoeyrjzc5tkl2mhsax8ecy6oi8guqxpd"
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
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
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
        value={editorText}
        onEditorChange={(newValue) => setEditorText(newValue)}
      />
      <div className="mt-3">
        <button
          onClick={saveTextEditor}
          type="button"
          className="btn btn-primary"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CourseTextEditor;
