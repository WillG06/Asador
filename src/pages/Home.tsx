import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import interior from "@/assets/interior.asset.json";
import prawn from "@/assets/prawn.asset.json";
import tomato from "@/assets/tomato.asset.json";
import chuleton from "@/assets/chuleton.asset.json";
import menuCard from "@/assets/menu-card.asset.json";
import chef from "@/assets/chef.asset.json";
import exterior from "@/assets/exterior.asset.json";
import { AwardsMarquee } from "@/components/AwardsMarquee";
import { Reveal, useReveal } from "@/components/Chrome";

function LetterReveal({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((c, i) => (
        <span key={i} className="letter" style={{ animationDelay: `${delay + i * 40}ms` }}>
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
}

function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative h-screen w-full overflow-hidden z-0">
      <img
        src={exterior.url}
        alt="Asador Etxebarri stone caserío at dusk"
        className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/30 to-void" />
      <div className="absolute inset-0 grain-overlay opacity-[0.04]" />

      <div className="relative h-full mx-auto max-w-[1440px] px-6 lg:px-10 flex flex-col justify-end pb-32 lg:pb-40">
        <div className="font-body text-[10px] tracking-[0.4em] text-ash uppercase mb-6 opacity-0" style={{ animation: "letterIn 0.8s ease 0.2s forwards" }}>
          {t("common.axpeBasque")}
        </div>
        <h1 className="font-display text-ivory text-shadow-lux leading-[0.85]">
          <LetterReveal text="ASADOR" className="block font-light text-[18vw] lg:text-[140px]" delay={400} />
          <LetterReveal text="ETXEBARRI" className="block font-semibold text-[18vw] lg:text-[140px] text-parchment" delay={700} />
        </h1>
        <div className="mt-8 max-w-md opacity-0" style={{ animation: "letterIn 1s ease 1.6s forwards" }}>
          <p className="font-script italic text-smoke text-[20px] leading-snug">{t("home.heroTagline")}</p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-12">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="text-center font-body text-[9px] tracking-[0.4em] text-ash uppercase mt-4">
            {t("common.openLunch")}
          </div>
        </div>
      </div>
    </section>
  );
}

const DISHES = [
  { name: "TXANGURRO", origin: "Spider crab · Cantabrian Sea", img: prawn.url, n: "01" },
  { name: "CHORIZO DE TXERRI", origin: "House-cured pork · Cherry wood smoke", img: tomato.url, n: "02" },
  { name: "KOKOTXAS", origin: "Hake cheeks · Live fire emulsion", img: menuCard.url, n: "03" },
  { name: "CHULETÓN", origin: "Galician blonde · Aged 14 years · Open grill", img: chuleton.url, n: "04" },
  { name: "CAVIAR", origin: "Oscietra · Grilled over vine shoots", img: prawn.url, n: "05" },
];

function DishCarousel() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [formed, setFormed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const len = DISHES.length;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setFormed(true), 400);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!formed) return;
    const id = setInterval(() => setActive((p) => (p + 1) % len), 5200);
    return () => clearInterval(id);
  }, [formed, len]);

  const onMove = (e: React.MouseEvent) => {
    const el = wheelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    setMouse({ x, y });
  };
  const onLeave = () => setMouse({ x: 0, y: 0 });

  const current = DISHES[active];
  // Rotate the entire wheel so the active dish sits at the top.
  const wheelRotation = -(active / len) * 360;

  return (
    <section ref={sectionRef} className="relative bg-void py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal className="text-center mb-20 lg:mb-24">
          <div className="font-body text-[10px] tracking-[0.5em] text-gold uppercase mb-5">
            {t("home.fromTheGrill")}
          </div>
          <h2 className="font-display font-light text-parchment text-[44px] lg:text-[68px] leading-[0.95]">
            {t("home.singularDishes")}{" "}
            <span className="font-script italic text-smoke">{t("home.forgedByFlame")}</span>
          </h2>
          <div className="mx-auto mt-8 w-10 h-px bg-gold/70" />
        </Reveal>

        <div
          ref={wheelRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative mx-auto"
          style={{
            width: "min(820px, 92vw)",
            height: "min(820px, 92vw)",
          }}
        >
          {/* Concentric rings */}
          <div
            className="absolute inset-0 rounded-full border border-gold/15 transition-all duration-[1600ms]"
            style={{
              opacity: formed ? 1 : 0,
              transform: formed ? "scale(1)" : "scale(0.85)",
            }}
          />
          <div
            className="absolute inset-[8%] rounded-full border border-gold/8 transition-all duration-[1800ms] delay-150"
            style={{
              opacity: formed ? 1 : 0,
              transform: formed ? "scale(1)" : "scale(0.85)",
            }}
          />

          {/* Rotating wheel of dishes */}
          <div
            className="absolute inset-0"
            style={{
              transform: `rotate(${wheelRotation}deg)`,
              transition: "transform 1400ms cubic-bezier(0.65, 0, 0.15, 1)",
              willChange: "transform",
            }}
          >
            {DISHES.map((d, idx) => {
              const angle = (idx / len) * 360 - 90; // start at top
              const isActive = idx === active;
              return (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  aria-label={d.name}
                  className="absolute left-1/2 top-1/2 group"
                  style={{
                    width: "150px",
                    height: "190px",
                    marginLeft: "-75px",
                    marginTop: "-95px",
                    // Place around circle, then counter-rotate so image stays upright.
                    transform: `rotate(${angle}deg) translateY(calc(min(820px, 92vw) * -0.42)) rotate(${-angle}deg) rotate(${-wheelRotation}deg)`,
                    transition: "transform 1400ms cubic-bezier(0.65, 0, 0.15, 1)",
                    opacity: formed ? 1 : 0,
                    willChange: "transform, opacity",
                  }}
                >
                  <div
                    className="relative w-full h-full overflow-hidden"
                    style={{
                      transform: isActive ? "scale(1.18)" : "scale(1)",
                      transition: "transform 900ms cubic-bezier(0.16,1,0.3,1), filter 800ms ease",
                      filter: isActive ? "grayscale(0) brightness(1)" : "grayscale(0.5) brightness(0.7)",
                      boxShadow: isActive
                        ? "0 30px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px hsl(38 50% 55% / 0.7)"
                        : "0 10px 30px -10px rgba(0,0,0,0.5)",
                    }}
                  >
                    <img src={d.img} alt={d.name} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center plate */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none w-[58%]"
            style={{
              transform: `translate(calc(-50% + ${mouse.x * 10}px), calc(-50% + ${mouse.y * 10}px))`,
              transition: "transform 600ms cubic-bezier(0.16,1,0.3,1), opacity 1000ms ease",
              opacity: formed ? 1 : 0,
            }}
          >
            <div className="font-body text-[10px] tracking-[0.5em] text-gold/80 uppercase">
              {current.n}
            </div>
            <div className="mx-auto mt-4 mb-5 w-6 h-px bg-gold/50" />
            <div
              key={current.name}
              className="font-display font-light text-parchment text-[28px] lg:text-[40px] tracking-[0.08em] leading-tight animate-fade-in"
            >
              {current.name}
            </div>
            <div className="font-body italic text-smoke text-[13px] lg:text-[14px] tracking-wide mt-4 max-w-[260px] mx-auto leading-relaxed">
              {current.origin}
            </div>
          </div>
        </div>

        {/* Index bar */}
        <div className="flex justify-center items-center gap-5 mt-16">
          {DISHES.map((d, k) => (
            <button
              key={k}
              onClick={() => setActive(k)}
              aria-label={d.name}
              className="group flex flex-col items-center gap-2"
            >
              <span
                className={`font-body text-[10px] tracking-[0.3em] uppercase transition-colors duration-500 ${
                  k === active ? "text-gold" : "text-stone group-hover:text-ash"
                }`}
              >
                {d.n}
              </span>
              <span
                className={`h-px transition-all duration-700 ${
                  k === active ? "w-10 bg-gold" : "w-5 bg-stone group-hover:bg-ash"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}

function Philosophy() {
  const { t } = useTranslation();
  const { ref, shown } = useReveal();
  return (
    <section ref={ref} className="bg-void grid md:grid-cols-2 min-h-[80vh]">
      <div className="relative overflow-hidden min-h-[400px]">
        <img
          src={chef.url}
          alt="Victor Arguinzoniz at the grill"
          className={`w-full h-full object-cover transition-all duration-[1400ms] ${shown ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-char/40" />
      </div>
      <div className="bg-char px-8 lg:px-20 py-20 lg:py-32 flex flex-col justify-center">
        <div className={`transition-all duration-1000 ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">{t("home.philosophy")}</div>
          <h2 className="font-display italic font-light text-parchment text-[34px] lg:text-[44px] leading-[1.15] mt-6">
            {t("home.philosophyQuote")}
          </h2>
          <p className="font-body text-smoke text-[15px] leading-loose mt-8 max-w-md">
            {t("home.philosophyBody")}
          </p>
          <div className="w-10 h-px bg-gold mt-10" />
          <Link to="/story" className="link-underline inline-block font-body text-[11px] tracking-[0.3em] uppercase text-gold mt-6">
            {t("home.readStory")} →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Terrain() {
  const { t } = useTranslation();
  const { ref, shown } = useReveal();
  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&q=80"
        alt="Basque mountain valley"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(10,8,6,0.4) 50%, rgba(10,8,6,0.95) 100%)" }} />
      <div className={`relative h-full flex flex-col items-center justify-center text-center px-6 transition-all duration-[1600ms] ${shown ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
        <div className="font-body text-[11px] tracking-[0.5em] text-ash uppercase">{t("home.axpeRegion")}</div>
        <h2 className="font-display italic font-light text-ivory text-[40px] lg:text-[64px] mt-6 max-w-3xl leading-tight text-shadow-lux">
          {t("home.whereMountains")}
        </h2>
      </div>
    </section>
  );
}

function PressStrip() {
  const { t } = useTranslation();
  const press = ["The New York Times", "Bon Appétit", "Financial Times", "The Guardian", "El País", "Monocle"];
  return (
    <section className="bg-char py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {press.map((p, i) => (
            <span key={p} className="flex items-center font-body text-[12px] tracking-[0.3em] text-ash uppercase">
              {p}
              {i < press.length - 1 && <span className="text-gold ml-8">·</span>}
            </span>
          ))}
        </Reveal>
        <Reveal delay={200} className="mt-16 mx-auto max-w-3xl text-center" as="blockquote">
          <p className="font-display italic font-light text-parchment text-[26px] lg:text-[32px] leading-snug">
            {t("home.diningQuote")}
          </p>
          <footer className="mt-6 font-body text-[10px] tracking-[0.3em] text-ash uppercase">
            {t("home.diner")}
          </footer>
        </Reveal>
      </div>
    </section>
  );
}

function Reserve() {
  const { t } = useTranslation();
  return (
    <section className="relative bg-void py-32 overflow-hidden">
      <img src={interior.url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/70 to-void" />
      <Reveal className="relative mx-auto max-w-[1440px] px-6 lg:px-10 text-center">
        <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">{t("common.limitedTable")}</div>
        <h2 className="font-display font-light text-ivory text-[44px] lg:text-[72px] leading-[1] mt-6">
          {t("home.reserveTitle")}
        </h2>
        <p className="font-body text-smoke text-[14px] tracking-wider mt-8 max-w-xl mx-auto leading-loose">
          {t("home.reserveBody")}
        </p>
        <Link to="/reservations" className="reserve-cta mt-12">
          <span className="reserve-cta-bg" />
          <span className="reserve-cta-label">{t("common.beginReservation")}</span>
          <span className="reserve-cta-arrow">→</span>
        </Link>
      </Reveal>
    </section>
  );
}

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>Asador Etxebarri — Live Fire Cuisine in the Basque Mountains</title>
        <meta name="description" content={t("home.heroTagline") as string} />
      </Helmet>
      <div className="relative">
        <Hero />
        <div className="relative z-10 bg-void">
          <AwardsMarquee />
          <Philosophy />
          <DishCarousel />
          <Terrain />
          <PressStrip />
          <Reserve />
        </div>
      </div>
    </>
  );
}
