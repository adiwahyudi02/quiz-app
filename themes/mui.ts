import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
});

export default theme;
