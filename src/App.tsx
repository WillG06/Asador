import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { LoadingScreen, GrainOverlay, ScrollProgress } from "./components/Chrome";
import { Cursor } from "./components/Cursor";
import Home from "./pages/Home";
import Story from "./pages/Story";
import Menu from "./pages/Menu";
import Journal from "./pages/Journal";
import JournalArticle from "./pages/JournalArticle";
import FindUs from "./pages/FindUs";
import Reservations from "./pages/Reservations";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <LoadingScreen />
      <GrainOverlay />
      <ScrollProgress />
      <Cursor />
      <Nav />
      <ScrollToTop />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<JournalArticle />} />
          <Route path="/find-us" element={<FindUs />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}
