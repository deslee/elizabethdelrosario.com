import "../styles/globals.css";
import { Quattrocento_Sans } from "@next/font/google";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../gql";
import { useEffect } from "react";

const font = Quattrocento_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);
  useEffect(() => {
    console.log("mount app");
    return () => {
      console.log("unmount app");
    };
  }, []);
  return (
    <ApolloProvider client={client}>
      <style jsx global>{`
        :root {
          --sans-font: ${font.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
