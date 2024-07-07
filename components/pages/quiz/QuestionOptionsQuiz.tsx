import { Answer } from "@/types/answer";
import { shuffleArray } from "@/utils/shuffleArray";
import { Button, Stack } from "@mui/material";

interface IQuestionOptionsQuiz {
  questionId: number;
  options: string[];
  isAnswered: boolean;
  answered: string;
  isCorrect: boolean;
  onCheckAnswer: (answer: Answer) => void;
}

export const QuestionOptionsQuiz = ({
  questionId,
  options = [],
  isAnswered,
  answered,
  isCorrect,
  onCheckAnswer,
}: IQuestionOptionsQuiz) => {
  const shuffledOptions = shuffleArray(options);

  return (
    <Stack spacing={1}>
      {!isAnswered ? (
        shuffledOptions.map((option) => (
          <Button
            key={option}
            variant="outlined"
            sx={{
              fontWeight: 700,
              justifyContent: "start",
              textTransform: "none",
              padding: "15px",
              borderRadius: "10px",
            }}
            onClick={() =>
              onCheckAnswer({
                question_id: questionId,
                answer: option,
              })
            }
            data-testid={`quiz-options-${option}`}
          >
            {option}
          </Button>
        ))
      ) : (
        <Button
          variant="contained"
          color={isCorrect ? "success" : "error"}
          sx={{
            fontWeight: 700,
            justifyContent: "start",
            textTransform: "none",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          {answered}
        </Button>
      )}
    </Stack>
  );
};
