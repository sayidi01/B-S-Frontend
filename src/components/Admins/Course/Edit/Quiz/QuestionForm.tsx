import React, { useState } from "react";
import { QuizQuestion } from "./quiz.types";

interface QuestionFormProps {
  question: QuizQuestion;
  type: string;
  onRemove: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ question, type, onRemove }) => {
  const [currentQuestion, setCurrentQuestion] = useState(question);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOptionChange = (index: number, field: string, value: string | boolean) => {
    setCurrentQuestion((prev) => {
      const updatedOptions = prev.options?.map((opt, i) =>
        i === index ? { ...opt, [field]: value } : opt
      );
      return { ...prev, options: updatedOptions };
    });
  };

  const addOption = () => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: [
        ...(prev.options || []),
        { text: "", isCorrect: false },
      ],
    }));
  };

  const removeOption = (index: number) => {
    setCurrentQuestion((prev) => {
      const updatedOptions = [...(prev.options || [])];
      updatedOptions.splice(index, 1);
      return { ...prev, options: updatedOptions };
    });
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

      <input
        type="text"
        name="question"
        value={currentQuestion.question}
        onChange={handleChange}
        placeholder="Enter question text"
        className="border p-2 w-full mb-4"
      />

      {["true_false", "multiple_choice", "single_choice", "matching"].includes(type) && (
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

      {["short_answer", "fill_in_the_blank", "text_with_questions", "grammar_quiz"].includes(type) && (
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