import { CurrentLessons } from "@/components/pages/home/CurrentLessons";
import { YourPoints } from "@/components/pages/home/YourPoints";
import { Container, Stack, Typography } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Challenge your knowledge with our engaging quiz app! Explore a wide range of topics, track your progress, and compete with friends. Fun and learning combined!"
        />
      </Head>
      <main>
        <Container sx={{ marginTop: "40px" }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              variant="h5"
              color="#003f88"
              fontWeight={800}
              marginBottom="24px"
            >
              Hello Learners!
            </Typography>
            <YourPoints />
          </Stack>
          <CurrentLessons />
        </Container>
      </main>
    </>
  );
}
