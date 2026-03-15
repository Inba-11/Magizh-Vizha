import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";

const items = [
  { img: p1, title: "A 50th Birthday Celebration", tag: "Elegant Pastel Theme", cat: "birthday" },
  { img: p2, title: "Royal Wedding Reception", tag: "Grand Golden Décor", cat: "wedding" },
  { img: p3, title: "Anniversary Garden Dinner", tag: "Outdoor Fairy Lights", cat: "anniversary" },
  { img: p4, title: "Corporate Gala Night", tag: "Luxury White & Gold", cat: "corporate" },
];

const filters = ["all", "wedding", "birthday", "anniversary", "corporate"];

const PortfolioSection = () => {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? items : items.filter((i) => i.cat === active);

  return (
    <section id="portfolio" className="section-padding bg-lavender/20">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="font-display text-3xl md:text-5xl text-gradient-gold text-center mb-2">
            Moments We've Crafted
          </h2>
          <p className="font-body text-center text-muted-foreground max-w-xl mx-auto mb-8">
            Every celebration is a story — and we bring it to life through cinematic, timeless experiences.
          </p>
        </AnimatedSection>

        {/* Filters */}
        <AnimatedSection delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2 rounded-full font-body text-sm capitalize transition-all hover-squishy ${
                  active === f
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-background border border-primary/30 text-foreground/70 hover:border-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Gallery */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                  <div>
                    <p className="font-heading text-lg text-primary-foreground">{item.title}</p>
                    <p className="font-body text-sm text-primary-foreground/80">{item.tag}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
