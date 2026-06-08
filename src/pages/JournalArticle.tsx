import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Reveal } from "@/components/Chrome";
import { POSTS } from "./Journal";

export default function JournalArticle() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="bg-void pt-40 pb-32 min-h-screen text-center px-6">
        <div className="font-display font-light text-parchment text-[32px]">Article not found.</div>
        <Link to="/journal" className="inline-block mt-8 font-body text-[11px] tracking-[0.3em] uppercase text-gold link-underline">
          ← Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} — Asador Etxebarri</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <article className="bg-void">
        {/* Hero image */}
        <div className="relative h-[60vh] lg:h-[80vh] overflow-hidden">
          <img src={post.img} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/20 to-void" />
        </div>

        <div className="mx-auto max-w-3xl px-6 lg:px-10 -mt-32 lg:-mt-40 relative z-10 pb-32">
          <Reveal>
            <div className="font-body text-[10px] tracking-[0.4em] text-gold uppercase">{post.category}</div>
            <h1 className="mt-4 font-display font-light text-ivory text-[36px] lg:text-[64px] leading-[1.05]">
              {post.title}
            </h1>
            <div className="mt-6 font-body text-[10px] tracking-[0.3em] text-ash uppercase">{post.source}</div>
            <div className="w-12 h-px bg-gold mt-10" />
          </Reveal>

          <div className="mt-12 space-y-8">
            {post.body.map((para, i) => (
              <Reveal key={i} delay={i * 100}>
                <p className="font-body text-parchment text-[17px] lg:text-[18px] leading-[1.85] tracking-wide">
                  {i === 0 && <span className="font-display font-light text-gold text-[60px] float-left mr-3 leading-[0.85] mt-1">{para[0]}</span>}
                  {i === 0 ? para.slice(1) : para}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-stone/40">
            <Link to="/journal" className="font-body text-[11px] tracking-[0.3em] uppercase text-gold link-underline">
              ← All articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
