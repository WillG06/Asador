import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LANGS = ["en", "es", "eu", "fr"] as const;

export function Nav() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const NAV = [
    { to: "/story", label: t("nav.story") },
    { to: "/menu", label: t("nav.menu") },
    { to: "/reservations", label: t("nav.reservations") },
    { to: "/journal", label: t("nav.journal") },
    { to: "/find-us", label: t("nav.findUs") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const current = (i18n.language || "en").slice(0, 2);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl bg-void/90 border-b border-stone/40" : ""
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="leading-none">
            <div className="font-display font-light text-[28px] text-parchment tracking-wide">
              etxebarri
            </div>
            <div className="font-body text-[9px] tracking-[0.4em] text-ash uppercase mt-1">
              Erretegia · Asador
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `link-underline font-body font-extralight text-[11px] tracking-[0.25em] uppercase transition-colors ${isActive ? "text-ivory" : "text-smoke hover:text-ivory"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <div className="ml-6 flex items-center gap-2 font-body text-[10px] tracking-[0.25em] uppercase">
              {LANGS.map((l, idx) => (
                <button
                  key={l}
                  onClick={() => i18n.changeLanguage(l)}
                  className={`transition-colors ${current === l ? "text-gold" : "text-ash hover:text-parchment"}`}
                >
                  {l}
                  {idx < LANGS.length - 1 && <span className="text-stone ml-2">·</span>}
                </button>
              ))}
            </div>
          </nav>

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden relative w-8 h-6 flex flex-col justify-center gap-1.5"
          >
            <span className={`block h-px bg-parchment transition-transform duration-300 ${open ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`block h-px bg-parchment transition-transform duration-300 ${open ? "-translate-y-0.5 -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-void transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gold/40" />
        <nav className="relative h-full flex flex-col justify-center pl-14 gap-6">
          {NAV.map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="font-display font-light text-[44px] text-parchment tracking-wide"
              style={{
                transform: open ? "translateY(0)" : "translateY(20px)",
                opacity: open ? 1 : 0,
                transition: `transform 500ms ease ${i * 60}ms, opacity 500ms ease ${i * 60}ms`,
              }}
            >
              {n.label}
            </Link>
          ))}
          <div className="flex gap-4 mt-10 font-body text-[11px] tracking-[0.3em] uppercase">
            {LANGS.map((l) => (
              <button key={l} onClick={() => i18n.changeLanguage(l)} className={current === l ? "text-gold" : "text-ash"}>
                {l}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
