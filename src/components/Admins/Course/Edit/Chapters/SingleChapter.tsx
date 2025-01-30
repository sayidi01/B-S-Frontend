import React, { useEffect } from "react";
import { useParams } from "react-router-dom"; 
import useFetchChapterData from "../../../../../hooks/api/chapter/UseFetchChapter";


const SingleChapter: React.FC = () => {

  const { courseId, chapterId } = useParams<{ courseId: string; chapterId: string }>();

  const { singleChapterData, isLoading, error, getSingleChapter } = useFetchChapterData(courseId);

  useEffect(() => {
    if (courseId && chapterId) {
      getSingleChapter(courseId, chapterId);
    }
  }, [courseId, chapterId, getSingleChapter]);



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>{singleChapterData?.title}</h1>
      <p>Chapter ID: {singleChapterData?._id}</p>
      <p>Course ID: {singleChapterData?.courseId}</p>
    </div>
  );
};

export default SingleChapter;