import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useStore } from "../services/store";
import { Sidebar, PageLoading } from "../components/layouts";
import { AlertConfirm } from "../components/partials";
import "@fortawesome/fontawesome-free/js/all.js";
import "../scss/main.scss";

const App = ({ Component, pageProps }) => {
  const [isLoading, setIsLoading] = useState(false);
  const store = useStore(pageProps.initialReduxState);
  const { route, push } = useRouter();

  Router.onRouteChangeStart = () => {
    setIsLoading(true);
  };

  Router.onRouteChangeComplete = () => {
    setIsLoading(false);
  };

  Router.onRouteChangeError = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (route === "/") {
      push("/layout");
    }
  });

  return (
    <Provider store={store}>
      <Head>
        <title>SDK Marga Bhakti</title>
        <meta name="HandheldFriendly" content="true" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={`main ${route !== "/login" ? "main-line" : ""}`}>
        {route !== "/login" ? (
          <>
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
                  <Link href="/profil">
                    <a>
                      <i className="fas fa-user"></i>
                    </a>
                  </Link>
                  <Link href="/login">
                    <div className="d-flex align-items-center">
                      <i
                        className="fas fa-sign-out-alt mr-1"
                        style={{ fontSize: 18 }}
                      ></i>
                    </div>
                  </Link>
                </div>
              </div>
              <Component {...pageProps} />
              {isLoading && <PageLoading />}
            </main>
          </>
        ) : (
          <Component {...pageProps} />
        )}

        <AlertConfirm />
      </div>
    </Provider>
  );
};

export default App;
