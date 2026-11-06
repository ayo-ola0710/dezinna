import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Works from "./pages/Works";
import Feed from "./pages/Feed";
import { CursorProvider } from "./context/CursorContext";
import Cursor from "./components/shared/Cursor";
import { Routes, Route } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  /* After all sections mount, recalculate scroll positions.
     Required when a pinned section (Process) sits above others. */
  useEffect(() => {
    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);
    return () => clearTimeout(id);
  }, []);

  return (
    <CursorProvider>
      <Cursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/works" element={<Works />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </CursorProvider>
  );
};

export default App;
