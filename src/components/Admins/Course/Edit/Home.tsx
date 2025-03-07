import { Alert, Button, Spin, Typography } from "antd";
import useFetchCourseData from "../../../../hooks/api/course/useFetchCourseData";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditCourse from '../../EditCourse';
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useUserContext } from "../../../../config/UserContext";
import { useSetState } from "@mantine/hooks";


const { Title } = Typography;

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
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '1rem' }}>
       
        <Title>{courseView.title}</Title>
        <Button className="mb-3"
          type="primary"
          onClick={handleEditClick} 
        >
         {isEditCourse ? <CloseOutlined /> : <EditOutlined />} 
        </Button>
      </div>

    
      {isEditCourse ? (
        <EditCourse courseView={courseView} />  
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: courseView.description
          }}
        />
      )}
    </>
  );
}
