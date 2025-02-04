import React, { Fragment, useCallback, useEffect, useState } from "react";

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

  const { id, chapterId } = params;
  console.log("params", params);

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
                <Link to={`/Dashbord/courses/${id}/edit/${courseTab.path}`}>
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
    </div>
  );
}

export default CourseTextEditor;
