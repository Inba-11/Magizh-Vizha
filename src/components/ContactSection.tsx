import { useState, useEffect } from "react";
import { Mail, Phone, MessageCircle, Instagram, Send, ArrowUp, CheckCircle2, CalendarDays } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

// ── Google Sheets endpoint (Apps Script web app URL) ────────────────────────
// Replace the placeholder below with your deployed Apps Script URL.
// See the setup guide for instructions on how to deploy it.
const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbw0Zy6T7YoJHueMzYQ-iK28KTf49C0NaseQxKSv_QadSnyz271TI82LZ-NkpRHiA4-1Gg/exec";

// ── Data: event type → service groups ──────────────────────────────────────

type ServiceGroup = {
  groupTitle?: string;
  items: string[];
};

const EVENT_SERVICES: Record<string, ServiceGroup[]> = {
  Birthday: [
    {
      items: [
        "Event Planning & Coordination",
        "Venue Selection & Setup",
        "Theme Decoration",
        "Stage Setup & Custom Birthday Backdrop",
        "Balloon Arch / Entrance Decoration",
        "Photography & Videography",
        "Birthday Cake Arrangement",
        "DJ / Music & Dance Setup",
        "Games & Fun Activities",
        "Emcee / Party Host",
        "LED Screen / Memory Video Setup",
        "Photo Booth with Props",
        "Catering & Refreshments",
        "Return Gifts / Party Favors for Guests",
        "Digital Invitations & RSVP Management",
        "Special Entry for Birthday Person",
        "Special Effects (Confetti / Smoke / Cold Pyro)",
        "Kids Entertainment (Magician / Clown / Mascots)",
        "Kids Activity Zone",
        "Memory Slideshow",
        "Waste Management & Venue Cleanup",
      ],
    },
  ],

  Wedding: [
    {
      groupTitle: "Wedding Event Requirements",
      items: [
        "Wedding Planning & Coordination",
        "Venue Selection & Booking",
        "Stage Decoration & Mandap Setup",
        "Floral Decoration & Theme Styling",
        "Lighting & Special Effects",
        "Photography & Cinematic Videography",
        "Pre-Wedding Shoot Planning",
        "Bride & Groom Entry Concepts",
        "DJ, Band Music & Entertainment",
        "Live Music / Nadaswaram / Traditional Performers",
        "Catering & Dining Arrangement",
        "Wedding Invitations & Digital Invites",
        "Guest Welcome & Hospitality Management",
        "Accommodation & Transportation for Guests",
        "Return Gifts & Custom Wedding Hampers",
        "Mehendi / Haldi Setup & Decoration",
        "Photo Booth & Memory Wall",
        "Emcee / Wedding Host",
        "Fireworks / Cold Pyro / Special Effects",
        "Waste Management & Venue Cleanup",
      ],
    },
    {
      groupTitle: "Wedding Functions (Select if required)",
      items: [
        "Engagement",
        "Mehendi",
        "Haldi",
        "Sangeet",
        "Reception",
        "Wedding Ceremony",
      ],
    },
  ],

  Engagement: [
    {
      items: [
        "Wedding Planning & Coordination",
        "Venue Selection & Booking",
        "Stage Decoration & Mandap Setup",
        "Floral Decoration & Theme Styling",
        "Lighting & Special Effects",
        "Photography & Cinematic Videography",
        "Pre-Wedding Shoot Planning",
        "Bride & Groom Entry Concepts",
        "DJ, Band Music & Entertainment",
        "Live Music / Nadaswaram / Traditional Performers",
        "Catering & Dining Arrangement",
        "Wedding Invitations & Digital Invites",
        "Guest Welcome & Hospitality Management",
        "Accommodation & Transportation for Guests",
        "Return Gifts & Custom Wedding Hampers",
        "Mehendi / Haldi Setup & Decoration",
        "Photo Booth & Memory Wall",
        "Emcee / Wedding Host",
        "Fireworks / Cold Pyro / Special Effects",
        "Waste Management & Venue Cleanup",
      ],
    },
  ],

  "Surprise Event": [
    {
      groupTitle: "Applicable for: Birthday / Proposal / Anniversary / Welcome Home / Graduation Surprises",
      items: [
        "Surprise Concept & Planning",
        "Secret Venue Selection & Setup",
        "Theme Decoration (Balloons / Flowers / Custom Theme)",
        "Surprise Entry & Reveal Moment Planning",
        "Photography & Videography (Hidden Capture)",
        "Cake Arrangement",
        "DJ / Music Setup",
        "LED Screen / Memory Video Setup",
        "Custom Backdrop / Welcome Board",
        "Emcee / Host (Optional)",
        "Games & Fun Activities",
      ],
    },
  ],

  "Baby Shower": [
    {
      items: [
        "Venue Selection & Setup",
        "Theme Decoration (Baby Theme / Pastel / Floral / Cartoon)",
        "Stage Setup & Mommy Chair Decoration",
        "Balloon Decoration & Welcome Board",
        "Photography & Videography",
        "Maternity Photoshoot Setup (Optional)",
        "Cake & Dessert Table Setup",
        "Baby Shower Games & Activities",
        "Emcee / Host",
        "DJ",
        "Catering & Refreshments",
        "Customized Return Gifts for Guests",
        "Baby Hampers / Gift Packing",
        "Digital Invitations & RSVP Management",
        "Entry Arch / Welcome Setup",
        "Photo Booth with Baby Props",
        "Memory Board / Wishes for Baby Wall",
        "Baby Prediction Game Board",
        "Name Reveal Setup",
      ],
    },
  ],

  "Corporate Event": [
    {
      groupTitle: "Conferences",
      items: [
        "Venue Selection & Conference Hall Setup",
        "Stage, Podium & Branding Backdrop",
        "LED Screens / Projectors / Presentation Displays",
        "Audio System & Wireless Mic Setup",
        "Live Streaming / Hybrid Conference Setup",
        "Registration Desk & Delegate Management",
        "Conference Kits (Badges, Notebooks, Welcome Kits)",
        "Corporate Catering (Tea Breaks / Lunch / Dinner)",
        "Photography & Videography",
        "Emcee / Session Moderator",
        "Exhibition Booths / Sponsor Stalls",
        "Guest Transportation & Logistics",
        "Digital Invitations & RSVP Management",
      ],
    },
    {
      groupTitle: "Product Launch",
      items: [
        "Concept Development & Launch Theme",
        "Venue Selection & Stage Design",
        "LED Wall & Product Reveal Setup",
        "Special Effects (Smoke, Confetti, Lighting Effects)",
        "Brand Backdrops & Media Wall",
        "Product Display & Demo Booths",
        "Influencer / Media Guest Management",
        "Professional Photography & Videography",
        "Promotional Videos & Presentation Setup",
        "Host / Emcee",
        "Live Streaming & Social Media Coverage",
        "DJ / Entertainment Segment",
        "Corporate Catering & Refreshments",
        "Custom Merchandise / Launch Kits",
      ],
    },
    {
      groupTitle: "Annual Day",
      items: [
        "Venue & Stage Decoration with Company Branding",
        "LED Screens & Lighting Setup",
        "Audio System for Speeches & Performances",
        "Employee Performance Coordination",
        "Entertainment (DJ, Band, Cultural Programs)",
        "Award Distribution Setup",
        "Emcee / Host",
        "Photography & Videography",
        "Corporate Catering / Buffet",
        "Entry Experience & Welcome Setup",
        "Employee Registration & Guest Management",
        "Return Gifts / Employee Appreciation Gifts",
        "Special Effects (Lighting, Confetti, Fireworks)",
      ],
    },
    {
      groupTitle: "Award Ceremony",
      items: [
        "Theme Concept & Stage Design",
        "LED Screens / Award Presentation Graphics",
        "Trophy & Award Manufacturing",
        "Red Carpet Entry & Media Wall",
        "Professional Photography & Videography",
        "Live Streaming Setup",
        "Celebrity Guest / Speaker Management",
        "Host / Emcee",
        "Entertainment Segments (Music / Performances)",
        "Guest Registration & Seating Management",
        "Corporate Catering & Dinner",
        "Branding & Sponsor Display",
        "Invitation Design & RSVP Management",
      ],
    },
  ],

  Farewell: [
    {
      items: [
        "Venue Selection & Setup",
        "Stage Decoration & Theme Backdrop",
        "LED Screen / Projector for Memory Videos",
        "Audio System & Mic Setup for Speeches",
        "Photo Booth / Memory Wall",
        "Photography & Videography",
        "Farewell Video / Memory Montage Creation",
        "Emcee / Host",
        "Games & Fun Activities",
        "Music / DJ / Entertainment",
        "Catering & Refreshments",
        "Awards / Appreciation Certificates",
        "Customized Return Gifts / Souvenirs",
        "Digital Invitations & RSVP Management",
        "Entry Setup / Welcome Desk",
        "Special Effects (Confetti / Lighting)",
        "Guest Coordination & Seating Arrangement",
      ],
    },
  ],

  "Retirement Party": [
    {
      items: [
        "Venue Selection & Setup",
        "Stage Decoration & Tribute Backdrop",
        "LED Screen / Projector for Memory Video",
        "Audio System & Mic Setup for Speeches",
        "Welcome Standee / Entry Board",
        "Photography & Videography",
        "Memory Slideshow / Tribute Video Creation",
        "Emcee / Host",
        "Speech Coordination (Colleagues / Family / Management)",
        "Music / Light Entertainment",
        "Catering & Refreshments / Dinner",
        "Award / Appreciation Plaque / Trophy",
        "Customized Return Gifts / Souvenirs",
        "Photo Booth / Memory Wall",
        "Digital Invitations & RSVP Management",
        "Guest Coordination & Seating Arrangement",
        "Special Entry or Felicitation Moment",
      ],
    },
  ],

  "House Warming": [
    {
      items: [
        "Event Planning & Coordination",
        "Venue / House Decoration Setup",
        "Floral Decoration (Entrance / Pooja Area)",
        "Welcome Board / Name Board Setup",
        "Entrance Arch & Traditional Decoration (Mango Leaves / Flowers)",
        "Stage Setup for Family Photo Area",
        "Photography & Videography",
        "Traditional Music (Nadaswaram / Instrumental Music)",
        "Pooja Arrangement & Priest Coordination",
        "Seating Arrangement for Guests",
        "Catering / Traditional Feast Arrangement",
        "Tea / Refreshment Counter",
        "Digital Invitations & RSVP Management",
        "Return Gifts / Guest Souvenirs",
        "Guest Welcome & Hospitality Management",
        "Parking & Guest Coordination",
        "Waste Management & Cleanup",
      ],
    },
  ],
};

