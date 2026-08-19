import { useState, useEffect, useRef } from "react";
import {
  Menu, X, Phone, MessageCircle, MapPin, Mail, Star,
  ChevronLeft, ChevronRight, Check, ArrowRight,
  Award, UtensilsCrossed, Clock, Leaf, Shield,
  ChefHat, Heart, CalendarDays, Home, Building2, Zap,
  Eye, Sparkles, Play,
} from "lucide-react";
import { MagizhMahalLoadingScreen } from "./components/catering-loader/MagizhMahalLoadingScreen";

// ── Exact Local Asset Imports ──────────────────────────────────────────────────
import logoImg from "../assets/logo/magizh-mahal-logo-circular.png";
import muttonBiryaniVideo from "../assets/images/food.mp4";
import bananaLeafFeastSeatedImg from "../assets/images/banana-leaf-feast-seated.png";
import bananaLeafFeastWideImg from "../assets/images/banana-leaf-feast.png";
import bananaLeafHotServingImg from "../assets/images/banana-leaf-hot-serving.png";
import weddingGuestServingImg from "../assets/images/wedding-guest-banana-leaf-serving.png";
import grandBananaLeafBuffetLineImg from "../assets/images/grand-banana-leaf-buffet-line.png";
import sadhyaBananaLeafImg from "../assets/images/sadhya-banana-leaf.png";
import dosaTiffinSpreadImg from "../assets/images/dosa-tiffin-spread.png";
import chettinadFishFeastImg from "../assets/images/chettinad-fish-feast.png";
import handiDumBiryaniImg from "../assets/images/handi-dum-biryani.png";
import royalBiryaniSpreadImg from "../assets/images/royal-biryani-spread.jpg";
import traditionalSweetsPlatterImg from "../assets/images/traditional-sweets-platter.png";
import chefLiveCateringCounterImg from "../assets/images/chef-live-catering-counter.png";
import luxuryWeddingBuffetHallImg from "../assets/images/luxury-wedding-buffet-hall.png";

import exteriorImg from "../assets/images/magizh-mahal-exterior.png";
import grandHallImg from "../assets/images/the-grand-hall.png";
import grandDiningImg from "../assets/images/grand-dining.png";
import elegantStageImg from "../assets/images/elegant-stage.png";
import familyServiceImg from "../assets/images/family-service.png";
import divineAmbienceImg from "../assets/images/divine-ambience.png";
import comfortableDiningImg from "../assets/images/comfortable-dining.png";
import guestSuitesImg from "../assets/images/guest-suites.png";
import valetParkingImg from "../assets/images/valet-parking.png";
import nightViewImg from "../assets/images/prime-chromepet-night.png";

// ── Navigation & Metadata ─────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "South Indian Menu", href: "#menu" },
  { label: "Banana Leaf Service", href: "#experience" },
  { label: "Catering Gallery", href: "#gallery" },
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
    title: "Wedding Banana Leaf Catering",
    desc: "Authentic South Indian wedding feast with 24+ traditional delicacies served hot and fresh on green banana leaves.",
  },
  {
    icon: Star,
    title: "Reception Dinner Buffet",
    desc: "Lavish multi-cuisine reception dinners with live food counters, authentic biryani handis, and dessert stations.",
  },
  {
    icon: Zap,
    title: "Live Dosa & Tandoori Counters",
    desc: "Sizzling live ghee roast dosa, thatte idli, tandoori kebabs, and chaat counters prepared fresh in front of guests.",
  },
  {
    icon: Building2,
    title: "Corporate Catering",
    desc: "Professional catering tailored for business summits, corporate lunches, and grand company annual celebrations.",
  },
  {
    icon: CalendarDays,
    title: "Birthday & Anniversary Feasts",
    desc: "Delightful customized catering menus crafted for celebrations of all sizes with dedicated service.",
  },
  {
    icon: Award,
    title: "Engagement Catering (Nitchayathartham)",
    desc: "Traditional auspicious spreads with classic sweets, savory snacks, and customary South Indian hospitality.",
  },
  {
    icon: Home,
    title: "Housewarming Catering (Grihapravesam)",
    desc: "Sacred morning tiffin and afternoon feast prepared with pure ghee, authentic spices, and home-style care.",
  },
  {
    icon: UtensilsCrossed,
    title: "Outdoor & Destination Catering",
    desc: "Full-service catering logistics, live mobile cooking setup, service staff, and cleanup support across Tamil Nadu.",
  },
];

// ── South Indian Food Menu Varieties (All Distinct & Non-Repeating) ─────────────

const FOOD_CATEGORIES = ["All", "Banana Leaf Feasts", "Live Tiffin & Dosa", "Biryani & Non-Veg", "Traditional Sweets"];

