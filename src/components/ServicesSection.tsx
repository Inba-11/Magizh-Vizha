import { Heart, Crown, Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const services = [
  {
    icon: Heart,
    title: "Intimate Gatherings",
    desc: "Personalized, meaningful, unforgettable. We craft cozy celebrations that feel warm, connected, and truly yours.",
    bg: "bg-peach",
  },
  {
    icon: Crown,
    title: "Milestone Celebrations",
    desc: "Elegant, memorable, cinematic. Birthdays, anniversaries, and milestones designed to be remembered forever.",
    bg: "bg-peach",
  },
  {
    icon: Sparkles,
    title: "Grand Events",
    desc: "Curated luxury, every detail perfected. Weddings and galas that leave guests speechless with wonder.",
    bg: "bg-peach",
  },
];

const ServicesSection = () => (
  <section id="services" className="section-padding">
    <div className="max-w-7xl mx-auto">
      <AnimatedSection>
        <h2 className="font-display text-3xl md:text-5xl text-gradient-gold text-center mb-2">Our Craft</h2>
        <p className="font-heading text-lg text-center text-foreground/80 mb-4">We craft what you love!</p>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6" />
        <p className="font-body text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          From intimate gatherings to grand milestones, we research, design, and curate celebrations
          that are unique, thoughtful, and tailored to your vision.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <AnimatedSection key={s.title} delay={i * 0.15}>
            <div className="bg-maroon rounded-2xl p-8 md:p-10 hover-squishy cursor-default group transition-shadow hover:shadow-xl">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-heading text-xl font-semibold text-white mb-3">{s.title}</h4>
              <p className="font-body text-sm text-white/70 leading-relaxed">{s.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
