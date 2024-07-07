import { AppBar, AppBarProps, Toolbar, styled } from "@mui/material";
import { PropsWithChildren } from "react";

interface StyledAppBarProps extends AppBarProps, PropsWithChildren {
  yellow?: boolean;
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "yellow",
})<StyledAppBarProps>(({ yellow }) => ({
  position: "fixed",
  color: "black",
  boxShadow:
    "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
  ...(yellow && {
    background: "linear-gradient(101deg,#ffd946,#ffd018 23.96%,#fdbd1a)",
  }),
}));

export const HeaderBar = ({ children, ...props }: StyledAppBarProps) => (
  <>
    <StyledAppBar {...props}>{children}</StyledAppBar>
    <Toolbar />
  </>
);
