
import useFetchSingleLesson from "../../../../../hooks/api/Lessons/useFetchSingleLesson"
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';

function SingleLesson() {

    const { lessonID, id: courseID } = useParams<{ lessonID: string; id: string }>();

  const { lessonData, isLoading, error } = useFetchSingleLesson(courseID as string, lessonID as string);

  if (isLoading) {
    return <Spin/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!lessonData) {
    return <div>No lesson data found.</div>;
  }

  return (
    <div>
     
      <iframe
        srcDoc={lessonData.content} 
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
        }}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default SingleLesson;