// src/components/ProjectSection.jsx
import BorderGlow from "./BorderGlow";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaTools,
  FaFigma,
  FaGithub,
  FaTimes,
  FaDownload,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiVercel,
  SiMongodb,
  SiExpress,
  SiPostgresql,
} from "react-icons/si";
import { PiCodeBold } from "react-icons/pi";
import { LuBadge } from "react-icons/lu";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { useNavbar } from "../contexts/NavbarContext";
import { supabase } from "../lib/supabase";

// ===================================
// DATA PROYEK (FALLBACK - will be replaced by DB data)
// ===================================
const dummyProjects = [
  //update
  {
    title: "IMLEK 2026",
    description:
      "Sebuah Event Imlek yang diabadikan dengan kamera Canon Eos 800d😊",
    tech: ["Imlek, chinese"],
    link: "https://drive.google.com/drive/folders/1zJDklNTancSRfeyAjkf23b6XxQiOI-O_?usp=sharing",
    image: "https://user8796.na.imgto.link/public/20260420/img-0216-163.avif",
    imagePosition: "center 30%",
    category: "Foto",
  },

  {
    title: "KOMSOS MARINUS",
    description: "sebuah beberapa folder dokumentasi foto yang ada di Gereja ",
    tech: ["Gereja, Komsos"],
    link: "https://drive.google.com/drive/folders/1HhnlP3fP_v39Ph4ytjnXTgEMzOIp2b5_?usp=sharing",
    image: "https://i.postimg.cc/fbst8Tbb/IMG-7640.jpg",
    category: "Foto",
  },
  {
    title: "MUSIC COLABORATION #2",
    description:
      "Sebuah event yang dilaksanakan malam dan juga seperti event konser",
    tech: ["Musik, sekolah"],
    link: "https://drive.google.com/drive/folders/1a21b60OZiaS1vt-fs4T4YJPQ0G1LN_sh?usp=sharing",
    image: "https://i.postimg.cc/CKhhrFGz/IMG-4739-113.jpg",
    imagePosition: "center 35%",
    category: "Foto",
  },
  {
    title: "CLASSMEETING DESEMBER 2025",
    description:
      "Sebuah event tahunan sekolah di setiap bulan Desember. Classmeeting 2025 basket",
    tech: ["Event Osis, sekolah"],
    link: "https://drive.google.com/drive/folders/18Pwhoal5zDpIFrKTreuCBsshFx0yq7uh?usp=sharing",
    image: "https://i.postimg.cc/Nf7f6NVd/IMG-1126-137.jpg",
    imagePosition: "center 35%",
    category: "Foto",
  },
  {
    title: "VISITASI SEKOLAH TALENTA PWK & P5",
    description:
      "Sebuah event visitasi/kunjungan dari sekolah Talenta Purwakarta dan juga event P5",
    tech: ["Event, sekolah"],
    link: "https://drive.google.com/drive/folders/10KV18s5NqWRrGPWtoEPjU6jx8SbYBFNZ?usp=sharing",
    image: "https://i.postimg.cc/Kc7Rfv3N/IMG-1220-44.jpg",
    imagePosition: "center 25%",
    category: "Foto",
  },
  {
    title: "IMLEK 2025",
    description:
      "Sebuah event yang dilaksanakan tahunan, untuk merayakan adat chinese yaitu Imlek",
    tech: ["Event, sekolah"],
    link: "https://drive.google.com/drive/folders/1Dxu9726n4P7ZaxkU0R7NVJptAkPO70V2?usp=sharing",
    image: "https://i.postimg.cc/5yD7jq5F/IMG-4130-26.jpg",
    imagePosition: "center 50%",
    category: "Foto",
  },
  {
    title: "GRADUATION 2025",
    description:
      "Sebuah Acara penghargaan bagi anak kelas 12 yang sudah lulus dari SMA ISR",
    tech: ["Event, sekolah"],
    link: "https://drive.google.com/drive/folders/1hNJpJ5LRB_nTk8gI3s_4S1SUoWLJY5Cq?usp=sharing",
    image: "https://i.postimg.cc/fRbrRyhQ/IMG-8000-91.jpg",
    imagePosition: "center 50%",
    category: "Foto",
  },
  {
    title: "IMPASSIONED ISR 2025 (HOTEL RESINDA)",
    description:
      "Sebuah Acara tahunan yang diadakan oleh komplek ISR Resinda Karawang",
    tech: ["Event, sekolah"],
    link: "https://drive.google.com/drive/folders/1f-VDZ6yny3QxBfeyE2AfWACdbKbMpePU?usp=sharing",
    image: "https://i.postimg.cc/Xqf3bXcV/IMG-3798-115.jpg",
    imagePosition: "center 50%",
    category: "Foto",
  },

  {
    title: "SOUND KABARET",
    description: "berbagai sound kabaret yang ditampilkan setiap event",
    tech: ["Sound, Audacity"],
    link: "https://drive.google.com/drive/folders/1T8--hPXOMSYfW6JgXw4LBbicdC75TqTX?usp=sharing",
    image: "https://i.postimg.cc/02zrL0hX/IMG-4763-116.jpg",
    imagePosition: "center 30%",
    category: "Sound",
  },
  {
    title: "REELS VIDEO IMLEK",
    description: "Video singkat tentang event imlek dengan lagu Perunggu 33x",
    tech: ["Perunggu, Editing, Video"],
    link: "https://drive.google.com/file/d/1RYVbfutBrX_6u0v3o-_vzzi4Fy1mcATA/view?usp=sharing",
    image: "https://i.postimg.cc/fWx2w9pn/Screenshot-2026-05-05-223145.png",
    imagePosition: "center 0%",
    category: "Video",
  },
];

