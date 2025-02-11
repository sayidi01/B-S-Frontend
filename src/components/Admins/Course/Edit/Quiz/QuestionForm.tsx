import React, { useState } from "react";
import { QuizQuestion } from "./quiz.types";

interface QuestionFormProps {
    question: QuizQuestion;
    index: number; 
    onRemove: () => void;
    onUpdate: (updatedQuestion: QuizQuestion) => void; 
}

const QuestionForm: React.FC<QuestionFormProps> = ({ question, onRemove, index, onUpdate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(question);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestion = {
      ...currentQuestion,
      [e.target.name]: e.target.value,
    };
    setCurrentQuestion(updatedQuestion);
    onUpdate(updatedQuestion);
    console.log(`Updated Question[${index}]`, updatedQuestion);
  };

  const handleOptionChange = (
    optionIndex: number,
    field: string,
    value: string | boolean
  ) => {
    const updatedOptions = currentQuestion.options?.map((opt, i) =>
      i === optionIndex ? { ...opt, [field]: value } : opt
    );
    const updatedQuestion = {
      ...currentQuestion,
      options: updatedOptions,
    };
    setCurrentQuestion(updatedQuestion);
    onUpdate(updatedQuestion);
    console.log(`Updated Options for Question[${index}]`, updatedQuestion);
  };

  
  const addOption = () => {
    const updatedQuestion = {
      ...currentQuestion,
      options: [
        ...(currentQuestion.options || []),
        { text: "", isCorrect: false },
      ],
    };
    setCurrentQuestion(updatedQuestion);
    onUpdate(updatedQuestion); 
  };
  const removeOption = (optionIndex: number) => {
    const updatedOptions = [...(currentQuestion.options || [])];
    updatedOptions.splice(optionIndex, 1);
    const updatedQuestion = {
      ...currentQuestion,
      options: updatedOptions,
    };
    setCurrentQuestion(updatedQuestion);
    onUpdate(updatedQuestion); 
  };


  const updateType = (type: string) => {
    setCurrentQuestion((prev) => ({ ...prev, type }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Question {currentQuestion.question}</h3>
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>

      {/* Sélection du type de question */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Select Question Type:</label>
        <select
          value={currentQuestion.type}
          onChange={(e) => updateType(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">-- Select Question Type --</option>
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

      {/* Texte de la question */}
      <input
        type="text"
        name="question"
        value={currentQuestion.question}
        onChange={handleChange}
        placeholder="Enter question text"
        className="border p-2 w-full mb-4"
      />

      {/* Options ou Réponse Correcte */}
      {["true_false", "multiple_choice", "single_choice", "matching"].includes(
        currentQuestion.type
      ) && (
        <div>
          <h4 className="font-medium mb-2">Options</h4>
          {currentQuestion.options?.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                name="text"
                value={option.text}
                onChange={(e) => handleOptionChange(index, "text", e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="border p-2 mr-2"
              />
              <input
                type="checkbox"
                name="isCorrect"
                checked={option.isCorrect}
                onChange={(e) => handleOptionChange(index, "isCorrect", e.target.checked)}
                className="mr-2"
              />
              <span>Correct</span>
              <button
                onClick={() => removeOption(index)}
                className="text-red-500 ml-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addOption}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Add Option
          </button>
        </div>
      )}

      {["short_answer", "fill_in_the_blank", "text_with_questions", "grammar_quiz"].includes(
        currentQuestion.type
      ) && (
        <div>
          <h4 className="font-medium mb-2">Correct Answer</h4>
          <input
            type="text"
            name="correctAnswer"
            value={currentQuestion.correctAnswer || ""}
            onChange={(e) => handleChange(e as any)}
            placeholder="Enter correct answer"
            className="border p-2 w-full"
          />
        </div>
      )}
    </div>
  );
};

export default QuestionForm;