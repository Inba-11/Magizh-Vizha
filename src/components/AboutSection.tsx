import AnimatedSection from "./AnimatedSection";
import aboutImg from "@/assets/about-team.jpg";

const AboutSection = () => (
  <section id="about" className="section-padding bg-lavender/30">
    <div className="max-w-7xl mx-auto">
      <AnimatedSection>
        <h2 className="font-display text-3xl md:text-5xl text-gradient-gold text-center mb-4">Who We Are</h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-12" />
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <AnimatedSection delay={0.2}>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={aboutImg}
              alt="MagizhVizha team reviewing event plans"
              className="w-full h-80 md:h-[400px] object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4">
            We are MagizhVizha ✨
          </h3>
          <p className="font-body text-muted-foreground leading-relaxed mb-6">
            A creative team passionate about transforming joy into memorable, beautifully curated celebrations.
            Every event we touch is designed with thoughtful attention to detail, elegance, and intention.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            From concept to execution, we bring a fresh, modern perspective to celebrations — blending timeless
            elegance with contemporary creativity that makes every moment extraordinary.
          </p>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default AboutSection;
