import React, { useEffect, useState } from "react";
import { Modal, Button, Select } from "antd";
import useFetchQuizzesByCourseData from "../../../../../hooks/api/course/useFetchQuizzesByCourseData";
import { useParams } from "react-router-dom";
import UseFetchAddQuizTochapter from "../../../../../hooks/api/chapter/UseFetchAddQuizToChapter";
import { IChapter, SingleChapterView } from "../../../../../types/chapter";
import { QuizGetterResponse } from "../../../../../types/course";

interface ModalAssignQuizToChapterProps {
  isOpen: boolean;
  onClose: () => void;
  chapterId: string | null;
  updateCapterData: (chapterId: string, newData: SingleChapterView) => void;
}

const ModalAssignQuizToChapter: React.FC<ModalAssignQuizToChapterProps> = ({
  isOpen,
  onClose,
  chapterId,
  updateCapterData
}) => {
  const { id: courseID } = useParams();
  const { courseData } = useFetchQuizzesByCourseData(courseID as string);
  const { addQuizTocChapter } = UseFetchAddQuizTochapter();

  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  
  const quizzes = courseData?.data.quizzes || [];


  console.log(quizzes)
  console.log(selectedQuiz , "selectedQuiz")


  useEffect(() => {
    if (quizzes.length > 0) {
      setSelectedQuiz(quizzes[0]._id);
    }
  }, [courseData]);

  const handleSelectChange = (value: string) => {
    setSelectedQuiz(value);
  };

  const handleQuizAssign = async () => {
    if (!selectedQuiz || !chapterId) return;
    
    const orderQuiz = quizzes.length; 

    try {
     const response =  await addQuizTocChapter(courseID as string,chapterId, selectedQuiz,  orderQuiz);

     console.log("Quiz added to chapter successfuly")
     updateCapterData(chapterId, response as SingleChapterView);
      onClose();
    } catch (error) {
      console.log(error);
    }
};

  return (
    <Modal
      title="Assign Quiz To Chapter"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button 
          key="assign" 
          type="primary" 
          onClick={handleQuizAssign} 
          disabled={!selectedQuiz}
        >
          Assign Quiz
        </Button>,
      ]}
    >
      <Select
        style={{ width: "100%" }}
        placeholder="Select a quiz"
        value={selectedQuiz}
        onChange={handleSelectChange} 
      >
        {quizzes.map((quiz: QuizGetterResponse) => (
          <Select.Option key={quiz._id} value={quiz._id}>
            {quiz.name}
          </Select.Option>
        ))}
      </Select>
     
    </Modal>
  );
};

export default ModalAssignQuizToChapter;
