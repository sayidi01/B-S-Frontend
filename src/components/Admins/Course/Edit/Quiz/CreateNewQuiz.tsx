import React from 'react'
import useQuiz from '../../../../../hooks/api/Quiz/useQuiz';
import { QuizQuestion } from './quiz.types';
import QuestionForm from './QuestionForm';

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
        updateQuizType,
        createQuiz,
      } = useQuiz();

      const handleAddQuestion = () => {
        const newQuestion: QuizQuestion = {
          question: "",
          options: [],
          correctAnswer: "",
          matchingPairs: [],
        };
        addQuestion(newQuestion);
      };
    
      const handleSubmit = async () => {
        if (!quizData.type || quizData.questions.length === 0) {
          alert("Please select a quiz type and add at least one question.");
          return;
        }
        await createQuiz(courseId);
      };
    
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
    <h1 className="text-2xl font-bold mb-4">Create New Quiz</h1>

    {/* Quiz Type Selection */}
    <div className="mb-6">
      <label className="block font-medium mb-2">Select Quiz Type:</label>
      <select
        value={quizData.type}
        onChange={(e) => updateQuizType(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="">-- Select Quiz Type --</option>
        <option value="true_false">True/False</option>
        <option value="multiple_choice">Multiple Choice</option>
        <option value="single_choice">Single Choice</option>
        <option value="short_answer">Short Answer</option>
        <option value="fill_in_the_blank">Fill in the Blank</option>
        <option value="matching">Matching</option>
        <option value="text_with_questions">Text with Questions</option>
        <option value="grammar_quiz">Grammar Quiz</option>
      </select>
    </div>

    {/* Questions List */}
    <div>
      <h2 className="text-xl font-medium mb-4">Questions</h2>
      {quizData.questions.map((question, index) => (
        <div key={index} className="mb-4 border p-4 rounded-md">
          <QuestionForm
            question={question}
            type={quizData.type}
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

    {/* Error Message */}
    {error && <p className="text-red-500 mt-4">{error}</p>}
  </div>

  )
}

export default CreateNewQuiz
