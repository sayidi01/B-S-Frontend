import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toggleSidebar } from "../../store/themeConfigSlice";
import { IRootState } from "../../store";
import {  useEffect } from "react";
import { ILesson } from "../Admins/Course/Edit/Lessons/TypesLessons";
import IconCaretsDown from "../Icon/IconCaretsDown";
import { useCourse } from "../Admins/SingleCourse";

const SidebarCoursesViews = () => {
  const { id } = useParams();


  const {courseDetails} = useCourse()

  

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
              {courseDetails?.chapters?.map((chapter) => (
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
              ))}
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default SidebarCoursesViews;
