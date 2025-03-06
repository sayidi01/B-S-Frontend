import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateNewLessonPopover from "./CreateNewLessonPopover";
import useFetchLessonData from "../../../../../hooks/api/Lessons/useFetchLessonData";

import { FaEllipsisV } from "react-icons/fa";
import { Dropdown, Button } from "antd";
import ModalAssignQuizToLesson from "./ModalAssignQuizToLesson";
import { ILesson } from "./TypesLessons";

export default function Lessons() {
  const { id } = useParams<{
    id: string;
    chapterId: string;
    lessonId: string;
  }>();

  const navigate = useNavigate();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const fetchLessonDataMethods = useFetchLessonData(id as string);
  const { lessonData, isLoading, deleteLesson } = fetchLessonDataMethods;

  const [lessonResult, setLessonResult] = useState(lessonData);

  const updateLessonData = (lessonID: string, newData: ILesson) => {
    setLessonResult((prev) => {
      const updatedLessons = prev.map((lesson) => {
        if (lesson._id === lessonID) {
          return newData;
        }
        return lesson;
      });
      return updatedLessons;
    });
  };

  useEffect(() => {
    setLessonResult(lessonData);
  }, [lessonData]);

  useEffect(() => {
    console.log("lessondata", lessonData);
  }, [lessonData]);

  const toggleLesson = (lessonId: string) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  useEffect(() => {
    console.log("lessondata", lessonData);
  }, [lessonData]);

  useEffect(() => {
    if (!id) {
      console.error("Course ID is missing in the URL");
    } else {
      console.log("Course ID:", id);
    }
  }, [id]);

  const menuItems = (lessonId: string) => [
    {
      key: "update",
      label: "Edit",
      onClick: () => {
        navigate(`/Dashbord/courses/${id}/edit/lessons/${lessonId}`);
      },
    },
    {
      key: "delete",
      label: "Delete",
      onClick: () => {
        deleteLesson(lessonId);
      },
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-6">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsPopoverOpen(true)}
        >
          Add New Lesson
        </button>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto">
        {lessonResult
          ? lessonResult.map((lesson, index) => {
              return (
                <div
                  key={lesson._id}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-between items-center">
                    <div
                      className="flex justify-between items-center cursor-pointer w-full"
                      onClick={() => toggleLesson(lesson._id)}
                    >
                      <h2 className="text-xl font-semibold text-gray-800">
                        Lesson {index + 1} : {lesson.title}
                      </h2>
                      <span className="text-gray-500">
                        {expandedLesson === lesson._id ? "▲" : "▼"}
                      </span>
                    </div>
                    <Dropdown
                      menu={{ items: menuItems(lesson._id) }}
                      trigger={["click"]}
                    >
                      <Button type="text" icon={<FaEllipsisV />} />
                    </Dropdown>
                  </div>

                  {expandedLesson === lesson._id && (
                    <div className="mt-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            setSelectedLesson(lesson._id);
                            setIsModalOpen(true);
                          }}
                          className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition-colors duration-200 mb-3"
                        >
                          Assign Quiz → Lesson
                        </button>
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-3">
                        Description
                      </h3>
                      <p className="text-gray-600">{lesson.description}</p>
                      <h3 className="text-lg font-medium text-gray-700 mt-4">
                        Quiz Assign To Lesson : {lesson.quizId?.name}
                      </h3>
                      <button
                        onClick={() =>
                          navigate(
                            `/Dashbord/courses/${id}/edit/lesson/${lesson._id}`
                          )
                        }
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        View Lesson
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          : !isLoading && <p>No lessons found.</p>}
      </div>

      {isPopoverOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setIsPopoverOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">Create New Lesson</h2>
            <CreateNewLessonPopover
              {...fetchLessonDataMethods}
              onClose={() => setIsPopoverOpen(false)}
            />
          </div>
        </div>
      )}
      <ModalAssignQuizToLesson
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lessonId={selectedLesson}
        updateLessonData={updateLessonData}
      />
    </div>
  );
}
