import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import { Reveal } from "@/components/Chrome";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Mo","Tu","We","Th","Fr","Sa","Su"];
const DIETS = ["Vegetarian","Pescatarian","GlutenFree","NutAllergy","ShellfishAllergy"];
const OCCASIONS = ["None","Birthday","Anniversary","Business"];

const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string | undefined;
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC   = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string | undefined;
const STRIPE_LINK      = import.meta.env.VITE_STRIPE_PAYMENT_LINK as string | undefined;
const DEPOSIT_PER_GUEST = 50;

const RAIL_STEPS = ["Date", "Details", "Confirm", "Reserved"];

const gold   = "rgba(201,165,90,1)";
const gold4  = "rgba(201,165,90,0.4)";
const gold15 = "rgba(201,165,90,0.15)";
const hairline = "rgba(255,255,255,0.08)";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
function generateRef() {
  return "ETX-" + Math.random().toString(36).slice(2,6).toUpperCase() + "-" + Date.now().toString(36).slice(-4).toUpperCase();
}

// ── Calendar ──────────────────────────────────────────────────────────────────

function Calendar({ selected, onSelect }: { selected: Date | null; onSelect: (d: Date) => void }) {
  const [view, setView] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const grid = useMemo(() => {
    const first    = new Date(view.getFullYear(), view.getMonth(), 1);
    const total    = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const startDow = (first.getDay() + 6) % 7;
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startDow; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(new Date(view.getFullYear(), view.getMonth(), d));
    return cells;
  }, [view]);

  const today = new Date(); today.setHours(0,0,0,0);
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
  const prevDisabled = view <= new Date(today.getFullYear(), today.getMonth(), 1);
  const nextDisabled = view >= new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
          disabled={prevDisabled}
          className="w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-20"
          style={{ color: gold, border: `1px solid ${gold4}` }}
          aria-label="Previous month"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 2L4 7l5 5"/>
          </svg>
        </button>

        <div className="text-center">
          <span className="font-display font-light text-ivory text-[32px] lg:text-[40px] leading-none">
            {MONTHS[view.getMonth()]}
          </span>
          <span className="font-body text-[11px] tracking-[0.4em] text-ash uppercase ml-3">
            {view.getFullYear()}
          </span>
        </div>

        <button
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
          disabled={nextDisabled}
          className="w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-20"
          style={{ color: gold, border: `1px solid ${gold4}` }}
          aria-label="Next month"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 2l5 5-5 5"/>
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center font-body text-[9px] tracking-[0.35em] uppercase py-3"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {grid.map((d, i) => {
          if (!d) return <div key={i} style={{ minHeight: "72px" }} />;

          const past    = d < today;
          const tooFar  = d > maxDate;
          const isMon   = d.getDay() === 1;
          const unavail = past || isMon || tooFar;
          const isSel   = selected?.toDateString() === d.toDateString();
          const isToday = d.toDateString() === today.toDateString();

          return (
            <button
              key={i}
              disabled={unavail}
              onClick={() => onSelect(d)}
              className="flex flex-col items-center justify-center relative transition-all duration-200 group"
              style={{
                minHeight: "72px",
                color: unavail ? "rgba(255,255,255,0.18)" : isSel ? gold : "rgba(255,255,255,0.75)",
                outline: isSel ? `1px solid ${gold4}` : "none",
                background: isSel ? gold15 : "transparent",
                cursor: unavail ? "default" : "pointer",
              }}
            >
              <span
                className="font-display font-light text-[20px] lg:text-[24px] leading-none transition-colors"
                style={{ color: "inherit" }}
              >
                {d.getDate()}
              </span>
              {!unavail && !isSel && (
                <span
                  className="absolute bottom-2 w-1 h-1 rounded-full"
                  style={{ background: gold4 }}
                />
              )}
              {isToday && (
                <span
                  className="absolute top-2 right-2 w-1 h-1 rounded-full"
                  style={{ background: gold }}
                />
              )}
              {!unavail && !isSel && (
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ outline: `1px solid ${gold4}` }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full inline-block" style={{ background: gold4 }} />
          <span className="font-body text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
            Available
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full inline-block" style={{ background: "rgba(255,255,255,0.18)" }} />
          <span className="font-body text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
            Closed · Mon
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Left Rail ─────────────────────────────────────────────────────────────────

function Rail({
  step, date, party, setParty, confirmed,
}: {
  step: number; date: Date | null; party: number; setParty: (n: number) => void; confirmed: boolean;
}) {
  return (
    <aside
      className="hidden lg:flex flex-col justify-between px-10 xl:px-14 py-16"
      style={{
        width: "300px",
        minHeight: "100vh",
        borderRight: `1px solid ${hairline}`,
        position: "sticky",
        top: 0,
      }}
    >
      <div>
        <div className="mb-16">
          <div className="font-body text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: gold }}>
            Asador Etxebarri
          </div>
          <div className="font-display font-light text-ivory text-[22px] leading-tight">
            Reservations
          </div>
        </div>

        <nav className="space-y-0">
          {RAIL_STEPS.map((label, i) => {
            const n      = i + 1;
            const active = step === n;
            const done   = step > n || confirmed;
            return (
              <div
                key={label}
                className="flex items-center gap-4 py-4"
                style={{ borderBottom: `1px solid ${hairline}` }}
              >
                <div
                  className="w-5 h-5 flex items-center justify-center shrink-0 transition-all duration-300"
                  style={{
                    border: `1px solid ${active ? gold : done ? gold4 : "rgba(255,255,255,0.2)"}`,
                    background: done && !active ? gold15 : "transparent",
                  }}
                >
                  {done && !active ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={gold} strokeWidth="1.5">
                      <path d="M2 5l2 2 4-4"/>
                    </svg>
                  ) : (
                    <span className="font-body text-[8px]" style={{ color: active ? gold : "rgba(255,255,255,0.3)" }}>
                      {n}
                    </span>
                  )}
                </div>
                <span
                  className="font-body text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
                  style={{ color: active ? "rgba(255,255,255,0.9)" : done ? gold4 : "rgba(255,255,255,0.3)" }}
                >
                  {label}
                </span>
                {active && (
                  <span className="ml-auto w-1 h-1 rounded-full" style={{ background: gold }} />
                )}
              </div>
            );
          })}
        </nav>

        {date && (
          <div className="mt-10 space-y-6">
            <div>
              <div className="font-body text-[9px] tracking-[0.35em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                Date
              </div>
              <div className="font-display font-light text-parchment text-[15px] leading-snug">
                {date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long" })}
              </div>
            </div>
            <div>
              <div className="font-body text-[9px] tracking-[0.35em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                Guests
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setParty(Math.max(1, party - 1))}
                  className="w-8 h-8 flex items-center justify-center transition-colors"
                  style={{ border: `1px solid ${gold4}`, color: gold }}
                >
                  −
                </button>
                <span className="font-display font-light text-ivory text-[28px] leading-none w-8 text-center">
                  {party}
                </span>
                <button
                  onClick={() => setParty(Math.min(8, party + 1))}
                  className="w-8 h-8 flex items-center justify-center transition-colors"
                  style={{ border: `1px solid ${gold4}`, color: gold }}
                >
                  +
                </button>
              </div>
              <div className="font-body text-[8px] tracking-[0.3em] uppercase mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>
                Max 8 per booking
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="font-body text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
          Tue – Sun · Lunch only
        </div>
        <div className="font-body text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
          Tables open 3 months in advance
        </div>
      </div>
    </aside>
  );
}

// ── Mobile step bar ───────────────────────────────────────────────────────────

function MobileStepBar({ step }: { step: number }) {
  return (
    <div className="lg:hidden flex items-center gap-4 px-6 py-5"
      style={{ borderBottom: `1px solid ${hairline}` }}>
      <div className="w-6 h-6 flex items-center justify-center"
        style={{ border: `1px solid ${gold}` }}>
        <span className="font-body text-[9px]" style={{ color: gold }}>{step}</span>
      </div>
      <span className="font-body text-[10px] tracking-[0.35em] uppercase text-ivory">
        {RAIL_STEPS[step - 1]}
      </span>
      <span className="ml-auto font-body text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
        {step} of {RAIL_STEPS.length}
      </span>
    </div>
  );
}

// ── Field ─────────────────────────────────────────────────────────────────────

function Field({
  label, value, onChange, type = "text", error, hint,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; error?: string; hint?: string;
}) {
  return (
    <label className="block group">
      <div className="flex items-baseline justify-between mb-2">
        <span
          className="font-body text-[9px] tracking-[0.35em] uppercase"
          style={{ color: error ? "rgba(220,100,80,0.9)" : gold }}
        >
          {label}
        </span>
        {hint && !error && (
          <span className="font-body text-[8px] tracking-[0.2em] uppercase"
            style={{ color: "rgba(255,255,255,0.25)" }}>{hint}</span>
        )}
        {error && (
          <span className="font-body text-[8px] tracking-[0.2em] uppercase"
            style={{ color: "rgba(220,100,80,0.9)" }}>{error}</span>
        )}
      </div>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-transparent outline-none font-display font-light text-parchment text-[22px] py-2 transition-colors duration-200"
        style={{
          borderBottom: `1px solid ${error ? "rgba(220,100,80,0.6)" : "rgba(255,255,255,0.15)"}`,
          caretColor: gold,
        }}
        onFocus={e => { e.currentTarget.style.borderBottomColor = error ? "rgba(220,100,80,0.9)" : gold; }}
        onBlur={e => { e.currentTarget.style.borderBottomColor = error ? "rgba(220,100,80,0.6)" : "rgba(255,255,255,0.15)"; }}
      />
    </label>
  );
}

// ── Tag ───────────────────────────────────────────────────────────────────────

function Tag({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 font-body text-[10px] tracking-[0.2em] uppercase transition-all duration-200"
      style={{
        border: `1px solid ${active ? gold : "rgba(255,255,255,0.15)"}`,
        color: active ? gold : "rgba(255,255,255,0.45)",
        background: active ? gold15 : "transparent",
      }}
    >
      {label}
    </button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

type Booking = {
  date: Date; party: number; name: string; email: string; phone: string;
  diets: string[]; occasion: string; reference: string; paid: boolean;
};

export default function Reservations() {
  const { t } = useTranslation();
  const [step, setStep]       = useState(1);
  const [date, setDate]       = useState<Date | null>(null);
  const [party, setParty]     = useState(2);
  const [form, setForm]       = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors]   = useState<Partial<Record<"name"|"email"|"phone", string>>>({});
  const [diets, setDiets]     = useState<string[]>([]);
  const [occasion, setOccasion] = useState("None");
  const [agreed, setAgreed]   = useState(false);
  const [paying, setPaying]   = useState(false);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [emailStatus, setEmailStatus] = useState<"idle"|"sending"|"sent"|"failed">("idle");

  const total = DEPOSIT_PER_GUEST * party;

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("session_id")) {
      const stored = sessionStorage.getItem("etx-pending-booking");
      if (stored) {
        const b = JSON.parse(stored) as Booking;
        b.date = new Date(b.date);
        b.paid = true;
        setConfirmed(b);
        setStep(4);
        sessionStorage.removeItem("etx-pending-booking");
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
  }, []);

  useEffect(() => {
    if (!confirmed || emailStatus !== "idle") return;
    if (!EMAILJS_SERVICE || !EMAILJS_TEMPLATE || !EMAILJS_PUBLIC) { setEmailStatus("sent"); return; }
    setEmailStatus("sending");
    emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
      to_email: confirmed.email,
      to_name: confirmed.name,
      reference: confirmed.reference,
      date: formatDate(confirmed.date),
      party: confirmed.party,
      deposit: `£${DEPOSIT_PER_GUEST * confirmed.party}`,
      phone: confirmed.phone || "—",
      diets: confirmed.diets.length ? confirmed.diets.join(", ") : "None",
      occasion: confirmed.occasion,
    }, { publicKey: EMAILJS_PUBLIC })
      .then(() => setEmailStatus("sent"))
      .catch(() => setEmailStatus("failed"));
  }, [confirmed, emailStatus]);

  const toggleDiet = (d: string) =>
    setDiets(s => s.includes(d) ? s.filter(x => x !== d) : [...s, d]);

  const validateDetails = () => {
    const e: typeof errors = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Required";
    if (!isValidEmail(form.email)) e.email = "Invalid email";
    if (form.phone && !/^[+\d\s\-()]{7,}$/.test(form.phone.trim())) e.phone = "Invalid number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const proceedToPayment = () => {
    if (!date) return;
    setPaying(true);
    const reference = generateRef();
    const booking: Booking = { date, party, name: form.name, email: form.email, phone: form.phone, diets, occasion, reference, paid: false };

    if (STRIPE_LINK) {
      sessionStorage.setItem("etx-pending-booking", JSON.stringify(booking));
      const url = new URL(STRIPE_LINK);
      url.searchParams.set("client_reference_id", reference);
      url.searchParams.set("prefilled_email", form.email);
      window.location.href = url.toString();
      return;
    }

    setTimeout(() => {
      booking.paid = true;
      setConfirmed(booking);
      setStep(4);
      setPaying(false);
    }, 1400);
  };

  return (
    <>
      <Helmet>
        <title>Reservations — Asador Etxebarri</title>
        <meta name="description" content="Reserve your seat at the fire. £50/guest deposit secures your table." />
      </Helmet>

      <div className="bg-void min-h-screen flex flex-col lg:flex-row">
        <Rail step={step} date={date} party={party} setParty={setParty} confirmed={!!confirmed} />

        <div className="flex-1 flex flex-col">
          <MobileStepBar step={step} />

          <div className="flex-1 px-6 md:px-12 lg:px-16 xl:px-24 py-16 lg:py-24">

            {/* ── Step 1 ── */}
            {step === 1 && (
              <div className="animate-fade-in">
                <Reveal>
                  <div className="font-body text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: gold }}>
                    {t("reservations.kicker")}
                  </div>
                  <h1 className="font-display font-light text-ivory text-[40px] lg:text-[64px] leading-[0.92] mb-16">
                    {t("reservations.title")}
                  </h1>
                </Reveal>

                <Calendar selected={date} onSelect={setDate} />

                {/* Mobile party size */}
                {date && (
                  <div className="lg:hidden mt-10 pt-10" style={{ borderTop: `1px solid ${hairline}` }}>
                    <div className="font-body text-[9px] tracking-[0.35em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
                      Guests
                    </div>
                    <div className="flex items-center gap-5">
                      <button onClick={() => setParty(Math.max(1, party - 1))}
                        className="w-10 h-10 flex items-center justify-center"
                        style={{ border: `1px solid ${gold4}`, color: gold }}>−</button>
                      <span className="font-display font-light text-ivory text-[40px] leading-none">{party}</span>
                      <button onClick={() => setParty(Math.min(8, party + 1))}
                        className="w-10 h-10 flex items-center justify-center"
                        style={{ border: `1px solid ${gold4}`, color: gold }}>+</button>
                      <span className="font-body text-[9px] tracking-[0.3em] uppercase ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Max 8
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-12">
                  <button
                    disabled={!date}
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-4 font-body text-[11px] tracking-[0.35em] uppercase transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
                    style={{ color: date ? gold : "rgba(255,255,255,0.4)" }}
                  >
                    {date
                      ? `Continue with ${date.toLocaleDateString("en-GB", { day: "numeric", month: "long" })}`
                      : "Select a date to continue"
                    }
                    {date && <span style={{ fontSize: 16 }}>→</span>}
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 2 ── */}
            {step === 2 && (
              <div className="max-w-2xl animate-fade-in">
                <div className="font-body text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: gold }}>
                  Your details
                </div>
                <h2 className="font-display font-light text-ivory text-[36px] lg:text-[52px] leading-[0.95] mb-14">
                  Who's joining us?
                </h2>

                <div className="space-y-10">
                  <Field
                    label="Full name"
                    value={form.name}
                    onChange={v => { setForm(f => ({...f, name: v})); setErrors(e => ({...e, name: undefined})); }}
                    error={errors.name}
                  />
                  <div className="grid md:grid-cols-2 gap-10">
                    <Field
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={v => { setForm(f => ({...f, email: v})); setErrors(e => ({...e, email: undefined})); }}
                      error={errors.email}
                    />
                    <Field
                      label="Phone"
                      type="tel"
                      value={form.phone}
                      onChange={v => { setForm(f => ({...f, phone: v})); setErrors(e => ({...e, phone: undefined})); }}
                      hint="Optional"
                      error={errors.phone}
                    />
                  </div>
                </div>

                <div className="mt-12" style={{ borderTop: `1px solid ${hairline}`, paddingTop: "2.5rem" }}>
                  <div className="font-body text-[9px] tracking-[0.35em] uppercase mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {t("reservations.dietary")}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {DIETS.map(d => (
                      <Tag key={d} label={t("diets." + d)} active={diets.includes(d)} onClick={() => toggleDiet(d)} />
                    ))}
                  </div>
                </div>

                <div className="mt-10" style={{ borderTop: `1px solid ${hairline}`, paddingTop: "2.5rem" }}>
                  <div className="font-body text-[9px] tracking-[0.35em] uppercase mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {t("reservations.occasion")}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {OCCASIONS.map(o => (
                      <Tag key={o} label={t("occasions." + o)} active={occasion === o} onClick={() => setOccasion(o)} />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-14">
                  <button
                    onClick={() => setStep(1)}
                    className="font-body text-[10px] tracking-[0.3em] uppercase transition-colors"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => { if (validateDetails()) setStep(3); }}
                    className="inline-flex items-center gap-3 font-body text-[11px] tracking-[0.35em] uppercase transition-colors"
                    style={{ color: gold }}
                  >
                    Review booking <span style={{ fontSize: 16 }}>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 3 ── */}
            {step === 3 && (
              <div className="max-w-2xl animate-fade-in">
                <div className="font-body text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: gold }}>
                  {t("reservations.depositTitle")}
                </div>
                <h2 className="font-display font-light text-ivory text-[36px] lg:text-[52px] leading-[0.95] mb-14">
                  Confirm your table.
                </h2>

                <div className="space-y-0">
                  {[
                    { label: "Date",      value: date ? formatDate(date) : "—" },
                    { label: "Guests",    value: `${party} ${party === 1 ? "guest" : "guests"}` },
                    { label: "Name",      value: form.name },
                    { label: "Email",     value: form.email },
                    { label: "Phone",     value: form.phone || "—" },
                    { label: "Occasion",  value: t("occasions." + occasion) },
                    { label: "Dietary",   value: diets.length ? diets.map(d => t("diets." + d)).join(" · ") : "None noted" },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-baseline justify-between gap-8 py-5"
                      style={{ borderBottom: `1px solid ${hairline}` }}
                    >
                      <span className="font-body text-[9px] tracking-[0.35em] uppercase shrink-0"
                        style={{ color: "rgba(255,255,255,0.35)" }}>
                        {label}
                      </span>
                      <span className="font-display font-light text-parchment text-[18px] text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                  <div
                    className="flex items-baseline justify-between gap-8 py-6"
                    style={{ borderBottom: `1px solid ${hairline}` }}
                  >
                    <span className="font-body text-[9px] tracking-[0.35em] uppercase shrink-0" style={{ color: gold }}>
                      Deposit due today
                    </span>
                    <span className="font-display font-light text-[32px] leading-none" style={{ color: gold }}>
                      £{total}
                    </span>
                  </div>
                </div>

                <p className="mt-8 font-body text-[12px] leading-loose" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {t("reservations.depositBody")}
                </p>
                <p className="mt-3 font-body text-[11px] leading-loose" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {t("reservations.policy")}
                </p>

                <label className="flex items-start gap-4 mt-8 cursor-pointer">
                  <div
                    className="w-5 h-5 shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200"
                    style={{
                      border: `1px solid ${agreed ? gold : "rgba(255,255,255,0.25)"}`,
                      background: agreed ? gold15 : "transparent",
                    }}
                  >
                    {agreed && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={gold} strokeWidth="1.5">
                        <path d="M2 5l2 2 4-4"/>
                      </svg>
                    )}
                  </div>
                  <input type="checkbox" className="sr-only" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                  <span className="font-body text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                    I understand the deposit is non-refundable within 14 days of the reservation, and that the full menu price is payable on the day.
                  </span>
                </label>

                <div className="flex items-center justify-between mt-12">
                  <button
                    onClick={() => setStep(2)}
                    className="font-body text-[10px] tracking-[0.3em] uppercase transition-colors"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={proceedToPayment}
                    disabled={paying || !agreed}
                    className="inline-flex items-center gap-3 px-8 h-12 font-body text-[11px] tracking-[0.35em] uppercase transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      background: paying || !agreed ? "transparent" : gold,
                      color: paying || !agreed ? gold : "#0a0806",
                      border: `1px solid ${gold}`,
                    }}
                  >
                    {paying ? "Processing…" : `Pay deposit · £${total}`}
                    {!paying && <span style={{ fontSize: 15 }}>→</span>}
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 4: Confirmed ── */}
            {confirmed && step === 4 && (
              <div className="max-w-2xl animate-fade-in">
                <div className="font-script italic text-[18px] mb-3" style={{ color: gold }}>
                  {t("reservations.thanks")}
                </div>
                <h2 className="font-display font-light text-ivory text-[40px] lg:text-[60px] leading-[0.92] mb-14">
                  {t("reservations.received")}
                </h2>

                <div className="space-y-0">
                  {[
                    { label: "Reference",    value: confirmed.reference,                            highlight: true  },
                    { label: "Date",         value: formatDate(confirmed.date),                     highlight: false },
                    { label: "Guests",       value: String(confirmed.party),                        highlight: false },
                    { label: "Service",      value: t("reservations.service"),                      highlight: false },
                    { label: "Deposit paid", value: `£${DEPOSIT_PER_GUEST * confirmed.party}`,      highlight: true  },
                  ].map(({ label, value, highlight }) => (
                    <div
                      key={label}
                      className="flex items-baseline justify-between gap-8 py-5"
                      style={{ borderBottom: `1px solid ${hairline}` }}
                    >
                      <span
                        className="font-body text-[9px] tracking-[0.35em] uppercase shrink-0"
                        style={{ color: highlight ? gold : "rgba(255,255,255,0.35)" }}
                      >
                        {label}
                      </span>
                      <span
                        className="font-display font-light text-right"
                        style={{
                          color: highlight ? gold : "rgba(255,255,255,0.8)",
                          fontSize: highlight ? "22px" : "18px",
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-10 font-body text-[13px] leading-loose" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {emailStatus === "sent"    && t("reservations.receipt")}
                  {emailStatus === "sending" && `Sending receipt to ${confirmed.email}…`}
                  {emailStatus === "failed"  && "Your reservation is confirmed. The receipt email failed — please screenshot this page."}
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}