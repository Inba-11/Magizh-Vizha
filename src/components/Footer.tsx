import { Instagram, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="bg-charcoal py-12 px-6">
    <div className="max-w-7xl mx-auto text-center">
      <p className="font-display text-3xl font-black text-white mb-4 tracking-tight">Magizh Vizha<span className="text-white/50">.</span></p>
      <p className="font-body text-sm text-primary-foreground/60 mb-6">We craft what you love!</p>

      <div className="flex justify-center gap-4 mb-8">
        {[
          { icon: Instagram, href: "#", label: "Instagram" },
          { icon: Youtube, href: "#", label: "YouTube" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center hover-squishy hover:bg-primary/20 transition-colors"
          >
            <s.icon className="w-4 h-4 text-primary" />
          </a>
        ))}
      </div>

      <div className="border-t border-primary/15 pt-6">
        <p className="font-body text-xs text-primary-foreground/40">
          © 2026 MagizhVizha | We craft what you love!
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
