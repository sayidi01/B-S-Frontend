import PerfectScrollbar from "react-perfect-scrollbar";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toggleSidebar } from "../../store/themeConfigSlice";
import AnimateHeight from "react-animate-height";
import { IRootState } from "../../store";
import { useState, useEffect } from "react";

import IconCaretDown from "../Icon/IconCaretDown";

import useFetchCourseData from "../../hooks/api/course/useFetchCourseData";
import { ILesson } from "../Admins/Course/Edit/Lessons/TypesLessons";
import IconCaretsDown from "../Icon/IconCaretsDown";

const SidebarCoursesViews = () => {
  const { id } = useParams();
  const { courseData } = useFetchCourseData(id as string);

  const navigate = useNavigate();

  const [currentMenu, setCurrentMenu] = useState<string>("");
  const [openLesson, setOpenLesson] = useState<string>("");

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = useSelector(
    (state: IRootState) => state.themeConfig.semidark
  );
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add("active");
      const ul: any = selector.closest("ul.sub-menu");
      if (ul) {
        let ele: any =
          ul.closest("li.menu").querySelectorAll(".nav-link") || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [location]);

  const toggleLesson = (lessonId: string) => {
    setOpenLesson((oldValue) => {
      return oldValue === lessonId ? "" : lessonId;
    });
  };

  const handleBackToCourses = () => {
    navigate("/Dashbord/courses");
  };

  return (
    <div className={semidark ? "dark" : ""}>
      <nav
        className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${
          semidark ? "text-white-dark" : ""
        }`}
      >
        <div className="bg-white dark:bg-black h-full">
          <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
            <ul className="relative font-semibold space-y-0.5 p-4 py-0">
            <button
              type="button"
              className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
             onClick={handleBackToCourses}
            >
              <IconCaretsDown className="m-auto rotate-90" />
            </button>
                
              {courseData?.chapters?.map((chapter, index) => (
                <li key={chapter._id} className="menu nav-item">
                  <Link to={`/Dashbord/courses/${id}/chapter/${chapter._id}`}>
                    <button
                      type="button"
                      className={`nav-link group w-full ${
                        currentMenu === chapter._id ? "active" : ""
                      }`}
                      onClick={() => toggleMenu(chapter._id)}
                    >
                      Chapter {index + 1} : {chapter.title}
                    </button>
                  </Link>

                  <AnimateHeight
                    duration={300}
                    height={currentMenu === chapter._id ? "auto" : 0}
                  >
                    <ul className="sub-menu">
                      {chapter.lessons?.map((lesson: ILesson) => (
                        <li key={lesson._id} className="nav-item">
                          <Link
                            to={`/Dashbord/courses/${id}/lesson/${lesson._id}`}
                          >
                            <button
                              type="button"
                              className="nav-link w-full text-left"
                              onClick={() => toggleLesson(lesson._id)}
                            >
                              Lesson {index + 1} : {lesson.title}
                            </button>
                          </Link>
                          <AnimateHeight
                            duration={300}
                            height={openLesson === lesson._id ? "auto" : 0}
                          >
                            {lesson.quizId && (
                              <Link
                                to={`/Dashbord/courses/${id}/quiz/${lesson.quizId._id}`}
                                className="nav-link ml-4"
                              >
                                Quiz {index + 1} :{lesson.quizId.name}
                              </Link>
                            )}
                          </AnimateHeight>
                        </li>
                      ))}
                      {chapter.quizzes?.map((quiz) => (
                        <li key={quiz._id} className="nav-item">
                          {quiz.quizId && (
                            <Link
                              to={`/Dashbord/courses/${id}/quiz/${quiz.quizId._id}`}
                              className="nav-link"
                            >
                              Quiz {index + 1} : {quiz.quizId.name}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </AnimateHeight>
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
