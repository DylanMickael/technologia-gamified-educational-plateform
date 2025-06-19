import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Add useNavigate
import Faciale from "./authentification/faciale";
import Login from "./authentification/login";
import Landing from "./pages/Landing";
import Aos from "aos";
import "aos/dist/aos.css";
import PaintKids from "./paint/paint";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import CodeEditor from "./pages/code-editor";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-out",
      offset: 50,
      once: false,
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/faciale" element={<Faciale />} />
        <Route path="/login" element={<Login />} />
        <Route path="/paintKids" element={<PaintKids />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/code" element={<CodeEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App