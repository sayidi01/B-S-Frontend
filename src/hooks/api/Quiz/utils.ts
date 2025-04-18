import { QuizQuestionType } from "../../../components/Admins/Course/Edit/Quiz/quiz.types";

export const defaultQuestionPerType = {
  [QuizQuestionType.TRUE_FASLE]: {
    options: [],
    correctAnswer: "",
  },
  [QuizQuestionType.FILL_IN_THE_BLANK]: {
    fillTheBlank: [],
  },
  [QuizQuestionType.SHORT_ANSWER]: {
    correctAnswer: "",
    fillTheBlank: [],
  },
  [QuizQuestionType.MULTIPLE_CHOICE]: {
    correctAnswer: "",
    options: [],
  },
  [QuizQuestionType.GRAMMAR_QUIZ]: {
    correctAnswer: "",
    options: [],
  },
  [QuizQuestionType.TEXT_WITH_QUESTIONS]: {
    correctAnswer: "",
    options: [],
  },
  [QuizQuestionType.SINGLE_CHOICE]: {
    correctAnswer: "",
    options: [],
  },
  [QuizQuestionType.MATCHING]: {
    correctAnswer: "",
    options: [],
  },
};
