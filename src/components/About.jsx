import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 30, suffix: "+", label: "Brands Built" },
  { value: 4, suffix: "+", label: "Years in Practice" },
  { value: 5, suffix: "+", label: "Countries Reached" },
  { value: 100, suffix: "%", label: "Independently Owned" },
];

const QUOTE_LINES = ["Built for the", "world."];

const About = () => {
  const sectionRef = useRef(null);
  const quoteLines = useRef([]);
  const bioRef = useRef(null);
  const statsContainerRef = useRef(null);
  const counterRefs = useRef([]);

  const addLine = (i) => (el) => {
    quoteLines.current[i] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });

      gsap.set(quoteLines.current, { y: 60, opacity: 0 });
      gsap.set(bioRef.current, { y: 36, opacity: 0 });

      tl.to(quoteLines.current, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.08,
        ease: "power4.out",
      }).to(
        bioRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.7",
      );

      // Fast rolling counters for stats
      STATS.forEach((stat, i) => {
        const el = counterRefs.current[i];
        if (!el) return;
        const counter = { val: 0 };

        gsap.to(counter, {
          val: stat.value,
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsContainerRef.current,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.innerText = `${Math.round(counter.val)}${stat.suffix}`;
          },
        });
      });

      // Subtle stagger entrance for stat boxes
      gsap.fromTo(
        ".stat-box",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsContainerRef.current,
            start: "top 85%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-paper py-[clamp(72px,10vw,140px)] px-6 md:px-11 border-t border-line font-body"
    >
      {/* ── annotation ── */}
      <span className="label text-slate text-[11px] block mb-[clamp(48px,6vw,80px)]">
        § THE STUDIO
      </span>

      {/* ── 2-col layout ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(48px,6vw,96px)] items-start">
        {/* left: pull-quote */}
        <div>
          {QUOTE_LINES.map((line, i) => (
            <div key={i} className="clip-reveal">
              <h2
                ref={addLine(i)}
                className="display text-ink text-[clamp(38px,5.5vw,80px)] leading-[0.93] m-0"
              >
                {line}
              </h2>
            </div>
          ))}

          {/* attribution hairline */}
          <div className="flex items-center gap-4 mt-10">
            <div className="w-6 h-px bg-line" />
            <span className="label text-slate text-[11px]">
              DEEZAINA STUDIOS · EST. MMXXIV
            </span>
          </div>
        </div>

        {/* right: bio + stats */}
        <div ref={bioRef} className="pt-1.5">
          <p className="text-ink text-base md:text-lg leading-relaxed font-normal m-0 mb-5">
            Deezaina Studios is an independent brand studio founded in Nigeria.
            We work with founders, businesses, and organizations who want brands
            that are both beautiful and strategically sound.
          </p>
          <p className="text-slate text-btn leading-relaxed font-normal m-0 mb-12">
            We believe the best brand work comes from genuine understanding of
            people, markets, and what makes a business truly worth choosing.
            Small by design. Deeply collaborative. Relentlessly intentional.
          </p>

          {/* stats grid with fast counters */}
          <div
            ref={statsContainerRef}
            className="grid grid-cols-2 gap-x-10 gap-y-8 border-t border-line pt-10"
          >
            {STATS.map(({ suffix, label }, i) => (
              <div key={label} className="stat-box">
                <div className="display text-ink text-[clamp(32px,4vw,56px)] leading-none tracking-tight">
                  <span ref={(el) => (counterRefs.current[i] = el)}>
                    0{suffix}
                  </span>
                </div>
                <div className="label text-slate text-[11px] mt-1.5">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
