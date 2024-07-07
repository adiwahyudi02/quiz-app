import { Box, Typography } from "@mui/material";
import { FontSizeSliderQuiz } from "./FontSizeSliderQuiz";
import { CardWithBorder } from "@/components/commons/CardWithBorder";
import { useSelector } from "react-redux";
import {
  selectActiveQuestion,
  selectFontSizePassage,
  updateFontSizePassage,
} from "@/store/slices/quizSlice";
import { useAppDispatch } from "@/store";

export const PassageQuiz = () => {
  const dispatch = useAppDispatch();
  const activeQuestion = useSelector(selectActiveQuestion);
  const fontSizePassage = useSelector(selectFontSizePassage);

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
        <Typography
          fontSize={fontSizePassage}
          fontWeight="400"
          textAlign="justify"
        >
          {passage}
        </Typography>
      </CardWithBorder>
    </Box>
  );
};
