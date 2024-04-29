import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Login from "./pages/Login";
import Application from "./pages/Application";
import Intermediate from "./pages/Intermediate";
import { AuthProps, Page, PageProps } from "./interfaces/interfaces";
import { initializeApp } from "firebase/app";
import { getLoginCookie } from "./utils/cookie";
import Footer from "./components/Footer";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

initializeApp(firebaseConfig);

function App() {
  const appRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState("login");

  const authProps: AuthProps = {
    isAuthenticated,
    setIsAuthenticated,
  };

  const pageProps: PageProps = {
    page,
    setPage,
  };

  const showLogin = !isAuthenticated || page === Page.LOGIN;

  useEffect(() => {
    const cookie: string | undefined = getLoginCookie();
    if (!!cookie) {
      setIsAuthenticated(true);
      setPage(Page.INTERMEDIATE);
    }
  }, []);

  return (
    <div className="App" ref={appRef} id="App">
      {showLogin ? (
        <Login authProps={authProps} pageProps={pageProps} />
      ) : page === Page.INTERMEDIATE ? (
        <Intermediate
          pageProps={pageProps}
          setIsAuthenticated={setIsAuthenticated}
        />
      ) : (
        <Application
          authProps={authProps}
          pageProps={pageProps}
          appRef={appRef}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
