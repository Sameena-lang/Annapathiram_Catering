import React, { useState, useEffect } from "react";
import logoImg from "../../../assets/logo/magizh-mahal-logo-circular.png";
import subtleFoodBgImg from "../../../assets/images/banana-leaf-feast-seated.png";

interface MagizhMahalLoadingScreenProps {
  onComplete?: () => void;
  onEnterSite?: () => void;
}

export const MagizhMahalLoadingScreen: React.FC<MagizhMahalLoadingScreenProps> = ({
  onComplete,
  onEnterSite,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2400; // 2.4s smooth luxury load

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(current);

      if (current >= 100) {
        clearInterval(timer);
        if (onComplete) onComplete();
        // Automatically smoothly transition into the website
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            if (onEnterSite) onEnterSite();
          }, 450);
        }, 300);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [onComplete, onEnterSite]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (onEnterSite) onEnterSite();
    }, 350);
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF8F5] text-[#1A1A1A] font-['Poppins',sans-serif] transition-opacity duration-500 cursor-pointer select-none ${isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
    >
      {/* ── 1. Single Subtle Food Background (Clean, Warm, Minimal) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={subtleFoodBgImg}
          alt="Annapathiram Catering Food Background"
          className="w-full h-full object-cover object-center opacity-[0.08] filter brightness-105 contrast-105 scale-102 transition-transform duration-1000 ease-out"
        />
        {/* Soft Warm Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(250,248,245,0.7)_60%,#FAF8F5_100%)]" />
      </div>

      {/* ── 2. Centered Minimal Luxury Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">

        {/* ── Logo with Elegant Minimal Circular Ring ── */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Subtle Outer Circular Spinner */}
          <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-stone-200/80 pointer-events-none" />

          {/* Active Thin Rotating Arc */}
          <div
            className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[1.5px] border-transparent border-t-[#D4AF37] animate-spin"
            style={{ animationDuration: "1.8s" }}
          />

          {/* Logo Frame */}
          <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full p-1 bg-white shadow-xl shadow-stone-900/[0.06] border border-stone-100 overflow-hidden flex items-center justify-center">
            <img
              src={logoImg}
              alt="Annapathiram Catering Logo"
              className="w-full h-full object-cover rounded-full filter brightness-102 contrast-102"
            />
          </div>
        </div>

        {/* ── Minimal Typography ── */}
        <div className="space-y-2 mb-8">
          <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7A0E0E]/80">
            Annapathiram Catering
          </div>

          <h1 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-semibold text-[#1A1A1A] tracking-tight">
            Welcome to Annapathiram Catering
          </h1>

          <p className="text-xs sm:text-sm text-stone-500 font-normal tracking-wide">
            Preparing Your Feast...
          </p>
        </div>

        {/* ── Thin Animated Progress Bar ── */}
        <div className="w-48 sm:w-56 space-y-2">
          <div className="h-[2.5px] w-full bg-stone-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#7A0E0E] via-[#D4AF37] to-[#7A0E0E] rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-stone-400 px-0.5">
            <span className="tracking-wider uppercase">Loading</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      {/* ── Subtle Bottom Brand Mark ── */}
      <div className="absolute bottom-6 text-[10px] tracking-[0.2em] uppercase text-stone-400/80 font-medium">
        Luxury Hospitality & Banana Leaf Feasts
      </div>
    </div>
  );
};
