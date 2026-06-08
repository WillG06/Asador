export function AwardsMarquee() {
  const awards = [
    "World's 50 Best · #2",
    "Michelin ★",
    "Sol Repsol ★★",
    "Top 100 — La Liste",
    "Best Chef Award",
    "Chefs' Choice · World's 50 Best",
  ];
  const items = [...awards, ...awards];
  return (
    <div className="bg-char border-y border-stone/40 overflow-hidden py-6">
      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {items.map((a, i) => (
          <span key={i} className="font-body text-[11px] tracking-[0.35em] text-ash uppercase">
            <span className="text-gold mr-4">✦</span>
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}
