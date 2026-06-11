import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import interior from "@/assets/interior.jpg";
import prawn from "@/assets/prawn.jpg";
import tomato from "@/assets/tomato.jpg";
import chuleton from "@/assets/chuleton.jpg";
import menuCard from "@/assets/menu-card.jpg";
import chef from "@/assets/chef.jpg";
import exterior from "@/assets/exterior.jpg";
import { AwardsMarquee } from "@/components/AwardsMarquee";
import { Reveal, useReveal } from "@/components/Chrome";

// ─── LetterReveal ─────────────────────────────────────────────────────────────

function LetterReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((c, i) => (
        <span
          key={i}
          className="letter"
          style={{ animationDelay: `${delay + i * 40}ms` }}
        >
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </span>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative h-screen w-full overflow-hidden z-0">
      <img
        src={exterior}
        alt="Asador Etxebarri stone caserío at dusk"
        className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/30 to-void" />
      <div className="absolute inset-0 grain-overlay opacity-[0.04]" />

      <div className="relative h-full mx-auto max-w-[1440px] px-6 lg:px-10 flex flex-col justify-end pb-32 lg:pb-40">
        <div
          className="font-body text-[10px] tracking-[0.4em] text-ash uppercase mb-6 opacity-0"
          style={{ animation: "letterIn 0.8s ease 0.2s forwards" }}
        >
          {t("common.axpeBasque")}
        </div>
        <h1 className="font-display text-ivory text-shadow-lux leading-[0.85]">
          <LetterReveal
            text="ASADOR"
            className="block font-light text-[18vw] lg:text-[140px]"
            delay={400}
          />
          <LetterReveal
            text="ETXEBARRI"
            className="block font-semibold text-[18vw] lg:text-[140px] text-parchment"
            delay={700}
          />
        </h1>
        <div
          className="mt-8 max-w-md opacity-0"
          style={{ animation: "letterIn 1s ease 1.6s forwards" }}
        >
          <p className="font-script italic text-smoke text-[20px] leading-snug">
            {t("home.heroTagline")}
          </p>
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

// ─── DishCarousel ─────────────────────────────────────────────────────────────

const DISHES = [
  {
    n: "01",
    name: "TXANGURRO",
    origin: "Spider crab · Cantabrian Sea",
    img: prawn,
  },
  {
    n: "02",
    name: "CHULETÓN",
    origin: "Galician blonde · Aged 14 years · Open grill",
    img: chuleton,
  },
  {
    n: "03",
    name: "KOKOTXAS",
    origin: "Hake cheeks · Live fire emulsion",
    img: menuCard,
  },
  {
    n: "04",
    name: "CAVIAR",
    origin: "Oscietra · Grilled over vine shoots",
    img: prawn,
  },
  {
    n: "05",
    name: "CHORIZO DE TXERRI",
    origin: "House-cured pork · Cherry wood smoke",
    img: tomato,
  },
  {
    n: "06",
    name: "ENTRAÑA",
    origin: "Skirt steak · Charcoal · Sea salt",
    img: chuleton,
  },
];

function DishCarousel() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section className="relative bg-void py-24 lg:py-32 overflow-hidden">
      {/* Top rule */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Header */}
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal className="text-center mb-14 lg:mb-16">
          <div className="font-body text-[13px] tracking-[0.45em] text-gold uppercase mb-5">
            From the Grill
          </div>

          <div className="mx-auto mt-7 w-8 h-px bg-gold/60" />
        </Reveal>
      </div>

      {/* ── Desktop accordion strip ── */}
      <div
        className="hidden lg:flex gap-[3px] px-10 xl:px-16"
        style={{ height: "520px" }}
        onMouseLeave={() => setHovered(null)}
      >
        {DISHES.map((d, i) => {
          const isActive = hovered === i;
          return (
            <div
              key={d.n}
              onMouseEnter={() => setHovered(i)}
              style={{
                position: "relative",
                flex: isActive ? "3.5" : "1",
                minWidth: 0,
                cursor: "pointer",
                /* contain:strict is the nuclear option — nothing escapes */
                contain: "strict",
                transition: "flex 0.65s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {/* image */}
              <img
                src={d.img}
                alt={d.name}
                loading="lazy"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  pointerEvents: "none",
                  transform: isActive ? "scale(1)" : "scale(1.08)",
                  transition: "transform 1.1s cubic-bezier(0.16,1,0.3,1)",
                }}
              />

              {/* scrim */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(10,8,6,0.95) 0%, rgba(10,8,6,0.2) 55%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* collapsed label */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingBottom: "2rem",
                  pointerEvents: "none",
                  opacity: isActive ? 0 : 1,
                  transition: "opacity 0.25s",
                }}
              >
                <span
                  className="font-body text-gold/60 uppercase"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.4em",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {d.n}
                </span>
                <span
                  className="font-display font-light text-parchment/75 uppercase"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  {d.name}
                </span>
              </div>

              {/* expanded label */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "0 1.75rem 2.25rem",
                  pointerEvents: "none",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(8px)",
                  transition:
                    "opacity 0.4s 0.1s, transform 0.5s 0.1s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <div
                  className="font-body text-gold uppercase"
                  style={{ fontSize: 9, letterSpacing: "0.45em", marginBottom: "0.6rem" }}
                >
                  {d.n}
                </div>
                <div
                  style={{
                    width: 24,
                    height: 1,
                    background: "rgba(201,165,90,0.45)",
                    marginBottom: "0.9rem",
                  }}
                />
                <div
                  className="font-display font-light text-parchment uppercase"
                  style={{ fontSize: 22, letterSpacing: "0.07em", lineHeight: 1.05, marginBottom: "0.6rem" }}
                >
                  {d.name}
                </div>
                <div
                  className="font-body italic text-smoke"
                  style={{ fontSize: 12, lineHeight: 1.65 }}
                >
                  {d.origin}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Tablet: 2-col grid ── */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-[3px] px-6">
        {DISHES.map((d) => (
          <div
            key={d.n}
            className="relative overflow-hidden"
            style={{ height: "340px", isolation: "isolate" }}
          >
            <img
              src={d.img}
              alt={d.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,8,6,0.93) 0%, rgba(10,8,6,0.2) 55%, transparent 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-7">
              <div className="font-body text-[9px] tracking-[0.4em] text-gold uppercase mb-2">
                {d.n}
              </div>
              <div
                className="w-5 h-px mb-3"
                style={{ background: "rgba(201,165,90,0.4)" }}
              />
              <div className="font-display font-light text-parchment text-[18px] tracking-[0.06em] uppercase mb-2">
                {d.name}
              </div>
              <div className="font-body italic text-smoke text-[11px] leading-relaxed">
                {d.origin}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Mobile: single column ── */}
      <div className="flex flex-col gap-[3px] md:hidden px-4">
        {DISHES.map((d) => (
          <div
            key={d.n}
            className="relative overflow-hidden"
            style={{ height: "260px", isolation: "isolate" }}
          >
            <img
              src={d.img}
              alt={d.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,8,6,0.93) 0%, rgba(10,8,6,0.2) 50%, transparent 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-6">
              <div className="font-body text-[9px] tracking-[0.4em] text-gold uppercase mb-2">
                {d.n}
              </div>
              <div
                className="w-5 h-px mb-3"
                style={{ background: "rgba(201,165,90,0.4)" }}
              />
              <div className="font-display font-light text-parchment text-[17px] tracking-[0.06em] uppercase mb-1">
                {d.name}
              </div>
              <div className="font-body italic text-smoke text-[11px] leading-relaxed">
                {d.origin}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom rule */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}

// ─── Philosophy ───────────────────────────────────────────────────────────────

function Philosophy() {
  const { t } = useTranslation();
  const { ref, shown } = useReveal();
  return (
    <section ref={ref} className="bg-void grid md:grid-cols-2 min-h-[80vh]">
      <div className="relative overflow-hidden min-h-[400px]">
        <img
          src={tomato}
          alt="Victor Arguinzoniz at the grill"
          className={`w-full h-full object-cover transition-all duration-[1400ms] ${shown ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-char/40" />
      </div>
      <div className="bg-char px-8 lg:px-20 py-20 lg:py-32 flex flex-col justify-center">
        <div
          className={`transition-all duration-1000 ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
        >
          <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">
            {t("home.philosophy")}
          </div>
          <h2 className="font-display italic font-light text-parchment text-[34px] lg:text-[44px] leading-[1.15] mt-6">
            {t("home.philosophyQuote")}
          </h2>
          <p className="font-body text-smoke text-[15px] leading-loose mt-8 max-w-md">
            {t("home.philosophyBody")}
          </p>
          <div className="w-10 h-px bg-gold mt-10" />
          <Link
            to="/story"
            className="link-underline inline-block font-body text-[11px] tracking-[0.3em] uppercase text-gold mt-6"
          >
            {t("home.readStory")} →
          </Link>
        </div>
      </div>
    </section>
  );
}


// ─── TerrainPress ─────────────────────────────────────────────────────────────

function TerrainPress() {
  const { t } = useTranslation();
  const { ref, shown } = useReveal();

  const press = [
    "The New York Times",
    "Bon Appétit",
    "Financial Times",
    "The Guardian",
    "El País",
    "Monocle",
  ];

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ height: "100vh" }}>
      <img
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&q=80"
        alt="Basque mountain valley"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Gradient: clear sky, heavy dark bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,8,6,0.0) 0%, rgba(10,8,6,0.0) 35%, rgba(10,8,6,0.6) 58%, rgba(10,8,6,0.92) 75%, rgba(10,8,6,0.98) 100%)",
        }}
      />

      {/* Headline — pinned to 52% from top so it sits mid-to-lower */}
      <div
        className={`absolute left-6 lg:left-16 right-6 lg:right-16 transition-all duration-[1800ms] ${shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        style={{ top: "58%" }}
      >
        <h2 className="font-display italic font-light text-ivory text-[48px] lg:text-[88px] leading-[1.05] tracking-[0.01em] text-shadow-lux max-w-2xl">
          {t("home.whereMountains")}
        </h2>
      </div>

      {/* Press + quote — absolute bottom */}
      <div
        className={`absolute inset-x-0 bottom-0 px-6 lg:px-16 pb-12 lg:pb-16 transition-all duration-[1600ms] delay-300 ${shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
      >
        {/* Press names */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8">
          {press.map((p, i) => (
            <span
              key={p}
              className="flex items-center font-body text-[9px] tracking-[0.38em] text-ivory/50 uppercase"
            >
              {p}
              {i < press.length - 1 && (
                <span className="text-gold/40 ml-6">·</span>
              )}
            </span>
          ))}
        </div>

        {/* Rule */}
        <div className="w-full h-px mb-8" style={{ background: "rgba(201,165,90,0.18)" }} />

        {/* Quote */}
        <div className="max-w-2xl">
          <p className="font-display italic font-light text-ivory text-[20px] lg:text-[26px] leading-snug">
            {t("home.diningQuote")}
          </p>
          <footer className="mt-4 font-body text-[9px] tracking-[0.35em] text-ivory/45 uppercase">
            {t("home.diner")}
          </footer>
        </div>
      </div>
    </section>
  );
}



// ─── Reserve ──────────────────────────────────────────────────────────────────

function Reserve() {
  const { t } = useTranslation();
  return (
    <section className="relative bg-void py-32 overflow-hidden">
      <img
        src={interior}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-25"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/70 to-void" />
      <Reveal className="relative mx-auto max-w-[1440px] px-6 lg:px-10 text-center">
        <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">
          {t("common.limitedTable")}
        </div>
        <h2 className="font-display font-light text-ivory text-[44px] lg:text-[72px] leading-[1] mt-6">
          {t("home.reserveTitle")}
        </h2>
        <p className="font-body text-smoke text-[14px] tracking-wider mt-8 max-w-xl mx-auto leading-loose">
          {t("home.reserveBody")}
        </p>
        <Link
          to="/reservations"
          className="inline-flex items-center gap-3 mt-12 group"
          style={{
            color: "rgb(201,165,90)",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "13px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "color 0.3s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = "rgb(230,200,130)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = "rgb(201,165,90)";
          }}
        >
          {t("common.beginReservation")}
          <span
            className="group-hover:translate-x-1.5"
            style={{
              display: "inline-block",
              fontSize: "16px",
              transition: "transform 0.3s",
            }}
          >
            →
          </span>
        </Link>
      </Reveal>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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
          <TerrainPress />

          <Reserve />
        </div>
      </div>
    </>
  );
}