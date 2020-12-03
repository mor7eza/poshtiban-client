import React from "react";

import Router from "./Router";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}

export default App;
