import { Card, CardProps, Toolbar, styled } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import { PropsWithChildren } from "react";

interface StyledCardProps extends CardProps, PropsWithChildren {
  borderTop?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
}

const borderStyle = `3px solid ${lightBlue[500]}`;

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) =>
    prop !== "borderTop" &&
    prop !== "borderBottom" &&
    prop !== "borderLeft" &&
    prop !== "borderRight",
})<StyledCardProps>(({ borderTop, borderBottom, borderLeft, borderRight }) => ({
  padding: "10px",
  minHeight: "100px",
  borderRadius: "10px",
  ...(borderTop && { borderTop: borderStyle }),
  ...(borderBottom && { borderBottom: borderStyle }),
  ...(borderLeft && { borderLeft: borderStyle }),
  ...(borderRight && { borderRight: borderStyle }),
}));

export const CardWithBorder = ({ children, ...props }: StyledCardProps) => (
  <StyledCard {...props}>{children}</StyledCard>
);
