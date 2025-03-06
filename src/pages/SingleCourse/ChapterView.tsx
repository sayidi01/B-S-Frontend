import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useFetchChapterData from '../../hooks/api/chapter/UseFetchChapter';

function ChapterView() {

   const { id, chapterId } = useParams<{ id: string; chapterId: string }>();
  
    const { singleChapterData, isLoading, error, getSingleChapter } = useFetchChapterData(id);
  
    useEffect(() => {
      if (id && chapterId) {
        getSingleChapter(id, chapterId);
      }
    }, [id, chapterId, getSingleChapter]);
  
  
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div>
        <p style={{fontWeight: 'bold', fontFamily: "serif", fontSize: 20}}>{singleChapterData?.title}</p>
       
      </div>
  )
}

export default ChapterView
