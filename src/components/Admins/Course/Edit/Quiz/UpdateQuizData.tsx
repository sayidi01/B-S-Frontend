import UseFetchSingleQuiz from "../../../../../hooks/api/Quiz/UseFetchSingleQuiz";
import { useNavigate, useParams } from "react-router-dom";
import QuestionForm from "./QuestionForm";

import { QuizQuestion } from "./quiz.types";
import { uniqueId } from "lodash";
import useManageQuiz from "../../../../../hooks/api/Quiz/useManageQuiz";
import UseFetchUpdateQuiz from "../../../../../hooks/api/Quiz/UseFetchUpdateQuiz";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { extractMsgFromError } from "../../../../../utils";

function UpdateQuizData() {
  const { id: courseID, quizID } = useParams();

  const { quizData } = UseFetchSingleQuiz(courseID as string, quizID as string);
 
  const navigate = useNavigate()

  const { updateQuiz, isLoading: isLoadingUpdatingQuiz } = UseFetchUpdateQuiz();

  const {
    methods: { updateQuestion, addQuestion, removeQuestion },
    quiz,
  } = useManageQuiz(quizData);

  console.log("quiz", quiz);

  const handleAddQuestion = () => {
    const newQuestion: QuizQuestion = {
      _id: uniqueId("question"),
      type: "",
      question: "",
      options: [],
      correctAnswer: "",
      matchingPairs: [],
    };

    addQuestion(newQuestion);
  };

  const handleUpdateQuizClick = useCallback(async () => {
    if (!quiz) return;

    try {
      const updatedQuiz = await updateQuiz(quiz);
      if (!updatedQuiz)
        throw new Error("Failed to update quiz, internal error");

      toast.success("Successfully updated quiz");
      navigate(`/Dashbord/courses/${courseID}/edit/quiz`);
    } catch (error) {
      const msg = extractMsgFromError(error);
      toast.error("Failed to update quiz, reason: ".concat(msg));
    }
  }, [quiz]);

  if (!quiz) return null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <input
        type="text"
        id="name"
        name="name"
        value={quiz.name}
        className="border p-2 w-full mb-4"
      />

      {quiz.questions.map((question) => (
        <div key={question._id} className="mb-4 border p-4 rounded-md">
          <QuestionForm
            question={question}
            updateQuestion={updateQuestion}
            onRemove={() => removeQuestion(question._id)}
          />
        </div>
      ))}

      <button
        onClick={handleAddQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Add New Question
      </button>
      <div>
        <button
          className="mt-6 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
          disabled={isLoadingUpdatingQuiz}
          onClick={handleUpdateQuizClick}
        >
          {isLoadingUpdatingQuiz ? "updating..." : "Updating Quiz"}
        </button>
      </div>
    </div>
  );
}

export default UpdateQuizData;
