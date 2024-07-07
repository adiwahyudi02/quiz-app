import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { MuiProvider } from "@/providers/MuiProvider";
import { ReduxProvider } from "@/providers/ReduxProvider";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <AppCacheProvider {...props}>
      <ReduxProvider>
        <MuiProvider>
          <Component {...pageProps} />
        </MuiProvider>
      </ReduxProvider>
    </AppCacheProvider>
  );
}
