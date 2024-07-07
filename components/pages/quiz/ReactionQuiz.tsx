import { Box, Button, Card, CardProps, Typography } from "@mui/material";
import Lottie from "lottie-react";
import { correctAnswerAnimation } from "@/assets/animations/correctAnswerAnimation";
import { inCorrectAnswerAnimation } from "@/assets/animations/inCorrectAnswerAnimation";

interface IReactionQuiz extends CardProps {
  isCorrect: boolean;
  onNext: () => void;
}

export const ReactionQuiz = ({
  isCorrect,
  onNext,
  sx,
  ...props
}: IReactionQuiz) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        marginTop: "100px",
        padding: "8px",
        boxShadow: "0 1px 4px 0 rgba(0,0,0,.16)",
        ...sx,
      }}
      {...props}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "80px", height: "80px" }}>
          <Lottie
            animationData={
              isCorrect ? correctAnswerAnimation : inCorrectAnswerAnimation
            }
            loop={false}
          />
        </Box>
        <Typography variant="h5" color={isCorrect ? "green" : "error"}>
          {isCorrect ? "Amazing!" : "Try again!"}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color={isCorrect ? "success" : "error"}
        sx={{
          fontWeight: 700,
          justifyContent: "start",
          textTransform: "none",
          borderRadius: "10px",
          padding: "8px 22px",
        }}
        onClick={onNext}
      >
        Continue
      </Button>
    </Card>
  );
};
