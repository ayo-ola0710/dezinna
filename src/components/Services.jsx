import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: "01",
    total: "03",
    tagline: "FOUNDATION & POSITIONING",
    name: "BRAND STRATEGY",
    quote: "“Know what you stand for. Know who it matters to.”",
    desc: "We conduct rigorous stakeholder excavations, market reality checks, and category segmentation to crystallize your core positioning. We don't write 200-page shelf-ware decks; we deliver sharp, actionable strategic playbooks.",
    badges: [
      "BRAND DISCOVERY & AUDIT",
      "COMPETITOR MATRIX",
      "CORE VALUE PROPOSITION",
      "VERBAL IDENTITY & VOICE",
      "NAMING ARCHITECTURE",
      "CREATIVE ROADMAP",
    ],
  },
  {
    num: "02",
    total: "03",
    tagline: "VISUAL SYSTEMS & CRAFT",
    name: "BRAND IDENTITY",
    quote: "“Look like yourself. Only sharper.”",
    desc: "Typographic hierarchies, graphic marks, material guidelines, and visual language systems built to work across billboards, packaging, investor documents, and high-density screens.",
    badges: [
      "LOGO SYSTEM ARCHITECTURE",
      "TYPOGRAPHIC HIERARCHY",
      "EDITORIAL ART DIRECTION",
      "BRAND GUIDELINE MANUALS",
      "PACKAGING & PRINT EPHEMERA",
      "LAUNCH CAMPAIGN ASSETS",
    ],
  },
  {
    num: "03",
    total: "03",
    tagline: "DIGITAL EXPERIENCES & WEB",
    name: "WEB DESIGN",
    quote: "“Built to perform. Designed to endure.”",
    desc: "Editorial, conversion-driven websites engineered with meticulous interaction design. From architecture to production code, every pixel, transition, and micro-interaction is tuned for maximum impact.",
    badges: [
      "INTERACTION DESIGN",
      "EDITORIAL WEB LAYOUTS",
      "GSAP & MOTION SYSTEMS",
      "FULL-STACK ARCHITECTURE",
      "HEADLESS CMS INTEGRATION",
      "PERFORMANCE & ACCESSIBILITY",
    ],
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row) => {
        if (!row) return;

        const line = row.querySelector(".svc-line");
        const num = row.querySelector(".svc-num");
        const titleBlock = row.querySelector(".svc-title-block");
        const contentBlock = row.querySelector(".svc-content-block");
        const badges = row.querySelectorAll(".svc-badge");

        // 1. Line draw animation
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: "left" },
            {
              scaleX: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
              },
            },
          );
        }

        // 2. Parallax drift on the big number as user scrolls past
        if (num) {
          gsap.fromTo(
            num,
            { y: 35, opacity: 0 },
            {
              y: -15,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                end: "bottom 30%",
                scrub: 1.2,
              },
            },
          );
        }

        // 3. Staggered reveal of titles and content
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
          },
        });

        tl.fromTo(
          titleBlock,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        )
          .fromTo(
            contentBlock,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.5",
          )
          .fromTo(
            badges,
            { y: 12, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.45,
              stagger: 0.04,
              ease: "back.out(1.5)",
            },
            "-=0.4",
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-paper py-[clamp(80px,12vh,150px)] px-6 md:px-14 border-t border-line font-body relative overflow-hidden"
    >
      {/* ── Section header ── */}
      <div className="flex items-center justify-between gap-4 mb-[clamp(48px,8vh,80px)]">
        <div className="flex items-center gap-3">
          <span className="label text-slate text-[11px] tracking-[0.14em]">
            § WHAT WE DO
          </span>
          <span className="text-line text-xs">/</span>
          <span className="label text-ink text-[11px] font-semibold">
            CAPABILITIES & DELIVERABLES
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block w-24 h-px bg-line" />
          <a
            href="mailto:hello@deezaina.com"
            className="label text-deep-red text-[11px] no-underline hover:underline font-semibold"
          >
            REQUEST A PROPOSAL ↗
          </a>
        </div>
      </div>

      {/* ── Stacked Editorial Service Rows ── */}
      <div className="space-y-0">
        {SERVICES.map((s, i) => (
          <div
            key={s.num}
            ref={(el) => (rowsRef.current[i] = el)}
            data-cursor="view"
            data-cursor-label="SCOPE"
            className="group relative -mx-6 md:-mx-14 px-6 md:px-14 pt-12 pb-16 md:py-20 transition-colors duration-300 overflow-hidden cursor-pointer"
          >
            {/* Animated hairline rule */}
            <div className="svc-line absolute top-0 left-6 md:left-14 right-6 md:right-14 h-px bg-line group-hover:bg-signal-red/30 transition-colors duration-300 z-20" />

            {/* Very light red background fill that wipes in from left to right on hover */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-signal-red/8 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-0"
            />

            {/* 3-column structured grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[140px_1.1fr_1.3fr] gap-8 lg:gap-14 items-start">
              {/* Left Column: Monumental Number */}
              <div className="flex items-baseline gap-2 select-none">
                <span className="svc-num font-display font-extrabold text-[clamp(56px,6vw,96px)] leading-none text-ink tracking-tight inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                  {s.num}
                </span>
                <span className="label text-slate group-hover:text-ink/60 text-xs font-semibold tracking-wider transition-colors duration-300">
                  / {s.total}
                </span>
              </div>

              {/* Middle Column: Tagline + Title + Editorial Quote */}
              <div className="svc-title-block space-y-3">
                <span className="label text-deep-red group-hover:text-signal-red text-[11px] font-bold tracking-[0.14em] block transition-colors duration-300">
                  {s.tagline}
                </span>
                <div className="flex items-center gap-3">
                  <h3 className="font-display font-extrabold text-ink text-[clamp(32px,3.6vw,52px)] leading-[0.96] tracking-tight m-0 uppercase">
                    {s.name}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-signal-red text-2xl font-bold inline-block"
                  >
                    ↗
                  </span>
                </div>
                <p className="font-body italic text-slate group-hover:text-ink/85 text-sm md:text-base leading-snug pt-1 m-0 transition-colors duration-300">
                  {s.quote}
                </p>
              </div>

              {/* Right Column: Paragraph + Deliverables Pill Badges */}
              <div className="svc-content-block space-y-6 lg:pt-1">
                <p className="text-slate group-hover:text-ink/90 text-btn leading-relaxed font-normal m-0 max-w-155 transition-colors duration-300">
                  {s.desc}
                </p>

                {/* Badge tags with magnetic micro-interactions */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {s.badges.map((badge) => (
                    <span
                      key={badge}
                      className="svc-badge inline-block px-3 py-1.5 rounded-xs border border-line group-hover:border-signal-red/25 bg-white/70 group-hover:bg-white text-ink font-body text-[10px] font-semibold tracking-[0.08em] uppercase select-none transition-all duration-200 hover:border-ink! hover:bg-ink! hover:text-paper! hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom boundary line for the last item */}
            {i === SERVICES.length - 1 && (
              <div className="absolute bottom-0 left-6 md:left-14 right-6 md:right-14 h-px bg-line group-hover:bg-signal-red/30 transition-colors duration-300 z-20" />
            )}
          </div>
        ))}
      </div>

      {/* ── Section footer note ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-10 mt-6 border-t border-line">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-signal-red animate-pulse" />
          <span className="label text-slate text-[11px]">
            ACCEPTING SELECT COMMISSIONS FOR Q1 / Q2
          </span>
        </div>
        <span className="label text-slate text-[11px]">
          END-TO-END ENGAGEMENTS · 6 TO 12 WEEKS
        </span>
      </div>
    </section>
  );
};

export default Services;
