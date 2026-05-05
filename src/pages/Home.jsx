import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaDownload,
  FaBriefcase,
  FaCode,
  FaCertificate,
  FaGlobe,
  FaArrowRight,
  FaCube,
} from "react-icons/fa";
import Spline from "@splinetool/react-spline";
import { AnimatedGradientTextDemo } from "../components/AnimatedGradientTextDemo";
import GradientText from "../components/GradientText";
import TextGenerateEffect from "../components/text-generate-effect";
import Skills from "../components/Skills";
import Lanyard from "../components/Lanyard/Lanyard";
import { VelocityScroll } from "../components/VelocityScroll";
import { ButtonMovingBorder } from "../components/MovingBorderButton";
import ProjectSection from "../components/ProjectSection";
import Contact from "../components/Contact";
import { useTheme } from "../contexts/ThemeContext";
import LeoImage from "../assets/images/leo.png";
import ProfileCard from "../components/kartunama/ProfileCard";

const Home = () => {
  const { theme } = useTheme();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [is3dEnabled, setIs3dEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isSmallScreen = window.innerWidth < 1024;
      return !isMobile && !isSmallScreen;
    }
    return true;
  });

  const toggle3dAssets = () => {
    setIs3dEnabled((prev) => !prev);
  };

  const stats = [
    {
      icon: <FaGlobe />,
      value: "4",
      title: "YEARS OF EXPERIENCE",
      description: "Masih dalam tahap belajar",
    },

    {
      icon: <FaCode />,
      value: "2",
      title: "TOTAL PROJECTS",
      description: "Foto N Video",
    },
    {
      icon: <FaCertificate />,
      value: "0",
      title: "CERTIFICATES",
      description: "Gak ada",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 px-8 max-w-7xl mx-auto w-full"
      >
        <section
          id="home"
          className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 pt-0 pb-0"
        >
          {/* KIRI → Lanyard */}
          <div className="md:w-1/2 flex justify-center md:justify-start">
            {is3dEnabled && (
              <Lanyard
                position={[0, 0, 15]}
                gravity={[0, -40, 0]}
                fov={18}
                transparent={true}
              />
            )}
          </div>

          {/* KANAN → TEXT */}
          <div className="md:w-1/2 flex flex-col items-start text-left">
            <motion.div>
              <AnimatedGradientTextDemo />
            </motion.div>

            <motion.h1 className="text-4xl md:text-4xl font-bold mb-2 mt-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              WELCOME TO MY
              <span className="block mt-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                PORTFOLIO
              </span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              <GradientText
                colors={[
                  "#40f2ffff",
                  "#4079ff",
                  "#40fffcff",
                  "#4079ff",
                  "#40f9ffff",
                ]}
                animationSpeed={3}
                className="custom-class font-cascadia font-bold"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
            >
              <TextGenerateEffect
                words={" Saya membuat apasaja yang bisa saya buat wkkwkw."}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
            >
              <Skills />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
              className="flex flex-row gap-4 mt-8"
            >
              <a
                href="https://github.com/leonardoelian2008-web"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full border dark:border-slate-700 border-slate-200 dark:bg-slate-900/[0.8] bg-white text-slate-600 dark:text-white transition-all duration-300
hover:border-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-[0_0_24px_2px_rgba(255,255,255,0.5)] dark:hover:shadow-[0_0_24px_2px_rgba(255,255,255,0.5)]"
              >
                <FaGithub className="h-6 w-6 dark:text-slate-400 text-slate-600 transition-all duration-300 group-hover:text-white dark:group-hover:text-white" />
              </a>
              <a
                href="https://www.instagram.com/leo.david08/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full border dark:border-slate-700 border-slate-200 dark:bg-slate-900/[0.8] bg-white text-slate-600 dark:text-white transition-all duration-300
hover:border-pink-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-[0_0_24px_2px_rgba(255,105,180,0.5)] dark:hover:shadow-[0_0_24px_2px_rgba(255,105,180,0.5)]"
              >
                <FaInstagram className="h-6 w-6 dark:text-slate-400 text-slate-600 transition-all duration-300 group-hover:text-pink-500 dark:group-hover:text-pink-400" />
              </a>
              <a
                href="https://www.linkedin.com/in/leonardo-david-307b70238/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full border dark:border-slate-700 border-slate-200 dark:bg-slate-900/[0.8] bg-white text-slate-600 dark:text-white transition-all duration-300
hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-[0_0_24px_2px_rgba(0,112,255,0.5)] dark:hover:shadow-[0_0_24px_2px_rgba(0,112,255,0.5)]"
              >
                <FaLinkedin className="h-6 w-6 dark:text-slate-400 text-slate-600 transition-all duration-300 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
              </a>
            </motion.div>
          </div>
        </section>

        <section
          id="about"
          className="py-12 md:py-18 gap-0 w-full mx-0 pt-20"
          style={{
            width: "100vw",
            position: "relative",
            left: "50%",
            right: "50%",
            marginLeft: "-50vw",
            marginRight: "-50vw",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mb-20">
              <VelocityScroll
                defaultVelocity={3}
                numRows={1}
                className="max-w-full"
              >
                {/* Kata ABOUT */}
                <span
                  className="font-moderniz font-bold"
                  style={{
                    fontSize: "2.5rem",
                    lineHeight: "1.1",
                    color: "#3B82F6", // biru teks
                    textShadow: `
        0 -2px 4px rgba(255,255,255,1),
        0 -4px 8px rgba(255,255,255,0.8),
        0 -8px 16px rgba(255,255,255,0.6)
      `, // shadow putih lebih menonjol
                  }}
                >
                  ABOUT
                </span>{" "}
                {/* Kata ME */}
                <span
                  className="font-moderniz font-bold"
                  style={{
                    fontSize: "2.5rem",
                    lineHeight: "1.1",
                    color: "#ffffff", // warna ME
                    textShadow: `
      0 -2px 4px rgba(59,130,246,1),
      0 -4px 8px rgba(59,130,246,0.8),
      0 -8px 16px rgba(59,130,246,0.6)
    `, // shadow biru lebih terang dan blur lebih besar
                  }}
                >
                  ME
                </span>
              </VelocityScroll>
              <div
                className={`pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r ${theme === "dark" ? "from-[#060010]" : "from-slate-50"}`}
              ></div>
              <div
                className={`pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l ${theme === "dark" ? "from-[#060010]" : "from-slate-50"}`}
              ></div>
              <VelocityScroll
                defaultVelocity={-3}
                numRows={1}
                className="max-w-full"
              >
                <span
                  className="font-moderniz font-bold"
                  style={{
                    fontSize: "2.5rem",
                    lineHeight: "1.1",
                    color: "#3B82F6", // biru teks
                    textShadow: `
        0 -2px 4px rgba(255,255,255,1),
        0 -4px 8px rgba(255,255,255,0.8),
        0 -8px 16px rgba(255,255,255,0.6)
      `, // shadow putih lebih menonjol
                  }}
                >
                  ABOUT
                </span>{" "}
                {/* Kata ME */}
                <span
                  className="font-moderniz font-bold"
                  style={{
                    fontSize: "2.5rem",
                    lineHeight: "1.1",
                    color: "#ffffff", // warna ME
                    textShadow: `
      0 -2px 4px rgba(59,130,246,1),
      0 -4px 8px rgba(59,130,246,0.8),
      0 -8px 16px rgba(59,130,246,0.6)
    `, // shadow biru lebih terang dan blur lebih besar
                  }}
                >
                  ME
                </span>
              </VelocityScroll>
            </div>
            <p className="text-lg dark:text-blue-200/70 text-slate-600 mt-2 font-cascadia px-1 mb-20">
              ✧ hidup butuh napas, Saya butuh AI😊 ✧
            </p>
          </motion.div>

          <div className="w-full flex flex-col items-start text-left px-6 md:px-20">
            {is3dEnabled && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="md:w-1/3 flex justify-center"
              ></motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className={`dark:text-white text-slate-800 text-center md:text-left px-4 md:px-8 transition-all duration-700 ${is3dEnabled ? "md:w-1/2" : "md:w-2/3"}`}
            >
              <p
                className="text-2xl dark:text-gray-300 text-slate-500 font-moderniz my"
                style={{
                  textShadow:
                    theme === "dark"
                      ? "2px 2px 0 #0000FF, 4px 4px 0 #1E90FF, 0 4px 12px #00BFFF, 0 1px 0 #1E90FF"
                      : "none",
                }}
              >
                Hello, I'm
              </p>
              <h3
                className="text-4xl font-bold dark:text-white text-slate-900 my-2 font-moderniz"
                style={{
                  textShadow:
                    theme === "dark"
                      ? "2px 2px 0 #0000FF, 4px 4px 0 #1E90FF, 0 4px 12px #00BFFF, 0 1px 0 #1E90FF"
                      : "none",
                }}
              >
                Leonardo David Elian Kusuma
              </h3>
              <p className="dark:text-white/80 text-slate-600 leading-relaxed mt-4 font-cascadia text-justify">
                saya adalah pelajar di SMA Ignatius Slmaet Riyadi kelas 2. saya
                memiliki minat besar dalam pengembangan AI dan teknologi. saya
                selalu bersemangat untu belajar hal baru dan ingin menciptakan
                sebuah invoasi yang bermanfaat bagi semua orang.
              </p>

              <div className="my-6 dark:bg-slate-900/50 bg-slate-50 border-l-4 dark:border-[#0800ff] border-blue-600 p-4 rounded-r-lg italic dark:text-white/70 text-slate-700 font-cascadia dark:shadow-none shadow-md">
                "Jalanin aja dulu yang ada di depan mata."
              </div>
              <div className="flex flex-row sm:flex-row gap-4 mt-8 justify-center md:justify-start items-center">
                <ButtonMovingBorder
                  as="a"
                  href="/cv.pdf"
                  download
                  duration={3000}
                  borderRadius="0.75rem"
                  className="
  bg-blue-500/10 
  border border-transparent 
  text-white 
  font-semibold flex items-center justify-center gap-2 
  transition-all duration-300

  hover:border-blue-500 
  hover:text-white 
  hover:bg-blue-500/20 
  hover:shadow-[0_0_20px_3px_#22d3ee]
"
                >
                  <FaDownload /> Download CV
                </ButtonMovingBorder>
                <ButtonMovingBorder
                  as="a"
                  href="#projects"
                  duration={3000}
                  borderRadius="0.75rem"
                  className="
  bg-blue-500/10 
  border border-transparent 
  text-white 
  font-semibold flex items-center justify-center gap-2 
  transition-all duration-300

  hover:border-blue-500 
  hover:text-white 
  hover:bg-blue-500/20 
  hover:shadow-[0_0_20px_3px_#22d3ee]
"
                >
                  <FaBriefcase /> View Projects
                </ButtonMovingBorder>
              </div>
            </motion.div>

            <div className="md:w-1/2 flex justify-end md:absolute md:right-24 md:top-80 ">
              <ProfileCard
                name="Leonardo David Elian kusuma"
                title="AI & Tech Enthusiast"
                handle="King leo"
                status="Online"
                contactText="Contact Me"
                avatarUrl={LeoImage}
                shadowInfo
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-10 px-4 md:px-0"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl 
dark:bg-slate-900/90 bg-white 
border dark:border-slate-700/50 border-slate-200 

transition-all duration-300 

hover:border-blue-400/60 
hover:shadow-[0_0_35px_5px_#3b82f6] 

cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <div className="p-3 mb-4 rounded-full dark:bg-slate-800/80 bg-slate-50 border dark:border-slate-700/60 border-slate-100 w-max dark:group-hover:bg-blue-900/50 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-300">
                      <div className="text-2xl dark:text-slate-400 text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300">
                        {stat.icon}
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider dark:text-slate-400 text-slate-500 group-hover:text-blue-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                      {stat.title}
                    </h3>
                    <p className="text-xs dark:text-slate-500 text-slate-400 mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-5xl font-bold dark:text-white text-slate-900 transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-300">
                      {stat.value}
                    </p>
                    <FaArrowRight className="text-slate-400 mt-auto group-hover:text-blue-500 transition-all duration-300 -rotate-45" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        <section id="projects" className="md:py-18">
          <ProjectSection />
        </section>

        <section id="contact" className="py-20 pb-16">
          <Contact />
        </section>

        <footer className="py-12 pb-16 text-center text-gray-400 dark:bg-gradient-to-t dark:from-slate-900/50 dark:to-transparent bg-gradient-to-t from-slate-100/50 to-transparent">
          <div className="text-blue-400 font-mono text-xl tracking-widest drop-shadow-[0_0_8px_#22d3ee]">
            {time.toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
          <div className="text-sm text-blue-300/80 font-cascadia">
            {time.toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} Leonardo David. All rights reserved.
          </div>
          <div className="text-xs mt-2">
            Built with <span className="text-red-500">♥</span> using React,
            Tailwind CSS, and Framer Motion.
          </div>
          <div className="mt-6 flex flex-col items-center gap-2"></div>
        </footer>
      </motion.div>
    </div>
  );
};

export default Home;
