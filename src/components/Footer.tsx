import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-void border-t border-stone/60 relative">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-20 grid gap-12 md:grid-cols-3">
        <div>
          <div className="font-display font-light text-[32px] text-parchment">etxebarri</div>
          <div className="font-body text-[9px] tracking-[0.4em] text-ash uppercase mt-1">
            Erretegia · Asador
          </div>
          <p className="font-script italic text-smoke text-[15px] mt-6 max-w-xs leading-relaxed">
            {t("footer.tagline")}
          </p>
          <div className="flex gap-5 mt-8">
            <a aria-label="Instagram" href="https://www.instagram.com/asadoretxebarri/" target="_blank" rel="noreferrer" className="text-ash hover:text-gold transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <div className="font-body text-[10px] tracking-[0.3em] text-gold uppercase mb-6">{t("footer.navigate")}</div>
          <ul className="space-y-3 font-body text-[12px] text-ash tracking-wider">
            <li><Link to="/" className="hover:text-parchment">Home</Link></li>
            <li><Link to="/story" className="hover:text-parchment">{t("nav.story")}</Link></li>
            <li><Link to="/menu" className="hover:text-parchment">{t("nav.menu")}</Link></li>
            <li><Link to="/reservations" className="hover:text-parchment">{t("nav.reservations")}</Link></li>
            <li><Link to="/journal" className="hover:text-parchment">{t("nav.journal")}</Link></li>
            <li><Link to="/find-us" className="hover:text-parchment">{t("nav.findUs")}</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-body text-[10px] tracking-[0.3em] text-gold uppercase mb-6">{t("footer.visit")}</div>
          <address className="not-italic font-body text-[12px] text-ash leading-loose tracking-wider">
            San Juan Plaza, 1<br />
            Axpe-Marzana, Bizkaia<br />
            48291 Spain<br />
            <br />
            +34 946 583 042<br />
            reserve@asadoretxebarri.com
          </address>
        </div>
      </div>

      <div className="border-t border-stone/60">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between gap-3 font-body text-[10px] tracking-[0.3em] text-ash uppercase">
          <div>{t("footer.rights")}</div>
          <div>{t("footer.designed")}</div>
        </div>
      </div>
    </footer>
  );
}
