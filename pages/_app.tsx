import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { MuiProvider } from "@/providers/MuiProvider";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <AppCacheProvider {...props}>
      <MuiProvider>
        <Component {...pageProps} />
      </MuiProvider>
    </AppCacheProvider>
  );
}
