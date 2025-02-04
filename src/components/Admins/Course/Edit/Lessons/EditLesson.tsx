import { Button, Input, Select, Typography } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import TextArea from "antd/es/input/TextArea";

function EditLesson() {
  return (
    <div>
      <Typography
        style={{
          fontWeight: "bold",
          fontFamily: "sans-serif",
          fontSize: 20,
          marginTop: "2rem",
        }}
      >
        Update Lesson :
      </Typography>

      <div className="mb-3 mt-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <Input id="title" name="title" placeholder="Enter lesson title" />
      </div>
      <div className="mb-3">
        <label htmlFor="chapterId" className="form-label">
          Chapter
        </label>
        <Select
          id="chapterId"
          placeholder="Select a chapter"
          style={{ width: "100%" }}
        ></Select>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <TextArea
          id="description"
          name="description"
          placeholder="Enter lesson description"
          rows={3}
        />
      </div>

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

      <Button type="primary" style={{ marginTop: "20px" }} >
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
}

export default EditLesson;
