import React from 'react'
import useQuiz from '../../../../../hooks/api/Quiz/useQuiz';
import { QuizQuestion } from './quiz.types';
import QuestionForm from './QuestionForm';
import { toast } from "react-hot-toast";

interface CreateNewQuizProps {
    courseId: string;
  }

const CreateNewQuiz: React.FC<CreateNewQuizProps> = ({ courseId }) => {
    const {
        quizData,
        loading,
        error,
        addQuestion,
        removeQuestion,
        createQuiz,
        setQuizData
        
      } = useQuiz();

     

      const handleAddQuestion = () => {
        const newQuestion: QuizQuestion = {
            type: "", 
          question: "",
          options: [],
          correctAnswer: "",
          matchingPairs: [],
        };
        console.log("New Question Added:", newQuestion);
        addQuestion(newQuestion);
      };

      const handleUpdateQuestion = (index: number, updatedQuestion: QuizQuestion) => {
        setQuizData((prev) => {
          const updatedQuestions = [...prev.questions];
          updatedQuestions[index] = updatedQuestion;
          return { ...prev, questions: updatedQuestions };
        });
      };
    
      const handleSubmit = async () => {
        if (quizData.questions.length === 0) {
          toast.error("Please add at least one question.");
          return;
        }
    
        try {
          await createQuiz(courseId);
          toast.success("Quiz created successfully!");
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
        {quizData.questions.map((question, index) => (
          <div key={index} className="mb-4 border p-4 rounded-md">
          <QuestionForm
            question={question}
            index={index} 
            onRemove={() => removeQuestion(index)}
            onUpdate={(updatedQuestion) =>
              handleUpdateQuestion(index, updatedQuestion)
            } 
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


  )
}

export default CreateNewQuiz