const SOUTH_INDIAN_MENU = [
  {
    title: "Grand Kalyana Banana Leaf Feast",
    category: "Banana Leaf Feasts",
    tag: "Signature Feast",
    img: bananaLeafFeastWideImg,
    desc: "Steaming Ponni rice, Ghee Paruppu, Madras Sambar, Vatha Kuzhambu, Rasam, Avial, Kootu, Poriyal, Crispy Medu Vadai, Appalam, Curd & Hot Semiya Payasam.",
    highlights: ["24+ Traditional Items", "Served on Fresh Banana Leaf", "Pure Ghee & Hand-ground Masalas"],
  },
  {
    title: "Live Banana Leaf Dining Service",
    category: "Banana Leaf Feasts",
    tag: "Traditional Service",
    img: weddingGuestServingImg,
    desc: "Dedicated traditional catering servers dressed in traditional attire serving unlimited hot courses to seated guests with royal South Indian hospitality.",
    highlights: ["Trained Uniformed Staff", "Hot & Continuous Refills", "Spotless Dining Cleanliness"],
  },
  {
    title: "Traditional South Indian Sadhya Spread",
    category: "Banana Leaf Feasts",
    tag: "Auspicious",
    img: grandBananaLeafBuffetLineImg,
    desc: "Authentic festival and wedding feast featuring Olan, Thoran, Kalan, Inji Puli, Pazham, Pappadam, and rich Nadan Ada Pradhaman Payasam.",
    highlights: ["Authentic Traditional Recipes", "Rich Coconut & Ghee Flavor", "Elaneer Payasam Special"],
  },
  {
    title: "Live Crispy Ghee Roast Dosa Station",
    category: "Live Tiffin & Dosa",
    tag: "Live Counter",
    img: dosaTiffinSpreadImg,
    desc: "Sizzling golden ghee roast dosas, Masala Dosa, Podi Dosa, and Onion Uttapams served fresh off the tawa with coconut, tomato, and mint chutneys.",
    highlights: ["Made Fresh to Order", "Trio of Fresh Chutneys", "Aromatic Ghee & Gunpowder Podi"],
  },
  {
    title: "Royal Seeraga Samba Dum Biryani",
    category: "Biryani & Non-Veg",
    tag: "HD Video & Feast",
    img: royalBiryaniSpreadImg,
    video: muttonBiryaniVideo,
    desc: "Fragrant Chennai marriage mutton & chicken dum biryani slow-cooked in traditional handis with succulent meat, boiled egg, Dalcha, and Onion Raita.",
    highlights: ["Chennai Marriage Mutton Biryani", "Slow Dum Cooked in Handi", "Aromatic Spices & Dalcha Included"],
  },
  {
    title: "Authentic Chettinad Wedding Specialties",
    category: "Biryani & Non-Veg",
    tag: "Spicy & Rich",
    img: chettinadFishFeastImg,
    desc: "Bold and spicy Chettinad Pepper Masala, Meen Varuval (crispy fish fry), Kozhi Varuval, Mutton Sukka, and rich gravies made with stone-ground spices.",
    highlights: ["Stone-ground Chettinad Spices", "Rich & Bold Gravies", "Custom Spice Level"],
  },
  {
    title: "Traditional Sweets & Payasam Counter",
    category: "Traditional Sweets",
    tag: "Sweet Delight",
    img: "",
    video: "https://www.youtube.com/embed/xLiGCCH0O34?autoplay=1&rel=0&mute=1&loop=1&playlist=xLiGCCH0O34",
    desc: "Authentic South Indian festival sweets — Ghee Mysore Pak, Sweet Appam, Coconut Burfi diamonds, Laddus, Halwa, and Elaneer Payasam.",
    highlights: ["Pure Ghee Preparation", "Fresh Homemade Taste", "Auspicious Festival Assortment"],
  },
  {
    title: "Royal Reception Dinner Buffet",
    category: "Biryani & Non-Veg",
    tag: "Grand Buffet",
    img: luxuryWeddingBuffetHallImg,
    desc: "Lavish multi-course wedding reception buffet with grand illuminated chafing line, live chaat, starters, and continental dessert counters.",
    highlights: ["Opulent Banquet Display", "Multi-Cuisine Delicacies", "Professional Butler Service"],
  },
];

// ── Catering & Banquet Gallery (Uploaded Assets) ──────────────────────────────

const GALLERY_CATEGORIES = ["All", "Catering Feasts", "Venue & Dining Setups"];

const CATERING_GALLERY = [
  { img: royalBiryaniSpreadImg, video: muttonBiryaniVideo, title: "Chennai Marriage Mutton Biryani Live", desc: "Authentic slow-cooked wedding dum biryani in traditional handis with rich dalcha and raita", tag: "Live HD Video", category: "Catering Feasts" },
  { img: "", video: "https://www.youtube.com/embed/xLiGCCH0O34?autoplay=1&rel=0&mute=1&loop=1&playlist=xLiGCCH0O34", title: "Grand Traditional Sweets Counter", desc: "Lavish assortment of pure ghee Mysore Pak, Halwa, Laddus, Sweet Appam, and Payasam varieties", tag: "Sweets Counter", category: "Catering Feasts" },
  { img: bananaLeafFeastWideImg, title: "Grand Kalyana Banana Leaf Spread", desc: "Authentic 24+ item traditional banana leaf wedding spread with hot sambar, rasam, and crispy appalam", tag: "Banana Leaf Feast", category: "Catering Feasts" },
  { img: grandBananaLeafBuffetLineImg, title: "Live Banana Leaf Buffet Service", desc: "Streamlined grand wedding banquet buffet counter setup with dedicated serving staff", tag: "Buffet Spread", category: "Catering Feasts" },
  { img: chefLiveCateringCounterImg, title: "Master Chef Live Cooking Counter", desc: "Experienced culinary chefs managing live dosa, tandoor, and traditional hot course counters", tag: "Live Cooking", category: "Catering Feasts" },
  { img: luxuryWeddingBuffetHallImg, title: "Royal Reception Dinner Buffet", desc: "Opulent wedding reception dinner arrangement with illuminated chafing dishes and multi-cuisine spread", tag: "Reception Dinner", category: "Catering Feasts" },
  { img: weddingGuestServingImg, title: "Traditional Seated Guest Hospitality", desc: "Uniformed catering team serving hot courses with traditional South Indian warmth and respect", tag: "Guest Service", category: "Catering Feasts" },
  { img: exteriorImg, title: "Grand Event Entrance", desc: "Majestic exterior facade with grand royal welcome entrance and prime accessibility", tag: "Exterior", category: "Venue & Dining Setups" },
  { img: grandHallImg, title: "Grand Celebration Banquet Hall", desc: "Centrally air-conditioned grand banquet setup with classic Dravidian gold pillars (1500+ Capacity)", tag: "Banquet Hall", category: "Venue & Dining Setups" },
  { img: grandDiningImg, title: "Grand Banana Leaf Dining Hall", desc: "Spacious traditional banana leaf dining floor and generous banquet catering arrangement", tag: "Dining Setup", category: "Venue & Dining Setups" },
  { img: elegantStageImg, title: "Royal Wedding Reception Setup", desc: "Opulent reception stage with customized floral backdrops and golden chandelier lighting", tag: "Stage Setup", category: "Venue & Dining Setups" },
  { img: familyServiceImg, title: "Banquet & Guest Seating Setup", desc: "Comfortable, spacious seating layout for wedding guests, VIPs, and family members", tag: "Banquet", category: "Venue & Dining Setups" },
  { img: divineAmbienceImg, title: "Auspicious Pooja Ambience", desc: "Sacred Ganesha sannidhi creating a blessed and auspicious atmosphere for muhurtham catering", tag: "Sanctum", category: "Venue & Dining Setups" },
  { img: guestSuitesImg, title: "Deluxe VIP & Bridal Suites", desc: "Fully furnished air-conditioned bridal dressing suites and guest resting rooms", tag: "VIP Suites", category: "Venue & Dining Setups" },
  { img: nightViewImg, title: "Illuminated Evening Celebration", desc: "Illuminated night ambience creating a magical evening celebration backdrop", tag: "Night Ambience", category: "Venue & Dining Setups" },
  { img: valetParkingImg, title: "Spacious Valet & Logistics Area", desc: "Large dedicated vehicle parking area with valet and catering logistics support", tag: "Logistics", category: "Venue & Dining Setups" },
];

