import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./fonts.css";
import App from "./App.tsx";
import "./locales/index.js";
import { ThemeProvider } from "./themes/provider.tsx";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
