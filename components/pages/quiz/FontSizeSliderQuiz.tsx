import { FontSizeSlider } from "@/components/commons/FontSizeSlider";
import { fontSizeQuizOptions } from "@/constants/fontSize";
import { Box } from "@mui/material";

const fontSizeMarks = Object.keys(fontSizeQuizOptions).map((key) => ({
  value: Number(key),
}));

interface IFontSizeSliderQuiz {
  onChange: (value: string) => void;
  fontSize?: string;
}

export const FontSizeSliderQuiz = ({
  onChange,
  fontSize,
  ...props
}: IFontSizeSliderQuiz) => {
  const value = fontSize
    ? Number(
        Object.keys(fontSizeQuizOptions).find(
          (key) => fontSizeQuizOptions[Number(key)] === fontSize
        )
      )
    : null;

  const handleChangeFontSizeSlider = (value: number) => {
    onChange(fontSizeQuizOptions[value]);
  };

  return (
    <Box paddingX="24px">
      <FontSizeSlider
        defaultValue={10}
        step={10}
        min={10}
        max={30}
        marks={fontSizeMarks}
        onChange={handleChangeFontSizeSlider}
        {...(value !== null && { value })}
        {...props}
      />
    </Box>
  );
};
