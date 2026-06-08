import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { Reveal } from "@/components/Chrome";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const DIETS = ["Vegetarian", "Pescatarian", "GlutenFree", "NutAllergy", "ShellfishAllergy"];
const OCCASIONS = ["None", "Birthday", "Anniversary", "Business"];

// EmailJS — configure these via Vite env vars (VITE_EMAILJS_*) or leave blank for demo mode
const EMAILJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
// Stripe Payment Link — set VITE_STRIPE_PAYMENT_LINK for real prepayment, otherwise mock
const STRIPE_LINK = import.meta.env.VITE_STRIPE_PAYMENT_LINK as string | undefined;

const DEPOSIT_PER_GUEST = 50; // £

function Calendar({ selected, onSelect }: { selected: Date | null; onSelect: (d: Date) => void }) {
  const [view, setView] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const grid = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const startDow = (first.getDay() + 6) % 7;
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startDow; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.getFullYear(), view.getMonth(), d));
    return cells;
  }, [view]);

  const today = new Date(); today.setHours(0,0,0,0);

  return (
    <div className="bg-char border border-stone/50 p-8 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))} className="text-gold hover:text-ivory">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M12 5l-5 5 5 5"/></svg>
        </button>
        <div className="font-display font-light text-parchment text-[28px] lg:text-[32px]">
          {MONTHS[view.getMonth()]} <span className="text-ash">{view.getFullYear()}</span>
        </div>
        <button onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))} className="text-gold hover:text-ivory">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M8 5l5 5-5 5"/></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-3">
        {DAYS.map((d) => (
          <div key={d} className="text-center font-body text-[10px] tracking-[0.3em] text-ash uppercase">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {grid.map((d, i) => {
          if (!d) return <div key={i} />;
          const past = d < today;
          const mondayClosed = d.getDay() === 1;
          const unavail = past || mondayClosed;
          const isSel = selected && d.toDateString() === selected.toDateString();
          return (
            <button
              key={i}
              disabled={unavail}
              onClick={() => onSelect(d)}
              className={`relative aspect-square flex flex-col items-center justify-center font-display text-[18px] transition-colors
                ${isSel ? "bg-ember text-void" : unavail ? "text-stone" : "text-parchment hover:bg-stone/40"}`}
            >
              {d.getDate()}
              {!unavail && !isSel && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-gold" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type Booking = {
  date: Date;
  party: number;
  name: string;
  email: string;
  phone: string;
  diets: string[];
  occasion: string;
  reference: string;
  paid: boolean;
};

export default function Reservations() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | null>(null);
  const [party, setParty] = useState(2);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [diets, setDiets] = useState<string[]>([]);
  const [occasion, setOccasion] = useState("None");
  const [paying, setPaying] = useState(false);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const total = DEPOSIT_PER_GUEST * party;

  // Detect Stripe redirect return (?session_id=...)
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("session_id")) {
      // Restore booking from sessionStorage
      const stored = sessionStorage.getItem("etx-pending-booking");
      if (stored) {
        const b = JSON.parse(stored) as Booking;
        b.date = new Date(b.date);
        b.paid = true;
        setConfirmed(b);
        sessionStorage.removeItem("etx-pending-booking");
        // Clean URL
        window.history.replaceState({}, "", window.location.pathname + window.location.hash.split("?")[0]);
      }
    }
  }, []);

  // Send email when confirmed
  useEffect(() => {
    if (!confirmed || emailStatus !== "idle") return;
    if (!EMAILJS_SERVICE || !EMAILJS_TEMPLATE || !EMAILJS_PUBLIC) {
      // Demo mode — pretend success
      setEmailStatus("sent");
      return;
    }
    setEmailStatus("sending");
    emailjs
      .send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          to_email: confirmed.email,
          to_name: confirmed.name,
          reference: confirmed.reference,
          date: confirmed.date.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
          party: confirmed.party,
          deposit: `£${DEPOSIT_PER_GUEST * confirmed.party}`,
          phone: confirmed.phone || "—",
          diets: confirmed.diets.length ? confirmed.diets.join(", ") : "None",
          occasion: confirmed.occasion,
        },
        { publicKey: EMAILJS_PUBLIC },
      )
      .then(() => setEmailStatus("sent"))
      .catch(() => setEmailStatus("failed"));
  }, [confirmed, emailStatus]);

  const toggleDiet = (d: string) =>
    setDiets((s) => (s.includes(d) ? s.filter((x) => x !== d) : [...s, d]));

  const generateRef = () =>
    "ETX-" + Math.random().toString(36).slice(2, 6).toUpperCase() + "-" + Date.now().toString(36).slice(-4).toUpperCase();

  const proceedToPayment = () => {
    if (!date) return;
    setPaying(true);
    const reference = generateRef();
    const booking: Booking = {
      date,
      party,
      name: form.name,
      email: form.email,
      phone: form.phone,
      diets,
      occasion,
      reference,
      paid: false,
    };

    if (STRIPE_LINK) {
      // Real Stripe Payment Link flow
      sessionStorage.setItem("etx-pending-booking", JSON.stringify(booking));
      const returnUrl = window.location.origin + window.location.pathname + "#/reservations?session_id={CHECKOUT_SESSION_ID}";
      const url = new URL(STRIPE_LINK);
      url.searchParams.set("client_reference_id", reference);
      url.searchParams.set("prefilled_email", form.email);
      // Stripe Payment Links accept ?utm_*; quantity for tier-based links can be appended too
      window.location.href = url.toString();
      return;
    }

    // Mock mode: simulate 1.2s "processing" then confirm
    setTimeout(() => {
      booking.paid = true;
      setConfirmed(booking);
      setPaying(false);
    }, 1200);
  };

  return (
    <>
      <Helmet>
        <title>Reservations — Asador Etxebarri</title>
        <meta name="description" content="Reserve your seat at the fire. £50/guest deposit secures your table." />
      </Helmet>

      <div className="bg-void pt-32 lg:pt-40 pb-32 min-h-screen">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <div className="font-body text-[10px] tracking-[0.5em] text-gold uppercase">{t("reservations.kicker")}</div>
            <h1 className="mt-6 font-display font-light text-ivory text-[44px] lg:text-[80px] leading-[0.95]">
              {t("reservations.title")}
            </h1>
            <p className="mt-6 font-script italic text-smoke text-[18px]">{t("reservations.subtitle")}</p>
          </Reveal>

          {!confirmed && (
            <Reveal className="flex items-center justify-center gap-3 lg:gap-6 mb-16 flex-wrap">
              {[t("reservations.steps.date"), t("reservations.steps.guests"), t("reservations.steps.deposit"), t("reservations.steps.confirm")].map((label, i) => {
                const n = i + 1;
                const active = step === n;
                const done = step > n;
                return (
                  <div key={label} className="flex items-center gap-3 lg:gap-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 border flex items-center justify-center font-body text-[11px] tracking-widest transition-colors ${active ? "border-gold text-gold bg-gold/10" : done ? "border-gold/40 text-gold/40" : "border-stone text-ash"}`}>
                        0{n}
                      </div>
                      <div className={`font-body text-[10px] tracking-[0.3em] uppercase ${active ? "text-parchment" : "text-ash"}`}>{label}</div>
                    </div>
                    {i < 3 && <div className="w-8 lg:w-12 h-px bg-stone" />}
                  </div>
                );
              })}
            </Reveal>
          )}

          {confirmed ? (
            <div className="bg-char border border-gold/40 p-12 lg:p-20 text-center animate-fade-in">
              <div className="font-script italic text-gold text-[22px]">{t("reservations.thanks")}</div>
              <h2 className="font-display font-light text-ivory text-[36px] lg:text-[52px] mt-4">{t("reservations.received")}</h2>
              <div className="w-12 h-px bg-gold mx-auto mt-8" />

              <dl className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto mt-12 text-left">
                <div>
                  <dt className="font-body text-[9px] tracking-[0.3em] text-ash uppercase">Reference</dt>
                  <dd className="font-display font-light text-gold text-[22px] mt-1">{confirmed.reference}</dd>
                </div>
                <div>
                  <dt className="font-body text-[9px] tracking-[0.3em] text-ash uppercase">Service</dt>
                  <dd className="font-display font-light text-parchment text-[18px] mt-1">{t("reservations.service")}</dd>
                </div>
                <div>
                  <dt className="font-body text-[9px] tracking-[0.3em] text-ash uppercase">Date</dt>
                  <dd className="font-display font-light text-parchment text-[18px] mt-1">
                    {confirmed.date.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </dd>
                </div>
                <div>
                  <dt className="font-body text-[9px] tracking-[0.3em] text-ash uppercase">Guests</dt>
                  <dd className="font-display font-light text-parchment text-[18px] mt-1">{confirmed.party}</dd>
                </div>
                <div className="sm:col-span-2 border-t border-stone/40 pt-6 mt-2">
                  <dt className="font-body text-[9px] tracking-[0.3em] text-ash uppercase">Deposit paid</dt>
                  <dd className="font-display font-light text-gold text-[28px] mt-1">£{DEPOSIT_PER_GUEST * confirmed.party}</dd>
                </div>
              </dl>

              <p className="mt-12 font-body text-smoke text-[13px] tracking-wider leading-loose max-w-md mx-auto">
                {emailStatus === "sent" && t("reservations.receipt")}
                {emailStatus === "sending" && "Sending receipt to " + confirmed.email + "…"}
                {emailStatus === "failed" && "Reservation confirmed. Receipt email failed — please screenshot this page."}
              </p>
              <p className="mt-4 font-body text-[10px] tracking-[0.3em] text-ash uppercase">{t("reservations.policy")}</p>
            </div>
          ) : (
            <div className="min-h-[500px]">
              {step === 1 && (
                <div className="grid lg:grid-cols-[2fr_1fr] gap-10 animate-fade-in">
                  <Calendar selected={date} onSelect={setDate} />
                  <div className="bg-char border border-stone/50 p-10 flex flex-col">
                    <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">{t("reservations.partySize")}</div>
                    <div className="flex items-center justify-between mt-10 mb-10">
                      <button onClick={() => setParty(Math.max(1, party - 1))} className="w-12 h-12 border border-stone text-gold text-2xl hover:bg-stone/30">−</button>
                      <div className="font-display font-light text-parchment text-[64px] leading-none">{party}</div>
                      <button onClick={() => setParty(Math.min(8, party + 1))} className="w-12 h-12 border border-stone text-gold text-2xl hover:bg-stone/30">+</button>
                    </div>
                    <div className="text-center font-body text-[10px] tracking-[0.3em] text-ash uppercase">{t("reservations.maxParty")}</div>
                    <div className="mt-auto pt-10">
                      <button
                        disabled={!date}
                        onClick={() => setStep(2)}
                        className="w-full h-14 border border-gold text-gold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gold hover:text-void transition-all duration-500 font-body text-[11px] tracking-[0.3em] uppercase"
                      >
                        {t("common.continue")} →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-char border border-stone/50 p-8 lg:p-16 space-y-10 animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-10">
                    {(["name", "email", "phone"] as const).map((k) => (
                      <label key={k} className={k === "name" ? "md:col-span-2" : ""}>
                        <div className="font-body text-[9px] tracking-[0.3em] text-gold uppercase mb-2">
                          {k === "name" ? t("reservations.fullName") : t("reservations." + k)}
                        </div>
                        <input
                          type={k === "email" ? "email" : "text"}
                          value={form[k]}
                          onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                          className="w-full bg-transparent border-b border-stone focus:border-gold outline-none font-display text-parchment text-[22px] py-2 transition-colors"
                        />
                      </label>
                    ))}
                  </div>
                  <div>
                    <div className="font-body text-[9px] tracking-[0.3em] text-gold uppercase mb-4">{t("reservations.dietary")}</div>
                    <div className="flex flex-wrap gap-3">
                      {DIETS.map((d) => {
                        const on = diets.includes(d);
                        return (
                          <button
                            key={d}
                            onClick={() => toggleDiet(d)}
                            className={`px-5 py-2 border font-body text-[11px] tracking-[0.2em] uppercase transition ${on ? "border-gold text-gold bg-gold/10" : "border-stone text-ash hover:text-parchment hover:border-ash"}`}
                          >
                            {t("diets." + d)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="font-body text-[9px] tracking-[0.3em] text-gold uppercase mb-4">{t("reservations.occasion")}</div>
                    <div className="flex flex-wrap gap-3">
                      {OCCASIONS.map((o) => {
                        const on = occasion === o;
                        return (
                          <button
                            key={o}
                            onClick={() => setOccasion(o)}
                            className={`px-5 py-2 border font-body text-[11px] tracking-[0.2em] uppercase transition ${on ? "border-gold text-gold bg-gold/10" : "border-stone text-ash hover:text-parchment"}`}
                          >
                            {t("occasions." + o)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex justify-between pt-6">
                    <button onClick={() => setStep(1)} className="font-body text-[11px] tracking-[0.3em] uppercase text-ash hover:text-parchment">← {t("common.back")}</button>
                    <button
                      disabled={!form.name || !form.email}
                      onClick={() => setStep(3)}
                      className="px-10 h-12 border border-gold text-gold disabled:opacity-30 hover:bg-gold hover:text-void transition-all duration-500 font-body text-[11px] tracking-[0.3em] uppercase"
                    >
                      {t("reservations.review")} →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-char border border-stone/50 p-8 lg:p-16 animate-fade-in">
                  <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase mb-8">{t("reservations.depositTitle")}</div>
                  <h2 className="font-display font-light text-ivory text-[32px] lg:text-[44px] leading-tight">
                    £{total} <span className="text-stone">deposit</span>
                  </h2>
                  <p className="mt-4 font-body text-smoke text-[14px] leading-loose max-w-xl">{t("reservations.depositBody")}</p>

                  <dl className="grid md:grid-cols-2 gap-y-6 gap-x-12 mt-12 border-t border-stone/40 pt-8">
                    {[
                      [t("reservations.steps.date"), date?.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) ?? "—"],
                      [t("reservations.steps.guests"), `${party} × £${DEPOSIT_PER_GUEST}`],
                      ["Name", form.name],
                      ["Email", form.email],
                      [t("reservations.occasion"), t("occasions." + occasion)],
                      [t("reservations.dietary"), diets.length ? diets.map((d) => t("diets." + d)).join(" · ") : "—"],
                    ].map(([k, v]) => (
                      <div key={k} className="border-b border-stone/40 pb-4">
                        <dt className="font-body text-[9px] tracking-[0.3em] text-ash uppercase">{k}</dt>
                        <dd className="font-display font-light text-parchment text-[18px] mt-2">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-10 font-body text-[11px] tracking-wider text-ash leading-loose max-w-2xl">
                    {t("reservations.policy")}
                  </p>

                  <div className="flex justify-between mt-10">
                    <button onClick={() => setStep(2)} className="font-body text-[11px] tracking-[0.3em] uppercase text-ash hover:text-parchment">← {t("common.back")}</button>
                    <button
                      onClick={proceedToPayment}
                      disabled={paying}
                      className="reserve-cta"
                    >
                      <span className="reserve-cta-bg" />
                      <span className="reserve-cta-label">
                        {paying ? "Processing…" : `${t("reservations.payDeposit")} · £${total}`}
                      </span>
                      <span className="reserve-cta-arrow">→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
