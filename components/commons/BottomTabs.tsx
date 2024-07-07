import { Box, Tab, Tabs, TabsProps, styled } from "@mui/material";
import { ReactElement } from "react";

interface Tab {
  value?: string;
  label?: string;
  icon?: ReactElement | string;
}

interface StyledTabsProps extends TabsProps {}

interface BottomTabsProps extends Omit<StyledTabsProps, "onChange"> {
  active?: string;
  list: Tab[];
  onChange?: (value: string) => void;
}

const StyledTabs = styled(
  Tabs,
  {}
)<StyledTabsProps>(() => ({
  background: "#222e3a",
  "& .MuiTabs-indicator": {
    left: "0px",
    width: "440px",
    background: "#ffd118",
    top: "0px",
    height: "5px",
  },
  "& .MuiButtonBase-root": {
    color: "white",
    minHeight: "72px",
    textTransform: "capitalize",
    fontWeight: "600",
  },
}));

export const BottomTabs = ({
  active,
  onChange,
  list,
  ...props
}: BottomTabsProps) => (
  <Box width="100%" position="fixed" bottom={0}>
    <StyledTabs
      variant="fullWidth"
      value={active}
      onChange={(_, value) => onChange && onChange(value)}
      {...props}
    >
      {list.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={tab.label}
          icon={tab.icon}
          iconPosition="start"
          sx={{ "&.Mui-selected": { color: "#ffd118" } }}
        />
      ))}
    </StyledTabs>
  </Box>
);
