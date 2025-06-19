import Faciale from "./authentification/faciale";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Aos from 'aos';
import "aos/dist/aos.css";
import Encarta from "./pages/Encarta/components/page";
import Arbre from "./pages/Encarta/components/arbre";
import Bourse from "./pages/Bourse/page";

function App() {

  useEffect(() => {
      Aos.init({
          duration: 800,
          easing: 'ease-out',
          offset: 50, 
          once: false
      });
  }, []);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path = "/faciale" element = {<Faciale/>}/>
        <Route path="/encarta" element={<Encarta/>}/>
        <Route path="/arbre" element={<Arbre/>}/>
        <Route path="/bourse" element={<Bourse/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
