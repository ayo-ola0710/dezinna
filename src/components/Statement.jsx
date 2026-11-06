import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Text 1: The Hero content to be typed out by the red dot cursor */
const HERO_CONTENT =
  "DEEZAINA STUDIOS is an independent brand strategy, visual identity and digital studio. We craft sharp, enduring brands for ambitious teams worldwide.";

/* Text 2: The Studio Manifesto words */
const WORDS = [
  "We",
  "work",
  "at",
  "the",
  "intersection",
  "of",
  "strategy",
  "and",
  "craft.",
  "We",
  "don't",
  "start",
  "with",
  "aesthetics",
  "we",
  "start",
  "with",
  "questions.",
  "Who",
  "are",
  "you?",
  "Who",
  "are",
  "you",
  "for?",
  "Why",
  "should",
  "anyone",
  "choose",
  "you?",
  "The",
  "design",
  "follows.",
  "The",
  "brand",
  "lasts.",
];

const Statement = () => {
  const sectionRef = useRef(null);
  const stage1Ref = useRef(null);
  const stage2Ref = useRef(null);
  const typeTextRef = useRef(null);
  const cursorRef = useRef(null);
  const tagRef = useRef(null);
  const subTagRef = useRef(null);
  const stepIndicatorRef = useRef(null);
  const wordRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const typeObj = { count: 0 };

      // Helper function to render typewriter text with styling
      const renderTypewriter = (charCount) => {
        if (!typeTextRef.current) return;
        const count = Math.min(
          HERO_CONTENT.length,
          Math.max(0, Math.round(charCount)),
        );
        const currentStr = HERO_CONTENT.slice(0, count);

        if (count === 0) {
          typeTextRef.current.innerHTML = "";
        } else if (count <= 16) {
          typeTextRef.current.innerHTML = `<span class="text-signal-red font-extrabold tracking-tight">${currentStr}</span>`;
        } else {
          typeTextRef.current.innerHTML = `<span class="text-signal-red font-extrabold tracking-tight">DEEZAINA STUDIOS</span> <span class="text-ink/85 font-medium">${currentStr.slice(17)}</span>`;
        }
      };

      // Master pinned timeline with generous scroll height & smooth damping for deliberate pacing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=460%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // 1. Initial State
      renderTypewriter(0);
      gsap.set(wordRefs.current, { opacity: 0.14, y: 14 });

      // ACT 1: Typewriter writes out HERO_CONTENT at a measured, deliberate pace
      tl.to(typeObj, {
        count: HERO_CONTENT.length,
        duration: 48,
        ease: "none",
        onUpdate: () => renderTypewriter(typeObj.count),
      });

      // Generous reading pause so the user can comfortably read the full typed text
      tl.to({}, { duration: 14 });

      // ACT 2: On scroll, that clears (typewriter deletes/backspaces back smoothly)
      tl.to(typeObj, {
        count: 0,
        duration: 22,
        ease: "none",
        onUpdate: () => renderTypewriter(typeObj.count),
      });

      // ACT 3: Transition Stage 1 out, Stage 2 (Manifesto) in
      tl.to(
        stage1Ref.current,
        {
          opacity: 0,
          scale: 0.98,
          duration: 5,
          ease: "power2.inOut",
        },
        84,
      );

      tl.to(
        stage2Ref.current,
        {
          opacity: 1,
          scale: 1,
          duration: 5,
          ease: "power2.inOut",
          onStart: () => {
            if (stage2Ref.current)
              stage2Ref.current.style.pointerEvents = "auto";
            if (tagRef.current) tagRef.current.innerText = "§ STUDIO MANIFESTO";
            if (subTagRef.current)
              subTagRef.current.innerText = "CORE PHILOSOPHY";
            if (stepIndicatorRef.current)
              stepIndicatorRef.current.innerText = "01 / 01";
          },
          onReverseComplete: () => {
            if (stage2Ref.current)
              stage2Ref.current.style.pointerEvents = "none";
            if (tagRef.current)
              tagRef.current.innerText = "§ STUDIO POSITIONING";
            if (subTagRef.current) subTagRef.current.innerText = "WHO WE ARE";
            if (stepIndicatorRef.current)
              stepIndicatorRef.current.innerText = "01 / 02";
          },
        },
        86,
      );

      // ACT 4: Reveal the other text in that section (word-by-word scrub) at comfortable pacing
      tl.to(
        wordRefs.current,
        {
          opacity: 1,
          y: 0,
          stagger: 0.8,
          duration: 36,
          ease: "power1.out",
        },
        91,
      );

      // Brief hold before unpinning to Services
      tl.to({}, { duration: 8 }, 127);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-paper min-h-screen h-dvh px-6 md:px-14 border-t border-line relative font-body overflow-hidden flex flex-col justify-between py-8 md:py-12 select-none"
    >
      {/* ── Top annotation rule ── */}
      <div className="flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <span
            ref={tagRef}
            className="label text-slate text-[11px] tracking-[0.14em]"
          >
            § STUDIO POSITIONING
          </span>
          <span className="text-line text-xs">/</span>
          <span
            ref={subTagRef}
            className="label text-ink text-[11px] font-semibold"
          >
            WHO WE ARE
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block w-24 h-px bg-line" />
          <span ref={stepIndicatorRef} className="label text-slate text-[11px]">
            01 / 02
          </span>
        </div>
      </div>

      {/* ── Center Stage Container ── */}
      <div className="relative w-full max-w-285 mx-auto my-auto flex items-center justify-center min-h-65">
        {/* Stage 1: The Red Dot Typewriter Stage */}
        <div
          ref={stage1Ref}
          className="w-full absolute inset-0 flex items-center will-change-[transform,opacity]"
        >
          <p className="font-display font-bold text-[clamp(24px,3.8vw,52px)] leading-[1.24] tracking-tight m-0 select-none">
            <span ref={typeTextRef}></span>
            <span
              ref={cursorRef}
              aria-hidden="true"
              className="inline-block text-signal-red ml-1.5 align-baseline text-[0.82em] leading-none animate-pulse"
            >
              ●
            </span>
          </p>
        </div>

        {/* Stage 2: The Manifesto Stage (The Other Text in That Section) */}
        <div
          ref={stage2Ref}
          className="w-full absolute inset-0 flex items-center opacity-0 pointer-events-none will-change-[transform,opacity]"
        >
          <p className="font-display font-bold text-[clamp(28px,4.3vw,64px)] leading-[1.18] tracking-tight text-ink m-0 flex flex-wrap gap-x-[0.28em] gap-y-[0.1em] select-none">
            {WORDS.map((word, i) => {
              const isLast = i === WORDS.length - 1;
              const isEmphasized =
                word === "questions." ||
                word === "choose" ||
                word === "strategy" ||
                word === "craft.";

              return (
                <span
                  key={i}
                  ref={(el) => (wordRefs.current[i] = el)}
                  className={`inline-block select-none will-change-[transform,opacity] ${
                    isEmphasized ? "text-ink" : "text-ink"
                  }`}
                >
                  {word}
                  {isLast && (
                    <span
                      aria-hidden="true"
                      className="inline-block text-signal-red ml-[0.12em] text-[0.8em] leading-none"
                    >
                      ●
                    </span>
                  )}
                </span>
              );
            })}
          </p>
        </div>
      </div>

      {/* ── Bottom hairline attribution row ── */}
      <div className="flex items-center justify-between pt-6 border-t border-line shrink-0">
        <span className="label text-slate text-[11px] tracking-wider">
          DEEZAINA STUDIOS · WORKING WORLDWIDE
        </span>
        <span
          aria-hidden="true"
          className="text-line text-base font-body leading-none"
        >
          ⊕
        </span>
      </div>
    </section>
  );
};

export default Statement;
