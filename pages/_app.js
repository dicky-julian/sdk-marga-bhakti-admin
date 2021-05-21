import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useStore } from "../services/store";
import { Auth, Navbar, Sidebar, PageLoading } from "../components/layouts";
import { AlertConfirm } from "../components/partials";
import "@fortawesome/fontawesome-free/js/all.js";
import "flatpickr/dist/themes/airbnb.css";
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
      <Auth />
      <div className={`main ${route !== "/login" ? "main-line" : ""}`}>
        {route !== "/login" ? (
          <>
            <Sidebar />
            <main className="main-section">
              <Navbar />
              <Component {...pageProps} />
              {isLoading && <PageLoading />}
            </main>
          </>
        ) : (
          <Component {...pageProps} />
        )}

        <AlertConfirm />
      </div>
      {route === "/login" && isLoading && (
        <PageLoading
          style={{ maxHeight: "unset", width: "100%", marginLeft: 0 }}
        />
      )}
    </Provider>
  );
};

export default App;
