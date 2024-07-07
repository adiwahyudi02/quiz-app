import { ThemeProvider } from "@emotion/react";
import theme from "@/themes/mui";

interface IMuiProvider {
  children: React.ReactNode;
}

export const MuiProvider = ({ children }: IMuiProvider) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
