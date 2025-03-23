import React, { useContext, useEffect, useState,  createContext  } from "react";
import { Outlet, useParams } from "react-router-dom";
import axiosInstance from "../../config/Api";
import { ICourse } from "../../types/course";
import { isObject } from "lodash";
import IconLoader from "../Icon/IconLoader";
import { Alert } from "antd";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import useFetchCourseData from "../../hooks/api/course/useFetchCourseData";



type CourseContextType = {
  course: ICourse | null | false;
  setCourse: React.Dispatch<React.SetStateAction<ICourse | null | false>>;
  courseDetails: ICourse | null;
  setcourseDetails: React.Dispatch<React.SetStateAction<ICourse | null>>;
 
};


const CourseContext = createContext<CourseContextType>({
  course: null,
  setCourse: () => {},
  courseDetails: null,
  setcourseDetails: () => {},
});


export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseContext.Provider");
  }
  return context;
};



export default function SingleCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState<ICourse | null | false>(null);
  const { courseData } = useFetchCourseData(id as string);

  const [courseDetails, setcourseDetails] = useState(courseData)

  
  useEffect(() => {
    setcourseDetails(courseData);
  }, [courseData]);

  // GET SINGLE COURSE ID

  useEffect(() => {
    console.log("Course ID:", id);
    if (id) {
      axiosInstance
        .get(`/course/${id}`)
        .then(({ data }) => {
          console.log(data);
          if (isObject(data)) {
            setCourse(data as ICourse);
          } else setCourse(false);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération cours ", error);
          setCourse(false);
        });
    }
  }, [id]);

  if (course == null) return <IconLoader />;
  if (course === false)
    return <Alert message={"Failed to load course"} type="error" />;

  return (
    <div>

      <CourseContext.Provider value={{ course, setCourse, courseDetails, setcourseDetails}}>
       
      <Outlet />
    </CourseContext.Provider>
    </div>
  );
}