// ===================================
// DATA SERTIFIKAT king leo
// ===================================
const userCertificates = [
  {
    title: "Belajar Membuat Aplikasi Web dengan React",
    issuer: "Dicoding Indonesia",
    date: "Des 2024",
    link: "/certificates/Belajar Membuat Aplikasi Web dengan React.pdf",
    image: "/certificate-images/Belajar Membuat Aplikasi Web dengan React.jpg",
  },
  {
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    date: "Des 2024",
    link: "/certificates/Belajar Dasar Pemrograman JavaScript.pdf",
    image: "/certificate-images/Belajar Dasar Pemrograman JavaScript.jpg",
  },
  {
    title: "Junior Web Developer (BNSP)",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    date: "Sep 2024",
    link: "/certificates/SERTIFIKAT BNSP JUNIOR WEB DEVELOPER ZAIN AHMAD FAHREZI.jpeg",
    image:
      "/certificate-images/SERTIFIKAT BNSP JUNIOR WEB DEVELOPER ZAIN AHMAD FAHREZI.jpg",
  },
  {
    title: "Belajar Membuat Front-End Web untuk Pemula",
    issuer: "Dicoding Indonesia",
    date: "Des 2024",
    link: "/certificates/Belajar Membuat Front-End Web untuk Pemula.pdf",
    image: "/certificate-images/Belajar Membuat Front-End Web untuk Pemula.jpg",
  },
  {
    title: "Operator Komputer Madya (BNSP)",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    date: "Des 2024",
    link: "/certificates/Operator Komputer Madya BNSP.jpeg",
    image: "/certificate-images/Operator Komputer Madya BNSP.jpg",
  },
  {
    title: "Belajar Dasar Data Science",
    issuer: "Dicoding Indonesia",
    date: "Okt 2024",
    link: "/certificates/Belajar Dasar Data Science.pdf",
    image: "/certificate-images/Belajar Dasar Data Science.jpg",
  },
  {
    title: "Belajar Dasar Structured Query Language (SQL)",
    issuer: "Dicoding Indonesia",
    date: "Okt 2024",
    link: "/certificates/Belajar Dasar Structured Query Language (SQL).pdf",
    image:
      "/certificate-images/Belajar Dasar Structured Query Language (SQL).jpg",
  },
  {
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    date: "Sep 2024",
    link: "/certificates/Belajar Dasar AI.pdf",
    image: "/certificate-images/Belajar Dasar AI.jpg",
  },
  {
    title: "Belajar Dasar Manajemen Proyek",
    issuer: "Dicoding Indonesia",
    date: "Sep 2024",
    link: "/certificates/Belajar Dasar Manajemen Proyek.pdf",
    image: "/certificate-images/Belajar Dasar Manajemen Proyek.jpg",
  },
  {
    title: "Operator Komputer Madya (VSGA)",
    issuer: "Digital Talent Scholarship",
    date: "Agu 2024",
    link: "/certificates/Operator Komputer Madya VSGA.pdf",
    image: "/certificate-images/Operator Komputer Madya VSGA.jpg",
  },
  {
    title: "Junior Web Developer (VSGA)",
    issuer: "Kominfo",
    date: "Jul 2024",
    link: "/certificates/Junior Web Developer VSGA.pdf",
    image: "/certificate-images/Junior Web Developer VSGA.jpg",
  },
  {
    title: "Java Fundamentals",
    issuer: "Oracle",
    date: "Jun 2024",
    link: "/certificates/JAVA FUNDAMENTALS.pdf",
    image: "/certificate-images/JAVA FUNDAMENTALS.jpg",
  },
  {
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    date: "Nov 2023",
    link: "/certificates/Belajar Dasar Pemrograman Web.pdf",
    image: "/certificate-images/Belajar Dasar Pemrograman Web.jpg",
  },
];

