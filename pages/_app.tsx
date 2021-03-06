import type { AppProps } from "next/app";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloProvider>
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

const apolloClient = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

const theme = {
  colors: {},
};

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 14px;
  }

  a {
    color: #0070f0;
    text-decoration: none;
  }

  a:hover {
    color: #0050d0;
    text-decoration: underline;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 1rem;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0 0 1rem;
  }

  p {
    font-size: 1rem;
    margin: 0 0 1rem;
  }

  * {
    box-sizing: border-box;
  }
`;
