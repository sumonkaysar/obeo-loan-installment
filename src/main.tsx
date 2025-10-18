import App from "@/App.tsx";
import { Toaster } from "@/components/ui/sonner";
import "@/index.css";
import { store } from "@/Redux/store.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster richColors />
    </Provider>
  </StrictMode>
);
