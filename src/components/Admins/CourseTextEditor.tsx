import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../config/UserContext";
import { ICourse } from "../../types/course";
import { LoadingOverlay } from "@mantine/core";
import { toast } from "react-hot-toast";
import { Tab, TabGroup, TabList, TabPanels } from "@headlessui/react";
import { editCourseTabs } from "./utils";

function CourseTextEditor() {
  const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null);
  const [editorText, setEditorText] = useState("");

  const navigate = useNavigate();

  const params = useParams();
  const { courseApiClient } = useUserContext();

  useEffect(() => {
    const fetchingCourse = async () => {
      if (params.id) {
        const response = (await courseApiClient.getCourseData(
          params.id
        )) as ICourse;
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
      const response = await courseApiClient.updateCourseContent(
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
      <TabGroup>
        <TabList className="mt-3 flex flex-wrap">
          {editCourseTabs.map((courseTab) => (
            <Tab as={Fragment} key={courseTab.tabName}>
              {({ selected }) => (
                <Link to={courseTab.path}>
                  <button
                    className={`${
                      selected
                        ? "text-secondary !outline-none before:!w-full"
                        : ""
                    } relative -mb-[1px] flex items-center p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                  >
                    <courseTab.icon />
                    <span className="ml-2">{courseTab.tabName}</span>
                  </button>
                </Link>
              )}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <Outlet />
        </TabPanels>
      </TabGroup>

      {/* <Editor
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
      </div> */}
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

export default CourseTextEditor;
