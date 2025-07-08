import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/Api";
import { IcourseResponses,  ChapterTimelineItem, LessonTimelineItem, QuizTimelineItem } from "../../types/course";

function DetailsCourseProgressStudent() {
  const { id, studentId } = useParams();
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [dataStudentProgress, setDataStudentProgress] = useState<IcourseResponses[]>([]);

  useEffect(() => {
    if (studentId) {
      axiosInstance
        .get<IcourseResponses[]>(`student/${studentId}/courses`)
        .then(({ data }) => {
          setDataStudentProgress(data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des cours", error);
        });
    }
  }, [studentId]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapter((prev) => (prev === chapterId ? null : chapterId));
  };

  const currentCourse = dataStudentProgress.find((course) => course.courseId._id === id);

  if (!currentCourse) {
    return (
      <div className="text-center mt-10 text-gray-500">
         No course found for this ID.
      </div>
    );
  }

  const timeline = currentCourse.courseDetails.timeline.filter(
    (item): item is ChapterTimelineItem => item?.type === "chapter" && "timeline" in item && !!item.timeline
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
         Course Progress
      </h1>

      <div className="space-y-6 max-w-3xl mx-auto">
        {timeline.map((chapter, index) => (
          <div
            key={chapter.data._id + index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div
              className="flex justify-between items-center cursor-pointer w-full"
              onClick={() => toggleChapter(chapter.data._id)}
            >
              <h2 className="text-xl font-semibold text-gray-800">
                📘 {chapter.data.title}
              </h2>
              <span className="text-gray-500 text-lg">
                {expandedChapter === chapter.data._id ? "▲" : "▼"}
              </span>
            </div>

            {expandedChapter === chapter.data._id && (
              <div className="mt-4">
                <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {chapter.timeline
                    ?.filter((item): item is LessonTimelineItem | QuizTimelineItem => !!item && "data" in item && "_id" in item.data)
                    .map((item, idx) => (
                      <li
                        key={item.data._id + idx}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <span className="flex gap-2 items-center text-gray-800">
                          {item.type === "lesson" ? "📝 Leçon" : "🧠 Quiz"} :
                          {item.type === "lesson"
                            ? item.data.title
                            : item.data.name}
                        </span>
                        <span
                          className={`text-sm font-medium px-3 py-1 rounded-full ${
                            (item.data as any).isCompleted
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {(item.data as any).isCompleted ? "Completed ✅" : "Not Completed ❌"}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailsCourseProgressStudent;
