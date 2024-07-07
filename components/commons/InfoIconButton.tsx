import { IconButton, IconButtonProps } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface StyledIconButtonProps extends IconButtonProps {}

export const InfoIconButton = ({ ...props }: StyledIconButtonProps) => (
  <IconButton color="inherit" aria-label="Information" {...props}>
    <InfoOutlinedIcon />
  </IconButton>
);
