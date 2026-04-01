import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const testimonials = [
  {
    quote: "MagizhVizha made our wedding truly unforgettable — every detail was perfect.",
    author: "Samuel",
    event: "Wedding Celebration",
  },
  {
    quote: "Our anniversary celebration felt effortless yet magical. Truly extraordinary.",
    author: "Kamal",
    event: "Anniversary Dinner",
  },
  {
    quote: "The team brought our vision to life with such creativity. Our daughter's birthday was a dream!",
    author: "Aditya",
    event: "Birthday Party",
  },
  {
    quote: "Absolutely stunning event planning! Every guest was blown away by the arrangements and ambience.",
    author: "Shanawaz",
    event: "Corporate Gala",
  },
];

const TestimonialsSection = () => {
  const [idx, setIdx] = useState(0);

  const next = useCallback(() => setIdx((p) => (p + 1) % testimonials.length), []);
  const prev = () => setIdx((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="testimonials" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <h2 className="font-display text-3xl md:text-5xl text-gradient-gold text-center mb-4">
            Words From Those We Celebrate With
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-16" />
        </AnimatedSection>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-10 md:p-16 text-center"
            >
              <Quote className="w-10 h-10 text-primary/30 mx-auto mb-6" />
              <p className="font-body text-lg md:text-xl text-foreground/90 italic leading-relaxed mb-8">
                "{testimonials[idx].quote}"
              </p>
              <p className="font-heading text-lg text-primary">{testimonials[idx].author}</p>
              <p className="font-body text-sm text-muted-foreground">{testimonials[idx].event}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center hover-squishy hover:bg-primary/10" aria-label="Previous testimonial">
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === idx ? "bg-primary w-6" : "bg-primary/30"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center hover-squishy hover:bg-primary/10" aria-label="Next testimonial">
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
