import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Add useNavigate
import Login from "./authentification/login";
import Landing from "./pages/Landing";
import PreEnfant from "./pages/pre_enfant";
import Aos from "aos";
import "aos/dist/aos.css";
import PaintKids from "./paint/paint";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import CodeEditor from "./pages/code-editor";
import Encarta from "./pages/Encarta/components/page";
import Arbre from "./pages/Encarta/components/arbre";
import Bourse from "./pages/Bourse/page";

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
        <Route path="/login" element={<Login />} />
        <Route path="/paintKids" element={<PaintKids />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/code" element={<CodeEditor />} />
        <Route path="/pre_enfant" element={<PreEnfant />} />
        <Route path="/encarta" element={<Encarta />} />
        <Route path="/arbre" element={<Arbre />} />
        <Route path="/bourse" element={<Bourse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
