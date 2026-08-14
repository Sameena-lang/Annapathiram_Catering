import { useState, useEffect, useRef } from "react";
import {
  Menu, X, Phone, MessageCircle, MapPin, Mail, Star,
  ChevronLeft, ChevronRight, Check, ArrowRight,
  Award, UtensilsCrossed, Clock, Leaf, Shield,
  ChefHat, Heart, CalendarDays, Home, Building2, Zap,
} from "lucide-react";

// ── Image helper ──────────────────────────────────────────────────────────────

function img(photoId: string, w: number, h: number) {
  return `https://images.unsplash.com/photo-${photoId}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 1500, suffix: "+", label: "Events Catered" },
  { value: 75000, suffix: "+", label: "Happy Guests" },
  { value: 150, suffix: "+", label: "Menu Varieties" },
];

const SERVICES = [
  {
    icon: Heart,
    title: "Wedding Catering",
    desc: "Grand wedding feasts with authentic South Indian spreads served with royal elegance on banana leaves.",
  },
  {
    icon: Star,
    title: "Reception Catering",
    desc: "Lavish reception dinners with premium multi-cuisine buffets, live counters, and impeccable service.",
  },
  {
    icon: Building2,
    title: "Corporate Events",
    desc: "Professional catering tailored for corporate meetings, conferences, and grand company galas.",
  },
  {
    icon: CalendarDays,
    title: "Birthday Parties",
    desc: "Delightful menus crafted for unforgettable birthday celebrations from intimate to grand scale.",
  },
  {
    icon: Award,
    title: "Engagement Functions",
    desc: "Elegant catering for auspicious engagement ceremonies with fully customized traditional menus.",
  },
  {
    icon: Home,
    title: "Housewarming",
    desc: "Traditional housewarming feasts prepared fresh with authentic home-style South Indian recipes.",
  },
  {
    icon: UtensilsCrossed,
    title: "Outdoor Catering",
    desc: "Full-service outdoor catering with complete setup, service, logistics and cleanup support.",
  },
  {
    icon: Zap,
    title: "Live Food Counters",
    desc: "Sizzling live dosa, tandoori, chaat, and dessert stations that become the highlight of your event.",
  },
];

const MENU_ITEMS = [
  { title: "Traditional Banana Leaf Meal", tag: "Signature",  photoId: "1625398407796-82650a8c135f" },
  { title: "Chicken Biryani",              tag: "Bestseller", photoId: "1782541370275-6761522e39d1" },
  { title: "Mutton Biryani",               tag: "Premium",    photoId: "1775039983787-3fe9b416c545" },
  { title: "Chettinad Special",            tag: "Spicy",      photoId: "1711633648895-f5df0336ff55" },
  { title: "Traditional Sweets",           tag: "Festive",    photoId: "1758910536889-43ce7b3199fd" },
  { title: "Jalebi & Mithai",              tag: "Classic",    photoId: "1760263217152-009971f0bccc" },
  { title: "Premium Dessert Counter",      tag: "Luxury",     photoId: "1661560277080-558425cea910" },
  { title: "Grand Buffet Spread",          tag: "Event",      photoId: "1629961126387-0dcbfea19a94" },
];

const WHY_US = [
  { icon: Leaf,           title: "Fresh Ingredients Daily",      desc: "Farm-fresh produce sourced every morning for maximum quality and flavour in every dish." },
  { icon: Shield,         title: "100% Hygienic Preparation",    desc: "FSSAI-certified kitchen with stringent hygiene protocols and food-safety standards maintained always." },
  { icon: ChefHat,        title: "Experienced Catering Team",    desc: "25+ master chefs with decades of expertise crafting authentic South Indian culinary masterpieces." },
  { icon: UtensilsCrossed,title: "Customized Menu Packages",     desc: "Fully personalized menus and service packages crafted to match your event theme and budget." },
  { icon: Clock,          title: "On-Time Service Guarantee",    desc: "We guarantee punctual arrival, setup, and service — your guests are never left waiting." },
  { icon: Award,          title: "Affordable Luxury Experience", desc: "Premium catering quality and presentation delivered at competitive, value-for-money pricing." },
];

const TESTIMONIALS = [
  {
    name: "Priya Ramamurthy",
    role: "Wedding Client · Chennai",
    rating: 5,
    review: "Magizh Mahal made our wedding day absolutely perfect. The banana leaf spread was bountiful and authentic — every guest was raving about the food. A truly grand feast we will never forget!",
    initials: "PR",
  },
  {
    name: "Karthik Sundaram",
    role: "Corporate Event Manager · Coimbatore",
    rating: 5,
    review: "We hired them for our 500-guest annual company gala and they delivered flawlessly. The live counters were a massive hit. Professional, punctual, and absolutely delicious. Highly recommended!",
    initials: "KS",
  },
  {
    name: "Meenakshi Venkatesh",
    role: "Reception Client · Madurai",
    rating: 5,
    review: "The reception biryani and chettinad specials were outstanding. Our guests could not stop complimenting the food quality. Magizh Mahal truly understands authentic South Indian hospitality.",
    initials: "MV",
  },
  {
    name: "Ramesh Narayanan",
    role: "Housewarming Client · Trichy",
    rating: 5,
    review: "From setup to cleanup, everything was seamless. The traditional meal was exactly like home cooking — warm, authentic, and absolutely delightful. The team's professionalism was unmatched.",
    initials: "RN",
  },
  {
    name: "Anitha Selvam",
    role: "Birthday Party Client · Salem",
    rating: 5,
    review: "They catered my daughter's 18th birthday for 200 guests and the service was impeccable. The dessert counter and live dosa station were absolute crowd-favorites. Will book again without hesitation!",
    initials: "AS",
  },
];

const GALLERY = [
  { photoId: "1780542900375-0cf459e38fbb", alt: "Grand wedding banquet hall with chandeliers", tall: true  },
  { photoId: "1681497885909-c7cec084e949", alt: "Elegant floral dining table setup",           tall: false },
  { photoId: "1567530331069-630c6a3926f3", alt: "Traditional South Indian banana leaf serving", tall: false },
  { photoId: "1780593116478-c46838f86523", alt: "Luxury ballroom with white table settings",    tall: true  },
  { photoId: "1776663124744-3206a165692f", alt: "Ornate golden interior celebration hall",      tall: false },
  { photoId: "1763231575952-98244918f99b", alt: "Elegant round-table grand dinner setup",       tall: false },
];

// ── Reusable pieces ───────────────────────────────────────────────────────────

function GoldRule({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-3">
      <span className="block w-8 h-px bg-[#D4AF37]" />
      <span className="text-[#D4AF37] font-semibold text-[11px] tracking-[0.22em] uppercase">{text}</span>
      <span className="block w-8 h-px bg-[#D4AF37]" />
    </div>
  );
}

function SectionHead({
  label, title, accent, body, dark = false,
}: {
  label: string; title: string; accent: string; body: string; dark?: boolean;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <GoldRule text={label} />
      <h2
        className={`font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold leading-tight mt-1 mb-5 ${
          dark ? "text-white" : "text-[#1A1A1A]"
        }`}
      >
        {title}{" "}
        <span className={dark ? "text-[#D4AF37]" : "text-[#7A0E0E]"}>{accent}</span>
      </h2>
      <p className={`text-base leading-relaxed ${dark ? "text-white/55" : "text-[#1A1A1A]/55"}`}>{body}</p>
    </div>
  );
}

function Counter({
  value, suffix, label, active, delay,
}: {
  value: number; suffix: string; label: string; active: boolean; delay: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setTimeout(() => {
      const dur = 2300;
      let t0: number | null = null;
      const tick = (ts: number) => {
        if (!t0) t0 = ts;
        const p = Math.min((ts - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setCount(Math.round(e * value));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(id);
  }, [active, value, delay]);

  return (
    <div className="text-center">
      <div className="font-['Playfair_Display',serif] font-bold text-5xl md:text-6xl text-white tabular-nums leading-none mb-2">
        {count.toLocaleString()}
        <span className="text-[#D4AF37]">{suffix}</span>
      </div>
      <div className="text-[#D4AF37]/75 text-[11px] font-bold tracking-[0.18em] uppercase">{label}</div>
    </div>
  );
}

function ServiceCard({ s }: { s: (typeof SERVICES)[number] }) {
  const Icon = s.icon;
  return (
    <div className="group bg-white border border-[#D4AF37]/15 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:border-[#D4AF37]/45 hover:-translate-y-2 transition-all duration-300 cursor-default">
      <div className="w-14 h-14 rounded-xl bg-[#7A0E0E]/[0.08] group-hover:bg-[#7A0E0E] flex items-center justify-center mb-5 transition-colors duration-300">
        <Icon className="w-7 h-7 text-[#7A0E0E] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
      </div>
      <h3 className="font-['Playfair_Display',serif] font-bold text-[#1A1A1A] text-lg mb-2">{s.title}</h3>
      <p className="text-[#1A1A1A]/55 text-sm leading-relaxed">{s.desc}</p>
      <div className="mt-5 h-0.5 w-0 group-hover:w-full bg-[#D4AF37] transition-all duration-500 rounded-full" />
    </div>
  );
}

function MenuCard({ m }: { m: (typeof MENU_ITEMS)[number] }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 bg-[#1A1A1A] cursor-default">
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={img(m.photoId, 480, 640)}
          alt={m.title}
          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/10 to-transparent" />
      <span className="absolute top-3 right-3 bg-[#D4AF37] text-[#1A1A1A] text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase">
        {m.tag}
      </span>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-semibold text-sm leading-snug">{m.title}</h3>
        <div className="flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[#D4AF37] text-xs font-medium">View Details</span>
          <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
        </div>
      </div>
    </div>
  );
}

function WhyCard({ w }: { w: (typeof WHY_US)[number] }) {
  const Icon = w.icon;
  return (
    <div className="group bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl p-7 transition-all duration-300 cursor-default">
      <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 group-hover:bg-[#D4AF37] flex items-center justify-center mb-5 transition-colors duration-300">
        <Icon className="w-6 h-6 text-[#D4AF37] group-hover:text-[#1A1A1A] transition-colors duration-300" strokeWidth={1.5} />
      </div>
      <h3 className="font-semibold text-white text-base mb-2">{w.title}</h3>
      <p className="text-white/45 text-sm leading-relaxed">{w.desc}</p>
    </div>
  );
}

function GalleryItem({ g }: { g: (typeof GALLERY)[number] }) {
  const h = g.tall ? 820 : 400;
  return (
    <div className="relative group overflow-hidden rounded-2xl bg-[#1A1A1A] shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-full">
      <img
        src={img(g.photoId, 600, h)}
        alt={g.alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/65 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
        <span className="text-white text-sm font-medium">{g.alt}</span>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [tIdx, setTIdx]                   = useState(0);
  const [countersOn, setCountersOn]       = useState(false);
  const [form, setForm]                   = useState({ name: "", mobile: "", event: "", date: "", guests: "", notes: "" });

  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCountersOn(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  const go = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const setF = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="bg-[#FFFDF7] text-[#1A1A1A] font-['Poppins',sans-serif] overflow-x-hidden scroll-smooth">

      {/* ─────────────────────────── NAVBAR ─────────────────────────── */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#1A1A1A]/95 backdrop-blur-xl shadow-2xl py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">

          {/* Logo */}
          <button onClick={() => go("#home")} className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-[#7A0E0E]" strokeWidth={2} />
            </div>
            <div className="text-left leading-none">
              <div className="font-['Playfair_Display',serif] font-bold text-white text-[15px]">Magizh Mahal</div>
              <div className="text-[#D4AF37] text-[9px] font-bold tracking-[0.28em] uppercase mt-0.5">Catering</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map(l => (
              <button key={l.label} onClick={() => go(l.href)}
                className="text-white/70 hover:text-[#D4AF37] text-sm font-medium tracking-wide transition-colors duration-200">
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#25D366] hover:bg-[#1fc95c] text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors duration-200 shrink-0">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <button onClick={() => setMobileOpen(v => !v)} className="lg:hidden text-white p-1">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#1A1A1A]/98 backdrop-blur-xl border-t border-white/10 px-6 py-4 space-y-0.5">
            {NAV_LINKS.map(l => (
              <button key={l.label} onClick={() => go(l.href)}
                className="w-full text-left text-white/65 hover:text-[#D4AF37] text-sm font-medium py-3 border-b border-white/5 transition-colors">
                {l.label}
              </button>
            ))}
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3.5 rounded-xl mt-5 text-sm">
              <MessageCircle className="w-4 h-4" />
              Instant WhatsApp Booking
            </a>
          </div>
        )}
      </header>

      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[#1A1A1A]">
          <img
            src={img("1625398407796-82650a8c135f", 1920, 1080)}
            alt="Traditional South Indian wedding feast on banana leaf"
            className="w-full h-full object-cover opacity-40 scale-105"
          />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A]/90 via-[#7A0E0E]/20 to-[#1A1A1A]/85" />
        {/* Gold hairline at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-28">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2.5 bg-[#D4AF37]/12 border border-[#D4AF37]/30 text-[#D4AF37] px-5 py-2 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            South India's Premier Catering Service
          </div>

          <h1 className="font-['Playfair_Display',serif] font-bold text-white leading-[1.07] mb-7 text-[clamp(2.6rem,8vw,5.5rem)]">
            Turning Every
            <span className="block text-[#D4AF37] italic">Celebration into</span>
            a Grand Feast
          </h1>

          <p className="text-white/65 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Experience exceptional catering with authentic flavors, premium ingredients, and unforgettable hospitality from Magizh Mahal Catering.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => go("#contact")}
              className="bg-[#7A0E0E] hover:bg-[#8e1111] text-white font-semibold px-9 py-4 rounded-full text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-2xl hover:shadow-[#7A0E0E]/50 hover:-translate-y-0.5">
              Book Catering
              <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => go("#menu")}
              className="bg-white/10 hover:bg-white/16 text-white border border-white/25 hover:border-[#D4AF37]/50 font-semibold px-9 py-4 rounded-full text-sm flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-sm">
              Explore Menu
              <UtensilsCrossed className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 pointer-events-none">
          <div className="w-px h-10 bg-gradient-to-b from-[#D4AF37] to-transparent" />
          <ChevronLeft className="w-4 h-4 text-[#D4AF37] -rotate-90" />
        </div>
      </section>

      {/* ─────────────────────────── STATS ─────────────────────────── */}
      <section ref={statsRef} className="bg-[#7A0E0E] py-16 relative overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 20% 50%, #D4AF37 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, #D4AF37 0%, transparent 55%)" }}
        />
        <div className="relative max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((s, i) => (
            <Counter key={i} {...s} active={countersOn} delay={i * 190} />
          ))}
        </div>
      </section>

      {/* ─────────────────────────── ABOUT ─────────────────────────── */}
      <section id="about" className="py-28 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image column */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-[#1A1A1A]/15">
              <img
                src={img("1779384110912-f3ff2616759c", 800, 1000)}
                alt="Expert chef preparing authentic South Indian cuisine in warm kitchen"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Years badge */}
            <div className="absolute -bottom-5 -right-5 bg-[#D4AF37] rounded-2xl px-6 py-4 shadow-xl">
              <div className="font-['Playfair_Display',serif] font-bold text-[#1A1A1A] text-4xl leading-none">
                10<span className="text-2xl">+</span>
              </div>
              <div className="text-[#1A1A1A]/65 text-xs font-semibold mt-0.5 uppercase tracking-wider">Years of Excellence</div>
            </div>
            {/* Chefs badge */}
            <div className="absolute top-6 -left-5 bg-[#7A0E0E] rounded-2xl px-5 py-4 shadow-xl">
              <ChefHat className="w-7 h-7 text-[#D4AF37] mb-1" />
              <div className="text-white font-bold text-sm leading-tight">25+ Master</div>
              <div className="text-white/50 text-xs">Chefs</div>
            </div>
          </div>

          {/* Copy column */}
          <div>
            <GoldRule text="Our Story" />
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mt-2 mb-6">
              A Legacy of Authentic{" "}
              <span className="text-[#7A0E0E]">South Indian Flavors</span>
            </h2>
            <div className="w-14 h-1 bg-[#D4AF37] mb-7 rounded-full" />
            <p className="text-[#1A1A1A]/60 text-base leading-relaxed mb-4">
              Founded over a decade ago, Magizh Mahal Catering was born from a deep passion for authentic South Indian cuisine and a commitment to delivering extraordinary hospitality. We started with humble roots — catering intimate family events across Chennai — and have grown into Tamil Nadu's most trusted premium catering service.
            </p>
            <p className="text-[#1A1A1A]/60 text-base leading-relaxed mb-9">
              Today, our team of 25+ master chefs and 100+ trained service professionals work out of our FSSAI-certified kitchen, using farm-fresh ingredients, time-honoured recipes, and modern presentation techniques to craft feasts that are as beautiful as they are delicious.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["FSSAI Certified Kitchen", "Farm-Fresh Ingredients Daily", "Pan-Tamil Nadu Coverage", "Traditional Recipes Preserved"].map(item => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-[#7A0E0E]/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#7A0E0E]" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-[#1A1A1A]/70 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── SERVICES ─────────────────────────── */}
      <section id="services" className="py-28 bg-[#FFF8E7]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead
            label="Our Services"
            title="Catering for Every"
            accent="Grand Occasion"
            body="From intimate family gatherings to grand weddings with thousands of guests — we bring the same dedication to excellence and authentic flavour to every event."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {SERVICES.map((s, i) => <ServiceCard key={i} s={s} />)}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── MENU ─────────────────────────── */}
      <section id="menu" className="py-28 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead
            label="Signature Menu"
            title="A Feast for the"
            accent="Eyes & Soul"
            body="Every dish is crafted with love, tradition, and the finest ingredients — a genuine culinary journey through the bold flavours of South India."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-14">
            {MENU_ITEMS.map((m, i) => <MenuCard key={i} m={m} />)}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── WHY US ─────────────────────────── */}
      <section className="py-28 bg-[#7A0E0E] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-white/[0.025] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHead
            label="Why Choose Us"
            title="The Magizh Mahal"
            accent="Difference"
            body="We don't just cater events — we craft unforgettable memories. Here is why families, corporates, and event planners across Tamil Nadu choose us first."
            dark
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {WHY_US.map((w, i) => <WhyCard key={i} w={w} />)}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── GALLERY ─────────────────────────── */}
      <section id="gallery" className="py-28 bg-[#FFF8E7]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead
            label="Gallery"
            title="A Visual Feast of"
            accent="Grand Celebrations"
            body="Glimpses of the magnificent events we have had the honour of catering — each one a cherished memory for the families we served."
          />
          {/* CSS grid masonry — tall items span 2 rows */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4" style={{ gridAutoRows: "220px" }}>
            {GALLERY.map((g, i) => (
              <div key={i} style={{ gridRow: g.tall ? "span 2" : "span 1" }}>
                <GalleryItem g={g} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── TESTIMONIALS ─────────────────────────── */}
      <section id="testimonials" className="py-28 bg-[#1A1A1A] relative overflow-hidden">
        {/* Faint bg image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={img("1780542900375-0cf459e38fbb", 1920, 900)}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-[0.06]"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-6">
          <SectionHead
            label="Testimonials"
            title="Stories From Our"
            accent="Happy Clients"
            body="Real words from real families who trusted us with their most important celebrations."
            dark
          />

          <div className="mt-14">
            {/* Card */}
            <div className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-3xl px-8 py-12 md:px-16 md:py-14 text-center">
              {/* Big decorative quote */}
              <div className="font-['Playfair_Display',serif] text-7xl text-[#D4AF37]/25 leading-none mb-2 select-none">"</div>
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-7">
                {Array.from({ length: TESTIMONIALS[tIdx].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <blockquote className="font-['Playfair_Display',serif] italic text-white text-xl md:text-2xl leading-relaxed mb-10">
                {TESTIMONIALS[tIdx].review}
              </blockquote>
              {/* Author */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37] flex items-center justify-center font-bold text-[#1A1A1A] text-xl tracking-wide select-none">
                  {TESTIMONIALS[tIdx].initials}
                </div>
                <div className="text-white font-semibold">{TESTIMONIALS[tIdx].name}</div>
                <div className="text-white/40 text-sm">{TESTIMONIALS[tIdx].role}</div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-5 mt-8">
              <button
                onClick={() => setTIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 flex items-center justify-center text-white transition-colors duration-200">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2 items-center">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setTIdx(i)}
                    className={`rounded-full transition-all duration-300 ${i === tIdx ? "w-6 h-2.5 bg-[#D4AF37]" : "w-2.5 h-2.5 bg-white/25 hover:bg-white/50"}`} />
                ))}
              </div>
              <button
                onClick={() => setTIdx(i => (i + 1) % TESTIMONIALS.length)}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 flex items-center justify-center text-white transition-colors duration-200">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── CONTACT ─────────────────────────── */}
      <section id="contact" className="py-28 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

          {/* Left — info */}
          <div>
            <GoldRule text="Book Now" />
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mt-2 mb-5">
              {"Let's Plan Your "}
              <span className="text-[#7A0E0E]">Perfect Event</span>
            </h2>
            <p className="text-[#1A1A1A]/55 leading-relaxed mb-10">
              Tell us about your celebration and our catering specialists will craft a fully personalized menu and service package — at no obligation.
            </p>

            {/* Contact items */}
            <div className="space-y-5 mb-10">
              {[
                { icon: Phone,          label: "Call Us",   value: "+91 98765 43210",         href: "tel:+919876543210" },
                { icon: MessageCircle,  label: "WhatsApp",  value: "+91 98765 43210",         href: "https://wa.me/919876543210" },
                { icon: Mail,           label: "Email",     value: "bookings@magizhmahal.com", href: "mailto:bookings@magizhmahal.com" },
                { icon: MapPin,         label: "Location",  value: "Chennai, Tamil Nadu, India", href: "#" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group w-fit">
                  <div className="w-12 h-12 rounded-xl bg-[#7A0E0E]/[0.08] group-hover:bg-[#7A0E0E] flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#7A0E0E] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#1A1A1A]/40 font-bold tracking-[0.18em] uppercase">{label}</div>
                    <div className="text-[#1A1A1A] font-semibold text-sm mt-0.5">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1fc95c] text-white font-semibold px-7 py-4 rounded-full transition-colors duration-200 shadow-lg shadow-[#25D366]/25">
              <MessageCircle className="w-5 h-5" />
              Instant WhatsApp Booking
            </a>

            {/* Map placeholder */}
            <div className="mt-8 rounded-2xl border border-[#D4AF37]/20 overflow-hidden bg-[#FFF8E7] h-40 flex flex-col items-center justify-center gap-2 shadow-sm">
              <MapPin className="w-8 h-8 text-[#7A0E0E]" />
              <p className="text-[#1A1A1A]/50 text-sm font-medium">Chennai, Tamil Nadu, India</p>
              <a href="https://maps.google.com/?q=Chennai,Tamil+Nadu" target="_blank" rel="noopener noreferrer"
                className="text-[#7A0E0E] text-xs font-semibold hover:underline">
                View on Google Maps →
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-[#FFF8E7] border border-[#D4AF37]/25 rounded-3xl p-8 md:p-10 shadow-xl shadow-[#D4AF37]/10">
            <h3 className="font-['Playfair_Display',serif] text-2xl font-bold text-[#1A1A1A] mb-7">Request a Callback</h3>

            <form onSubmit={e => e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[10px] font-bold text-[#1A1A1A]/45 uppercase tracking-widest">Full Name</span>
                  <input type="text" placeholder="Your name" value={form.name} onChange={setF("name")}
                    className="mt-1.5 w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 bg-white focus:outline-none focus:border-[#7A0E0E] text-sm transition-colors placeholder:text-[#1A1A1A]/25" />
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold text-[#1A1A1A]/45 uppercase tracking-widest">Mobile Number</span>
                  <input type="tel" placeholder="+91 98765 43210" value={form.mobile} onChange={setF("mobile")}
                    className="mt-1.5 w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 bg-white focus:outline-none focus:border-[#7A0E0E] text-sm transition-colors placeholder:text-[#1A1A1A]/25" />
                </label>
              </div>

              <label className="block">
                <span className="text-[10px] font-bold text-[#1A1A1A]/45 uppercase tracking-widest">Event Type</span>
                <select value={form.event} onChange={setF("event")}
                  className="mt-1.5 w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 bg-white focus:outline-none focus:border-[#7A0E0E] text-sm transition-colors text-[#1A1A1A]/65 appearance-none">
                  <option value="">Select event type</option>
                  {["Wedding", "Reception", "Corporate Event", "Birthday Party", "Engagement", "Housewarming", "Outdoor Event", "Other"].map(o => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[10px] font-bold text-[#1A1A1A]/45 uppercase tracking-widest">Event Date</span>
                  <input type="date" value={form.date} onChange={setF("date")}
                    className="mt-1.5 w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 bg-white focus:outline-none focus:border-[#7A0E0E] text-sm transition-colors text-[#1A1A1A]/65" />
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold text-[#1A1A1A]/45 uppercase tracking-widest">Guest Count</span>
                  <input type="number" placeholder="e.g. 500" value={form.guests} onChange={setF("guests")}
                    className="mt-1.5 w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 bg-white focus:outline-none focus:border-[#7A0E0E] text-sm transition-colors placeholder:text-[#1A1A1A]/25" />
                </label>
              </div>

              <label className="block">
                <span className="text-[10px] font-bold text-[#1A1A1A]/45 uppercase tracking-widest">Special Requirements</span>
                <textarea placeholder="Dietary preferences, cuisine themes, special requests…" value={form.notes} onChange={setF("notes")}
                  rows={3}
                  className="mt-1.5 w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 bg-white focus:outline-none focus:border-[#7A0E0E] text-sm transition-colors resize-none placeholder:text-[#1A1A1A]/25" />
              </label>

              <button type="submit"
                className="w-full bg-[#7A0E0E] hover:bg-[#8e1111] text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#7A0E0E]/25 flex items-center justify-center gap-2 text-sm tracking-wide">
                Submit Enquiry
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── FOOTER ─────────────────────────── */}
      <footer className="bg-[#0f0f0f] text-white pt-16 pb-8 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.07]">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0">
                  <UtensilsCrossed className="w-5 h-5 text-[#7A0E0E]" strokeWidth={2} />
                </div>
                <div className="leading-none">
                  <div className="font-['Playfair_Display',serif] font-bold text-[15px]">Magizh Mahal</div>
                  <div className="text-[#D4AF37] text-[9px] tracking-[0.28em] uppercase font-bold mt-0.5">Catering</div>
                </div>
              </div>
              <p className="text-white/35 text-sm leading-relaxed mb-5">
                Authentic South Indian catering with a legacy of excellence. Serving Tamil Nadu's grandest celebrations since 2014.
              </p>
              <div className="flex gap-2">
                {["FB", "IG", "YT"].map(s => (
                  <span key={s}
                    className="w-9 h-9 rounded-lg bg-white/[0.07] hover:bg-[#D4AF37]/20 cursor-pointer flex items-center justify-center text-[10px] font-bold text-white/40 hover:text-[#D4AF37] transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-5">Quick Links</h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map(l => (
                  <li key={l.label}>
                    <button onClick={() => go(l.href)} className="text-white/35 hover:text-[#D4AF37] text-sm transition-colors">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-5">Our Services</h4>
              <ul className="space-y-2.5">
                {SERVICES.slice(0, 6).map(s => (
                  <li key={s.title} className="text-white/35 text-sm">{s.title}</li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-5">Contact Us</h4>
              <div className="space-y-4 mb-7">
                {[
                  { icon: Phone,  text: "+91 98765 43210" },
                  { icon: Mail,   text: "bookings@magizhmahal.com" },
                  { icon: MapPin, text: "Chennai, Tamil Nadu, India" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-white/35 text-sm leading-snug">{text}</span>
                  </div>
                ))}
              </div>
              <a href="tel:+919876543210"
                className="inline-flex items-center gap-2 bg-[#7A0E0E] hover:bg-[#8e1111] text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors duration-200">
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-3 text-white/20 text-xs">
            <span>© 2025 Magizh Mahal Catering. All rights reserved.</span>
            <span>Crafted with care for authentic South Indian hospitality</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
