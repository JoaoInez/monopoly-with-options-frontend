import { AppProps } from "next/app";
import Layout from "components/shared/layout";
import "styles/global.scss";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
