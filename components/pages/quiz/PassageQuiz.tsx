import { Box, Skeleton, Typography } from "@mui/material";
import { FontSizeSliderQuiz } from "./FontSizeSliderQuiz";
import { CardWithBorder } from "@/components/commons/CardWithBorder";
import { useSelector } from "react-redux";
import {
  selectActiveQuestion,
  selectFontSizePassage,
  selectStatus,
  updateFontSizePassage,
} from "@/store/slices/quizSlice";
import { useAppDispatch } from "@/store";

export const PassageQuiz = () => {
  const dispatch = useAppDispatch();
  const activeQuestion = useSelector(selectActiveQuestion);
  const fontSizePassage = useSelector(selectFontSizePassage);
  const status = useSelector(selectStatus);
  const isLoading = status === "loading";

  const passage = activeQuestion?.question_data.passage;

  const handleChangeFontSizeSlider = (fontSize: string) => {
    dispatch(updateFontSizePassage(fontSize));
  };
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "145px",
        background: "#d0e0f9",
        padding: "15px 20px 35px 20px",
      }}
      data-testid="passage-panel"
    >
      <FontSizeSliderQuiz
        fontSize={fontSizePassage}
        onChange={handleChangeFontSizeSlider}
      />
      <CardWithBorder
        borderTop
        sx={{
          position: "absolute",
          top: "140px",
          overflowY: "auto",
          width: "90%",
          margin: "auto",
          right: 0,
          left: 0,
        }}
      >
        {!isLoading && status !== "idle" && status !== "failed" ? (
          <Typography
            fontSize={fontSizePassage}
            fontWeight="400"
            textAlign="justify"
          >
            {passage}
          </Typography>
        ) : (
          <>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </>
        )}
      </CardWithBorder>
    </Box>
  );
};
