import { Question, Questions } from "@/types/question";
import { fetcher } from "@/utils/fetcher";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { Answer } from "@/types/answer";
import { setItem } from "@/utils/localstorage";
import { fontSizeQuizOptions } from "@/constants/fontSize";
import { localStorageKey } from "@/constants/localstorage";

interface QuestionWithNo extends Question {
  no: number;
}

interface CheckAnswer {
  isCorrect: boolean;
  answer: string;
}

interface IQuizState extends Questions {
  activeQuestion: QuestionWithNo | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  answerStatus: "correct" | "incorrect" | null;
  answered: CheckAnswer[];
  score: number;
  points: number;
  fontSizePassage: string;
}

export const initialStateQuizSlice: IQuizState = {
  questions: [],
  status: "idle",
  error: "",
  activeQuestion: undefined,
  answerStatus: null,
  answered: [],
  score: 0,
  points: 0,
  fontSizePassage: fontSizeQuizOptions[10],
};

// Thunks
export const fetchQuestions = createAsyncThunk<Question[]>(
  "question/fetchQuestions",
  async () => {
    const response = await fetcher.get("/questions");
    return response.data;
  }
);

export const checkAnswer = createAsyncThunk<CheckAnswer, Answer>(
  "question/fetchAnswers",
  async (payload) => {
    const response = await fetcher.get("/answers", {
      params: {
        question_id: payload.question_id,
      },
    });
    const data = response.data as Answer[];
    return {
      isCorrect: payload.answer === data.at(0)?.answer,
      answer: payload.answer,
    };
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: initialStateQuizSlice,
  reducers: {
    nextQuestion: (state) => {
      const activeQuestionIndex = state.questions.findIndex(
        (question) => question.question_id === state.activeQuestion?.question_id
      );
      const nextQuestionIndex = activeQuestionIndex + 1;
      const nextQuestion = state.questions.at(nextQuestionIndex);
      const nextQuestionNo = Number(state.activeQuestion?.no ?? 1) + 1;

      if (nextQuestion) {
        state.activeQuestion = {
          ...nextQuestion,
          no: nextQuestionNo,
        };
      } else {
        state.activeQuestion = undefined;
      }
      state.answerStatus = null;
    },
    updateAnswered: (state, action) => {
      state.answered = action.payload;
    },
    updateFontSizePassage: (state, action) => {
      state.fontSizePassage = action.payload;
    },
    updateScore: (state, action) => {
      state.score = action.payload || 0;
    },
    updatePoints: (state, action) => {
      state.points = action.payload || 0;
    },
    resetAnswer: (state) => {
      state.answered = [];
      state.answerStatus = null;
    },
  },
  extraReducers(builder) {
    builder
      // fetch questions
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;

        // set the first question as the active question
        const firstQuestion = state.questions.at(0);
        if (firstQuestion) {
          state.activeQuestion = {
            ...firstQuestion,
            no: 1,
          };
        }
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // check answer
      .addCase(checkAnswer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAnswer.fulfilled, (state, action) => {
        state.status = "succeeded";

        const res = action.payload;
        const { isCorrect } = res;
        state.answerStatus = isCorrect ? "correct" : "incorrect";
        state.answered.push(res);

        // add 10 points for each question answered
        const calculatePoints = state.points + 10;
        state.points = calculatePoints;
        // store the points to localstorage
        setItem(localStorageKey.points, calculatePoints);

        if (isCorrect) {
          const calculateScore =
            state.score + (1 / state.questions.length) * 100;
          state.score = calculateScore;
          // store the score to localstorage
          setItem(localStorageKey.score, calculateScore);
        }
      })
      .addCase(checkAnswer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// State Selectors
const selectQuizState = (state: RootState) => state.quiz;

export const selectQuestions = createSelector(
  selectQuizState,
  (state) => state.questions
);

export const selectActiveQuestion = createSelector(
  selectQuizState,
  (state) => state.activeQuestion
);

export const selectFontSizePassage = createSelector(
  selectQuizState,
  (state) => state.fontSizePassage
);

export const selectAnswerStatus = createSelector(
  selectQuizState,
  (state) => state.answerStatus
);

export const selectAnswered = createSelector(
  selectQuizState,
  (state) => state.answered
);

export const selectScore = createSelector(
  selectQuizState,
  (state) => state.score
);

export const selectPoints = createSelector(
  selectQuizState,
  (state) => state.points
);

export const selectStatus = createSelector(
  selectQuizState,
  (state) => state.status
);

export const selectError = createSelector(
  selectQuizState,
  (state) => state.error
);

export const {
  nextQuestion,
  updateAnswered,
  updateFontSizePassage,
  updateScore,
  updatePoints,
  resetAnswer,
} = quizSlice.actions;

export default quizSlice.reducer;
