import React, { useState } from "react";
import { QuizItem, QuizQuestion } from "./quiz.types";
import _ from "lodash";
import FillInTheBlankCreator from "./FillInTheBlankCreator";

interface QuestionFormProps {
  question: QuizQuestion;
  onRemove: () => void;
  updateQuestion: (questionID: string, newData: QuizQuestion) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  onRemove,
  updateQuestion,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>({
    ...question,
    items: question.type === 'fill_in_the_blank' ? question.items || [] : undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    const update = { ...currentQuestion, [e.target.name]: e.target.value };
    updateQuestion(currentQuestion._id, update);
  };
  const handleOptionChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    setCurrentQuestion((prev) => {
      const updatedOptions = prev.options?.map((opt, i) =>
        i === index ? { ...opt, [field]: value } : opt
      );
      return { ...prev, options: updatedOptions };
    });

    const update = {
      ...currentQuestion,
      options: currentQuestion.options?.map((opt, i) =>
        i === index ? { ...opt, [field]: value } : opt
      ),
    };
    updateQuestion(currentQuestion._id, update);
  };

  const addOption = () => {
    setCurrentQuestion((prev) => {
      const options = prev.options || [];

      return {
        ...prev,
        options: [
          ...options,
          { _id: String(options.length + 1), text: "", isCorrect: false },
        ],
      };
    });

    const update = {
      ...currentQuestion,
      options: currentQuestion.options,
    };
    updateQuestion(currentQuestion._id, update);
  };

  const removeOption = (index: number) => {
    setCurrentQuestion((prev) => {
      const updatedOptions = [...(prev.options || [])];
      updatedOptions.splice(index, 1);
      return { ...prev, options: updatedOptions };
    });

    const update = {
      ...currentQuestion,
      options: [...(currentQuestion.options || [])],
    };
    update.options?.splice(index, 1);
    updateQuestion(currentQuestion._id, update);
  };

  const updateType = (type: string) => {
    setCurrentQuestion((prev) => ({ ...prev, type }));

    const update = { ...currentQuestion, type };
    updateQuestion(currentQuestion._id, update);
  };

  const updateItems = (items: QuizItem[]) => {
    setCurrentQuestion(prev => ({ ...prev, items }));
    updateQuestion(currentQuestion._id, { ...currentQuestion, items });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Question {currentQuestion.question}</h3>
        <button onClick={onRemove} className="text-red-500 hover:text-red-700">
          Remove
        </button>
      </div>

      {/* Sélection du type de question */}
      <div className="mb-4">
        <label htmlFor="questionType" className="block font-medium mb-2">Select Question Type:</label>
        <select
          id="questionType"
          value={currentQuestion.type }
          onChange={(e) => updateType(e.target.value)}
          className="border p-2 max-w-fit"
        >
          <option disabled value="">
            -- Select Question Type --
          </option>
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
                onChange={(e) =>
                  handleOptionChange(index, "text", e.target.value)
                }
                placeholder={`Option ${index + 1}`}
                className="border p-2 mr-2"
              />
              <input
                type="checkbox"
                name="isCorrect"
                checked={option.isCorrect}
                onChange={(e) =>
                  handleOptionChange(index, "isCorrect", e.target.checked)
                }
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

      {[
        "short_answer",
        // "fill_in_the_blank",
        "text_with_questions",
        "grammar_quiz",
      ].includes(currentQuestion.type) && (
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
      {currentQuestion.type === "fill_in_the_blank" && (
        <div>
            <FillInTheBlankCreator  items={currentQuestion.items || []} setItems={updateItems} />
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
