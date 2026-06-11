import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import menuCard from "@/assets/menu-card.jpg";
import { Reveal } from "@/components/Chrome";

const COURSES = [
  { name: "Chorizo", note: "House-cured · cherry wood" },
  { name: "Anchoa", note: "Salt-cured · toasted country bread" },
  { name: "Queso fresco", note: "Buffalo milk" },
  { name: "Mantequilla", note: "Goat butter" },
  { name: "Berberechos", note: "Cockles · pochas broth" },
  { name: "Erizo de mar", note: "Sea urchin · pumpkin & fennel" },
  { name: "Pulpitos", note: "Baby octopus · caramelised onion" },
  { name: "Kokotxas", note: "Hake cheeks · salt-cod tripe pil-pil" },
  { name: "Yema de huevo", note: "Egg yolk · black truffle" },
  { name: "Guisantes", note: "Spring peas · their own juice" },
  { name: "Besugo", note: "Sea bream · garden vegetables" },
  { name: "Chuletón", note: "Aged Galician beef · open grill" },
  { name: "Helado de cuajada", note: "Junket ice cream · fig honey" },
  { name: "Soufflé de chocolate", note: "Pure cacao · mignardise" },
];

const WINES = [
  { name: "Standard Pairing", price: "€95", note: "Six glasses · Basque & Iberian focus" },
  { name: "Sommelier Pairing", price: "€180", note: "Eight glasses · rare bottles & verticals" },
  { name: "Cider Pairing", price: "€60", note: "Sagardo · the original Basque pour" },
];

