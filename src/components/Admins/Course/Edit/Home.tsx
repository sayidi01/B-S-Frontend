import { Alert, Button, Spin, Typography } from "antd";
import useFetchCourseData from "../../../../hooks/api/course/useFetchCourseData";
import { useParams } from "react-router-dom";
import { useState } from "react";
import EditCourse from '../../EditCourse';
import { CloseOutlined, EditOutlined } from "@ant-design/icons";


const { Title } = Typography;

export default function Home() {
  const { id } = useParams();
  const { courseData, error, isLoading } = useFetchCourseData(id as string);

  const [isEditCourse, setIsEditCourse] = useState(false);

  


  if (error) {
    return (
      <Alert message={error || "Failed to retrieve course data"} type="error" />
    );
  }


  if (isLoading) {
    return <Spin />;
  }


  if (!courseData) {
    return null;
  }

 
  const handleEditClick = () => {
    setIsEditCourse(!isEditCourse); 
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '1rem' }}>
        <Title>{courseData.title}</Title>
        <Button
          type="primary"
          onClick={handleEditClick} 
        >
         {isEditCourse ? <CloseOutlined /> : <EditOutlined />} 
        </Button>
      </div>

    
      {isEditCourse ? (
        <EditCourse courseData={courseData} />  
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: courseData.description
          }}
        />
      )}
    </>
  );
}
