import { useState, useEffect } from "react";
import { Mail, Phone, MessageCircle, Send, ArrowUp } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("https://formsubmit.co/ajax/magizhvizha@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          _subject: `New Celebration Inquiry from ${form.name}`,
          _replyto: form.email, // This makes the "From" email act like the user's email
          _template: "box",      // This removes the ugly FormSubmit branding and makes it a clean table
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="section-padding bg-peach/30">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="font-display text-3xl md:text-5xl text-gradient-gold text-center mb-2">
            Plan Your Celebration
          </h2>
          <p className="font-body text-center text-muted-foreground max-w-xl mx-auto mb-12">
            Ready to create something extraordinary? Let's design a celebration that's truly yours.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
              {[
                { name: "name" as const, placeholder: "Your Name", type: "text" },
                { name: "email" as const, placeholder: "Your Email", type: "email" },
              ].map((f) => (
                <input
                  key={f.name}
                  type={f.type}
                  required
                  placeholder={f.placeholder}
                  value={form[f.name]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-background/50 border border-primary/20 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
              ))}
              <textarea
                required
                rows={4}
                placeholder="Tell us about your celebration..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-background/50 border border-primary/20 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
              />
              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-body font-semibold hover-squishy shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100 transition-all"
              >
                {status === "idle" && (
                  <>
                    <Send className="w-4 h-4" />
                    Send a Message
                  </>
                )}
                {status === "submitting" && "Sending..."}
                {status === "success" && "Message Sent Successfully! ✨"}
                {status === "error" && "Error. Please try again."}
              </button>
            </form>
          </AnimatedSection>

          {/* Contact info */}
          <AnimatedSection delay={0.4}>
            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: "Email Us",
                  value: "magizhvizha@gmail.com",
                  href: "https://mail.google.com/mail/?view=cm&to=magizhvizha@gmail.com",
                },
                {
                  icon: Phone,
                  label: "Call Us",
                  value: "+91-9080791218",
                  href: "tel:+919080791218",
                },
                {
                  icon: MessageCircle,
                  label: "Chat on WhatsApp",
                  value: "+91-9080791218",
                  href: "https://wa.me/919080791218?text=Hi%20MagizhVizha!%20I%27d%20like%20to%20plan%20a%20celebration.",
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="glass rounded-2xl p-6 flex items-center gap-5 hover-squishy group block"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading text-sm text-foreground">{c.label}</p>
                    <p className="font-body text-sm text-muted-foreground">{c.value}</p>
                  </div>
                </a>
              ))}

              <div className="glass rounded-2xl p-6">
                <p className="font-heading text-sm text-foreground mb-1">📍 Location</p>
                <p className="font-body text-sm text-muted-foreground">Coimbatore | Serving Across Tamil Nadu</p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll to Top Button - Appears on scroll */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover-squishy flex items-center justify-center z-40 animate-in fade-in slide-in-from-bottom-4 duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
