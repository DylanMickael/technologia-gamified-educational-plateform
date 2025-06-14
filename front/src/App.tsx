import Faciale from "./authentification/faciale";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Aos from "aos";
import "aos/dist/aos.css";
import Register from "./pages/register";

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
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/faciale" element={<Faciale />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