const EVENT_TYPES = [
  "Birthday",
  "Wedding",
  "Engagement",
  "Surprise Event",
  "Baby Shower",
  "Corporate Event",
  "Farewell",
  "Retirement Party",
  "House Warming",
  "Other",
];

// ── Types ───────────────────────────────────────────────────────────────────

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  guestCount: string;
  services: string[];
  otherService: string;
  budget: string;
  description: string;
};

const initialForm: FormState = {
  fullName: "",
  phone: "",
  email: "",
  eventType: "",
  eventDate: "",
  eventLocation: "",
  guestCount: "",
  services: [],
  otherService: "",
  budget: "",
  description: "",
};

// ── Component ───────────────────────────────────────────────────────────────

const ContactSection = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const toggleService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleEventTypeChange = (value: string) => {
    // Clear services whenever event type changes
    setForm((prev) => ({ ...prev, eventType: value, services: [], otherService: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const selectedServices = [
      ...form.services,
      ...(form.otherService ? [`Others: ${form.otherService}`] : []),
    ].join(", ") || "None selected";

    try {
      const response = await fetch("https://formsubmit.co/ajax/magizhvizha@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `🎉 New Event Quote Request — ${form.eventType} — ${form.fullName}`,
          _replyto: form.email,
          _template: "box",
          "Full Name": form.fullName,
          "Phone / WhatsApp": form.phone,
          "Email Address": form.email,
          "Type of Event": form.eventType,
          "Event Date": form.eventDate || "Not specified",
          "Event Location": form.eventLocation || "Not specified",
          "Estimated Number of Guests": form.guestCount || "Not specified",
          "Services Required": selectedServices,
          "Estimated Budget Range": form.budget || "Not specified",
          "Event Description & Special Requests": form.description || "None",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setForm(initialForm);
        setTimeout(() => setStatus("idle"), 6000);

        // ── Fire-and-forget: write to Google Sheets ──
        // Uses no-cors so we can't read the response, but the data is written.
        try {
          const sheetsData = new URLSearchParams();
          sheetsData.append("fullName",      form.fullName);
          sheetsData.append("phone",         form.phone);
          sheetsData.append("email",         form.email);
          sheetsData.append("eventType",     form.eventType);
          sheetsData.append("eventDate",     form.eventDate);
          sheetsData.append("eventLocation", form.eventLocation);
          sheetsData.append("guestCount",    form.guestCount);
          sheetsData.append("services",      selectedServices);
          sheetsData.append("budget",        form.budget);
          sheetsData.append("description",   form.description);
          fetch(SHEETS_ENDPOINT, { method: "POST", mode: "no-cors", body: sheetsData });
        } catch { /* Sheets logging is non-critical */ }
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputClass =
    "w-full px-5 py-3.5 rounded-xl bg-background/50 border border-primary/20 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all";

  const activeGroups = form.eventType ? (EVENT_SERVICES[form.eventType] ?? []) : [];

  return (
    <section id="contact" className="section-padding bg-peach/30">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h2 className="font-display text-3xl md:text-5xl text-gradient-gold text-center mb-2">
            Plan Your Celebration
          </h2>
          <p className="font-body text-center text-muted-foreground max-w-xl mx-auto mb-12">
            Ready to create something extraordinary? Fill in the details below and we'll get back
            to you with a personalised quote.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-10">
          {/* ── Quote Form ── */}
          <AnimatedSection delay={0.2} className="md:col-span-2">
            {status === "success" ? (
              <div className="glass rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[320px]">
                <CheckCircle2 className="w-16 h-16 text-primary animate-bounce" />
                <h3 className="font-display text-2xl text-gradient-gold">Quote Request Sent! 🎉</h3>
                <p className="font-body text-muted-foreground max-w-sm">
                  Thank you! We've received your event details and will reach out soon with your
                  personalised quote.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">

                {/* Row 1: Full Name + Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-heading text-xs text-foreground/80 uppercase tracking-wider">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-heading text-xs text-foreground/80 uppercase tracking-wider">
                      Phone Number / WhatsApp <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter your contact number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Row 2: Email + Event Type */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-heading text-xs text-foreground/80 uppercase tracking-wider">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-heading text-xs text-foreground/80 uppercase tracking-wider">
                      Type of Event <span className="text-primary">*</span>
                    </label>
                    <select
                      required
                      value={form.eventType}
                      onChange={(e) => handleEventTypeChange(e.target.value)}
                      className={inputClass}
                    >
                      <option value="" disabled>Select event type</option>
                      {EVENT_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: Event Date + Location */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-heading text-xs text-foreground/80 uppercase tracking-wider">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={form.eventDate}
                      onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-heading text-xs text-foreground/80 uppercase tracking-wider">
                      Event Location
                    </label>
                    <input
                      type="text"
                      placeholder="City / Venue Name (or not finalized)"
                      value={form.eventLocation}
                      onChange={(e) => setForm({ ...form, eventLocation: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="space-y-1.5">
                  <label className="font-heading text-xs text-foreground/80 uppercase tracking-wider">
                    Estimated Number of Guests
                  </label>
                  <input
                    type="number"
                    min={1}
                    placeholder="e.g. 150"
                    value={form.guestCount}
                    onChange={(e) => setForm({ ...form, guestCount: e.target.value })}
                    className={inputClass}
                  />
                </div>

                {/* Divider */}
                <hr className="border-primary/15" />

                {/* ── Dynamic Services Section ── */}
                <div className="space-y-3">
                  <label className="font-heading text-xs text-foreground/80 uppercase tracking-wider">
                    Services Required{" "}
                    <span className="text-muted-foreground/60 normal-case font-body">
                      (select all that apply)
                    </span>
                  </label>

                  {/* Empty state — no event type chosen yet */}
                  {!form.eventType && (
                    <div className="flex flex-col items-center justify-center gap-3 py-10 rounded-2xl border border-dashed border-primary/20 bg-background/20">
                      <CalendarDays className="w-9 h-9 text-primary/30" />
                      <p className="font-body text-sm text-muted-foreground/60 text-center max-w-xs">
                        Select an <span className="text-primary/70 font-semibold">event type</span> above to see the available services for your celebration
                      </p>
                    </div>
                  )}

                  {/* Event-specific services */}
                  {form.eventType && activeGroups.length > 0 && (
                    <div className="space-y-5">
                      {activeGroups.map((group, gIdx) => (
                        <div key={gIdx} className="space-y-2">
                          {group.groupTitle && (
                            <p className="font-heading text-[11px] uppercase tracking-widest text-primary/60 px-1 pt-1">
                              {group.groupTitle}
                            </p>
                          )}
                          <div className="grid sm:grid-cols-2 gap-2">
                            {group.items.map((service) => {
                              const checked = form.services.includes(service);
                              return (
                                <button
                                  key={service}
                                  type="button"
                                  onClick={() => toggleService(service)}
                                  className={`flex items-start gap-2.5 px-4 py-2.5 rounded-xl border text-left text-sm font-body transition-all ${
                                    checked
                                      ? "border-primary bg-primary/15 text-foreground"
                                      : "border-primary/20 bg-background/40 text-muted-foreground hover:border-primary/50 hover:bg-primary/5"
                                  }`}
                                >
                                  <span
                                    className={`mt-[1px] w-4 h-4 min-w-[1rem] rounded border flex items-center justify-center transition-colors flex-shrink-0 ${
                                      checked
                                        ? "bg-primary border-primary text-white"
                                        : "border-primary/40"
                                    }`}
                                  >
                                    {checked && (
                                      <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" fill="none">
                                        <path
                                          d="M1.5 5l2.5 2.5 4.5-4.5"
                                          stroke="currentColor"
                                          strokeWidth="1.6"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    )}
                                  </span>
                                  <span className="leading-snug">{service}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      {/* Others (always shown after event-specific services) */}
                      <input
                        type="text"
                        placeholder="Others – please specify"
                        value={form.otherService}
                        onChange={(e) => setForm({ ...form, otherService: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  )}

                  {/* "Other" event type — no service list, just a free-text */}
                  {form.eventType === "Other" && (
                    <input
                      type="text"
                      placeholder="Please describe the services you need"
                      value={form.otherService}
                      onChange={(e) => setForm({ ...form, otherService: e.target.value })}
                      className={inputClass}
                    />
                  )}
                </div>

                {/* Divider */}
                <hr className="border-primary/15" />

                {/* Budget */}
                <div className="space-y-1.5">
                  <label className="font-heading text-xs text-foreground/80 uppercase tracking-wider">
                    Estimated Budget Range
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹50,000 – ₹1,00,000"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className={inputClass}
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="font-heading text-xs text-foreground/80 uppercase tracking-wider">
                    Tell us about your event
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share your ideas, theme, inspiration, or any special requests…"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-body font-semibold hover-squishy shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100 transition-all"
                >
                  {status === "idle" && (
                    <>
                      <Send className="w-4 h-4" />
                      Get Your Quote
                    </>
                  )}
                  {status === "submitting" && "Sending your request…"}
                  {status === "error" && "Something went wrong. Please try again."}
                </button>
              </form>
            )}
          </AnimatedSection>

          {/* ── Contact Info ── */}
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
                {
                  icon: Instagram,
                  label: "DM on Instagram",
                  value: "Instagram Direct",
                  href: "https://www.instagram.com/direct/t/18065103797321659/",
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
                <p className="font-body text-sm text-muted-foreground">
                  Coimbatore | Serving Across Tamil Nadu
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll to Top */}
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
