import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"} />
        <link href="https://fonts.googleapis.com/css2?family=Underdog&display=swap" rel="stylesheet" />
        <meta property="og:site_name" content="Dog Fetcher app" />
        <meta property="og:title" content="Dog Fetcher app" />
        <meta property="og:description" content="We fetch dogs so you don't have to!" />
        <meta property="og:image" itemProp="image" content="https://dogfetcher.vercel.app/dog_logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300"></meta>
      </Head>
      <Component {...pageProps} />;
    </Fragment>
  );
}

export default MyApp;
