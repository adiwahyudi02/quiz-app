import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store";
import {
  fetchQuestions,
  selectActiveQuestion,
  selectAnswered,
  selectQuestions,
} from "@/store/slices/quizSlice";
import { useRouter } from "next/router";
import { HeaderBarQuiz } from "@/components/pages/quiz/HeaderBarQuiz";
import { PassageQuiz } from "@/components/pages/quiz/PassageQuiz";
import { QuestionQuiz } from "@/components/pages/quiz/QuestionQuiz";
import { TabPanel } from "@/components/commons/TabPanel";
import { BottomTabs } from "@/components/commons/BottomTabs";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import DescriptionIcon from "@mui/icons-material/Description";

const quizTabs = [
  {
    value: "passage",
    label: "Passage",
    icon: <DescriptionIcon />,
  },
  {
    value: "questions",
    label: "Questions",
    icon: <QuestionAnswerIcon />,
  },
];

export default function Quiz() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const questions = useSelector(selectQuestions);
  const activeQuestion = useSelector(selectActiveQuestion);
  const answered = useSelector(selectAnswered);

  const [tabActive, setTabActive] = useState(quizTabs.at(0)?.value);
  const progressValue =
    ((Number(activeQuestion?.no) - 1) / questions.length) * 100 || 0;

  const handleChangeTab = (value: string) => {
    setTabActive(value);
  };

  // fetch questions on mounted
  useEffect(() => {
    dispatch(fetchQuestions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // set back to the first tab every activeQuestion changes
  useEffect(() => {
    setTabActive(quizTabs.at(0)?.value);
  }, [activeQuestion]);

  // push to the result page when questions are finished
  useEffect(() => {
    if (
      !activeQuestion &&
      questions.length &&
      answered.length === questions.length
    ) {
      router.push("/result");
    }
  }, [activeQuestion, questions, answered, router]);

  return (
    <>
      <Head>
        <title>Quiz</title>
        <meta
          name="description"
          content="Test your knowledge with our exciting quizzes! Choose from various categories, answer challenging questions, and see how you rank. Start your quiz now!"
        />
      </Head>
      <main>
        <HeaderBarQuiz progressValue={progressValue} />
        <TabPanel value={tabActive} index="passage">
          <PassageQuiz />
        </TabPanel>
        <TabPanel value={tabActive} index="questions">
          <QuestionQuiz />
        </TabPanel>

        <BottomTabs
          list={quizTabs}
          active={tabActive}
          onChange={handleChangeTab}
        />
      </main>
    </>
  );
}
