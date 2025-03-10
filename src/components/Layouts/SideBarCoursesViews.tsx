import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import IconFolder from "../Icon/IconFolder";
import IconFile from "../Icon/IconFile";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toggleSidebar } from "../../store/themeConfigSlice";
import AnimateHeight from "react-animate-height";
import { IRootState } from "../../store";
import { useState, useEffect } from "react";

import IconCaretDown from "../Icon/IconCaretDown";
import IconCaretsDown from "../Icon/IconCaretsDown";

import useFetchCourseData from "../../hooks/api/course/useFetchCourseData";
import { ILesson } from "../Admins/Course/Edit/Lessons/TypesLessons";

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

  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  const toggleLesson = (lessonId: string) => {
    setOpenLesson((oldValue) => {
      return oldValue === lessonId ? "" : lessonId;
    });
  };

  const handleBackToCourses = () => {
    navigate("/Dashbord/courses");
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

  return (
    <div className={semidark ? "dark" : ""}>
      <nav
        className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${
          semidark ? "text-white-dark" : ""
        }`}
      >
        <div className="bg-white dark:bg-black h-full">
          <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
            <ul className="font-semibold p-4 py-0">
              <li className="py-[5px]">
                <button
                  type="button"
                  className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                  onClick={handleBackToCourses}
                >
                  <IconCaretsDown className="m-auto rotate-90" />
                </button>
              </li>
              {courseData?.chapters?.map((chapter, index) => (
                <li key={chapter._id} className="py-[5px]">
                  <Link to={`/Dashbord/courses/${id}/chapter/${chapter._id}`}>
                  <button
                    type="button"
                    className={`w-full text-left flex items-center justify-between ${
                      currentMenu === chapter._id ? "active" : ""
                    }`}
                    onClick={() => toggleMenu(chapter._id)}
                  >
                    <IconFolder className="w-5 h-5 mr-2 text-blue-700" />
                    <span>
                      Chapter {index + 1} : {chapter.title}
                    </span>
                    <IconCaretDown
                      className={`w-4 h-4 transition-transform ${
                        currentMenu === chapter._id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  </Link>
                  <AnimateHeight
                    duration={300}
                    height={currentMenu === chapter._id ? "auto" : 0}
                  >
                    <ul className="ltr:pl-14 rtl:pr-14">
                      {chapter.lessons?.map((lesson: ILesson) => (
                        <li key={lesson._id} className="py-[5px]">
                          <Link
                            to={`/Dashbord/courses/${id}/lesson/${lesson._id}`}
                          >
                          <button
                            type="button"
                            className="w-full text-left flex items-center justify-between"
                            onClick={() => toggleLesson(lesson._id)}
                          >
                            <IconFile className="w-6 h-6 mr-2 text-purple-600" />
                            <span > 
                              Lesson {index + 1} : {lesson.title}
                            </span>
                            <IconCaretDown
                              className={`w-4 h-4 transition-transform ${
                                openLesson === lesson._id ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          </Link>
                          <AnimateHeight
                            duration={300}
                            height={openLesson === lesson._id ? "auto" : 0}
                          >
                            {lesson.quizId && (
                              <Link
                                to={`/Dashbord/courses/${id}/quiz/${lesson.quizId._id}`}
                                className="nav-link ml-4 flex items-center "
                              >
                                <IconFile className="w-3 h-3 mr-2 text-purple-600" />
                                Quiz {index + 1} : {lesson.quizId.name}
                              </Link>
                            )}
                          </AnimateHeight>
                        </li>
                      ))}
                      {chapter.quizzes?.map((quiz) => (
                        <li key={quiz._id} className="py-[5px]">
                          {quiz.quizId && (
                            <Link
                              to={`/Dashbord/courses/${id}/quiz/${quiz.quizId._id}`}
                              className="nav-link flex items-center" 
                            >
                              <IconFile className="w-4 h-4 mr-2 text-purple-600 " />
                             <span style={{fontSize: 11}}>  Quiz {index + 1} : {quiz.quizId.name} </span>
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
