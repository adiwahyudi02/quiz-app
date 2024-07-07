import { Box, Button, Stack, Typography } from "@mui/material";
import { useSyncScore } from "@/hooks/useSyncScore";
import { DialogRules } from "./DialogRules";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store";
import { resetAnswer } from "@/store/slices/quizSlice";

export const CurrentLessons = () => {
  const dispatch = useAppDispatch();
  const { formattedScore, resetScore } = useSyncScore();
  const { push } = useRouter();

  const [isDialogRulesOpen, setIsDialogRulesOpen] = useState(false);

  const handleToogleDialogRules = () => {
    setIsDialogRulesOpen((prev) => !prev);
  };

  const handleStartQuiz = () => {
    resetScore();
    dispatch(resetAnswer());
    push("/quiz");
  };

  return (
    <>
      <Box
        sx={{
          width: "fit-content",
          background:
            "linear-gradient(314.28deg, rgb(0, 41, 107) -14.84%, rgb(73, 109, 219) 77.78%)",
          padding: "25px",
          borderRadius: "10px",
          color: "rgb(250, 250, 250)",
          cursor: "default",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 1px 2px",
        }}
        data-testid="lesson"
      >
        <Stack spacing={3}>
          <Typography variant="h4" fontWeight={700}>
            English Reading Basic (A1)
          </Typography>
          <Typography fontWeight={500}>
            Your current score: {formattedScore}
          </Typography>
          <Button
            variant="contained"
            color="warning"
            size="large"
            sx={{
              width: "170px",
              borderRadius: "14px",
              textTransform: "none",
              alignSelf: "end",
            }}
            aria-label="start-quiz"
            data-testid="start-lesson-button"
            onClick={handleToogleDialogRules}
          >
            Start
          </Button>
        </Stack>
      </Box>
      <DialogRules
        open={isDialogRulesOpen}
        onClose={handleToogleDialogRules}
        onStart={handleStartQuiz}
      />
    </>
  );
};
