import { LinearProgress, LinearProgressProps, styled } from "@mui/material";
import { green, grey } from "@mui/material/colors";

interface StyledLinearProgressProps extends LinearProgressProps {}

const StyledLinearProgress = styled(LinearProgress)<StyledLinearProgressProps>(
  () => ({
    width: "100%",
    height: "20px",
    borderRadius: "10px",
    background: grey[200],
    "& .MuiLinearProgress-bar": {
      borderRadius: "10px",
      background: green[500],
    },
  })
);

export const ProgressBar = StyledLinearProgress;