const WHY_US = [
  { icon: Leaf, title: "100% Fresh Ingredients Daily", desc: "Farm-fresh vegetables and pure dairy sourced every morning for authentic taste and purity in every single dish." },
  { icon: Shield, title: "FSSAI-Certified Hygiene", desc: "Spotless hygienic kitchens adhering to rigorous safety standards, fresh filtered water, and safe food handling." },
  { icon: ChefHat, title: "25+ Master South Indian Chefs", desc: "Veteran culinary masters with decades of experience preparing traditional Brahmin, Chettinad, and festive feasts." },
  { icon: UtensilsCrossed, title: "Customized Menu Packages", desc: "Personalized South Indian and multi-cuisine menus curated to match your family traditions and event budget." },
  { icon: Clock, title: "Punctual On-Time Serving", desc: "Guaranteed prompt arrival and hot food serving timing — your guests never wait for their feast." },
  { icon: Award, title: "Affordable Luxury Hospitality", desc: "High-end royal banquet presentation and five-star taste delivered at transparent, competitive pricing." },
];

const TESTIMONIALS = [
  {
    name: "Priya & Venkatesh Ramamurthy",
    role: "Wedding Client · Chennai",
    rating: 5,
    review: "Annapathiram Catering made our wedding day unforgettable! The banana leaf spread was exceptional — steaming hot sambar, melt-in-mouth medu vadai, and the elaneer payasam had all our 1,200 guests complimenting the feast for weeks!",
    initials: "PV",
  },
  {
    name: "Karthik Sundaram",
    role: "Corporate Event Director · Coimbatore",
    rating: 5,
    review: "We engaged Annapathiram Catering for our 500-guest annual company conclave. The live dosa station and seeraga samba biryani were incredible. Punctual, professional, and delightfully tasty.",
    initials: "KS",
  },
  {
    name: "Meenakshi & Anantharaman",
    role: "Daughter's Wedding · Madurai",
    rating: 5,
    review: "Authentic South Indian taste in every single dish! From the morning filter coffee and idli tiffin to the grand banana leaf wedding dinner, the hospitality was heartfelt and flawless.",
    initials: "MA",
  },
  {
    name: "Ramesh Narayanan",
    role: "Grihapravesam (Housewarming) · Trichy",
    rating: 5,
    review: "The traditional feast was like authentic home cooking with pure ghee aroma and perfect spices. The catering staff was courteous and attentive to every single guest. Highly recommended!",
    initials: "RN",
  },
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
    <div className="text-center max-w-3xl mx-auto">
      <GoldRule text={label} />
      <h2
        className={`font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold leading-tight mt-1 mb-5 ${dark ? "text-white" : "text-[#1A1A1A]"
          }`}
      >
        {title}{" "}
        <span className={dark ? "text-[#D4AF37]" : "text-[#7A0E0E]"}>{accent}</span>
      </h2>
      <p className={`text-base leading-relaxed ${dark ? "text-white/60" : "text-[#1A1A1A]/60"}`}>{body}</p>
    </div>
  );
}

