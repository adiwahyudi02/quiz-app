import { Box, Container, Typography } from "@mui/material";
import { CardWithBorder } from "@/components/commons/CardWithBorder";
import { QuestionOptionsQuiz } from "./QuestionOptionsQuiz";
import { useSelector } from "react-redux";
import {
  checkAnswer,
  nextQuestion,
  selectActiveQuestion,
  selectAnswerStatus,
} from "@/store/slices/quizSlice";
import { useAppDispatch } from "@/store";
import { useState } from "react";
import { ReactionQuiz } from "./ReactionQuiz";
import { Answer } from "@/types/answer";

export const QuestionQuiz = () => {
  const dispatch = useAppDispatch();
  const activeQuestion = useSelector(selectActiveQuestion);
  const answerStatus = useSelector(selectAnswerStatus);
  const isCorrectAnswer = answerStatus === "correct";

  const [answer, setAnswer] = useState<Answer | null>(null);

  const handleCheckAnswer = (value: Answer) => {
    dispatch(checkAnswer(value));
    setAnswer(value);
  };

  const handleNextQuestion = () => {
    dispatch(nextQuestion());
  };

  return (
    <Box data-testid="questions-panel">
      <Box
        sx={{
          width: "100%",
          background: "#d0e0f9",
          minHeight: "150px",
          padding: "15px 20px 35px 20px",
        }}
      >
        <CardWithBorder
          borderLeft
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography fontWeight="bold">
            {activeQuestion?.question_data.question}
          </Typography>
        </CardWithBorder>
      </Box>

      {activeQuestion && (
        <Container sx={{ marginTop: "18px" }}>
          <QuestionOptionsQuiz
            questionId={activeQuestion?.question_id}
            options={activeQuestion?.question_data.options}
            isAnswered={!!answerStatus}
            answered={answer?.answer!}
            isCorrect={isCorrectAnswer}
            onCheckAnswer={handleCheckAnswer}
          />
          <ReactionQuiz
            isCorrect={isCorrectAnswer}
            onNext={handleNextQuestion}
            sx={{ display: answerStatus ? "flex" : "none" }}
          />
        </Container>
      )}
    </Box>
  );
};
