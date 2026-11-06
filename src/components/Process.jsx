import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    name: "Discover",
    tagline: "IMMERSION & AUDIT",
    desc: "We start by excavating your business at its core: your audience, your category competitors, your ambitions, and the commercial gap you need to own. No shortcuts, no assumptions.",
  },
  {
    num: "02",
    name: "Define",
    tagline: "POSITIONING & VOICE",
    desc: "We articulate your positioning, brand voice, and strategic architecture into a clear brand platform: the unbreakable foundation for everything that follows.",
  },
  {
    num: "03",
    name: "Design",
    tagline: "SYSTEMS & CRAFT",
    desc: "With strategy locked, we build the living visual identity: typography, marks, layout systems, colour, and motion principles. Designed to endure across high-density screens and print.",
  },
  {
    num: "04",
    name: "Deliver",
    tagline: "DEPLOYMENT & SCALE",
    desc: "We hand over a complete, production-ready brand: full digital design tokens, responsive web build, guidelines, and assets for confident worldwide rollout from day one.",
  },
];

/* ───────────────────────────────────────────────
   3D Canvas Renderer for the Sculpted Letter "D"
─────────────────────────────────────────────── */
const Canvas3DLetter = ({ rotationRef, mouseRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    // Draw the 2D cross-section path of letter "D" centered at (0, 0)
    const traceLetterD = (c, w, h, thickness) => {
      c.beginPath();
      const r = h / 2;
      const left = -w / 2;
      const top = -h / 2;

      // Outer D path
      c.moveTo(left, top);
      c.lineTo(left + w - r, top);
      c.arc(left + w - r, 0, r, -Math.PI / 2, Math.PI / 2, false);
      c.lineTo(left, top + h);
      c.closePath();

      // Inner counter cutout (clockwise subtraction via winding)
      const innerW = w - thickness * 2;
      const innerH = h - thickness * 2;
      const innerR = innerH / 2;
      const innerLeft = left + thickness;

      c.moveTo(innerLeft, -innerH / 2);
      c.lineTo(innerLeft, innerH / 2);
      c.lineTo(innerLeft + innerW - innerR, innerH / 2);
      c.arc(
        innerLeft + innerW - innerR,
        0,
        innerR,
        Math.PI / 2,
        -Math.PI / 2,
        true,
      );
      c.closePath();
    };

    let time = 0;

    const render = () => {
      time += 0.015;
      const dpr = window.devicePixelRatio || 1;
      const cw = canvas.width;
      const ch = canvas.height;

      ctx.clearRect(0, 0, cw, ch);
      ctx.save();
      ctx.scale(dpr, dpr);

      const renderW = cw / dpr;
      const renderH = ch / dpr;
      const centerX = renderW / 2;
      const centerY = renderH / 2;

      // Base rotations influenced by scroll + mouse tilt
      const scrollRot = rotationRef.current || { y: 0, x: 0, floatY: 0 };
      const mouse = mouseRef.current || { x: 0, y: 0 };

      const rotY = scrollRot.y + mouse.x * 0.4 + Math.sin(time) * 0.04;
      const rotX = scrollRot.x + mouse.y * 0.3 + Math.cos(time * 0.8) * 0.03;
      const floatOffsetY = scrollRot.floatY + Math.sin(time * 1.5) * 8;

      // Drop shadow on the floor
      const shadowScale = 1 - Math.sin(time * 1.5) * 0.05;
      const shadowGrad = ctx.createRadialGradient(
        centerX,
        centerY + 160,
        10,
        centerX,
        centerY + 160,
        130 * shadowScale,
      );
      shadowGrad.addColorStop(0, "rgba(17, 17, 17, 0.12)");
      shadowGrad.addColorStop(1, "rgba(17, 17, 17, 0)");
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(
        centerX,
        centerY + 160,
        130 * shadowScale,
        24 * shadowScale,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      // Extrusion parameters
      const numSlices = 38;
      const depth = 52;
      const dWidth = Math.min(renderW * 0.42, 170);
      const dHeight = dWidth * 1.25;
      const thickness = dWidth * 0.28;

      // Pre-calculate slices with depth sorting
      const cosY = Math.cos(rotY);
      const cosX = Math.cos(rotX);
      const slices = [];
      for (let i = 0; i < numSlices; i++) {
        const z = -depth / 2 + (i / (numSlices - 1)) * depth;
        const depthSortKey = z * cosY * cosX;
        slices.push({ index: i, z, depthSortKey });
      }

      // Sort back-to-front
      slices.sort((a, b) => a.depthSortKey - b.depthSortKey);

      // Render each depth layer
      slices.forEach((slice) => {
        const { index, z } = slice;
        const progress = index / (numSlices - 1);
        const isFrontFace = index === numSlices - 1;
        const isBackFace = index === 0;

        ctx.save();
        ctx.translate(centerX, centerY + floatOffsetY);

        // Perspective projection
        const sinY = Math.sin(rotY);
        const sinX = Math.sin(rotX);

        const offsetX = z * sinY * 0.9;
        const offsetY = -z * sinX * cosY * 0.9;
        const scale = 1 + z * cosY * 0.0018;

        ctx.translate(offsetX, offsetY);
        ctx.scale(scale * cosY, scale * cosX);

        // Lighting calculation based on surface orientation
        const lightDir = { x: -0.6, y: -0.7, z: 0.5 };
        const normZ = cosY * cosX;
        const brightness = Math.max(
          0.18,
          Math.min(0.95, normZ * lightDir.z + 0.35),
        );

        if (isFrontFace) {
          ctx.fillStyle = "#111111";
          ctx.strokeStyle = "rgba(222, 220, 215, 0.45)";
          ctx.lineWidth = 1.2;
        } else if (isBackFace) {
          ctx.fillStyle = "#1c1c1c";
          ctx.strokeStyle = "rgba(17, 17, 17, 0.6)";
          ctx.lineWidth = 1;
        } else {
          const shade = Math.floor(18 + progress * 24 * brightness);
          ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
          ctx.strokeStyle = `rgba(${shade + 8}, ${shade + 8}, ${shade + 8}, 0.5)`;
          ctx.lineWidth = 0.8;
        }

        traceLetterD(ctx, dWidth, dHeight, thickness);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      });

      // ── Floating 3D Signal Red Dot orbiting the "D" ──
      const dotOrbitAngle = rotY + 0.6;
      const dotDist = dWidth * 0.72;
      const dotX = centerX + Math.cos(dotOrbitAngle) * dotDist;
      const dotY =
        centerY + floatOffsetY + Math.sin(rotX) * 20 + dHeight * 0.32;
      const dotScale = 1 + Math.sin(dotOrbitAngle) * 0.25;

      ctx.save();
      ctx.translate(dotX, dotY);

      // Red dot shadow
      ctx.fillStyle = "rgba(183, 19, 42, 0.25)";
      ctx.beginPath();
      ctx.arc(0, 4, 13 * dotScale, 0, Math.PI * 2);
      ctx.fill();

      // Red dot body
      const redGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, 14 * dotScale);
      redGrad.addColorStop(0, "#FF6B7A");
      redGrad.addColorStop(0.6, "#FF3B4F");
      redGrad.addColorStop(1, "#B7132A");
      ctx.fillStyle = redGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 12 * dotScale, 0, Math.PI * 2);
      ctx.fill();

      // Highlight sheen
      ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
      ctx.beginPath();
      ctx.arc(-3, -3, 3.5 * dotScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [rotationRef, mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block pointer-events-none select-none"
    />
  );
};

/* ───────────────────────────────────────────────
   Process Section Component with Pinned 3D Orbit
   (Unboxed, Clean Typography Without Card Borders or Badges)
─────────────────────────────────────────────── */
const Process = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);

  // 3D rotation shared references (scrubbed smoothly via GSAP)
  const rotationRef = useRef({ y: -0.4, x: 0.12, floatY: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Mouse tilt listener over the section
    const handleMouseMove = (e) => {
      const rect = track.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      gsap.to(mouseRef.current, {
        x,
        y,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    track.addEventListener("mousemove", handleMouseMove);

    // ScrollTrigger to scrub 3D rotation and reveal stages as user scrolls
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "+=260%",
        pin: true,
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;

          // Continuous 3D rotation of the D as user scrolls
          rotationRef.current.y = -0.4 + p * Math.PI * 2.2;
          rotationRef.current.x = 0.12 + Math.sin(p * Math.PI * 3) * 0.18;
          rotationRef.current.floatY = Math.sin(p * Math.PI * 4) * 22;

          // Determine current active stage (0, 1, 2, or 3)
          let current = 0;
          if (p >= 0.72) current = 3;
          else if (p >= 0.46) current = 2;
          else if (p >= 0.22) current = 1;

          setActiveStage(current);
        },
      });
    }, track);

    return () => {
      ctx.revert();
      track.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-paper font-body relative border-t border-line"
    >
      {/* ── Outer Pinned Track ── */}
      <div
        ref={trackRef}
        className="h-screen w-full flex flex-col justify-between p-6 md:p-12 relative overflow-hidden"
      >
        {/* ── Top Header Bar ── */}
        <div className="flex items-center justify-between z-20 w-full pb-4 border-b border-line">
          <div className="flex items-center gap-3">
            <span className="label text-slate text-[11px] tracking-[0.14em]">
              § HOW WE WORK
            </span>
            <span className="text-line text-xs">/</span>
            <span className="label text-ink text-[11px] font-semibold">
              4-PHASE METHODOLOGY
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal-red animate-pulse" />
              <span className="label text-ink text-[11px] font-bold">
                STAGE {STEPS[activeStage].num} OF 04
              </span>
            </div>
            <div className="hidden sm:block w-16 h-px bg-line" />
            <span className="label text-slate text-[11px]">
              {STEPS[activeStage].name.toUpperCase()}
            </span>
          </div>
        </div>

        {/* ── Middle Arena: 3D "D" in Center with 4 Clean Unboxed Content Blocks ── */}
        <div className="relative flex-1 w-full my-auto flex items-center justify-center">
          {/* ════════════════════════════════════════
              CENTERPIECE: 3D "D" CANVAS
          ════════════════════════════════════════ */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="w-[320px] h-85 md:w-115 md:h-120">
              <Canvas3DLetter rotationRef={rotationRef} mouseRef={mouseRef} />
            </div>
          </div>

          {/* ════════════════════════════════════════
              SURROUNDING STAGE CONTENT (Clean, Unboxed)
          ════════════════════════════════════════ */}
          <div className="hidden lg:grid grid-cols-2 grid-rows-2 w-full h-full max-w-315 mx-auto z-20 pt-10 pointer-events-auto">
            {STEPS.map((step, idx) => {
              const isActive = activeStage === idx;

              // Quadrant alignments around the 3D center
              const alignment =
                idx === 0
                  ? "justify-self-start self-start text-left"
                  : idx === 1
                    ? "justify-self-end self-start text-right"
                    : idx === 2
                      ? "justify-self-start self-end text-left"
                      : "justify-self-end self-end text-right";

              return (
                <div
                  key={step.num}
                  className={`w-90 xl:w-105 transition-all duration-500 ${alignment} ${
                    isActive
                      ? "opacity-100 scale-100"
                      : "opacity-20 scale-95 hover:opacity-40"
                  }`}
                >
                  {/* Stage Number & Tagline */}
                  <div
                    className={`flex items-center gap-3 mb-2.5 ${
                      idx === 1 || idx === 3 ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span
                      className={`font-display font-extrabold text-2xl leading-none transition-colors ${
                        isActive ? "text-signal-red" : "text-slate"
                      }`}
                    >
                      {step.num}
                    </span>
                    <span className="w-2 h-px bg-line" />
                    <span className="label text-deep-red text-[11px] font-bold tracking-[0.14em]">
                      {step.tagline}
                    </span>
                  </div>

                  {/* Stage Title */}
                  <h3 className="display text-ink text-3xl xl:text-5xl leading-none mb-3">
                    {step.name}
                  </h3>

                  {/* Content / Description */}
                  <p className="text-slate text-[14px] leading-relaxed m-0 font-normal max-w-97.5">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ════════════════════════════════════════
              MOBILE / TABLET ACTIVE CONTENT (< 1024px, Clean Unboxed)
          ════════════════════════════════════════ */}
          <div className="lg:hidden z-20 w-full max-w-105 p-4 text-left">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-display font-extrabold text-2xl text-signal-red">
                {STEPS[activeStage].num}
              </span>
              <span className="w-2 h-px bg-line" />
              <span className="label text-deep-red text-[11px] font-bold tracking-wider">
                {STEPS[activeStage].tagline}
              </span>
            </div>
            <h3 className="display text-ink text-4xl mb-3">
              {STEPS[activeStage].name}
            </h3>
            <p className="text-slate text-sm leading-relaxed m-0">
              {STEPS[activeStage].desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
