import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="bg-void min-h-screen flex items-center justify-center pt-32 pb-20 px-6">
      <div className="text-center">
        <div className="font-display font-light text-gold text-[120px] leading-none">404</div>
        <div className="font-script italic text-smoke text-[20px] mt-4">A path that leads nowhere.</div>
        <Link to="/" className="reserve-cta mt-12 inline-flex">
          <span className="reserve-cta-bg" />
          <span className="reserve-cta-label">Return home</span>
          <span className="reserve-cta-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}
