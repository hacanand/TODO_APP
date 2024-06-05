import React from "react";
import { Toaster } from "react-hot-toast";
import AppContent from "./components/app-content";
import AppHeader from "./components/app-header";
import PageTitle from "./components/page-title";
import styles from "./styles/modules/app.module.scss";

function App() {
  return (
    <>
      <div className="container">
        <PageTitle>TODO List</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
            background:'black',
            color:'gray',
          },
        }}
      />
    </>
  );
}

export default App;
