import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShieldAlt, FaSun, FaMoon } from "react-icons/fa";
import bangzenLogo from "../assets/images/Leologo.png";
import { useNavbar } from "../contexts/NavbarContext";
import { useTheme } from "../contexts/ThemeContext";
import { useAdmin } from "../contexts/AdminContext";
import { useLocation, useNavigate } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import { StaggeredMenu } from "./StaggeredMenu";

const CLIP_PATH =
  "polygon(0 0, 100% 0, 100% 85%, 68% 85%, 64% 100%, 36% 100%, 32% 85%, 0 85%)";

const Header = () => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false); // REPLACED BY CONTEXT
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  const { isNavbarVisible, hideNavbar, showNavbar, isMenuOpen, setIsMenuOpen } =
    useNavbar();
  const { isAuthenticated, logout } = useAdmin();
  const { theme, toggleTheme } = useTheme();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to hash on location change if on home
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else if (location.pathname === "/" && !location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const handleAdminAccess = () => {
    if (isAuthenticated) {
      setShowAdminDashboard(true);
      hideNavbar();
    } else {
      setShowAdminLogin(true);
      hideNavbar();
    }
  };

  const handleLoginSuccess = () => {
    setShowAdminLogin(false);
    setShowAdminDashboard(true);
    hideNavbar();
  };

  const handleAdminLogout = () => {
    logout();
    setShowAdminDashboard(false);
    showNavbar();
  };

  const handleCloseAdminDashboard = () => {
    setShowAdminDashboard(false);
    showNavbar();
  };

  const handleCloseAdminLogin = () => {
    setShowAdminLogin(false);
    showNavbar();
  };

  // Improved Navigation Handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (href.startsWith("#")) {
      if (location.pathname === "/") {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          // Update URL hash without reload
          window.history.pushState(null, "", href);
        }
      } else {
        navigate("/" + href);
      }
    } else {
      navigate(href);
    }
  };

  const NavLink = ({ href, children, isGallery }) => {
    // Check active state
    const isActive = isGallery
      ? location.pathname === "/gallery"
      : location.pathname === "/" && location.hash === href;

    return (
      <li>
        <a
          href={href}
          onClick={(e) => handleNavClick(e, href)}
          className={`relative block dark:text-white text-slate-700 font-[Rubik] font-bold text-base tracking-wider py-2 transition-transform duration-300 hover:scale-110 group ${isActive ? "text-blue-500 dark:text-blue-400" : ""}`}
        >
          {children}
          <span
            className={`absolute bottom-1 left-0 block h-[2px] w-0 dark:bg-[#0274ff] bg-blue-600 transition-all duration-500 group-hover:w-full ${isActive ? "w-full" : ""}`}
          ></span>
        </a>
      </li>
    );
  };

  return (
    <>
      <AnimatePresence>
        {isNavbarVisible && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full z-50 pointer-events-none"
          >
            {/* Drop Shadow Gradient Animated */}
            {theme === "dark" ? (
              <div
                className="pointer-events-none absolute left-0 right-0 z-10 transition-opacity duration-500"
                style={{
                  top: "0",
                  height: "85px",
                  WebkitClipPath: isMenuOpen ? "none" : CLIP_PATH,
                  clipPath: isMenuOpen ? "none" : CLIP_PATH,
                  background:
                    "radial-gradient(circle at center, #00c6ff 0%, #0072ff 50%, #001f3f 100%)",
                  backgroundSize: "300% 100%",
                  animation: "gradientShadowMove 6s linear infinite",
                  opacity: isScrolled ? 0 : 1,
                  filter:
                    "drop-shadow(0 0 10px #FF007F) drop-shadow(0 0 20px #FF1493) drop-shadow(0 0 30px #C71585)",
                }}
              ></div>
            ) : (
              <div
                className="pointer-events-none absolute left-0 right-0 z-10 transition-opacity duration-500"
                style={{
                  top: "0",
                  height: "85px",
                  WebkitClipPath: isMenuOpen ? "none" : CLIP_PATH,
                  clipPath: isMenuOpen ? "none" : CLIP_PATH,
                  background:
                    "linear-gradient(90deg, #1e3a8a, #2563eb, #1e40af, #2563eb, #1e3a8a)",
                  backgroundSize: "300% 100%",
                  animation: "gradientShadowMove 6s linear infinite",
                  opacity: isScrolled ? 0 : 1,
                  filter: "drop-shadow(0 8px 16px rgba(8,145,178,0.25))",
                }}
              ></div>
            )}

            {/* Navbar */}
            <header
              style={{
                WebkitClipPath: isMenuOpen ? "none" : CLIP_PATH,
                clipPath: isMenuOpen ? "none" : CLIP_PATH,
              }}
              className={`pt-3 ${isMenuOpen ? "pb-0" : "pb-5"} relative z-20 pointer-events-auto transition-all duration-300
                ${
                  isMenuOpen
                    ? "dark:bg-[#11142F]/80 bg-white/80 backdrop-blur-xl border-b dark:border-white/10 border-slate-200/50 shadow-lg"
                    : isScrolled
                      ? "dark:bg-[#11142F]/90 bg-white/85 backdrop-blur-md border-b dark:border-white/10 border-slate-200 shadow-sm"
                      : "dark:bg-[#11142F] bg-white"
                }`}
            >
              {/* =========== REFACTORED NAVIGATION =========== */}
              <nav className="container mx-auto flex items-center justify-between flex-wrap pb-0 px-1">
                {/* --- MOBILE HEADER --- */}
                <div className="w-full flex items-center justify-between md:hidden">
                  {/* Mobile: Brand Logo & Text (Left) */}
                  <a
                    href="/"
                    onClick={(e) => handleNavClick(e, "#home")}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={bangzenLogo}
                      alt="Bangzen Logo"
                      className="h-12 w-12 flex-shrink-0"
                    />
                    <div>
                      <h1 className="font-moderniz text-sm dark:text-[#00ffdc] text-slate-800 whitespace-nowrap">
                        Leonardo David Elian Kusuma
                      </h1>
                      <p
                        className="font-moderniz text-[9px] dark:text-[#00ffdc] text-slate-600"
                        style={{ textShadow: "none" }}
                      >
                        Let's see the awesome Experience
                      </p>
                    </div>
                  </a>
                  {/* Mobile: Hamburger Button (Right) */}
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="dark:text-[#00ffdc] text-slate-800 text-3xl pointer-events-auto"
                  >
                    &#9776;
                  </button>
                </div>

                {/* --- DESKTOP HEADER --- */}
                <div className="hidden w-full md:grid grid-cols-3 items-center px-8 relative min-h-[48px]">
                  {/* Desktop: Left Navigation (Start) */}
                  <ul className="justify-self-start flex items-center list-none gap-8 lg:gap-10">
                    <NavLink href="#home">Home</NavLink>
                    <NavLink href="#projects">Project</NavLink>
                  </ul>

                  {/* Desktop: Center Logo & Text (Center) */}
                  <a
                    href="/"
                    onClick={(e) => handleNavClick(e, "#home")}
                    className="justify-self-center flex items-center gap-3"
                  >
                    <div className="block">
                      <motion.h1
                        className="font-moderniz text-base"
                        style={{
                          background:
                            "radial-gradient(circle at center, #0033CC, #004BFF, #3366FF, #6699FF, #99CCFF)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          textShadow: `
      0 0 1px #FFFFFF,
      0 0 2px #3366FF
    `,
                        }}
                      >
                        Leonardo David Elian Kusuma
                      </motion.h1>
                      <p
                        className="font-moderniz text-[10px] dark:text-[hsl(252,100%,52%)] text-slate-600"
                        style={{ textShadow: "none" }}
                      >
                        From Zero to Hero
                      </p>
                    </div>
                  </a>

                  {/* Desktop: Right Navigation & Admin Button (End) */}
                  <div className="justify-self-end flex items-center gap-4">
                    {/* Theme Toggle */}
                    {/* Theme Toggle Removed - Moved to FloatingToggle */}

                    <ul className="flex items-center list-none gap-8 lg:gap-10">
                      <NavLink href="#about">About</NavLink>
                      <NavLink href="#contact">Contact</NavLink>
                    </ul>
                    <button
                      onClick={handleAdminAccess}
                      className="flex items-center gap-2 dark:text-slate-400 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 pointer-events-auto"
                      title={
                        isAuthenticated ? "Admin Dashboard" : "Admin Login"
                      }
                    >
                      <FaShieldAlt
                        className={`text-lg ${isAuthenticated ? "text-green-500" : "currentColor"}`}
                      />
                    </button>
                  </div>
                </div>
              </nav>
            </header>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- STAGGERED MENU (MOVED OUTSIDE HEADER FOR PROPER FIXED POSITIONING) --- */}
      <StaggeredMenu
        isOpen={isMenuOpen}
        onMenuClose={() => setIsMenuOpen(false)}
        items={[
          {
            label: "Home",
            link: "#home",
            onClick: (e) => handleNavClick(e, "#home"),
          },
          {
            label: "Project",
            link: "#projects",
            onClick: (e) => handleNavClick(e, "#projects"),
          },
          {
            label: "Gallery",
            link: "/gallery",
            onClick: (e) => handleNavClick(e, "/gallery"),
          },
          {
            label: "About",
            link: "#about",
            onClick: (e) => handleNavClick(e, "#about"),
          },
          {
            label: "Contact",
            link: "#contact",
            onClick: (e) => handleNavClick(e, "#contact"),
          },
        ]}
        socialItems={[
          {
            label: "Admin",
            link: "#",
            onClick: (e) => {
              e.preventDefault();
              handleAdminAccess();
            },
          },
        ]}
        displaySocials={true}
        displayItemNumbering={true}
        colors={["#0891b2", "#06b6d4", "#155e75"]} // blue palette
        accentColor="#06b6d4"
      />

      {/* Admin Login Modal */}
      <AdminLogin
        isOpen={showAdminLogin}
        onClose={handleCloseAdminLogin}
        onSuccess={handleLoginSuccess}
      />

      {/* UNIFIED Admin Dashboard */}
      <AdminDashboard
        isOpen={showAdminDashboard}
        onClose={handleCloseAdminDashboard}
      />

      {/* Animasi gradient keyframes */}
      <style>
        {`
          @keyframes gradientShadowMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }

          html {
            scroll-behavior: smooth;
          }
        `}
      </style>
    </>
  );
};

export default Header;
