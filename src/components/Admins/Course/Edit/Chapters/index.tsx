import { useState } from "react";
import useFetchChapterData from "../../../../../hooks/api/chapter/UseFetchChapter";
import { useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa"; 
import { IChapter } from "../../../../../types/chapter";

export default function Chapters() {
  const { id } = useParams();
  const { chapterData, error, setError,isLoading , createChapter} = useFetchChapterData(id);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [newChapterTitle, setNewChapterTitle] = useState(""); 

  if (isLoading) {
    return <div className="text-center py-8 text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!chapterData) {
    return (
      <div className="text-center py-8 text-gray-600">
        No chapter data found.
      </div>
    );
  }

  const toggleQuiz = (chapterId: string) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  const handleCreateChapter = async () => {
    if (newChapterTitle.trim()) {
      try {
        await createChapter(newChapterTitle, id as string);
        setNewChapterTitle(""); 
        document.getElementById("popover")?.classList.add("hidden");
      } catch (err) {
        setError("Failed to create chapter. Please try again.");
      }
    } else {
      setError("Chapter title cannot be empty.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            const popover = document.getElementById("popover");
            if (popover) popover.classList.toggle("hidden");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Add New Chapter
        </button>
      </div>
    
      <div
        id="popover"
        className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
          <FaTimes
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer w-5 h-5"
            onClick={() =>
              document.getElementById("popover")?.classList.add("hidden")
            }
          />

          <h2 className="text-xl font-semibold mb-4">Create new chapter</h2>
          <input
            type="text"
            placeholder="Chapter Title"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            value={newChapterTitle}
            onChange={(e) => setNewChapterTitle(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 w-full"
            onClick={handleCreateChapter}
          >
            Create
          </button>
        </div>
      </div>

      {/* Liste des chapitres */}
      <div className="space-y-6 max-w-3xl mx-auto">
        {chapterData.map((chapter) => (
          <div
            key={chapter._id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleQuiz(chapter._id)}
            >
              <h2 className="text-xl font-semibold text-gray-800">
                Chapter {chapter.title}
              </h2>
              <span className="text-gray-500">
                {expandedChapter === chapter._id ? "▲" : "▼"}
              </span>
            </div>

            {expandedChapter === chapter._id && (
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  Quizzes
                </h3>
                <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100">
                  <ul className="space-y-2">
                    {chapter.quizzes.map((quiz) => (
                      <li
                        key={quiz._id}
                        className="bg-gray-50 p-3 rounded-md flex justify-between items-center hover:bg-gray-100 transition-colors duration-200"
                      >
                        <span className="text-gray-700">
                          Quiz: {quiz.title} (After Lesson:{" "}
                          {quiz.afterLessonIndex})
                        </span>
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors duration-200"
                          onClick={() => alert(`Starting quiz: ${quiz.title}`)}
                        >
                          View Quiz
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
