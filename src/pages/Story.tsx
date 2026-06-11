import { Helmet } from "react-helmet-async";
import chef from "@/assets/chef.jpg";
import exterior from "@/assets/exterior.jpg";
import interior from "@/assets/interior.jpg";
import { Reveal } from "@/components/Chrome";

export default function Story() {
  return (
    <>
      <Helmet>
        <title>Our Story — Victor Arguinzoniz | Asador Etxebarri</title>
        <meta name="description" content="Forty years of mastery over wood and flame in the Basque mountains." />
      </Helmet>
      <div className="bg-void">
        {/* Intro */}
        <section className="pt-32 lg:pt-40 mx-auto max-w-[1440px] px-6 lg:px-10 pb-16 lg:pb-24">
          <Reveal>
            <div className="font-body text-[10px] tracking-[0.5em] text-gold uppercase">Our Story</div>
            <h1 className="mt-6 font-display font-light text-parchment text-[48px] lg:text-[96px] leading-[0.95] max-w-4xl">
              A farmhouse,<br />
              <span className="italic font-script text-smoke">a forest</span>,<br />
              and a lifetime of fire.
            </h1>
          </Reveal>
        </section>

        {/* Chef image */}
        <section className="relative h-[85vh] flex items-end overflow-hidden">
          <img src={chef} alt="Victor Arguinzoniz" className="absolute inset-0 w-full h-full object-cover object-[center_20%]" loading="lazy" />
          <div className="absolute top-0 inset-x-0 h-24 lg:h-32 bg-gradient-to-b from-void to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-void/0 via-void/15 to-void" />
          <Reveal className="relative px-6 lg:px-10 pb-12 lg:pb-16 max-w-2xl">
            <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">The Man</div>
            <h2 className="font-display font-light text-parchment text-[36px] lg:text-[48px] mt-4 leading-tight">Victor Arguinzoniz</h2>
            <p className="font-script italic text-smoke text-[18px] mt-2">Chef. Forager. Pyromancer.</p>
          </Reveal>
        </section>

        {/* Chef bio */}
        <section className="bg-void px-6 lg:px-10 pb-24 lg:pb-32">
          <Reveal className="max-w-2xl">
            <div className="w-10 h-px bg-gold mb-10" />
            <div className="space-y-6 font-body text-[15px] text-smoke leading-loose">
              <p>Born in the valley below the restaurant, Victor grew up cooking on a wood-burning stove. There was no electricity in his childhood home until he was twelve. Fire was the first language he learned.</p>
              <p>He never trained in a Michelin kitchen. He restored a derelict caserío in 1990 and began the slow, obsessive work of learning what each wood does to each ingredient — and what restraint sounds like.</p>
            </div>
          </Reveal>
        </section>

        {/* Method image — quote only */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=2000&q=80" alt="Hands turning meat on a custom grill grate" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-void/15" />
          <div className="absolute top-0 inset-x-0 h-24 lg:h-32 bg-gradient-to-b from-void to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-32 lg:h-44 bg-gradient-to-t from-char to-transparent" />
          <Reveal className="relative text-center px-6">
            <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">The Method</div>
            <h2 className="font-display italic font-light text-parchment text-[34px] lg:text-[44px] mt-6 leading-tight max-w-3xl mx-auto drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
              "Different woods speak different languages.<br />My job is only to listen."
            </h2>
          </Reveal>
        </section>

        {/* Method body + Place — single char panel, editorial 2-col grid */}
        <section className="bg-char px-6 lg:px-10 py-20 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <Reveal className="lg:grid lg:grid-cols-[1fr_2fr] lg:gap-12 xl:gap-16">
              <div className="hidden lg:block">
                <div className="w-10 h-px bg-gold" />
              </div>
              <div className="space-y-6 font-body text-[15px] text-smoke leading-loose max-w-2xl">
                <div className="w-10 h-px bg-gold mb-10 lg:hidden" />
                <p>Victor designed almost every cooking surface in the kitchen himself — custom grills with crank-operated heights, woven steel baskets for shellfish, perforated pans that capture the milk and tears of caviar.</p>
                <p>Heat is controlled in millimetres. A red prawn might be turned twice in eleven seconds. A chuletón rests longer than it cooks. Nothing is sauced. Nothing is hidden.</p>
              </div>
            </Reveal>

            <Reveal className="lg:grid lg:grid-cols-[1fr_2fr] lg:gap-12 xl:gap-16 mt-24 lg:mt-32">
              <div>
                <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">The Place</div>
                <h2 className="font-display font-light text-parchment text-[36px] lg:text-[44px] mt-4 leading-tight">Axpe-Marzana</h2>
                <p className="font-script italic text-smoke text-[18px] mt-2">A village of forty houses. One restaurant.</p>
                <div className="w-10 h-px bg-gold mt-10" />
              </div>
              <div className="mt-10 lg:mt-0">
                <div className="relative aspect-[4/3] lg:aspect-[16/10] mb-10">
                  <img src={exterior} alt="The restaurant exterior in Axpe" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="space-y-6 font-body text-[15px] text-smoke leading-loose max-w-2xl">
                  <p>The valley of Atxondo sits in the shadow of the Anboto massif. The air is wet, mossy, and impossibly green. Limestone peaks loom over slate-roofed barns where animals have grazed for a thousand years.</p>
                  <p>The restaurant occupies a 1700s farmhouse on the village square, beside the church. Its walls hold the scent of forty years of cherry smoke and oak ember.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Closing — interior image */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <img src={interior} alt="Dining room" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-void/25" />
          <div className="absolute top-0 inset-x-0 h-32 lg:h-40 bg-gradient-to-b from-char to-transparent" />
          <Reveal className="relative px-6">
            <p className="font-display italic font-light text-ivory text-[28px] lg:text-[44px] max-w-3xl text-center leading-tight text-shadow-lux">
              "It is not a performance. It is a place to eat very quietly, very well, with people you love."
            </p>
          </Reveal>
        </section>
      </div>
    </>
  );
}