import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
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

    {/* Glass card */}
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative z-10 text-center max-w-3xl mx-6 glass rounded-2xl p-10 md:p-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex flex-col items-center mb-4"
      >
        <span className="text-maroon/50 text-sm mb-1">✦</span>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-maroon tracking-tight leading-tight">
          Magizh Vizha.
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="font-heading text-lg md:text-2xl text-foreground/90 mb-3"
      >
        Celebration, Curated to Perfection ✨
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="font-body text-sm md:text-base text-muted-foreground mb-8 max-w-xl mx-auto"
      >
        We are a multidisciplinary team turning happiness into extraordinary celebrations. Every moment deserves to be experienced fully, beautifully, and memorably.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <a
          href="#portfolio"
          className="px-8 py-3 rounded-full bg-maroon text-white font-body font-semibold text-sm hover-squishy shadow-lg"
        >
          Discover Our Work
        </a>
        <a
          href="#contact"
          className="px-8 py-3 rounded-full border-2 border-primary text-foreground font-body font-semibold text-sm hover-squishy hover:bg-primary/10"
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

export default HeroSection;