export default function Menu() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>The Tasting Menu — Asador Etxebarri</title>
        <meta name="description" content="A market-driven, fire-led tasting menu, served Tuesday through Sunday for lunch only." />
      </Helmet>

      <div className="bg-void">

        {/* ── Hero ── */}
        <section className="pt-36 lg:pt-44 pb-20 lg:pb-28"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
            <div className="grid lg:grid-cols-[1fr_380px] gap-16 lg:gap-24 items-end">
              <Reveal>
                <div className="font-body text-[10px] tracking-[0.5em] text-gold uppercase mb-10">
                  {t("menu.kicker")}
                </div>
                <h1 className="font-display font-light text-ivory text-[56px] lg:text-[96px] leading-[0.92] tracking-[-0.01em]">
                  The Tasting<br />
                  <span className="font-script italic text-smoke/80">Menu.</span>
                </h1>
                <div className="w-10 h-px mt-12 mb-12" style={{ background: "rgba(201,165,90,0.4)" }} />
                <p className="font-body text-smoke text-[14px] leading-loose max-w-sm mb-10">
                  {t("menu.intro")}
                </p>
                <div className="flex flex-wrap items-baseline gap-x-10 gap-y-2">
                  <div>
                    <span className="font-display font-light text-gold text-[28px] leading-none">€264</span>
                    <span className="font-body text-[9px] tracking-[0.38em] text-ash uppercase ml-3">per guest</span>
                  </div>
                  <div className="font-body text-[9px] tracking-[0.38em] text-ash/60 uppercase">
                    {t("menu.availability")}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <div className="relative mx-auto" style={{ maxWidth: "380px" }}>
                  {/* Corner marks */}
                  {[
                    "top-0 left-0 border-t border-l",
                    "top-0 right-0 border-t border-r",
                    "bottom-0 left-0 border-b border-l",
                    "bottom-0 right-0 border-b border-r",
                  ].map((cls, i) => (
                    <span
                      key={i}
                      className={`absolute w-5 h-5 ${cls}`}
                      style={{ borderColor: "rgba(201,165,90,0.5)" }}
                    />
                  ))}
                  {/* Image inset from corners */}
                  <div className="p-4">
                    <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                      <img
                        src={menuCard}
                        alt="Hand-written tasting menu card"
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
                    </div>
                  </div>
                  {/* Caption */}
                  <div className="text-center mt-4">
                    <span className="font-script italic text-smoke/40 text-[13px]">Today's tablilla</span>
                    <span className="font-body text-[8px] tracking-[0.4em] text-ash/35 uppercase ml-3">
                      {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long" })}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Course list + Pairings split ── */}
        <section style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">

            {/* ── LEFT — Course list ── */}
            <div
              className="px-6 md:px-12 lg:px-16 xl:px-20 py-24 lg:py-32"
              style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}
            >
              <Reveal className="mb-14">
                <div className="font-body text-[10px] tracking-[0.5em] text-gold uppercase">
                  {t("menu.season")}
                </div>
              </Reveal>

              <ul className="divide-y" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                {COURSES.map((c, i) => (
                  <Reveal key={c.name} delay={i * 25} as="li">
                    <div className="flex items-baseline justify-between gap-6 py-5">
                      <span className="font-display font-light text-parchment text-[20px] lg:text-[24px] leading-none tracking-[0.02em]">
                        {c.name}
                      </span>
                      <span
                        className="font-body text-[9px] tracking-[0.25em] text-ash/70 uppercase text-right shrink-0"
                        style={{ maxWidth: "200px" }}
                      >
                        {c.note}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={300}>
                <p className="mt-12 font-script italic text-smoke/50 text-[13px]">
                  {t("menu.menuChanges")}
                </p>
              </Reveal>
            </div>

            {/* ── RIGHT — Image + Pairings ── */}
            <div className="hidden md:flex flex-col justify-center px-8 lg:px-16 xl:px-20 py-24 lg:py-32 gap-16">

              {/* Framed image — smaller on this side */}
              <Reveal delay={100}>
                <div className="relative mx-auto" style={{ maxWidth: "320px" }}>
                  {[
                    "top-0 left-0 border-t border-l",
                    "top-0 right-0 border-t border-r",
                    "bottom-0 left-0 border-b border-l",
                    "bottom-0 right-0 border-b border-r",
                  ].map((cls, i) => (
                    <span
                      key={i}
                      className={`absolute w-5 h-5 ${cls}`}
                      style={{ borderColor: "rgba(201,165,90,0.45)" }}
                    />
                  ))}
                  <div className="p-4">
                    <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                      <img
                        src={menuCard}
                        alt="Tasting menu card"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Pairings */}
              <Reveal delay={150}>
                <div className="font-body text-[10px] tracking-[0.5em] text-gold uppercase mb-8">
                  {t("menu.cellarKicker")}
                </div>
                <div>
                  {WINES.map((w) => (
                    <div
                      key={w.name}
                      className="flex items-baseline justify-between gap-6 py-5"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <div>
                        <div className="font-display font-light text-parchment text-[16px] tracking-[0.03em] mb-1.5">
                          {w.name}
                        </div>
                        <div className="font-body text-[9px] tracking-[0.25em] text-ash/60 uppercase">
                          {w.note}
                        </div>
                      </div>
                      <span className="font-display font-light text-gold text-[22px] leading-none shrink-0">
                        {w.price}
                      </span>
                    </div>
                  ))}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
                </div>
                <p className="mt-8 font-body text-[9px] tracking-[0.35em] text-ash/40 uppercase">
                  {t("menu.extrasNote")}
                </p>
              </Reveal>

            </div>
          </div>

          {/* Pairings visible on mobile/tablet only — stacks below course list */}
          <div
            className="md:hidden px-6 py-16"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="font-body text-[10px] tracking-[0.5em] text-gold uppercase mb-8">
              {t("menu.cellarKicker")}
            </div>
            <div>
              {WINES.map((w) => (
                <div
                  key={w.name}
                  className="flex items-baseline justify-between gap-6 py-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div>
                    <div className="font-display font-light text-parchment text-[16px] tracking-[0.03em] mb-1.5">
                      {w.name}
                    </div>
                    <div className="font-body text-[9px] tracking-[0.25em] text-ash/60 uppercase">
                      {w.note}
                    </div>
                  </div>
                  <span className="font-display font-light text-gold text-[22px] leading-none shrink-0">
                    {w.price}
                  </span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />
            </div>
            <p className="mt-8 font-body text-[9px] tracking-[0.35em] text-ash/40 uppercase">
              {t("menu.extrasNote")}
            </p>
          </div>
        </section>

      </div>
    </>
  );
}