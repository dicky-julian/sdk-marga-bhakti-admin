import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { Provider } from "react-redux";
import { useStore } from "../services/store";
import { Sidebar } from "../components/layouts";
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
      </Head>
      <div className="main">
        <Sidebar />
        <main className="main-section">
          <div className="main-header">
            <div className="main-header-breadcrumb">
              <Link href="/">
                <a className="active">Halaman Admin</a>
              </Link>
              <span>/</span>
              <span>Tata Letak</span>
            </div>
            <div className="main-header-tools">
              <Link href="/">
                <a>
                  <i className="fas fa-cog"></i>
                </a>
              </Link>
              <Link href="/">
                <a>
                  <i className="fas fa-user"></i>
                </a>
              </Link>
            </div>
          </div>
          <Component {...pageProps} />
        </main>
      </div>
    </Provider>
  );
};

export default App;
