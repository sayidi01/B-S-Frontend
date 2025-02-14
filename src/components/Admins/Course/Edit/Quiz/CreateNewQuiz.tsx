import React from "react";
import useQuiz from "../../../../../hooks/api/Quiz/useQuiz";
import { QuizQuestion } from "./quiz.types";
import QuestionForm from "./QuestionForm";
import { toast } from "react-hot-toast";
import { uniqueId } from "lodash";
import { useNavigate, useParams } from "react-router-dom";

interface CreateNewQuizProps {}

const CreateNewQuiz: React.FC<CreateNewQuizProps> = ({}) => {
    const navigate = useNavigate()

  const { id: courseId } = useParams();
  const {
    quizData,
    loading,
    error,
    updateQuestion,
    addQuestion,
    removeQuestion,
    createQuiz,
    handleNameChange,
  } = useQuiz();

  console.log(quizData);

  const handleAddQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: uniqueId("question"),
      type: "",
      question: "",
      options: [],
      correctAnswer: "",
      matchingPairs: [],
    };

    addQuestion(newQuestion);
  };

  const handleSubmit = async () => {
    if (quizData.questions.length === 0) {
      toast.error("Please add at least one question.");
      return;
    }

    try {
      await createQuiz(courseId as string);
      toast.success("Quiz created successfully!");
       navigate(`/Dashbord/courses/${courseId}/edit/quiz`)
    } catch (error) {
      toast.error("Failed to create quiz.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Create New Quiz</h1>

      {/* Questions List */}
      <div>
        <h2 className="text-xl font-medium mb-4">Questions</h2>
        <input
          type="text"
          value={quizData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Enter quiz name"
          className="border p-2 w-full mb-4"
        />

        {quizData.questions.map((question, index) => (
          <div key={index} className="mb-4 border p-4 rounded-md">
            <QuestionForm
              question={question}
              updateQuestion={updateQuestion}
              onRemove={() => removeQuestion(index)}
            />
          </div>
        ))}
        <button
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Add New Question
        </button>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-6 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Quiz"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CreateNewQuiz;
