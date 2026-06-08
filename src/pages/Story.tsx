import { Helmet } from "react-helmet-async";
import chef from "@/assets/chef.asset.json";
import exterior from "@/assets/exterior.asset.json";
import interior from "@/assets/interior.asset.json";
import { Reveal } from "@/components/Chrome";

export default function Story() {
  return (
    <>
      <Helmet>
        <title>Our Story — Victor Arguinzoniz | Asador Etxebarri</title>
        <meta name="description" content="Forty years of mastery over wood and flame in the Basque mountains." />
      </Helmet>
      <div className="pt-32 lg:pt-40 bg-void">
        <section className="mx-auto max-w-[1440px] px-6 lg:px-10 pb-24 lg:pb-32">
          <Reveal>
            <div className="font-body text-[10px] tracking-[0.5em] text-gold uppercase">Our Story</div>
            <h1 className="mt-6 font-display font-light text-parchment text-[48px] lg:text-[96px] leading-[0.95] max-w-4xl">
              A farmhouse,<br />
              <span className="italic font-script text-smoke">a forest</span>,<br />
              and a lifetime of fire.
            </h1>
          </Reveal>
        </section>

        <section className="grid lg:grid-cols-2 gap-0 border-y border-stone/40">
          <div className="relative aspect-[4/5] lg:aspect-auto min-h-[500px]">
            <img src={chef.url} alt="Victor Arguinzoniz" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          </div>
          <Reveal className="bg-char px-8 lg:px-20 py-20 lg:py-32 flex flex-col justify-center">
            <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">The Man</div>
            <h2 className="font-display font-light text-parchment text-[36px] lg:text-[48px] mt-6 leading-tight">Victor Arguinzoniz</h2>
            <p className="font-script italic text-smoke text-[18px] mt-4">Chef. Forager. Pyromancer.</p>
            <div className="w-10 h-px bg-gold mt-10" />
            <div className="mt-8 space-y-6 font-body text-[15px] text-smoke leading-loose max-w-md">
              <p>Born in the valley below the restaurant, Victor grew up cooking on a wood-burning stove. There was no electricity in his childhood home until he was twelve. Fire was the first language he learned.</p>
              <p>He never trained in a Michelin kitchen. He restored a derelict caserío in 1990 and began the slow, obsessive work of learning what each wood does to each ingredient — and what restraint sounds like.</p>
            </div>
          </Reveal>
        </section>

        <section className="py-24 lg:py-40 bg-void">
          <div className="relative h-[60vh] lg:h-[80vh] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=2000&q=80" alt="Hands turning meat on a custom grill grate" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-b from-void/30 to-void/80" />
          </div>
          <Reveal className="mx-auto max-w-3xl px-6 lg:px-10 mt-20 text-center">
            <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">The Method</div>
            <h2 className="font-display italic font-light text-parchment text-[34px] lg:text-[44px] mt-6 leading-tight">
              "Different woods speak different languages.<br />My job is only to listen."
            </h2>
            <div className="mt-12 space-y-6 font-body text-[15px] text-smoke leading-loose text-left">
              <p>Victor designed almost every cooking surface in the kitchen himself — custom grills with crank-operated heights, woven steel baskets for shellfish, perforated pans that capture the milk and tears of caviar.</p>
              <p>Heat is controlled in millimetres. A red prawn might be turned twice in eleven seconds. A chuletón rests longer than it cooks. Nothing is sauced. Nothing is hidden.</p>
            </div>
          </Reveal>
        </section>

        <section className="grid lg:grid-cols-2 gap-0 border-t border-stone/40">
          <Reveal className="bg-char px-8 lg:px-20 py-20 lg:py-32 flex flex-col justify-center order-2 lg:order-1">
            <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">The Place</div>
            <h2 className="font-display font-light text-parchment text-[36px] lg:text-[48px] mt-6 leading-tight">Axpe-Marzana</h2>
            <p className="font-script italic text-smoke text-[18px] mt-4">A village of forty houses. One restaurant.</p>
            <div className="w-10 h-px bg-gold mt-10" />
            <div className="mt-8 space-y-6 font-body text-[15px] text-smoke leading-loose max-w-md">
              <p>The valley of Atxondo sits in the shadow of the Anboto massif. The air is wet, mossy, and impossibly green. Limestone peaks loom over slate-roofed barns where animals have grazed for a thousand years.</p>
              <p>The restaurant occupies a 1700s farmhouse on the village square, beside the church. Its walls hold the scent of forty years of cherry smoke and oak ember.</p>
            </div>
          </Reveal>
          <div className="relative aspect-[4/5] lg:aspect-auto min-h-[500px] order-1 lg:order-2">
            <img src={exterior.url} alt="The restaurant exterior in Axpe" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          </div>
        </section>

        <section className="relative h-[60vh] lg:h-[80vh] overflow-hidden">
          <img src={interior.url} alt="Dining room" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-void/40" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <p className="font-display italic font-light text-ivory text-[28px] lg:text-[44px] max-w-3xl text-center leading-tight text-shadow-lux">
              "It is not a performance. It is a place to eat very well, very quietly, with people you love."
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
