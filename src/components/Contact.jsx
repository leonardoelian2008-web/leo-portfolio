import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaInstagram,
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaComment,
  FaCog,
  FaReply,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";
import { useAdmin } from "../contexts/AdminContext";
import { supabase } from "../lib/supabase";

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { isAuthenticated } = useAdmin();

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingContact(true);

    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .insert([
          {
            name: contactForm.name,
            email: contactForm.email,
            message: contactForm.message,
            status: "unread",
          },
        ])
        .select();

      if (error) throw error;

      console.log("Message saved to database:", data);
      alert("Pesan berhasil dikirim! Terima kasih telah menghubungi saya. 📧");
      setContactForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert(
        `Gagal mengirim pesan: ${error.message}. Pastikan koneksi database aktif.`,
      );
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://www.instagram.com/leo.david08/",
      color: "from-pink-500 to-purple-600",
      hoverColor: "hover:shadow-pink-500/25",
    },
    {
      name: "TikTok",
      icon: <SiTiktok />,
      url: "https://www.tiktok.com/@eliansky23",
      color: "from-black to-red-600",
      hoverColor: "hover:shadow-red-500/25",
    },
    {
      name: "GitHub",
      icon: <FaGithub />,
      url: "https://github.com/leonardoelian2008-web",
      color: "from-gray-600 to-gray-800",
      hoverColor: "hover:shadow-gray-500/25",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-4 pb-32 relative overflow-hidden min-h-screen"
    >
      <div className="absolute inset-0 bg-transparent"></div>

      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 relative"
        >
          <h2 className="text-5xl md:text-6xl font-bold font-moderniz mb-4">
            <span className="dark:bg-gradient-to-r dark:from-blue-400 dark:via-blue-400 dark:to-blue-600 dark:bg-clip-text dark:text-transparent text-blue-600">
              Let's
            </span>{" "}
            <span className="dark:text-white text-slate-800">Connect</span>
          </h2>

          <p className="text-xl dark:text-slate-400 text-slate-600 font-cascadia">
            Mari Hijaukan dan Hidupkan Dunia
          </p>

          <button
            onClick={() => {
              if (isAuthenticated) {
                setIsAdminOpen(true);
              } else {
                setIsLoginOpen(true);
              }
            }}
            className="absolute top-0 right-0 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm p-3 rounded-full border border-slate-600/50 hover:border-blue-400/50 transition-all duration-300 group"
            title={isAuthenticated ? "Admin Panel" : "Admin Login"}
          >
            <FaCog className="text-slate-400 group-hover:text-blue-400 transition-colors duration-300 group-hover:rotate-90" />
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* LEFT - CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 hidden dark:block"></div>

              <div className="relative dark:bg-slate-900/80 bg-white backdrop-blur-xl rounded-3xl p-8 border dark:border-slate-700/50 border-slate-100 dark:shadow-none shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-600 bg-blue-600 rounded-full">
                    <FaPaperPlane className="text-white text-xl" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold dark:text-white text-slate-900">
                      Hubungi Kontak Saya
                    </h3>
                    <p className="dark:text-slate-400 text-slate-600">
                      Ada yang ingin bekerjasama? Kirim pesan ke saya!!
                    </p>
                  </div>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="group">
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-slate-400 text-slate-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors duration-300" />
                      <input
                        type="text"
                        placeholder="Nama Anda"
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full pl-12 pr-4 py-4 dark:bg-slate-800/50 bg-slate-50 border dark:border-slate-600/50 border-slate-200 rounded-xl dark:text-white text-slate-800 dark:placeholder-slate-400 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-slate-400 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-300" />
                      <input
                        type="email"
                        placeholder="Email Anda"
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full pl-12 pr-4 py-4 dark:bg-slate-800/50 bg-slate-50 border dark:border-slate-600/50 border-slate-200 rounded-xl dark:text-white text-slate-900 dark:placeholder-slate-400 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative">
                      <FaComment className="absolute left-4 top-6 dark:text-slate-400 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-300" />
                      <textarea
                        placeholder="Pesan Anda"
                        rows="5"
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm((prev) => ({
                            ...prev,
                            message: e.target.value,
                          }))
                        }
                        className="w-full pl-12 pr-4 py-4 dark:bg-slate-800/50 bg-slate-50 border dark:border-slate-600/50 border-slate-200 rounded-xl dark:text-white text-slate-900 dark:placeholder-slate-400 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmittingContact}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-600 dark:hover:from-blue-500 dark:hover:to-blue-500 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50"
                  >
                    {isSubmittingContact ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>Send</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* RIGHT - SOCIAL MEDIA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:sticky lg:top-24"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 hidden dark:block"></div>

              <div className="relative dark:bg-slate-900/80 bg-white backdrop-blur-xl rounded-3xl p-8 border dark:border-slate-700/50 border-slate-100 shadow-lg dark:shadow-none">
                <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-6 text-center">
                  Social Media
                </h3>

                <div className="grid gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className={`group flex items-center gap-4 p-4 bg-gradient-to-r ${social.color} rounded-xl text-white transition-all duration-300 ${social.hoverColor} hover:shadow-xl`}
                    >
                      <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </div>

                      <div className="flex-1">
                        <span className="font-semibold">{social.name}</span>
                        <p className="text-sm opacity-90">
                          Follow me on {social.name}
                        </p>
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <FaReply className="rotate-180" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isAdminOpen && (
          <AdminDashboard
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
          />
        )}

        {isLoginOpen && (
          <AdminLogin
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onSuccess={() => {
              setIsLoginOpen(false);
              setIsAdminOpen(true);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
