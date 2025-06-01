import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toggleSidebar } from "../../store/themeConfigSlice";
import { IRootState } from "../../store";
import { useEffect } from "react";
import IconCaretsDown from "../Icon/IconCaretsDown";
import { useCourse } from "../Admins/SingleCourse";
import { ElementType, LessonTimelineItem, QuizTimelineItem } from "../../types/course";

const SidebarCoursesViews = () => {
  const { id } = useParams();

  const { courseDetails } = useCourse();

  const navigate = useNavigate();
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = useSelector(
    (state: IRootState) => state.themeConfig.semidark
  );
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [location]);

  const handleBackToCourses = () => {
    navigate("/Dashbord/courses");
  };

  console.log("courseDetails", courseDetails);

  return (
    <div className={semidark ? "dark" : ""}>
      <nav
        className={`sidebar fixed min-h-screen h-full top-0 w-[260px]  shadow-lg z-50 transition-all duration-300 ${
          semidark ? "text-white-dark bg-black" : "bg-white"
        }`}
      >
        <div className="h-full p-4">
          <button
            className="mb-4 flex items-center space-x-2 text-gray-700 dark:text-white"
            onClick={handleBackToCourses}
          >
            <IconCaretsDown className="rotate-90" />
            <span>Back to Courses</span>
          </button>
          <PerfectScrollbar className="h-[calc(100vh-80px)]">
            <ul className="space-y-2">
              {courseDetails?.timeline?.map((element) => (
                <>
                  {element.type === ElementType.Chapter ? (
                    // Display chapter timeline
                    <li key={element.data._id}>
                      <span className="block text-lg font-semibold text-black-800 hover:font-bold dark:text-white">
                        {element.data.title}
                      </span>
                      <ul className="ml-4 mt-2 space-y-1">
                        {element.timeline.filter(item => item).map((item: QuizTimelineItem | LessonTimelineItem) => {
                          // @TODO 7tta tl3ab 3la design
                          return (
                            <li key={item.data._id}>
                              <Link
                                to={`/Dashbord/courses/${id}/chapter/${element.data._id}/lesson/${item.data._id}`}
                                className={`block text-black-700 dark:text-gray-300 hover:font-bold ${
                                  location.pathname ===
                                  `/Dashbord/courses/${id}/chapter/${element.data._id}/lesson/${item.data._id}`
                                    ? "font-bold"
                                    : ""
                                }`}
                                style={{ fontSize: 16 }}
                              >
                                {item.type == ElementType.Lesson 
                                  ? item.data.title
                                  : item.data.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ) : element.type === ElementType.Quiz ? (
                    // Display quiz timeline
                    <li key={element.data._id}>
                      <Link
                        to={`/Dashbord/courses/${id}/quiz/${element.data._id}`}
                        className={`block text-lg font-semibold text-black-800 hover:font-bold dark:text-white ${
                          location.pathname ===
                          `/Dashbord/courses/${id}/quiz/${element.data._id}`
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        {element.data.name}
                      </Link>
                    </li>
                  ) : element.type === ElementType.Lesson ? (
                    // Display lesson timeline
                    <li key={element.data._id}>
                      <Link
                        to={`/Dashbord/courses/${id}/lesson/${element.data._id}`}
                        className={`block text-lg font-semibold text-black-800 hover:font-bold dark:text-white ${
                          location.pathname ===
                          `/Dashbord/courses/${id}/lesson/${element.data._id}`
                            ? "font-bold"
                            : ""
                        }`}
                      >
                        {element.data.title}
                      </Link>
                    </li>
                  ) : null}
                </>
              ))}
              {/* {courseDetails?.chapters?.map((chapter) => (
                <li key={chapter._id}>
                  <span className="block text-lg font-semibold text-black-800 hover:font-bold dark:text-white">
                    {chapter.chapterData.title}
                  </span>

                  <ul className="ml-4 mt-2 space-y-1">
                    {chapter.lessons?.map((lesson: ILesson) => (
                      <li key={lesson._id}>
                        <Link
                          to={`/Dashbord/courses/${id}/lesson/${lesson.lessonData._id}`}
                          className={`block text-black-700 dark:text-gray-300 hover:font-bold ${
                            location.pathname ===
                            `/Dashbord/courses/${id}/lesson/${lesson.lessonData._id}`
                              ? "font-bold"
                              : ""
                          }`}
                          style={{ fontSize: 16 }}
                        >
                          {lesson.lessonData.title}
                        </Link>
                        {lesson.lessonData.quizId && (
                          <Link
                            to={`/Dashbord/courses/${id}/quiz/${lesson.lessonData.quizId._id}`}
                            className={`block text-black-700 dark:text-gray-300 hover:font-bold ${
                              location.pathname ===
                              `/Dashbord/courses/${id}/quiz/${lesson.lessonData.quizId._id}`
                                ? "font-bold"
                                : ""
                            }`}
                            style={{ fontSize: 16, marginTop: "0.5rem" }}
                          >
                            Quiz: {lesson.lessonData.quizId.name}
                          </Link>
                        )}
                      </li>
                    ))}
                    {chapter.chapterData.quizzes?.map(
                      (quiz: {
                        _id: string;
                        quizId?: { _id: string; name: string };
                      }) =>
                        quiz.quizId && (
                          <li key={quiz._id}>
                            <Link
                              to={`/Dashbord/courses/${id}/quiz/${quiz.quizId._id}`}
                              className={`block text-black-700 dark:text-gray-300 hover:font-bold ${
                                location.pathname ===
                                `/Dashbord/courses/${id}/quiz/${quiz.quizId._id}`
                                  ? "font-bold"
                                  : ""
                              }`}
                              style={{ fontSize: 16 }}
                            >
                              Quiz: {quiz.quizId.name}
                            </Link>
                          </li>
                        )
                    )}
                  </ul>
                </li>
              ))} */}
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default SidebarCoursesViews;
