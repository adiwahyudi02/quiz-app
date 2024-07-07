import { correctAnswerAnimation } from "@/assets/animations/correctAnswerAnimation";
import { PointsCard } from "@/components/pages/results/PointsCard";
import { ScoreCard } from "@/components/pages/results/ScoreCard";
import { useAppDispatch } from "@/store";
import { updateAnswered } from "@/store/slices/quizSlice";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

export default function Result() {
  const dispatch = useAppDispatch();

  // clear the answered question
  useEffect(() => {
    dispatch(updateAnswered([]));
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Result</title>
        <meta
          name="description"
          content="View your quiz results and see how you performed! Check your score, review correct answers, and track your progress. Share your results with friends!"
        />
      </Head>
      <main>
        <Container
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "40px",
            }}
          >
            <Box sx={{ width: "180px", height: "180px" }}>
              <Lottie animationData={correctAnswerAnimation} />
            </Box>
            <Typography variant="h4">Keep Pushing!</Typography>
            <Stack direction="row" spacing={2}>
              <PointsCard />
              <ScoreCard />
            </Stack>
            <Button
              href="/"
              LinkComponent={Link}
              variant="contained"
              size="large"
              sx={{
                width: "200px",
                background: "#4caf50",
                color: "#fafafa",
                textTransform: "none",
                borderRadius: "10px",
              }}
              data-testid="continue-result-button"
            >
              Continue
            </Button>
          </Box>
        </Container>
      </main>
    </>
  );
}