function Counter({
  value, suffix, label, active, delay,
}: {
  value: number; suffix: string; label: string; active: boolean; delay: number;
}) {
  const [count, setCount] = useState(value);

  useEffect(() => {
    if (!active) return;
    const id = setTimeout(() => {
      const dur = 2000;
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
      <div className="text-[#D4AF37]/80 text-[11px] font-bold tracking-[0.18em] uppercase">{label}</div>
    </div>
  );
}

// ── Main App Component ────────────────────────────────────────────────────────

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [galleryCategory, setGalleryCategory] = useState("All");
  const [tIdx, setTIdx] = useState(0);
  const [countersOn, setCountersOn] = useState(false);
  const [modalItem, setModalItem] = useState<{ img: string; video?: string; title: string; desc: string; tag?: string } | null>(null);
  const [form, setForm] = useState({ name: "", mobile: "", event: "", date: "", guests: "", notes: "" });

  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e && e.isIntersecting) setCountersOn(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const go = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const setF = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const filteredMenu = activeCategory === "All"
    ? SOUTH_INDIAN_MENU
    : SOUTH_INDIAN_MENU.filter(m => m.category === activeCategory);

  const filteredGallery = galleryCategory === "All"
    ? CATERING_GALLERY
    : CATERING_GALLERY.filter(g => g.category === galleryCategory);

  if (isLoading) {
    return (
      <MagizhMahalLoadingScreen
        onEnterSite={() => setIsLoading(false)}
        onComplete={() => { }}
      />
    );
  }

  return (
    <div className="bg-[#FFFDF7] text-[#1A1A1A] font-['Poppins',sans-serif] overflow-x-hidden scroll-smooth">

      {/* ─────────────────────────── NAVBAR ─────────────────────────── */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#1A1A1A]/95 backdrop-blur-xl shadow-2xl py-3" : "bg-[#1A1A1A]/85 backdrop-blur-md py-4"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">

          {/* Logo */}
          <button onClick={() => go("#home")} className="flex items-center gap-3 shrink-0 group text-left">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#D4AF37]/50 shadow-md ring-2 ring-[#D4AF37]/20 group-hover:scale-105 transition-transform duration-300 bg-white/10 shrink-0">
              <img
                src={logoImg}
                alt="Annapathiram catering Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="leading-none">
              <div className="font-['Playfair_Display',serif] font-bold text-white text-[17px] tracking-wide group-hover:text-[#D4AF37] transition-colors">Annapathiram</div>
              <div className="text-[#D4AF37] text-[9px] font-bold tracking-[0.28em] uppercase mt-0.5">Catering</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {NAV_LINKS.map(l => (
              <button key={l.label} onClick={() => go(l.href)}
                className="text-white/75 hover:text-[#D4AF37] text-sm font-medium tracking-wide transition-colors duration-200">
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#25D366] hover:bg-[#1fc95c] text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors duration-200 shrink-0 shadow-md">
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

      {/* ─────────────────────────── HERO (CLEAN, BRIGHT & PROFESSIONAL) ─────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Real South Indian Banana Leaf & Biryani Food Video Background - Crisp, Vibrant & Smooth Loop */}
        <div className="absolute inset-0 bg-[#1A1A1A] overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/76_kEHliyU0?autoplay=1&mute=1&loop=1&playlist=76_kEHliyU0&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
            allow="autoplay; encrypted-media"
            className="absolute top-1/2 left-1/2 w-[150vw] h-[150vw] min-w-[100vw] min-h-[100vh] -translate-x-1/2 -translate-y-1/2 opacity-70 pointer-events-none"
            style={{ border: 0 }}
          />
        </div>

        {/* Subtle, elegant cinematic gradient (ensures background food is clearly visible while text is 100% crisp) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-[#1A1A1A]/50" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-32 pb-20">
          {/* Top Pill badge */}
          <div className="inline-flex items-center gap-2.5 bg-black/60 border border-[#D4AF37]/60 text-[#D4AF37] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md shadow-lg">
            <img src={logoImg} alt="Annapathiram Catering" className="w-5 h-5 rounded-full object-cover border border-[#D4AF37]/60" />
            <span>South India's Premier Banana Leaf Catering</span>
          </div>

          {/* Heading with elegant gold shadow */}
          <h1 className="font-['Playfair_Display',serif] font-bold text-white leading-[1.08] mb-6 text-[clamp(2.5rem,7vw,5.2rem)] [text-shadow:_0_3px_20px_rgb(0_0_0_/_80%)]">
            Annapathiram Catering
            <span className="block text-[#D4AF37] italic text-[clamp(1.7rem,4.2vw,3.1rem)] font-normal mt-2 [text-shadow:_0_2px_15px_rgb(0_0_0_/_90%)]">
              Authentic South Indian Banana Leaf Feasts
            </span>
          </h1>

          <p className="text-white/95 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-9 font-medium [text-shadow:_0_2px_10px_rgb(0_0_0_/_90%)]">
            Immerse your wedding guests in the royal tradition of authentic South Indian Kalyana Sapadu — steaming hot rice, aromatic ghee paruppu, rich sambar, crispy vadai, and traditional payasam served fresh on banana leaves.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => go("#contact")}
              className="w-full sm:w-auto bg-[#7A0E0E] hover:bg-[#8e1111] text-white font-semibold px-9 py-4 rounded-full text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-2xl hover:shadow-[#7A0E0E]/50 hover:-translate-y-0.5 shadow-lg">
              Book Catering & Date
              <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => go("#menu")}
              className="w-full sm:w-auto bg-black/60 hover:bg-black/80 text-white border border-white/40 hover:border-[#D4AF37] font-semibold px-9 py-4 rounded-full text-sm flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-md shadow-lg">
              Explore Food Menu
              <UtensilsCrossed className="w-4 h-4" />
            </button>
            <button onClick={() => go("#gallery")}
              className="w-full sm:w-auto bg-[#D4AF37]/30 hover:bg-[#D4AF37]/40 text-[#D4AF37] border border-[#D4AF37]/60 font-semibold px-7 py-4 rounded-full text-sm flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-md shadow-lg">
              View Catering Gallery
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 pointer-events-none">
          <div className="w-px h-10 bg-gradient-to-b from-[#D4AF37] to-transparent" />
          <ChevronLeft className="w-4 h-4 text-[#D4AF37] -rotate-90" />
        </div>
      </section>

      {/* ─────────────────────────── STATS ─────────────────────────── */}
      <section ref={statsRef} className="bg-[#7A0E0E] py-16 relative overflow-hidden">
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

      {/* ─────────────────────────── ABOUT STORY (PROFESSIONAL MASTER CHEF IMAGE) ─────────────────────────── */}
      <section id="about" className="py-28 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image column featuring Master Chef at live banquet counter */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-[#1A1A1A]/15 border border-[#D4AF37]/20">
              <img
                src={chefLiveCateringCounterImg}
                alt="Executive Master Chef managing live South Indian banquet buffet catering counter"
                className="w-full h-full object-cover object-center food-photo-card group-hover:scale-105"
              />
            </div>
            {/* Catering Thumbnail */}
            <div className="absolute -bottom-6 -right-6 w-36 sm:w-44 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37] bg-[#1A1A1A]">
              <img src={grandDiningImg} alt="Annapathiram Catering Grand Dining Setup" className="w-full h-24 object-cover object-center food-photo-card" />
              <div className="p-2 text-center bg-[#1A1A1A]">
                <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">Grand Dining Setup</div>
                <div className="text-[9px] text-white/60">1000+ Guest Capacity</div>
              </div>
            </div>
            {/* Master Chefs badge */}
            <div className="absolute top-6 -left-6 bg-[#7A0E0E] rounded-2xl px-5 py-3.5 shadow-xl border border-[#D4AF37]/30 flex items-center gap-3">
              <ChefHat className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
              <div>
                <div className="text-white font-bold text-sm leading-tight">25+ Master</div>
                <div className="text-[#D4AF37] text-xs font-semibold">Traditional Chefs</div>
              </div>
            </div>
          </div>

          {/* Copy column */}
          <div>
            <GoldRule text="Our Culinary Heritage" />
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mt-2 mb-6">
              A Legacy of Pure{" "}
              <span className="text-[#7A0E0E]">South Indian Hospitality</span>
            </h2>
            <div className="w-14 h-1 bg-[#D4AF37] mb-7 rounded-full" />
            <p className="text-[#1A1A1A]/65 text-base leading-relaxed mb-4">
              Founded over a decade ago, <strong>Annapathiram Catering</strong> has been the quintessential catering choice for grand South Indian weddings, auspicious ceremonies, and celebrations across Chennai and Tamil Nadu.
            </p>
            <p className="text-[#1A1A1A]/65 text-base leading-relaxed mb-9">
              We specialize in the timeless art of <strong>Banana Leaf Kalyana Sapadu</strong> — ensuring every single guest experiences hot, fragrant dishes prepared from farm-fresh produce, hand-ground masalas, and pure cow ghee. We provide seamless catering logistics, uniformed service crew, and world-class hospitality.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["Pure South Indian Recipes", "Hot Banana Leaf Service", "FSSAI-Certified Kitchens", "Pan-Tamil Nadu Coverage"].map(item => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-[#7A0E0E]/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#7A0E0E]" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-[#1A1A1A]/75 font-medium">{item}</span>
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
            title="Catering & Feasts for Every"
            accent="Grand Occasion"
            body="From traditional Brahmin and Chettinad wedding feasts on banana leaves to grand multi-cuisine reception dinners — Annapathiram Catering delivers authentic culinary excellence."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="group bg-white border border-[#D4AF37]/15 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:border-[#D4AF37]/45 hover:-translate-y-2 transition-all duration-300 cursor-default">
                  <div className="w-14 h-14 rounded-xl bg-[#7A0E0E]/[0.08] group-hover:bg-[#7A0E0E] flex items-center justify-center mb-5 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-[#7A0E0E] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-['Playfair_Display',serif] font-bold text-[#1A1A1A] text-lg mb-2">{s.title}</h3>
                  <p className="text-[#1A1A1A]/60 text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-5 h-0.5 w-0 group-hover:w-full bg-[#D4AF37] transition-all duration-500 rounded-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── REAL SOUTH INDIAN FOOD MENU (NON-REPEATING CARDS) ─────────────────────────── */}
      <section id="menu" className="py-28 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead
            label="Authentic Culinary Varieties"
            title="Real South Indian"
            accent="Feast Menu"
            body="Explore our handcrafted culinary delights — prepared hot and fresh with time-honored recipes, pure ghee, and authentic local spices."
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-10 mb-14">
            {FOOD_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeCategory === cat
                    ? "bg-[#7A0E0E] text-white shadow-lg shadow-[#7A0E0E]/30"
                    : "bg-white border border-[#D4AF37]/30 text-[#1A1A1A]/70 hover:border-[#7A0E0E] hover:text-[#7A0E0E]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Food Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMenu.map((m, i) => (
              <div
                key={i}
                onClick={() => setModalItem({ img: m.img, video: m.video, title: m.title, desc: m.desc, tag: m.tag })}
                className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-[#1A1A1A] cursor-pointer flex flex-col justify-between border border-[#D4AF37]/20"
              >
                <div className="aspect-[4/3] overflow-hidden relative bg-black">
                  {m.video ? (
                    m.video.includes("youtube.com") ? (
                      <div className="w-full h-full flex items-center justify-center overflow-hidden pointer-events-none group-hover:scale-105 transition-transform duration-300">
                        <iframe
                          src={m.video + "&controls=0"}
                          className="w-[150%] h-[150%] min-w-full min-h-full border-0"
                          allow="autoplay; encrypted-media"
                        />
                      </div>
                    ) : (
                      <video
                        src={m.video}
                        poster={m.img}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover object-center food-photo-card group-hover:scale-105"
                      />
                    )
                  ) : (
                    <img
                      src={m.img}
                      alt={m.title}
                      className="w-full h-full object-cover object-center food-photo-card group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/10 to-transparent" />
                  <span className="absolute top-3 right-3 bg-[#D4AF37] text-[#1A1A1A] text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-md flex items-center gap-1">
                    {m.video && <Play className="w-2.5 h-2.5 fill-current" />}
                    {m.tag}
                  </span>
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {m.video ? <Play className="w-4 h-4 text-[#D4AF37] fill-current" /> : <Eye className="w-4 h-4" />}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between bg-[#1A1A1A]">
                  <div>
                    <h3 className="text-white font-['Playfair_Display',serif] font-bold text-lg leading-snug mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-white/60 text-xs leading-relaxed mb-4 line-clamp-3">
                      {m.desc}
                    </p>
                    <div className="space-y-1.5 mb-4">
                      {m.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-[11px] text-[#D4AF37]/90">
                          <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#D4AF37] font-semibold">
                    <span>View Feast Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── BANANA LEAF CATERING EXPERIENCE (3 DISTINCT STEPS) ─────────────────────────── */}
      <section id="experience" className="py-28 bg-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src={grandBananaLeafBuffetLineImg} alt="" className="w-full h-full object-cover filter blur-sm" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHead
            label="Traditional Hospitality"
            title="The Royal Banana Leaf"
            accent="Dining Experience"
            body="Witness the time-honoured heritage of South Indian wedding banquets — where culinary masters and dedicated servers deliver royal hospitality to seated guests."
            dark
          />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {/* Step 1: Hot Ladle Course Serving */}
            <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-colors">
              <div className="aspect-video rounded-xl overflow-hidden mb-5 border border-white/10">
                <img src={bananaLeafHotServingImg} alt="Catering server pouring hot sambar and rasam on banana leaf" className="w-full h-full object-cover object-center food-photo-card" />
              </div>
              <div className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-1">Step 1 · Traditional Hot Course Serving</div>
              <h3 className="font-['Playfair_Display',serif] font-bold text-xl mb-2">Seated Dining & Royal Care</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Guests are seated at decorated banquet tables with fresh plantain banana leaves. Servers in traditional attire serve hot courses sequentially with respectful warmth.
              </p>
            </div>

            {/* Step 2: 24+ Traditional Delicacies on Long Banana Leaf */}
            <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-colors">
              <div className="aspect-video rounded-xl overflow-hidden mb-5 border border-white/10">
                <img src={sadhyaBananaLeafImg} alt="24+ items authentic South Indian banana leaf feast" className="w-full h-full object-cover object-center food-photo-card" />
              </div>
              <div className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-1">Step 2 · 24+ Traditional Courses</div>
              <h3 className="font-['Playfair_Display',serif] font-bold text-xl mb-2">Authentic Sequential Spread</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                From salt, pickles, and pachadi to steaming ponni rice, aromatic ghee paruppu, vatha kuzhambu, rasam, avial, poriyal, appalam, and medu vadai.
              </p>
            </div>

            {/* Step 3: Traditional Sweets Platter with Diyas */}
            <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/40 transition-colors">
              <div className="aspect-video rounded-xl overflow-hidden mb-5 border border-white/10">
                <img src={traditionalSweetsPlatterImg} alt="Traditional South Indian festival sweets and payasam finish" className="w-full h-full object-cover object-center food-photo-card" />
              </div>
              <div className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-1">Step 3 · Royal Sweet Finish</div>
              <h3 className="font-['Playfair_Display',serif] font-bold text-xl mb-2">Payasam & Sweet Delight</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                The grand feast concludes with hot Semiya Payasam, Elaneer Payasam, warm Mysore Pak, fragrant Paan (Beeda), and authentic Kumbakonam Filter Coffee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── CATERING & EVENT SETUPS GALLERY (UPLOADED ASSETS) ─────────────────────────── */}
      <section id="gallery" className="py-28 bg-[#FFF8E7]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead
            label="Catering & Event Setups"
            title="Annapathiram Catering"
            accent="Grand Event Setups"
            body="Explore our authentic catering feasts, live counter arrangements, banquet halls, and royal hospitality."
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-10 mb-12">
            {GALLERY_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setGalleryCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${galleryCategory === cat
                    ? "bg-[#7A0E0E] text-white shadow-lg shadow-[#7A0E0E]/30 scale-102"
                    : "bg-white text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#D4AF37]/15 border border-[#D4AF37]/25 shadow-sm"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGallery.map((v, i) => (
              <div
                key={i}
                onClick={() => setModalItem({ img: v.img, video: v.video, title: v.title, desc: v.desc, tag: v.tag })}
                className="group relative rounded-2xl overflow-hidden bg-[#1A1A1A] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 flex flex-col justify-between"
              >
                <div className="aspect-[4/3] overflow-hidden relative bg-black">
                  {v.video ? (
                    v.video.includes("youtube.com") ? (
                      <div className="w-full h-full flex items-center justify-center overflow-hidden pointer-events-none group-hover:scale-105 transition-transform duration-300">
                        <iframe
                          src={v.video + "&controls=0"}
                          className="w-[150%] h-[150%] min-w-full min-h-full border-0"
                          allow="autoplay; encrypted-media"
                        />
                      </div>
                    ) : (
                      <video
                        src={v.video}
                        poster={v.img}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover object-center food-photo-card group-hover:scale-105"
                      />
                    )
                  ) : (
                    <img
                      src={v.img}
                      alt={v.title}
                      className="w-full h-full object-cover object-center food-photo-card group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <span className="absolute top-3 right-3 bg-[#D4AF37] text-[#1A1A1A] text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                    {v.video && <Play className="w-2.5 h-2.5 fill-current" />}
                    {v.tag}
                  </span>
                  <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {v.video ? <Play className="w-3.5 h-3.5 text-[#D4AF37] fill-current" /> : <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />}
                  </div>
                </div>
                <div className="p-4 bg-[#1A1A1A] flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-white font-['Playfair_Display',serif] font-bold text-base leading-snug group-hover:text-[#D4AF37] transition-colors">
                      {v.title}
                    </h4>
                    <p className="text-white/60 text-xs mt-1.5 line-clamp-2 leading-relaxed">{v.desc}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#D4AF37] font-semibold">
                    <span>{v.video ? "Watch HD Video" : "View HD Photo"}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── LIGHTBOX MODAL ─────────────────────────── */}
      {modalItem && (
        <div
          onClick={() => setModalItem(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-[#1A1A1A] border border-[#D4AF37]/50 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200"
          >
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {modalItem.video ? (
                modalItem.video.includes("youtube.com") ? (
                  <iframe
                    src={modalItem.video}
                    allow="autoplay; encrypted-media"
                    className="w-full h-full bg-black border-0"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={modalItem.video}
                    poster={modalItem.img}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  />
                )
              ) : (
                <img
                  src={modalItem.img}
                  alt={modalItem.title}
                  className="w-full h-full object-cover object-center food-photo-card"
                />
              )}
              <button
                onClick={() => setModalItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 bg-[#1A1A1A]">
              {modalItem.tag && (
                <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">{modalItem.tag}</span>
              )}
              <h3 className="text-white font-['Playfair_Display',serif] font-bold text-2xl mt-1">{modalItem.title}</h3>
              <p className="text-white/70 text-sm mt-2">{modalItem.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────── WHY CHOOSE US ─────────────────────────── */}
      <section className="py-28 bg-[#7A0E0E] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-white/[0.025] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHead
            label="Why Choose Us"
            title="The Annapathiram"
            accent="Difference"
            body="We don't just serve food — we create unforgettable culinary memories and royal celebrations for families across Tamil Nadu."
            dark
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {WHY_US.map((w, i) => {
              const Icon = w.icon;
              return (
                <div key={i} className="group bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl p-7 transition-all duration-300 cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 group-hover:bg-[#D4AF37] flex items-center justify-center mb-5 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#D4AF37] group-hover:text-[#1A1A1A] transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-white text-base mb-2">{w.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── TESTIMONIALS ─────────────────────────── */}
      <section id="testimonials" className="py-28 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={nightViewImg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-[0.10]"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-6">
          <SectionHead
            label="Client Stories"
            title="What Families Say About"
            accent="Annapathiram Catering"
            body="Heartfelt feedback from real clients who celebrated their weddings and events with us."
            dark
          />

          <div className="mt-14">
            {/* Card */}
            {(() => {
              const currentT = TESTIMONIALS[tIdx] || TESTIMONIALS[0];
              return (
                <div className="bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-3xl px-8 py-12 md:px-16 md:py-14 text-center">
                  <div className="font-['Playfair_Display',serif] text-7xl text-[#D4AF37]/25 leading-none mb-2 select-none">"</div>
                  <div className="flex justify-center gap-1 mb-7">
                    {Array.from({ length: currentT.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <blockquote className="font-['Playfair_Display',serif] italic text-white text-xl md:text-2xl leading-relaxed mb-10">
                    {currentT.review}
                  </blockquote>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-full bg-[#D4AF37] flex items-center justify-center font-bold text-[#1A1A1A] text-xl tracking-wide select-none">
                      {currentT.initials}
                    </div>
                    <div className="text-white font-semibold">{currentT.name}</div>
                    <div className="text-white/40 text-sm">{currentT.role}</div>
                  </div>
                </div>
              );
            })()}

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

      {/* ─────────────────────────── CONTACT & BOOKING ─────────────────────────── */}
      <section id="contact" className="py-28 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

          {/* Left — info */}
          <div>
            <GoldRule text="Book Now" />
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mt-2 mb-5">
              {"Let's Plan Your "}
              <span className="text-[#7A0E0E]">Grand Feast</span>
            </h2>
            <p className="text-[#1A1A1A]/60 leading-relaxed mb-10">
              Tell us about your celebration and our catering experts will prepare a customized South Indian banana leaf menu package and estimate — with zero obligation.
            </p>

            {/* Contact items */}
            <div className="space-y-5 mb-10">
              {[
                { icon: Phone, label: "Direct Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
                { icon: MessageCircle, label: "WhatsApp Chat", value: "+91 98765 43210", href: "https://wa.me/919876543210" },
                { icon: Mail, label: "Email Bookings", value: "bookings@magizhmahalcatering.com", href: "mailto:bookings@magizhmahalcatering.com" },
                { icon: MapPin, label: "Location", value: "Chennai, Tamil Nadu, India", href: "#" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group w-fit">
                  <div className="w-12 h-12 rounded-xl bg-[#7A0E0E]/[0.08] group-hover:bg-[#7A0E0E] flex items-center justify-center shrink-0 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#7A0E0E] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#1A1A1A]/45 font-bold tracking-[0.18em] uppercase">{label}</div>
                    <div className="text-[#1A1A1A] font-semibold text-sm mt-0.5">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1fc95c] text-white font-semibold px-7 py-4 rounded-full transition-colors duration-200 shadow-lg shadow-[#25D366]/25">
              <MessageCircle className="w-5 h-5" />
              Instant WhatsApp Booking & Menu PDF
            </a>

            {/* Map preview box */}
            <div className="mt-8 rounded-2xl border border-[#D4AF37]/20 overflow-hidden bg-[#FFF8E7] h-40 flex flex-col items-center justify-center gap-2 shadow-sm">
              <MapPin className="w-8 h-8 text-[#7A0E0E]" />
              <p className="text-[#1A1A1A]/60 text-sm font-medium">Chennai, Tamil Nadu, India</p>
              <a href="https://maps.google.com/?q=Chennai,Tamil+Nadu" target="_blank" rel="noopener noreferrer"
                className="text-[#7A0E0E] text-xs font-semibold hover:underline">
                View on Google Maps →
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-[#FFF8E7] border border-[#D4AF37]/25 rounded-3xl p-8 md:p-10 shadow-xl shadow-[#D4AF37]/10">
            <h3 className="font-['Playfair_Display',serif] text-2xl font-bold text-[#1A1A1A] mb-7">Request Catering Quote</h3>

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
                  className="mt-1.5 w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 bg-white focus:outline-none focus:border-[#7A0E0E] text-sm transition-colors text-[#1A1A1A]/70 appearance-none">
                  <option value="">Select event type</option>
                  {["Wedding Banana Leaf Catering", "Reception Dinner Buffet", "Engagement Ceremony", "Housewarming (Grihapravesam)", "Corporate Event", "Birthday Celebration", "Outdoor Feast", "Other"].map(o => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[10px] font-bold text-[#1A1A1A]/45 uppercase tracking-widest">Event Date</span>
                  <input type="date" value={form.date} onChange={setF("date")}
                    className="mt-1.5 w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 bg-white focus:outline-none focus:border-[#7A0E0E] text-sm transition-colors text-[#1A1A1A]/70" />
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold text-[#1A1A1A]/45 uppercase tracking-widest">Guest Count</span>
                  <input type="number" placeholder="e.g. 500" value={form.guests} onChange={setF("guests")}
                    className="mt-1.5 w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 bg-white focus:outline-none focus:border-[#7A0E0E] text-sm transition-colors placeholder:text-[#1A1A1A]/25" />
                </label>
              </div>

              <label className="block">
                <span className="text-[10px] font-bold text-[#1A1A1A]/45 uppercase tracking-widest">Feast & Menu Preferences</span>
                <textarea placeholder="South Indian Traditional Banana Leaf meal, Live Dosa counter, Payasam varieties, Halwa, Biryani..." value={form.notes} onChange={setF("notes")}
                  rows={3}
                  className="mt-1.5 w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 bg-white focus:outline-none focus:border-[#7A0E0E] text-sm transition-colors resize-none placeholder:text-[#1A1A1A]/25" />
              </label>

              <button type="submit"
                className="w-full bg-[#7A0E0E] hover:bg-[#8e1111] text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#7A0E0E]/25 flex items-center justify-center gap-2 text-sm tracking-wide">
                Submit Quote Request
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
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37]/50 shadow-lg ring-2 ring-[#D4AF37]/20 bg-white/10 shrink-0">
                  <img
                    src={logoImg}
                    alt="Annapathiram Catering Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="leading-none">
                  <div className="font-['Playfair_Display',serif] font-bold text-[17px] text-white">Annapathiram</div>
                  <div className="text-[#D4AF37] text-[9px] tracking-[0.28em] uppercase font-bold mt-0.5">Catering</div>
                </div>
              </div>
              <p className="text-white/45 text-sm leading-relaxed mb-5">
                Authentic South Indian banana leaf catering and grand luxury catering hospitality across Chennai and Tamil Nadu since 2014.
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
                    <button onClick={() => go(l.href)} className="text-white/45 hover:text-[#D4AF37] text-sm transition-colors">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-5">Feast Varieties</h4>
              <ul className="space-y-2.5">
                {[
                  "Banana Leaf Kalyana Sapadu",
                  "Live Dosa & Tiffin Counters",
                  "Seeraga Samba Dum Biryani",
                  "Chettinad Spicy Specials",
                  "Traditional Sweets & Payasam",
                  "Outdoor Feast Setup",
                ].map(s => (
                  <li key={s} className="text-white/45 text-sm">{s}</li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-5">Contact Us</h4>
              <div className="space-y-4 mb-7">
                {[
                  { icon: Phone, text: "+91 98765 43210" },
                  { icon: Mail, text: "bookings@magizhmahalcatering.com" },
                  { icon: MapPin, text: "Chennai, Tamil Nadu, India" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-white/45 text-sm leading-snug">{text}</span>
                  </div>
                ))}
              </div>
              <a href="tel:+919876543210"
                className="inline-flex items-center gap-2 bg-[#7A0E0E] hover:bg-[#8e1111] text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors duration-200">
                <Phone className="w-4 h-4" />
                Call Direct
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-3 text-white/30 text-xs">
            <span>© 2025 Annapathiram Catering. All rights reserved.</span>
            <span>Crafted with care for authentic South Indian hospitality</span>
          </div>
        </div>
      </footer>

      {/* ── Floating Replay Intro Screen Button ── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={() => {
            setIsLoading(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#7A0E0E] hover:bg-[#8e1111] text-[#FFFDF7] text-xs font-semibold backdrop-blur-xl border border-[#D4AF37]/50 shadow-[0_4px_20px_rgba(122,14,14,0.4)] transition-all duration-300 hover:scale-105 cursor-pointer ring-2 ring-[#D4AF37]/30"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Replay Opening Screen</span>
        </button>
      </div>
    </div>
  );
}
