import {
  Box,
  BoxProps,
  Card,
  CardProps,
  Typography,
  styled,
} from "@mui/material";
import { ReactNode } from "react";

interface IStyledProps {
  green?: boolean;
  blue?: boolean;
}

interface ICardStatsProps extends IStyledProps {
  heading: string;
  value: number | string | ReactNode;
}

interface ICardStyled extends CardProps, IStyledProps {}

interface IBoxStyled extends BoxProps, IStyledProps {}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "green" && prop !== "blue",
})<ICardStyled>(({ green, blue }) => ({
  width: "150px",
  border: "2px solid",
  borderRadius: "9px",
  ...(green && { borderColor: "#4caf4f" }),
  ...(blue && { borderColor: "#0289d1" }),
}));

const StyledHeading = styled(Box, {
  shouldForwardProp: (prop) => prop !== "green" && prop !== "blue",
})<IBoxStyled>(({ green, blue }) => ({
  width: "100%",
  borderRadius: "7px 7px 0 0",
  minHeight: "40px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "black",
  ...(green && { backgroundColor: "#4caf4f" }),
  ...(blue && { backgroundColor: "#0289d1" }),
}));

export const CardStats = ({ heading, value, ...props }: ICardStatsProps) => {
  return (
    <StyledCard variant="outlined" {...props}>
      <StyledHeading {...props}>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "1.25rem",
            lineHeight: 1.6,
            color: "white",
          }}
        >
          {heading}
        </Typography>
      </StyledHeading>
      <Box padding="10px">
        {typeof value === "number" || typeof value === "string" ? (
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "2.125rem",
              lineHeight: 1.235,
              textAlign: "center",
            }}
          >
            {value}
          </Typography>
        ) : (
          value
        )}
      </Box>
    </StyledCard>
  );
};
