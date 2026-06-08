import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/Chrome";

const STAYS = [
  { name: "Hotel Mendi Goikoa", note: "A restored caserío two minutes by foot from the restaurant", dist: "120m" },
  { name: "Castillo de Arteaga", note: "A 13th-century Napoleonic château in the Urdaibai biosphere", dist: "35min" },
  { name: "Akelarre Relais & Châteaux", note: "Cliffside in San Sebastián, sister to Pedro Subijana's table", dist: "1h 10min" },
];

export default function FindUs() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>Find Us — Asador Etxebarri, Axpe Basque Country</title>
        <meta name="description" content="San Juan Plaza 1, Axpe-Marzana, Bizkaia." />
      </Helmet>
      <div className="bg-void pt-32 lg:pt-40 pb-32">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <Reveal as="header" className="mb-16 max-w-3xl">
            <div className="font-body text-[10px] tracking-[0.5em] text-gold uppercase">{t("findUs.kicker")}</div>
            <h1 className="mt-6 font-display font-light text-ivory text-[44px] lg:text-[80px] leading-[0.95]">
              {t("findUs.title")}
            </h1>
          </Reveal>

          <Reveal className="grid lg:grid-cols-[3fr_2fr] gap-0 border border-stone/50">
            <div className="relative h-[500px] lg:h-[640px] bg-char">
              <iframe
                title="Map to Asador Etxebarri"
                src="https://maps.google.com/maps?q=Asador+Etxebarri+Axpe&t=&z=12&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full"
                style={{ filter: "invert(0.92) hue-rotate(180deg) saturate(0.6) brightness(0.9)" }}
                loading="lazy"
              />
            </div>

            <div className="bg-char p-10 lg:p-14 space-y-10">
              <div>
                <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase mb-4">{t("findUs.address")}</div>
                <address className="not-italic font-display font-light text-parchment text-[22px] leading-tight">
                  San Juan Plaza, 1<br />
                  Axpe-Marzana, Bizkaia<br />
                  48291 · Spain
                </address>
                <div className="mt-6 font-body text-[12px] text-ash tracking-wider leading-loose">
                  +34 946 583 042<br />
                  reserve@asadoretxebarri.com
                </div>
              </div>

              <div>
                <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase mb-4">{t("findUs.hours")}</div>
                <table className="w-full font-body text-[12px] text-smoke">
                  <tbody>
                    {[
                      ["Tuesday – Friday", "13:00 – 15:30"],
                      ["Saturday", "13:00 – 15:30 · 20:30 – 22:30"],
                      ["Sunday", "13:00 – 15:30"],
                      ["Monday", "Closed"],
                    ].map(([day, h]) => (
                      <tr key={day} className="border-b border-stone/40 last:border-0">
                        <td className="py-3 tracking-wider">{day}</td>
                        <td className="py-3 text-right text-parchment">{h}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-24">
            <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase mb-8">{t("findUs.gettingHere")}</div>
            <div className="grid md:grid-cols-3 gap-12 font-body text-[14px] text-smoke leading-loose">
              <div>
                <div className="font-display font-light text-parchment text-[20px] mb-3">From Bilbao</div>
                <p>45 minutes by car. Take the A-8 east, then the BI-632 toward Atxondo. The village square sits at the head of the valley.</p>
              </div>
              <div>
                <div className="font-display font-light text-parchment text-[20px] mb-3">From San Sebastián</div>
                <p>1 hour by car along the AP-8. Park in the village square — there is no dedicated lot.</p>
              </div>
              <div>
                <div className="font-display font-light text-parchment text-[20px] mb-3">By private transfer</div>
                <p>We can arrange a driver from any nearby city. Please request when booking.</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-24">
            <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase mb-8">{t("findUs.stays")}</div>
            <div className="grid md:grid-cols-3 gap-px bg-stone/40">
              {STAYS.map((s) => (
                <div key={s.name} className="bg-char p-8">
                  <div className="font-display font-light text-parchment text-[20px]">{s.name}</div>
                  <div className="font-script italic text-smoke text-[14px] mt-2">{s.note}</div>
                  <div className="mt-4 font-body text-[10px] tracking-[0.3em] text-gold uppercase">{s.dist} from the door</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
