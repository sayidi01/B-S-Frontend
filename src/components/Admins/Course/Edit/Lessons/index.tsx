import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateNewLessonPopover from "./CreateNewLessonPopover";
import useFetchLessonData from "../../../../../hooks/api/Lessons/useFetchLessonData";

import { FaEllipsisV } from "react-icons/fa";
import { Dropdown, Button } from "antd";

export default function Lessons() {
  const { id } = useParams<{
    id: string;
    chapterId: string;
    lessonId: string;
  }>();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const { lessonData, isLoading, deleteLesson } = useFetchLessonData(
    id as string
  
  );

  useEffect(() => {
    console.log("lessondata", lessonData)
  },[lessonData])

  const toggleLesson = (lessonId: string) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

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
    },
    {
      key: "delete",
      label: "Delete",
      onClick: () => {
        console.log("Deleting lesson with ID:", lessonId); 
        deleteLesson(lessonId);
      },
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          onClick={() => setIsPopoverOpen(true)}
        >
          Add New Lesson
        </button>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto">
        {lessonData && lessonData.length > 0
          ? lessonData.map((lesson) => (
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
                      Lesson: {lesson.title}
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
                    <h3 className="text-lg font-medium text-gray-700 mb-3">
                      Description
                    </h3>
                    <p className="text-gray-600">{lesson.description}</p>
                  </div>
                )}
              </div>
            ))
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
            <CreateNewLessonPopover onClose={() => setIsPopoverOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
