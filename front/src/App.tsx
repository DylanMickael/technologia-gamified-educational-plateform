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
import AcceuilEnfant from "./acceuilEnfant/acceuilEnfant";
import Encarta from "./pages/Encarta/components/page";
import Arbre from "./pages/Encarta/components/arbre";
import Bourse from "./pages/Bourse/page";
import LearnObject from "./pages/pre_enfant/LearnObject";
import FirstLogin from "./pages/pre_enfant/FirstLogin";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-out",
      offset: 80,
      once: false,
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/acceuilEnfant/paintKids" element={<PaintKids />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/code" element={<CodeEditor />} />
        <Route path="/acceuilEnfant" element={<AcceuilEnfant />} />
        <Route path="/encarta" element={<Encarta />} />
        <Route path="/arbre" element={<Arbre />} />
        <Route path="/bourse" element={<Bourse />} />
        <Route path="/pre_enfant" element={<PreEnfant />} />
        <Route path="/acceuilEnfant/quizz" element={<PreEnfant />} />
        <Route path="/acceuilEnfant/apprentissage" element={<LearnObject />} />
        <Route path="/firstlogin" element={<FirstLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
