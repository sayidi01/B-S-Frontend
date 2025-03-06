import React from 'react'
import useFetchSingleLesson from '../../hooks/api/Lessons/useFetchSingleLesson'
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';


function LessonView() {

  const { id, lessonID } = useParams();

  const {lessonData, isLoading, error} = useFetchSingleLesson(id as string, lessonID as string);

  

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
     <p style={{fontWeight: "bold", fontSize: 20, marginTop: '2rem'}}>Title :  {lessonData.title}</p>
      <p  style={{fontWeight: "bold", fontSize: 20, marginTop: '2rem'}}> Description:</p>
      <p style={{marginTop: '1rem'}}> {lessonData.description}</p>
      <p  style={{fontWeight: "bold", fontSize: 20, marginTop: '2rem'}}>Content:</p>
      <iframe
        title={`Lesson Content: ${lessonData.title}`}
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
  )
}

export default LessonView
