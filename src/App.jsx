import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Squares from "./components/Squares";
import { NavbarProvider } from "./contexts/NavbarContext";
import { AdminProvider } from "./contexts/AdminContext";
import { useTheme } from "./contexts/ThemeContext";
import FloatingThemeToggle from "./components/FloatingThemeToggle";

// Pages
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";

function App() {
  const { theme } = useTheme();
  const location = useLocation();

  return (
    <AdminProvider>
      <NavbarProvider>
        <div className="relative min-h-screen bg-gray-100 dark:bg-[#111827] transition-colors">
          {/* Global Background Animation */}

          <Header />

          {/* Page Routing with Transitions */}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
          </AnimatePresence>

          <FloatingThemeToggle />
        </div>
      </NavbarProvider>
    </AdminProvider>
  );
}

export default App;
