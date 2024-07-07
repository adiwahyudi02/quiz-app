import { Box, Slider, SliderProps, Stack } from "@mui/material";
import FontDownloadOutlinedIcon from "@mui/icons-material/FontDownloadOutlined";
import { defaultFontSizeOptions } from "@/constants/fontSize";

const defaultFontSizeMarks = Object.keys(defaultFontSizeOptions).map((key) => ({
  value: Number(key),
}));

interface Mark {
  value: number;
}

interface IFontSizeSlider extends Omit<SliderProps, "onChange"> {
  defaultValue?: number;
  step?: number;
  min?: number;
  max?: number;
  marks?: Mark[];
  onChange: (value: number) => void;
}

export const FontSizeSlider = ({
  defaultValue = 10,
  step = 10,
  min = 10,
  max = 40,
  marks = defaultFontSizeMarks,
  onChange,
  ...props
}: IFontSizeSlider) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2} direction="row" alignItems="center">
        <FontDownloadOutlinedIcon sx={{ fontSize: "1.25rem" }} />
        <Slider
          aria-label="font-size-slider"
          size="medium"
          defaultValue={defaultValue}
          step={step}
          min={min}
          max={max}
          marks={marks}
          onChange={(_, value) => onChange(value as number)}
          {...props}
        />
        <FontDownloadOutlinedIcon sx={{ fontSize: "1.5rem" }} />
      </Stack>
    </Box>
  );
};
