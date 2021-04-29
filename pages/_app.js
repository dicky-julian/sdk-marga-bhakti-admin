import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import { Provider } from "react-redux";
import { useStore } from "../services/store";
import { Navbar, Footer, LoadingPage } from "../components/layouts";
import "@fortawesome/fontawesome-free/js/all.js";
import "../scss/main.scss";

const App = ({ Component, pageProps }) => {
  const [isLoading, setIsLoading] = useState(false);
  const store = useStore(pageProps.initialReduxState);

  Router.onRouteChangeStart = () => {
    setIsLoading(true);
  };

  Router.onRouteChangeComplete = () => {
    setIsLoading(false);
  };

  Router.onRouteChangeError = () => {
    setIsLoading(false);
  };

  return (
    <Provider store={store}>
      <Head>
        <title>SDK Marga Bhakti</title>
        <meta name="HandheldFriendly" content="true" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Yayasan Karmel adalah lembaga sosial dan pendidikan. Lembaga ini didirikan di atas pondasi kepedulian dan semangat keberpihakan terhadap masa depan dan nasib hidup kaum miskin dan tertindas, terlebih mereka yang tinggal di pelosok-pelosok desa. Untuk itu, secara jelas Yayasan Karmel menegaskan dirinya sebagai lembaga sosial dan pendidikan yang dinaungi oleh Keuskupan Malang. Dalam bidang sosial, Yayasan Karmel secara khusus mengelola panti asuhan."
        />
        <meta name="keywords" content="sdk, marga" />
        <meta name="author" content="John Doe" />
      </Head>

      <Navbar />
      <Component {...pageProps} />
      <Footer />
      {isLoading && <LoadingPage />}
    </Provider>
  );
};

export default App;