const techStack = {
  frontend: [
    { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
    {
      name: "Next.js",
      icon: <SiNextdotjs className="dark:text-white text-slate-900" />,
    },
    { name: "JavaScript", icon: <FaJsSquare className="text-[#F7DF1E]" /> },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="text-[#38B2AC]" />,
    },
    { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" /> },
  ],
  backend: [
    { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
    {
      name: "Express",
      icon: <SiExpress className="dark:text-white text-slate-900" />,
    },
  ],
  database: [
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
  ],
  tools: [
    {
      name: "Git & GitHub",
      icon: <FaGithub className="dark:text-white text-slate-900" />,
    },
    {
      name: "Vercel",
      icon: <SiVercel className="dark:text-white text-slate-900" />,
    },
    { name: "Figma", icon: <FaFigma className="text-[#F24E1E]" /> },
    { name: "Tools Lain", icon: <FaTools className="text-gray-400" /> },
  ],
};

const apps = [
  { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "JavaScript", icon: <FaJsSquare className="text-yellow-400" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
];

// ===================================
// HELPER & ANIMATION COMPONENTS
// ===================================
const LineShadowText = ({
  children,
  className,
  shadowColor = "#4079ff",
  ...props
}) => {
  return (
    <motion.span
      style={{ "--shadow-color": shadowColor }}
      className={`relative z-0 line-shadow-effect ${className}`}
      data-text={children}
      {...props}
    >
      {children}
    </motion.span>
  );
};

// ===================================
// KOMPONEN KARTU SERTIFIKAT
// ===================================
const CertificateCard = ({ cert, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative cursor-pointer"
      whileHover={{ y: -8 }}
      onClick={() => onClick(cert)}
    >
      <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden dark:shadow-lg shadow-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/30 transition-all duration-500">
        <div className="absolute inset-0">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/30 group-hover:from-slate-900/95 transition-all duration-500"></div>
        </div>
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="flex-1 flex items-start justify-between">
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                {cert.issuer}
              </span>
            </div>
            <div className="bg-emerald-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-400/30">
              <span className="text-xs font-bold text-emerald-300">
                {cert.date}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-2 leading-tight">
                {cert.title}
              </h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-300">
                <FaDownload className="text-sm" />
                <span className="text-sm font-medium">View Certificate</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-blue-500/20 backdrop-blur-md p-2 rounded-full border border-blue-400/30">
                  <FaExternalLinkAlt className="text-blue-300 text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-transparent to-emerald-500/0 group-hover:from-blue-500/10 group-hover:to-emerald-500/10 transition-all duration-500"></div>
      </div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN PREVIEW MODAL PROYEK
// ===================================
const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  const techIcons = {
    "Next.js": <SiNextdotjs />,
    React: <FaReact />,
    TailwindCSS: <SiTailwindcss />,
    "Framer Motion": " गति ",
    "Node.js": <FaNodeJs />,
    Express: <SiExpress />,
    MongoDB: <SiMongodb />,
    JWT: "🔑",
    Figma: <FaFigma />,
    Storybook: "📚",
    JavaScript: <FaJsSquare />,
    HTML5: <FaHtml5 />,
    CSS3: <FaCss3Alt />,
    PostgreSQL: <SiPostgresql />,
    Vercel: <SiVercel />,
    "Git & GitHub": <FaGithub />,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-5xl w-full dark:bg-slate-900/90 bg-white/95 backdrop-blur-xl rounded-3xl border dark:border-white/10 border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="dark:bg-black/40 bg-slate-200/80 hover:bg-red-500/20 backdrop-blur-md p-3 rounded-full dark:border-white/10 border-slate-300 hover:border-red-500/30 transition-all duration-300 group"
          >
            <FaTimes className="dark:text-white/70 text-slate-600 group-hover:text-red-500" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto custom-scrollbar">
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
            <div className="flex-1">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-full dark:bg-blue-500/10 bg-blue-100 dark:text-blue-300 text-blue-700 dark:border-blue-500/20 border-blue-300"
                  >
                    {techIcons?.[t]} {t}
                  </span>
                ))}
              </div>

              <h2 className="text-3xl font-bold dark:text-white text-slate-900 mb-4 leading-tight">
                {project.title}
              </h2>
              <p className="dark:text-slate-300 text-slate-600 leading-relaxed mb-6 text-lg">
                {project.description}
              </p>

              {project.featured && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
                  <span className="text-yellow-400">⭐ Featured Project</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-white/10">
              {project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 dark:bg-gradient-to-r dark:from-blue-600 dark:to-emerald-600 dark:hover:from-blue-500 dark:hover:to-emerald-500 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1"
                >
                  <FaExternalLinkAlt />
                  <span>LINK</span>
                </a>
              )}

              {/* Assuming GitHub link might be stored in a different field or same link if generic */}
              {/* For now using project.link as fallback, ideally should have github specific field passed */}
              <a>
                <span></span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN KARTU PROYEK
// ===================================
const ProjectCard = ({ project, onClick }) => {
  const techIcons = {
    "Next.js": <SiNextdotjs />,
    React: <FaReact />,
    TailwindCSS: <SiTailwindcss />,
    "Framer Motion": " गति ",
    "Node.js": <FaNodeJs />,
    Express: <SiExpress />,
    MongoDB: <SiMongodb />,
    JWT: "🔑",
    Figma: <FaFigma />,
    Storybook: "📚",
  };

  return (
    <div
      onClick={() => onClick(project)}
      className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden transition-all duration-300 dark:shadow-none shadow-lg hover:shadow-xl dark:hover:shadow-blue-500/30 hover:-translate-y-2 cursor-pointer"
      style={{
        background: `url('${project.image}') ${project.imagePosition || "center"} / cover no-repeat`,
      }}
    >
      <div className="absolute inset-0 dark:bg-black/60 bg-slate-900/70 dark:group-hover:bg-black/40 group-hover:bg-slate-900/50 transition-colors duration-500"></div>

      <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-100 transition-opacity duration-300">
        <div className="translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold text-white dark:group-hover:text-blue-300 group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
              <FaExternalLinkAlt className="text-white" />
            </div>
          </div>
          <p className="text-slate-200 dark:text-slate-300 mt-2 text-sm line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100">
            {project.description}
          </p>
        </div>

        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/20 backdrop-blur-sm"
              >
                {techIcons?.[t] || t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-blue-400/50 transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
};

// ===================================
// KOMPONEN PREVIEW MODAL SERTIFIKAT
// ===================================
const CertificatePreviewModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-4xl w-full dark:bg-slate-900/90 bg-white/95 backdrop-blur-xl rounded-3xl border dark:border-white/10 border-slate-200 shadow-2xl overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="dark:bg-black/40 bg-slate-200/80 hover:bg-red-500/20 backdrop-blur-md p-2 rounded-full dark:border-white/10 border-slate-300 hover:border-red-500/30 transition-all duration-300 group"
          >
            <FaTimes className="dark:text-white/70 text-slate-600 group-hover:text-red-500" />
          </button>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-3/5 relative min-h-[300px] md:min-h-[500px] bg-slate-900">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="absolute inset-0 w-full h-full object-contain p-4 bg-slate-950/50"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/5 p-8 flex flex-col justify-center dark:bg-slate-900/50 bg-white">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider mb-4">
              {certificate.issuer}
            </div>
            <h2 className="text-2xl font-bold dark:text-white text-slate-900 mb-2 leading-tight">
              {certificate.title}
            </h2>
            <p className="text-slate-400 font-mono text-sm">
              {certificate.date}
            </p>
          </div>

          <div className="space-y-4 mt-auto">
            <a
              href={certificate.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 group"
            >
              <FaDownload className="group-hover:animate-bounce" />
              <span>Download / View PDF</span>
            </a>

            <button
              onClick={onClose}
              className="w-full px-6 py-3 dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300 dark:text-slate-300 text-slate-700 font-semibold rounded-xl transition-all duration-300"
            >
              Close Preview
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN UTAMA SECTION PROJECT
// ===================================
function ProjectSection() {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Projects");
  const [projectCategory, setProjectCategory] = useState("Foto");
  const [previewCertificate, setPreviewCertificate] = useState(null);
  const [previewProject, setPreviewProject] = useState(null); // ✨ NEW STATE
  const { hideNavbar, showNavbar } = useNavbar();

  // === Database States ===
  const [projectsFromDB, setProjectsFromDB] = useState([]);
  const [certificatesFromDB, setCertificatesFromDB] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingCerts, setLoadingCerts] = useState(true);

  // === CHANGE START: State dan konstanta untuk Show More/Less ===
  const INITIAL_CERTIFICATES_TO_SHOW = 6;
  const [visibleCertificatesCount, setVisibleCertificatesCount] = useState(
    INITIAL_CERTIFICATES_TO_SHOW,
  );
  // === CHANGE END ===

  // Fetch projects from database
  useEffect(() => {
    async function fetchProjects() {
      try {
        console.log("🔍 Fetching projects from Supabase...");
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("❌ Error fetching projects:", error);
          throw error;
        }

        if (data && data.length > 0) {
          console.log(
            "✅ Projects loaded from database:",
            data.length,
            "projects",
          );
          console.log("📊 Projects data:", data);
          setProjectsFromDB(data);
        } else {
          console.log("⚠️ No projects found in database, using fallback data");
        }
      } catch (err) {
        console.error("❌ Error fetching projects:", err);
      } finally {
        setLoadingProjects(false);
      }
    }
    fetchProjects();
  }, []);

  // Fetch certificates from database
  useEffect(() => {
    async function fetchCertificates() {
      try {
        console.log("🔍 Fetching certificates from Supabase...");
        const { data, error } = await supabase
          .from("certificates")
          .select("*")
          .order("issue_date", { ascending: false });

        if (error) {
          console.error("❌ Error fetching certificates:", error);
          throw error;
        }

        if (data && data.length > 0) {
          console.log(
            "✅ Certificates loaded from database:",
            data.length,
            "certificates",
          );
          console.log("📜 Certificates data:", data);
          setCertificatesFromDB(data);
        } else {
          console.log(
            "⚠️ No certificates found in database, using fallback data",
          );
        }
      } catch (err) {
        console.error("❌ Error fetching certificates:", err);
      } finally {
        setLoadingCerts(false);
      }
    }
    fetchCertificates();
  }, []);

  useEffect(() => {
    // Hide navbar when any modal is open
    if (previewCertificate || previewProject) {
      hideNavbar();
    } else {
      showNavbar();
    }
  }, [previewCertificate, previewProject, hideNavbar, showNavbar]);

  useEffect(() => {
    return () => {
      showNavbar();
    };
  }, [showNavbar]);

  const tabs = [
    {
      id: "Projects",
      label: "Projects",
      icon: <PiCodeBold className="text-[1.7em] mb-1" />,
    },
    {
      id: "Certificate",
      label: "Certificates",
      icon: <LuBadge className="text-[1.5em] mb-1" />,
    },
    {
      id: "Tech Stack",
      label: "APP",
      icon: <LiaLayerGroupSolid className="text-[1.5em] mb-1" />,
    },
  ];

  // Use database projects if available, fallback to dummy data
  const activeProjects =
    projectsFromDB.length > 0 ? projectsFromDB : dummyProjects;

  console.log(
    "🎯 Active projects source:",
    projectsFromDB.length > 0 ? "DATABASE" : "FALLBACK",
  );
  console.log("📦 Total projects:", activeProjects.length);

  // Transform database projects to match UI format
  const transformedProjects = activeProjects.map((p) => {
    // If has UUID id, it's from database - transform it
    if (p.id && typeof p.id === "string" && p.id.includes("-")) {
      return {
        id: p.id,
        title: p.title,
        description: p.description,
        tech: p.tags || [],
        link: p.demo_url || p.github_url || "#", // Use demo_url as primary link
        github: p.github_url, // Add specific github field
        image: p.image_url,
        category: "Database", // All DB projects in one category
        featured: p.featured || false,
      };
    }
    // Static data already in correct format
    return p;
  });

  console.log("🔄 Transformed projects:", transformedProjects.length);

  // Filter projects by category (only applies to static dummy data)
  const filteredProjects = transformedProjects.filter((p) => {
    // If from database (has category 'Database'), show all
    if (p.category === "Database") return true;
    // For dummy data, filter by selected category
    return p.category === projectCategory;
  });

  console.log("✨ Filtered projects to display:", filteredProjects.length);

  // Use database certificates if available, fallback to static data
  const activeCertificates =
    certificatesFromDB.length > 0 ? certificatesFromDB : userCertificates;

  // === CHANGE START: Handler untuk tombol Show More/Less ===
  const handleShowMore = () => {
    setVisibleCertificatesCount(activeCertificates.length);
  };

  const handleShowLess = () => {
    setVisibleCertificatesCount(INITIAL_CERTIFICATES_TO_SHOW);
  };
  // === CHANGE END ===

  return (
    <section id="project" ref={sectionRef} className="py-20">
      <style>{`
        @keyframes line-shadow-anim { 0% { background-position: 0 0; } 100% { background-position: 100% 100%; } }
        .line-shadow-effect::after { content: attr(data-text); position: absolute; z-index: -1; left: 0.04em; top: 0.04em; background-image: linear-gradient(45deg, transparent 45%, var(--shadow-color) 45%, var(--shadow-color) 55%, transparent 0); background-size: 0.06em 0.06em; -webkit-background-clip: text; background-clip: text; color: transparent; animation: line-shadow-anim 30s linear infinite; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-bold font-moderniz">
          <span className="dark:text-[#00b7ff] text-blue-600">
            <LineShadowText shadowColor="#00b3a4">PORTFOLIO</LineShadowText>
          </span>{" "}
          <span className="dark:text-white text-slate-800">
            <LineShadowText shadowColor="#bbbbbb">SHOWCASE</LineShadowText>
          </span>
        </h2>
      </motion.div>

      <div className="w-full">
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
            {tabs.map((tab) => (
              <BorderGlow
                key={tab.id}
                className="w-full"
                borderRadius={16}
                glowColor="220 90 60"
                glowRadius={25}
                glowIntensity={0.8}
              >
                <motion.button
                  onClick={() => setActiveTab(tab.id)}
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.04, y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-full rounded-2xl px-4 py-6 text-center transition-all duration-300
          ${
            activeTab === tab.id
              ? "bg-[#0a1f3d] text-white"
              : "bg-slate-900/60 text-slate-400 hover:text-white"
          }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">{tab.icon}</span>
                    <span className="font-semibold text-sm">{tab.label}</span>
                  </div>
                </motion.button>
              </BorderGlow>
            ))}
          </div>
        </div>

        <div
          className="rounded-3xl p-0 md:p-6 shadow-xl border dark:border-slate-800/60 border-slate-100 mx-auto max-w-7xl bg-clip-padding dark:bg-slate-900/50 bg-white"
          style={{
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-10"
            >
              {activeTab === "Projects" && (
                <>
                  {/* Only show category buttons for dummy data */}
                  {projectsFromDB.length === 0 && (
                    <div className="flex justify-center gap-4 mb-8">
                      <button
                        className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 border ${
                          projectCategory === "Foto"
                            ? "bg-blue-700/80 text-white border-blue-400 shadow-blue-500/10 shadow-lg"
                            : "bg-slate-900/60 text-blue-200 border-slate-700 hover:bg-blue-800/40 hover:text-white"
                        }`}
                        onClick={() => setProjectCategory("Foto")}
                      >
                        Foto
                      </button>

                      <button
                        className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 border ${
                          projectCategory === "Sound"
                            ? "bg-blue-700/80 text-white border-blue-400 shadow-blue-500/10 shadow-lg"
                            : "bg-slate-900/60 text-blue-200 border-slate-700 hover:bg-blue-800/40 hover:text-white"
                        }`}
                        onClick={() => setProjectCategory("Sound")}
                      >
                        Sound
                      </button>

                      <button
                        className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 border ${
                          projectCategory === "Video"
                            ? "bg-blue-700/80 text-white border-blue-400 shadow-blue-500/10 shadow-lg"
                            : "bg-slate-900/60 text-blue-200 border-slate-700 hover:bg-blue-800/40 hover:text-white"
                        }`}
                        onClick={() => setProjectCategory("Video")}
                      >
                        Video
                      </button>
                    </div>
                  )}

                  {loadingProjects ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredProjects.length > 0 ? (
                        filteredProjects.map((p, i) => (
                          <ProjectCard
                            key={p.id || i}
                            project={p}
                            onClick={setPreviewProject} // ✨ PASS HANDLER
                          />
                        ))
                      ) : (
                        <div className="col-span-full text-center text-slate-400 py-12">
                          No projects available yet.
                          {projectsFromDB.length === 0 && (
                            <div className="mt-4 text-sm text-blue-400">
                              Add projects via Admin Dashboard to see them here!
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
              {activeTab === "Certificate" && (
                <div className="space-y-8">
                  {loadingCerts ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <AnimatePresence>
                          {activeCertificates
                            .slice(0, visibleCertificatesCount)
                            .map((cert, i) => {
                              // Transform DB data to match CertificateCard props
                              const certData = cert.id
                                ? {
                                    // From database (has UUID id)
                                    title: cert.title,
                                    issuer: cert.issuer,
                                    date: cert.issue_date
                                      ? new Date(
                                          cert.issue_date,
                                        ).toLocaleDateString("en-US", {
                                          month: "short",
                                          year: "numeric",
                                        })
                                      : "",
                                    link: cert.credential_url || "#",
                                    image: cert.image_url || "",
                                  }
                                : cert; // From static data

                              return (
                                <CertificateCard
                                  key={cert.id || i}
                                  cert={certData}
                                  onClick={setPreviewCertificate}
                                />
                              );
                            })}
                        </AnimatePresence>
                      </div>
                      {activeCertificates.length >
                        INITIAL_CERTIFICATES_TO_SHOW && (
                        <div className="flex justify-center mt-12">
                          {visibleCertificatesCount <
                          activeCertificates.length ? (
                            <motion.button
                              onClick={handleShowMore}
                              className="group dark:bg-gradient-to-r dark:from-blue-600 dark:to-emerald-600 dark:hover:from-blue-500 dark:hover:to-emerald-500 bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Show More (
                              {activeCertificates.length -
                                visibleCertificatesCount}{" "}
                              more)
                            </motion.button>
                          ) : (
                            <motion.button
                              onClick={handleShowLess}
                              className="group bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Show Less
                            </motion.button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              {activeTab === "Tech Stack" && (
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-6">
                    Editing
                  </h3>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {apps.map((app, i) => (
                      <div
                        key={i}
                        className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-slate-900/60 border border-slate-700 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-blue-500/20"
                      >
                        <div className="text-2xl">{app.icon}</div>
                        <p className="text-xs text-slate-300 text-center">
                          {app.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {previewCertificate && (
          <CertificatePreviewModal
            certificate={previewCertificate}
            onClose={() => setPreviewCertificate(null)}
          />
        )}
        {/* ✨ Project Detail Modal */}
        {previewProject && (
          <ProjectDetailModal
            project={previewProject}
            onClose={() => setPreviewProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectSection;
