import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"; // Add useNavigate
import Faciale from "./authentification/faciale";
import Login from "./authentification/login";
import Landing from "./pages/Landing";
import Aos from "aos";
import "aos/dist/aos.css";
import CelebrationPage from "./celebration/celebration";
import PaintKids from "./paint/paint";

function App() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-out",
      offset: 50,
      once: false,
    })
  }, [])

  // Define navigation functions
  const CelebrationWrapper = () => {
    const navigate = useNavigate()

    const handleClose = () => {
      navigate("/paintKids") // Retour à l'atelier
    }

    const handleNewDrawing = () => {
      navigate("/paintKids") // Nouveau dessin
    }

    return (
      <CelebrationPage
        onClose={handleClose}
        onNewDrawing={handleNewDrawing}
      />
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/faciale" element={<Faciale />} />
        <Route path="/login" element={<Login />} />
        <Route path="/paintKids" element={<PaintKids />} />
        <Route path="/celebrationPage" element={<CelebrationWrapper />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App