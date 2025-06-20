import Faciale from "./authentification/faciale";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./authentification/login";
import Landing from "./pages/landing";
import Aos from 'aos';
import "aos/dist/aos.css";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Formations from "./pages/formations";
import Robotique from "./pages/formation-robotique";

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
        <Route path="/faciale" element = {<Faciale/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/formations" element={<Formations />} />
        <Route path="/app/formations/robotique" element={<Robotique />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
