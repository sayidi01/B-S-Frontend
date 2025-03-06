import { Button, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import useFetchQuizzesByCourseData from "../../../../../hooks/api/course/useFetchQuizzesByCourseData";
import { useParams } from "react-router-dom";
import useFetchAddQuizToLesson from "../../../../../hooks/api/Lessons/useFetchAddQuizToLesson";
import { ILesson } from "./TypesLessons";

interface ModalAssignQuizToLessonProps {
  isOpen: boolean;
  lessonId: string | null;
  updateLessonData: (lessonID: string, newData: ILesson) => void;
  onClose: () => void;
}

const ModalAssignQuizToLesson: React.FC<ModalAssignQuizToLessonProps> = ({
  isOpen,
  onClose,
  lessonId,
  updateLessonData,
}) => {
  const { id: courseID } = useParams();
  const { courseData } = useFetchQuizzesByCourseData(courseID as string);

  const { addQuizToLesson } = useFetchAddQuizToLesson();

  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const quizzes = courseData?.data?.quizzes || [];

  console.log(quizzes);
  console.log(selectedQuiz, "selectedQuiz");

  useEffect(() => {
    if (quizzes.length > 0) {
      setSelectedQuiz(quizzes[0]._id);
    }
  }, [quizzes]);

  const handleSelectChange = (value: string) => {
    setSelectedQuiz(value);
  };

  const handleSubmitQuizToLesson = async () => {
    if (!selectedQuiz || !lessonId) return;

    try {
      const response = await addQuizToLesson(lessonId, selectedQuiz);
      console.log("Quiz added to lesson successfuly");
      updateLessonData(lessonId, response.data.lesson);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        title="Assign Quiz To Lesson"
        open={isOpen}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Cancel
          </Button>,
          <Button
            key="assign"
            type="primary"
            onClick={handleSubmitQuizToLesson}
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
          {quizzes.map((quiz) => (
            <Select.Option key={quiz._id} value={quiz._id}>
              {quiz.name}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </div>
  );
};

export default ModalAssignQuizToLesson;
