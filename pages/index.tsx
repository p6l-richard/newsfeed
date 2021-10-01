import Head from "next/head";
import Layout from "components/Layout";
import Page from "feature-newsfeed/client/Pages/index";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>
      <Page />
    </Layout>
  );
}
