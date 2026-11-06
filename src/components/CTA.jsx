import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Crop mark: Ink colour for use on red background */
const CtaCropMark = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={`absolute w-4 h-4 pointer-events-none opacity-35 ${className}`}
  >
    <div className="absolute top-1/2 left-0 right-0 h-px bg-ink -translate-y-1/2" />
    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-ink -translate-x-1/2" />
  </div>
);

const CTA = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const ctaRowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });

      gsap.set([headlineRef.current, ctaRowRef.current], { y: 56, opacity: 0 });

      tl.to(headlineRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power4.out",
      }).to(
        ctaRowRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.6",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-signal-red py-[clamp(72px,10vw,140px)] px-6 md:px-11 relative overflow-hidden font-body"
    >
      {/* ── crop marks (Ink) ── */}
      <CtaCropMark className="top-6 left-6" />
      <CtaCropMark className="top-6 right-6" />
      <CtaCropMark className="bottom-6 left-6" />
      <CtaCropMark className="bottom-6 right-6" />

      {/* ── annotation ── */}
      <span className="label text-ink/55 block mb-[clamp(40px,5vw,64px)] text-[11px]">
        § START A PROJECT
      </span>

      {/* ── headline ── */}
      <div ref={headlineRef} className="max-w-[90%] mb-[clamp(48px,6vw,80px)]">
        <h2 className="display text-ink text-[clamp(44px,8vw,115px)] leading-[0.92] m-0">
          Let's make something hard to ignore.
        </h2>
      </div>

      {/* ── CTA row ── */}
      <div ref={ctaRowRef} className="flex items-center gap-8 flex-wrap">
        {/* primary button: Ink fill, Paper text */}
        <a
          href="mailto:hello@deezaina.com"
          className="inline-flex items-center gap-2.5 bg-ink text-paper px-9 py-4 text-sm font-semibold tracking-[0.06em] no-underline uppercase font-body hover:opacity-85 transition-opacity"
        >
          Book a Discovery Call
          <span className="text-base">→</span>
        </a>

        {/* secondary: email link */}
        <a
          href="mailto:hello@deezaina.com"
          className="text-ink text-btn font-medium no-underline font-body border-b border-ink/35 pb-0.5 hover:border-ink transition-colors"
        >
          hello@deezaina.com
        </a>
      </div>

      {/* ── ghost large type watermark ── */}
      <div
        aria-hidden="true"
        className="absolute -bottom-5 -right-2.5 pointer-events-none select-none overflow-hidden"
      >
        <span className="display text-[clamp(80px,14vw,200px)] leading-[0.85] text-ink/8 whitespace-nowrap block">
          DEE
        </span>
      </div>
    </section>
  );
};

export default CTA;
