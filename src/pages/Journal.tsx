import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/Chrome";

export const POSTS = [
  {
    slug: "worlds-50-best-2024",
    category: "Awards",
    title: "World's 50 Best names Etxebarri #2 restaurant on earth",
    source: "World's 50 Best · June 2024",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    excerpt: "For the fourth year running, the small Basque caserío places at the very top of the World's 50 Best Restaurants list.",
    body: [
      "Asador Etxebarri has been named the #2 restaurant in the world by World's 50 Best, in a ceremony held in Las Vegas in June 2024. For the fourth consecutive year, Victor Arguinzoniz's caserío in the Basque mountain village of Axpe has held a place in the top three.",
      "The judges' citation called Etxebarri 'a restaurant that has rewritten the language of fire' — singling out the dishes that have become its calling cards: the milky txangurro, the smoked anchovy, the chuletón that rests longer than it cooks.",
      "Arguinzoniz, who learned to cook on a wood-burning stove as a child in the valley below, has spent thirty-five years refining the grammar of the grill. He continues to design and weld his own cooking surfaces.",
    ],
  },
  {
    slug: "ft-portrait",
    category: "Press",
    title: "The fire cook of Axpe: a portrait of Victor Arguinzoniz",
    source: "Financial Times Weekend · March 2024",
    img: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=80",
    excerpt: "The man who never trained in a Michelin kitchen now feeds the world's most celebrated chefs.",
    body: [
      "It is dawn in the Atxondo valley. Mist is still clinging to the lower flanks of Anboto, the limestone mountain that watches over the village of Axpe. In the kitchen of Asador Etxebarri, Victor Arguinzoniz is already at the grill, his face lit by a bed of holm-oak embers that he laid the night before.",
      "He is fifty-eight years old, slight, soft-spoken, and almost entirely uninterested in being interviewed. He has never worked a single day in another professional kitchen. The way he tells it, he learned to cook from his mother and his grandmother, both of whom cooked over wood until the day they died.",
      "What he does, by his own description, is very simple. He sources the best ingredient he can find from the smallest possible producer. He waits for the embers — never the flame — to reach the precise temperature the ingredient demands. He cooks it. He serves it. Nothing else.",
    ],
  },
  {
    slug: "bon-appetit-basque",
    category: "Press",
    title: "Why Basque Country became the world's dining capital",
    source: "Bon Appétit · January 2025",
    img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80",
    excerpt: "How a province the size of Connecticut quietly produced more world-class restaurants per capita than anywhere else.",
    body: [
      "Per capita, the Basque Country has more Michelin stars than any other region on earth. It also has Etxebarri — a restaurant that has, for years now, sat at or near the top of the World's 50 Best list while operating from a converted 18th-century farmhouse with only fifty seats.",
      "The reasons are old. A culture of pintxos and txikiteo trained an entire population to eat in small, intense portions. Cooperative gastronomic societies — the txokos — taught generations of Basque men to cook seriously, at home. And a deep regional pride made the local market the centre of daily life.",
      "But the reason Etxebarri became Etxebarri is one man's stubbornness. Victor Arguinzoniz refused, again and again, to do anything that wasn't fire. No sauces. No reductions. No flourishes. Just embers and patience.",
    ],
  },
  {
    slug: "letters-spring-peas",
    category: "Seasonal",
    title: "On spring peas, and waiting all winter for them",
    source: "Etxebarri Letters · April 2024",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
    excerpt: "A short note on the only dish we will not serve out of season.",
    body: [
      "Of all the ingredients that pass through this kitchen, there is one that we will not serve unless it is, on that particular morning, perfect: guisantes lágrima — the tear-shaped peas grown in only a handful of fields outside Getaria.",
      "They are picked at the moment the pod is fattest but the pea inside is still translucent, still milky. They cannot travel. They cannot wait. They are on the menu for perhaps four weeks in April, and then they are gone for a year.",
      "We serve them barely warmed, in nothing but their own juice. It is the simplest dish in the restaurant. It is the one we wait twelve months to cook.",
    ],
  },
  {
    slug: "nyt-simplest-plate",
    category: "Press",
    title: "The simplest plate in the world",
    source: "The New York Times · November 2023",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
    excerpt: "A grilled prawn. Salt. Nothing else. Why does it cost what it costs, and why is it worth it?",
    body: [
      "There is a single dish at Asador Etxebarri that costs as much, per gram, as some of the most expensive meals in the world. It is a prawn. It is served whole, on a plain white plate. It has been seasoned with salt and grilled, very briefly, over the embers of vine shoots cut from a specific stretch of Rioja Alavesa.",
      "The prawn comes from a specific bay on the Andalusian coast where the gambas are caught at night, in nets that are pulled by hand, by a fisherman the restaurant has worked with for two decades. They arrive at Axpe still alive, on ice, in the morning.",
      "It is the simplest thing on the menu. It is also, in some sense, the most expensive thing in the world to do well.",
    ],
  },
  {
    slug: "smoke-vocabulary",
    category: "Seasonal",
    title: "Cherry wood, holm oak, vine shoot: a smoke vocabulary",
    source: "Etxebarri Letters · October 2024",
    img: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=1200&q=80",
    excerpt: "Every wood we burn was chosen for the precise ingredient it will meet.",
    body: [
      "We do not burn 'wood' in any generic sense. Every species we use here was selected, painstakingly, for the precise dialogue it has with a specific ingredient.",
      "Vine shoot — the prunings of the Rioja Alavesa harvest — burns fast, hot, and aromatic. It is what we use for the red prawn, for percebes, for delicate shellfish that should taste only of themselves and the sea.",
      "Holm oak burns long and steady. It is the bed for the chuletón, for the larger cuts of meat that need eight, ten, twelve minutes of patient ember work.",
      "Cherry wood is reserved for milk: for the cuajada, for the smoked butter, for anything where the smoke must be sweet and almost imperceptible. Nothing else does what cherry does for milk.",
    ],
  },
];

export default function Journal() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>Journal — Press & Accolades | Asador Etxebarri</title>
        <meta name="description" content="Editorial features, accolades, and seasonal letters." />
      </Helmet>
      <div className="bg-void pt-32 lg:pt-40 pb-32">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <Reveal as="header" className="mb-20 max-w-3xl">
            <div className="font-body text-[10px] tracking-[0.5em] text-gold uppercase">{t("journal.kicker")}</div>
            <h1 className="mt-6 font-display font-light text-ivory text-[48px] lg:text-[88px] leading-[0.95]">
              Press, accolades<br />& <span className="italic font-script">seasonal letters</span>.
            </h1>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {POSTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link to={`/journal/${p.slug}`} className="group block transition-transform duration-500 hover:-translate-y-1">
                  <div className="relative aspect-[3/4] overflow-hidden bg-char">
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04] brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 right-4 font-body text-[10px] tracking-[0.3em] text-gold uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {t("journal.readArticle")} →
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="font-body text-[9px] tracking-[0.35em] text-gold uppercase">{p.category}</div>
                    <h2 className="mt-3 font-display font-light text-parchment text-[22px] leading-snug group-hover:text-ivory transition-colors">
                      {p.title}
                    </h2>
                    <div className="mt-3 font-body text-[10px] tracking-[0.25em] text-ash uppercase">{p.source}</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
