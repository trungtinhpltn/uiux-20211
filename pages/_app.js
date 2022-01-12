import App from "next/app";
import Layout from "components/shared/Layout";
import Container from "components/shared/Container";
import "../public/css/styles.css";
import AppContext from "AppContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AppContext>
      <Layout>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Layout>
    </AppContext>
  );
};

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  return { ...appProps };
};

export default MyApp;
