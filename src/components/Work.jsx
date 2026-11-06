import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Each project has Tailwind utility classes for its editorial composition & staggered placement */
const PROJECTS = [
  {
    id: "01",
    client: "Okafor & Sons",
    project: "Brand Identity & Strategy",
    year: "2024",
    tags: ["Strategy", "Identity"],
    bgClass: "bg-[#DDD5C8]",
    aspectClass: "aspect-4/3",
    offsetClass: "md:mt-0",
    parallaxSpeed: 0.08,
    shapeAClass: "bg-ink w-[55%] h-[55%] top-[10%] left-[10%] -rotate-4",
    shapeBClass: "bg-paper w-[30%] h-[30%] top-[45%] left-[55%] rotate-8",
  },
  {
    id: "02",
    client: "Meridian Health",
    project: "Brand Strategy & Web",
    year: "2024",
    tags: ["Strategy", "Web"],
    bgClass: "bg-[#B8C9C6]",
    aspectClass: "aspect-[4/5] sm:aspect-[3/4]",
    offsetClass: "md:mt-24 lg:mt-32",
    parallaxSpeed: -0.12,
    shapeAClass: "bg-paper w-[40%] h-[70%] top-[15%] left-[35%] rotate-0",
    shapeBClass:
      "bg-signal-red w-[12%] h-[12%] top-[20%] left-[15%] rounded-full rotate-0",
  },
  {
    id: "03",
    client: "Nova Capital",
    project: "Full Brand Identity",
    year: "2023",
    tags: ["Identity", "Guidelines"],
    bgClass: "bg-[#C9C4D6]",
    aspectClass: "aspect-[16/11]",
    offsetClass: "md:mt-10 lg:mt-14",
    parallaxSpeed: 0.05,
    shapeAClass: "bg-ink w-[70%] h-[35%] top-[50%] left-0 rotate-0",
    shapeBClass: "bg-paper w-[35%] h-[35%] top-[10%] left-[10%] rotate-12",
  },
];

/* Project thumbnail with editorial composition & hover interaction */
const ProjectThumb = ({ project }) => {
  return (
    <div
      className="cursor-pointer group flex flex-col"
      data-cursor="view"
      data-cursor-label="EXPLORE CASE"
    >
      {/* image area */}
      <div
        className={`w-full ${project.aspectClass} relative overflow-hidden rounded-xs ${project.bgClass} transition-transform duration-500 ease-out group-hover:scale-[1.015]`}
      >
        {/* shape A */}
        <div
          aria-hidden="true"
          className={`absolute rounded-xs shadow-sm transition-transform duration-700 ease-out group-hover:scale-105 ${project.shapeAClass}`}
        />
        {/* shape B */}
        <div
          aria-hidden="true"
          className={`absolute rounded-xs shadow-sm transition-transform duration-700 ease-out group-hover:-translate-y-1.5 ${project.shapeBClass}`}
        />

        {/* Index watermark */}
        <div className="absolute top-4 right-4 pointer-events-none select-none">
          <span className="label text-ink/20 text-[11px] font-bold tracking-widest">
            № {project.id}
          </span>
        </div>

        {/* hover overlay */}
        <div className="absolute inset-0 bg-ink/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
          <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <span className="label text-paper text-xs tracking-[0.2em] block mb-2">
              CASE STUDY
            </span>
            <span className="display text-paper text-lg font-bold">
              VIEW PROJECT ↗
            </span>
          </div>
        </div>
      </div>

      {/* metadata & title deck */}
      <div className="flex items-start justify-between mt-5 gap-4">
        <div>
          {/* tags row */}
          <div className="flex items-center gap-2 mb-2">
            <span className="label text-ink font-bold text-[10px]">
              {project.id}
            </span>
            <span className="w-px h-2.5 bg-line inline-block" />
            {project.tags.map((t, idx) => (
              <span key={t} className="flex items-center gap-2">
                <span className="label text-slate text-[10px] tracking-wider">
                  {t}
                </span>
                {idx < project.tags.length - 1 && (
                  <span className="text-line text-[9px]">·</span>
                )}
              </span>
            ))}
          </div>

          {/* client name */}
          <h4 className="font-display font-bold text-[clamp(20px,2.2vw,28px)] text-ink m-0 mb-1 tracking-tight leading-tight group-hover:text-deep-red transition-colors">
            {project.client}
          </h4>
          <p className="text-slate text-[13px] m-0 font-normal">
            {project.project}
          </p>
        </div>

        <span className="label text-slate/70 text-[10px] tracking-wider shrink-0 pt-4">
          {project.year}
        </span>
      </div>
    </div>
  );
};

const Work = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Initial entrance stagger
      gsap.from(".work-item", {
        y: 60,
        opacity: 0,
        duration: 0.95,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
        },
      });

      // 2. Subtle scroll-driven parallax between staggered columns on desktop
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const project = PROJECTS[i];
        if (!project) return;

        gsap.to(el, {
          yPercent: project.parallaxSpeed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-paper py-[clamp(72px,10vw,140px)] px-6 md:px-11 border-t border-line font-body overflow-hidden"
    >
      {/* ── header row ── */}
      <div className="flex items-center justify-between mb-[clamp(48px,6vw,88px)]">
        <div className="flex items-center gap-3">
          <span className="label text-slate text-[11px] tracking-[0.14em]">
            § SELECTED WORK
          </span>
          <span className="text-line text-xs">/</span>
          <span className="label text-ink text-[11px] font-semibold">
            ARCHIVE 2023-2024
          </span>
        </div>

        <a
          href="#contact"
          className="label text-deep-red text-[11px] tracking-[0.12em] no-underline hover:text-signal-red transition-colors flex items-center gap-1.5"
        >
          <span>REQUEST PORTFOLIO DECK</span>
          <span>↗</span>
        </a>
      </div>

      {/* ── editorial staggered project grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-11 items-start pb-12 md:pb-24">
        {PROJECTS.map((p, idx) => (
          <div
            key={p.id}
            ref={(el) => (cardRefs.current[idx] = el)}
            className={`work-item ${p.offsetClass}`}
          >
            <ProjectThumb project={p} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;
