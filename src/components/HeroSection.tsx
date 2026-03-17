import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [showTamil, setShowTamil] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;

    const scheduleNext = () => {
      const nextMs = 5000 + Math.floor(Math.random() * 3001); // 5000–8000ms
      timeoutId = window.setTimeout(() => {
        setShowTamil((v) => !v);
        scheduleNext();
      }, nextMs);
    };

    scheduleNext();
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  const titleBase =
    "font-display text-6xl md:text-7xl lg:text-[6.5rem] font-black text-maroon tracking-tight leading-none whitespace-nowrap";

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <img
        src={heroBg}
        alt="Luxurious celebration setup with golden lighting and floral arrangements"
        className="w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/80" />
    </div>

    {/* Glass card — matching the screenshot perfectly */}
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative z-10 text-center w-full max-w-[22rem] sm:max-w-3xl mx-4 sm:mx-6 glass rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10 md:px-16 md:py-14 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
      style={{ background: 'rgba(251, 245, 238, 0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', opacity: 1, transform: 'none' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex flex-col items-center mb-0 md:mb-2"
        style={{ opacity: 1, transform: 'none' }}
      >
        <span className="text-maroon/60 text-lg mb-6 leading-none">✦</span>
        <div className="mb-4 grid w-full min-h-[1.3em] place-items-center">
          <h1
            className={[
              titleBase,
              "col-start-1 row-start-1 w-full text-center transition-all duration-700 ease-in-out",
              showTamil ? "opacity-0 -translate-y-1 pointer-events-none" : "opacity-100 translate-y-0",
            ].join(" ")}
            aria-hidden={showTamil}
          >
            Magizh Vizha.
          </h1>

          <h1
            className={[
              titleBase,
              "font-tamil",
              "text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem]",
              "col-start-1 row-start-1 w-full text-center transition-all duration-700 ease-in-out",
              showTamil ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none",
            ].join(" ")}
            aria-hidden={!showTamil}
          >
            மகிழ்விழா
          </h1>
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="font-serif text-lg md:text-2xl text-maroon/90 mb-6"
        style={{ opacity: 1 }}
      >
        Celebration, Curated to Perfection
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="font-body text-sm md:text-[15px] text-foreground/80 mb-10 max-w-[550px] mx-auto leading-relaxed"
        style={{ opacity: 1 }}
      >
        We are a multidisciplinary team turning happiness into extraordinary celebrations. Every moment deserves to be experienced fully, beautifully, and memorably.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        style={{ opacity: 1, transform: 'none' }}
      >
        <a
          href="#portfolio"
          className="px-8 py-3.5 rounded-full bg-maroon text-white font-body font-semibold text-sm hover-squishy shadow-lg transition-all"
        >
          Discover Our Work
        </a>
        <a
          href="#contact"
          className="px-8 py-3.5 rounded-full border border-maroon text-maroon font-body font-semibold text-sm hover-squishy hover:bg-maroon/5 transition-all border-[1.5px]"
        >
          Plan Your Celebration
        </a>
      </motion.div>
    </motion.div>

    {/* Scroll indicator */}
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
    >
      <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-1.5">
        <div className="w-1.5 h-3 rounded-full bg-primary/60" />
      </div>
    </motion.div>
  </section>
  );
};

export default HeroSection;
