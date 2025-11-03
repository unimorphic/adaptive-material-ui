import { createRoot } from "react-dom/client";
import App from "./app";

const app = document.getElementById("root");
if (app) {
  createRoot(app).render(<App />);
}
