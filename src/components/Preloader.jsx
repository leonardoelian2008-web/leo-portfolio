import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Instagram } from "lucide-react";
import Spline from "@splinetool/react-spline";
import ElectricBorder from "../components/ElectricBorder";
import BlurText from "../components/BlurText";

const Preloader = ({ onFinished }) => {
  const [typedText, setTypedText] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [isAssetLoaded, setIsAssetLoaded] = useState(true);
  const fullText = "www.Leonardodavid.app";

  const handleAssetLoad = () => {
    setIsAssetLoaded(true);
  };

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (showContent) {
      if (typedText.length < fullText.length) {
        const typingTimer = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length + 1));
        }, 120);
        return () => clearTimeout(typingTimer);
      } else if (typedText.length === fullText.length && isAssetLoaded) {
        const exitTimer = setTimeout(() => {
          setFadeOut(true);
          setTimeout(onFinished, 1000);
        }, 1500);
        return () => clearTimeout(exitTimer);
      }
    }
  }, [typedText, showContent, fullText, onFinished, isAssetLoaded]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          exit={{
            opacity: 0,
            filter: "blur(10px)",
            transition: { duration: 1, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center dark:text-white text-slate-800 dark:bg-[#060010] bg-zinc-50"
        >
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeInOut" },
              }}
              style={{ transform: "translateY(-8%)" }}
              className="text-center relative z-10 w-full flex flex-col items-center justify-center"
            >
              <div className="flex justify-center mb-2 mt-[-24px] md:mt-[-32px]">
                {/* <div className="w-[320px] h-[180px] md:w-[480px] md:h-[260px]"> */}
                {/* <Spline */}
                {/* scene="https://prod.spline.design/FcZ66SFMX1YbF-0I/scene.splinecode" */}
                {/* onLoad={handleAssetLoad} */}
                {/* /> */}
                {/* </div> */}
                <BlurText
                  text="HELLO I'AM"
                  delay={80}
                  animateBy="letters"
                  direction="top"
                  className="text-3xl md:text-4xl font-bold text-white mb-3"
                />
              </div>
              <ElectricBorder
                color="#3B82F6"
                speed={1}
                chaos={0.15}
                borderRadius={30}
                className="px-8 py-4"
              >
                <motion.h1
                  className="text-4xl md:text-6xl font-moderniz font-bold leading-none text-center"
                  style={{ transform: "translateY(4px)" }}
                >
                  LEONARDO DAVID
                </motion.h1>
              </ElectricBorder>

              {/* <motion.h1 */}
              {/* className="text-4xl md:text-6xl font-moderniz font-bold mb-4 text-center" */}
              {/* initial={{ opacity: 0, scale: 0.8 }} */}
              {/* animate={{ */}
              {/* opacity: 1, */}
              {/* scale: 1, */}
              {/* transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }, */}
              {/* }} */}
              {/* className="text-4xl md:text-6xl font-moderniz font-bold mb-4" */}
              {/* > */}
              {/* Leonardo David */}
              {/* </motion.h1> */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.8, delay: 0.5 },
                }}
                className="font-cascadia text-lg md:text-xl dark:text-gray-400 text-slate-500 mt-4 mb-4 break-all"
              >
                <span>{typedText}</span>
                <span className="animate-blink">|</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.8 },
                }}
                className="flex justify-center gap-6"
              >
                <a
                  href="https://github.com/leonardoelian2008-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark:hover:text-[#3012ef] hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Github size={32} />
                </a>
                <a
                  href="https://www.linkedin.com/in/leonardo-david-307b70238/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark:hover:text-[#1f23f4] hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin size={32} />
                </a>
                <a
                  href="https://www.instagram.com/leo.david08/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark:hover:text-[#371bee] hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Instagram size={32} />
                </a>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
