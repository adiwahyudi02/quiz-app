import { IconButton, IconButtonProps, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface StyledIconButtonProps extends IconButtonProps {
  href?: string;
}

const StyledIconButton = styled(IconButton)<StyledIconButtonProps>(() => ({}));

const StyledCloseIcon = styled(CloseIcon)(() => ({
  fontSize: "2.1875rem",
}));

export const CloseIconButton = ({ ...props }: StyledIconButtonProps) => (
  <StyledIconButton size="large" color="inherit" aria-label="Close" {...props}>
    <StyledCloseIcon />
  </StyledIconButton>
);
