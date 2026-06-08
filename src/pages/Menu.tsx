import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import menuCard from "@/assets/menu-card.jpg";
import tomato from "@/assets/tomato.jpg";
import chuleton from "@/assets/chuleton.jpg";
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
        {/* Editorial hero — split layout, no longer blank */}
        <section className="relative pt-32 lg:pt-40 pb-20 border-b border-stone/40">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-end">
            <Reveal>
              <div className="font-body text-[10px] tracking-[0.5em] text-gold uppercase">{t("menu.kicker")}</div>
              <div className="font-script italic text-smoke text-[16px] mt-3">{t("menu.season")}</div>
              <h1 className="mt-8 font-display font-light text-ivory text-[56px] lg:text-[112px] leading-[0.9]">
                The <span className="italic font-script">Tasting</span><br /> Menu
              </h1>
              <div className="w-16 h-px bg-gold mt-10" />
              <p className="mt-8 font-body text-smoke text-[16px] leading-loose max-w-md">
                {t("menu.intro")}
              </p>
              <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-4">
                <div>
                  <div className="font-body text-[9px] tracking-[0.4em] text-ash uppercase">Menu</div>
                  <div className="font-display text-gold text-[36px] font-light leading-none mt-2">€264</div>
                  <div className="font-body text-[10px] tracking-[0.3em] text-ash uppercase mt-1">per guest</div>
                </div>
                <div>
                  <div className="font-body text-[9px] tracking-[0.4em] text-ash uppercase">Wine pairing</div>
                  <div className="font-display text-parchment text-[36px] font-light leading-none mt-2">€60+</div>
                  <div className="font-body text-[10px] tracking-[0.3em] text-ash uppercase mt-1">three options</div>
                </div>
              </div>
              <div className="mt-10 font-body text-[10px] tracking-[0.4em] text-ash uppercase">
                {t("menu.availability")}
              </div>
            </Reveal>
            <Reveal delay={150} className="relative">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img src={menuCard} alt="Hand-written tasting menu card" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden lg:block bg-char border border-gold/40 px-6 py-4">
                <div className="font-script italic text-gold text-[14px]">Today's tablilla</div>
                <div className="font-body text-[10px] tracking-[0.3em] text-ash uppercase mt-1">{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Menu list */}
        <section className="relative py-24 lg:py-32">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <Reveal className="font-body text-[10px] tracking-[0.5em] text-gold uppercase text-center mb-16">Tonight's offering</Reveal>
            <ul>
              {COURSES.map((c, i) => (
                <Reveal key={c.name} delay={i * 30} as="li">
                  <div className="relative grid grid-cols-[60px_1fr_auto] lg:grid-cols-[120px_1fr_auto] items-center gap-4 lg:gap-8 py-8 border-b border-stone/50 first:border-t">
                    <span className="font-display font-light text-stone text-[44px] lg:text-[64px] leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display font-light text-parchment text-[22px] lg:text-[34px] leading-tight">
                      {c.name}
                    </span>
                    <span className="font-body text-[10px] lg:text-[11px] tracking-[0.25em] text-ash uppercase text-right max-w-[180px]">
                      {c.note}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
            <div className="mt-16 text-center font-script italic text-smoke text-[15px]">
              {t("menu.menuChanges")}
            </div>
          </div>
        </section>

        {/* Pairings */}
        <section className="bg-char py-24 lg:py-32 border-t border-stone/40">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Reveal className="text-center mb-16">
              <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">{t("menu.cellarKicker")}</div>
              <h2 className="font-display font-light text-parchment text-[36px] lg:text-[56px] mt-4">{t("menu.cellarTitle")}</h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-px bg-stone/40">
              {WINES.map((w, i) => (
                <Reveal key={w.name} delay={i * 100} className="bg-char p-10 flex flex-col">
                  <div className="font-body text-[10px] tracking-[0.3em] text-gold uppercase">{w.name}</div>
                  <div className="font-display font-light text-parchment text-[40px] mt-6">{w.price}</div>
                  <div className="font-script italic text-smoke text-[15px] mt-4">{w.note}</div>
                </Reveal>
              ))}
            </div>
            <p className="mt-12 text-center font-body text-[11px] tracking-[0.3em] text-ash uppercase">
              {t("menu.extrasNote")}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
