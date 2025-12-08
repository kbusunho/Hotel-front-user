import React from "react";
import AppRouter from "./AppRouter";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <WishlistProvider>
        <AppRouter />
      </WishlistProvider>
    </AuthProvider>
  );
};

export default App;
