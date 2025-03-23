import { Alert, Button, Spin, Typography } from "antd";
import useFetchCourseData from "../../../../hooks/api/course/useFetchCourseData";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditCourse from '../../EditCourse';
import { CloseOutlined, EditOutlined } from "@ant-design/icons";


export default function Home() {
  const { id } = useParams();
  const { courseData, error, isLoading } = useFetchCourseData(id as string);

  const [isEditCourse, setIsEditCourse] = useState(false);

  const [courseView, setcourseView] = useState(courseData)

  

  useEffect(() => {
    setcourseView(courseData)
  },[courseData])


  if (error) {
    return (
      <Alert message={error || "Failed to retrieve course data"} type="error" />
    );
  }


  if (isLoading) {
    return <Spin />;
  }


  if (!courseView) {
    return null;
  }

 
  const handleEditClick = () => {
    setIsEditCourse(!isEditCourse); 
  };
console.log("here: ",courseView)

  return (
    <>
      <div style={{ display: 'flex', justifyContent: "start", padding: "1rem" }}>
       
     
        <Button className="text-secondary hover:text-secondary transition-all duration-700"
          onClick={handleEditClick} 
        >
         {isEditCourse ? <CloseOutlined /> : <EditOutlined />} 
        </Button>
      </div>

    
      {isEditCourse ? (
        <EditCourse  courseView={{ ...courseView.courseData, title: courseView.courseData.title,imageCourse: courseView.courseData.imageCourse, description: courseView.courseData.description }} />  
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: courseView.courseData.description
          }}
        />
      )}
    </>
  );
}
