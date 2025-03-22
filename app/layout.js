"use client";

import { Provider, useDispatch } from "react-redux";
import "./globals.css";
import { persistor, store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { X } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { getUser } from "@/redux/Action/auth.action";
import { getCookie } from "cookies-next/client";

function RootComponent({ children }) {
  const dispatch = useDispatch();

  const checkToken = getCookie("token");
  console.log(checkToken, "checkToken");

  useEffect(() => {
    if (checkToken) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "14px",
          },
        }}
      />
      {children}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="/lInGXSxGb9R5Z7ZFtk8Cg"
          async
        ></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
        <meta
          name="google-site-verification"
          content="yfY_9hWMCGs3tYf9Jxr3SkBQ5ErY4kNQ-sUm2HUm_5U"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9VKHKKV4N0"></script>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9VKHKKV4N0', {
                  page_path: window.location.pathname,
              });
            `,
          }}
        ></script> */}
      </head>
      <body suppressHydrationWarning>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootComponent>{children}</RootComponent>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
