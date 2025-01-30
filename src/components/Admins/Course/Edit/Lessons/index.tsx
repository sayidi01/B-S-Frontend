import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateNewLessonPopover from "./CreateNewLessonPopover";

export default function Lessons() {
  const { id } = useParams<{ id: string; chapterId: string }>();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      console.error("Course ID is missing in the URL");
    } else {
      console.log("Course ID:", id);
    }
  }, [id]);

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
