import React from "react";
import { QuizItem, QuizQuestion, QuizQuestionType } from "./quiz.types";
import _ from "lodash";
import FillInTheBlankCreator from "./FillInTheBlankCreator";

interface QuestionFormProps {
  question: QuizQuestion;
  onRemove: () => void;
  updateQuestion: (questionID: string, newData: QuizQuestion) => void;
  updateQuestionType: (questionID: string, newType: QuizQuestionType) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  onRemove,
  updateQuestion,
  updateQuestionType,
}) => {
  if (question.type === QuizQuestionType.FILL_IN_THE_BLANK)
    console.log(question);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const update = { ...question, [e.target.name]: e.target.value };
    updateQuestion(question._id, update);
  };
  const handleOptionChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const update = {
      ...question,
      options: question.options?.map((opt, i) =>
        i === index ? { ...opt, [field]: value } : opt
      ),
    };
    updateQuestion(question._id, update);
  };

  const addOption = () => {
    if (!question.options) return;

    const update = {
      ...question,
      options: [
        ...question.options,
        {
          _id: String(question.options.length + 1),
          text: "",
          isCorrect: false,
        },
      ],
    };
    updateQuestion(question._id, update);
  };

  const removeOption = (index: number) => {
    if (!question.options) return;

    const updatedOptions = question.options;
    updatedOptions.splice(index, 1);

    const update = {
      ...question,
      options: updatedOptions,
    };
    updateQuestion(question._id, update);
  };

  const updateType = (type: QuizQuestionType) => {
    updateQuestionType(question._id, type);
  };

  const updateItems = (items: QuizItem[]) => {
    updateQuestion(question._id, {
      ...question,
      fillTheBlank: items,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Question {question.question}</h3>
        <button onClick={onRemove} className="text-red-500 hover:text-red-700">
          Remove
        </button>
      </div>

      {/* Sélection du type de question */}
      <div className="mb-4">
        <label htmlFor="questionType" className="block font-medium mb-2">
          Select Question Type:
        </label>
        <select
          id="questionType"
          value={question.type}
          onChange={(e) => updateType(e.target.value as QuizQuestionType)}
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
        value={question.question}
        onChange={handleChange}
        placeholder="Enter question text"
        className="border p-2 w-full mb-4"
      />

      {/* Options ou Réponse Correcte */}
      {["true_false", "multiple_choice", "single_choice", "matching"].includes(
        question.type
      ) && (
        <div>
          <h4 className="font-medium mb-2">Options</h4>
          {question.options?.map((option, index) => (
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
      ].includes(question.type) && (
        <div>
          <h4 className="font-medium mb-2">Correct Answer</h4>
          <input
            type="text"
            name="correctAnswer"
            value={question.correctAnswer || ""}
            onChange={(e) => handleChange(e as any)}
            placeholder="Enter correct answer"
            className="border p-2 w-full"
          />
        </div>
      )}
      {question.type === "fill_in_the_blank" && question.fillTheBlank && (
        <div>
          <FillInTheBlankCreator
            items={question.fillTheBlank}
            updateItems={updateItems}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
