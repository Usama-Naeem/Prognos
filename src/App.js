import React from "react";
import AppRouter from "./routes/AppRouter";
import AuthProvider from "./shared/context/AuthProvider";
import { initializeWeglot } from "./shared/utils/weglot";

function App() {
  // dynamically inserting the script to the head as we need API key in the env
  initializeWeglot();
  return (
    <div className="App">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
