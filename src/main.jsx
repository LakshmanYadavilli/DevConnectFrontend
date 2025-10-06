import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Store from "./utils/Store";
import { SnackbarProvider } from "notistack";
import { persistor } from "./utils/Store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "center", horizontal: "bottom" }}
      autoHideDuration={4000}
    >
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </SnackbarProvider>
  </StrictMode>
);
