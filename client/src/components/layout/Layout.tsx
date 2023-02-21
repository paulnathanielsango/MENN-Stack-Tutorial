import type { ReactNode } from "react";
import React from "react";
import Head from "next/head";

type Props = {
  wrapper?: string;
  readonly children: ReactNode;
};

export default function Layout(props: Props) {
  const title = "MENN Stack Tutorial";
  const description = "MENN Stack Tutorial";
  const PUBLIC_URL = "menn-stack-tutorial.vercel.app";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:url" content={PUBLIC_URL}></meta>
        <meta property="og:title" content={title}></meta>
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />
        <meta name="mennstacktutorial:card" content="summary_large_image" />
        <meta name="mennstacktutorial:site" content="@pncs" />
        <meta name="mennstacktutorial:creator" content="@pncs" />
        <meta name="mennstacktutorial:title" content={title} />
        <meta name="mennstacktutorial:description" content={description} />
        <meta name="mennstacktutorial:title" content={title} />
        <meta
          property="mennstacktutorial:domain"
          content={PUBLIC_URL}
        />
        <link rel="icon" href="paws.ico" />
      </Head>
      <main
        className="w-full h-screen flex items-center flex-col"
        id={props.wrapper}
      >
        {props.children}
      </main>
    </>
  );
}
