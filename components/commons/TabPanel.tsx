import { Box, BoxProps } from "@mui/material";

interface ITabPanelProps extends BoxProps {
  value?: string;
  index: string;
}

export const TabPanel = ({
  children,
  value,
  index,
  ...props
}: ITabPanelProps) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...props}
  >
    {value === index && children}
  </Box>
);
