import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useStore } from "../services/store";
import { Auth, Navbar, Sidebar, PageLoading } from "../components/layouts";
import { validateSession } from "../redux/actions";
import { AlertConfirm } from "../components/partials";
import "@fortawesome/fontawesome-free/js/all.js";
import "flatpickr/dist/themes/airbnb.css";
import "../scss/main.scss";

const App = ({ Component, pageProps }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValidateLoading, setIsValidateLoading] = useState(false);
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

  const handleValidateSession = async () => {
    setIsValidateLoading(true);
    if (route === "/") {
      await validateSession()
        .then(() => push("/layout"))
        .catch(() => push("/login"));
    }
    setIsValidateLoading(false);
  };

  useEffect(() => {
    handleValidateSession();
  }, [route]);

  return (
    <Provider store={store}>
      <Head>
        <title>Admin SDK Marga Bhakti</title>
        <meta name="HandheldFriendly" content="true" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Yayasan Karmel adalah lembaga sosial dan pendidikan. Lembaga ini didirikan di atas pondasi kepedulian dan semangat keberpihakan terhadap masa depan dan nasib hidup kaum miskin dan tertindas, terlebih mereka yang tinggal di pelosok-pelosok desa. Untuk itu, secara jelas Yayasan Karmel menegaskan dirinya sebagai lembaga sosial dan pendidikan yang dinaungi oleh Keuskupan Malang. Dalam bidang sosial, Yayasan Karmel secara khusus mengelola panti asuhan."
        />
        <meta name="keywords" content="sdk, marga" />
        <meta name="author" content="John Doe" />
        <meta
          itemProp="image"
          content="https://yayasankarmel.or.id/wp-content/uploads/2019/03/yayasan-pendidikan-karmel-logo.png"
        />
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
      {((route === "/login" && isLoading) || isValidateLoading) && (
        <PageLoading
          style={{
            maxHeight: "unset",
            width: "100%",
            marginLeft: 0,
            zIndex: 1000,
          }}
        />
      )}
    </Provider>
  );
};

export default App;
