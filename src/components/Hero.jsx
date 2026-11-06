import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────────────────────────
   Crop mark: fine hairline registration detail
─────────────────────────────────────────────── */
const CropMark = ({ style }) => (
  <div
    aria-hidden="true"
    style={{
      position: "absolute",
      width: 18,
      height: 18,
      zIndex: 20,
      pointerEvents: "none",
      ...style,
    }}
  >
    {/* horizontal arm */}
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: "#DEDCD7",
        transform: "translateY(-50%)",
      }}
    />
    {/* vertical arm */}
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        width: 1,
        backgroundColor: "#DEDCD7",
        transform: "translateX(-50%)",
      }}
    />
  </div>
);

/* ───────────────────────────────────────────────
   Shared headline font-size (clamp)
─────────────────────────────────────────────── */
const HL = "clamp(64px, 9.8vw, 142px)";

/* ───────────────────────────────────────────────
   Hero
─────────────────────────────────────────────── */
const Hero = () => {
  /* animation targets */
  const heroRef = useRef(null);
  const subtitleRef = useRef(null);
  const line0 = useRef(null); // BE HARD
  const line1 = useRef(null); // TO IGNORE
  const dotRef = useRef(null); // ● (Signal Red, parallax)
  const line2 = useRef(null); // EASY TO
  const line3 = useRef(null); // CHOOSE.
  const cardRef = useRef(null);
  const monogramRef = useRef(null); // Gigantic "D." watermark
  const lensRef = useRef(null); // Frosted glass distortion lens

  /* ── Entrance & Scroll Animations ── */
  useEffect(() => {
    const revealEls = [
      line0.current,
      line1.current,
      line2.current,
      line3.current,
    ];

    gsap.set(revealEls, { y: 88, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.1 });

    tl.to(
      revealEls,
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.08,
        ease: "power4.out",
      },
      0.05,
    );

    // Fade subtitle as user scrolls towards Statement
    if (subtitleRef.current && heroRef.current) {
      gsap.to(subtitleRef.current, {
        opacity: 0,
        y: -24,
        ease: "power1.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom 70%",
          scrub: true,
        },
      });
    }
  }, []);

  /* ── Interactive Cursor Parallax ── */
  useEffect(() => {
    const onMove = (e) => {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;

      /* Monumental D. watermark: deep slow floating parallax */
      gsap.to(monogramRef.current, {
        x: cx * 35,
        y: cy * 25,
        duration: 1.8,
        ease: "power2.out",
        overwrite: "auto",
      });

      /* Frosted glass distortion lens: responsive optical glide */
      gsap.to(lensRef.current, {
        x: cx * 42,
        y: cy * 24,
        rotation: cx * 3,
        duration: 1.1,
        ease: "power3.out",
        overwrite: "auto",
      });

      /* Signal Red dot: snappiest */
      gsap.to(dotRef.current, {
        x: cx * 28,
        y: cy * 18,
        duration: 1.0,
        ease: "power3.out",
        overwrite: "auto",
      });

      /* Work preview card: deeper float */
      gsap.to(cardRef.current, {
        x: cx * 55,
        y: cy * 40,
        rotation: 6 + cx * 5,
        duration: 1.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative bg-paper"
      style={{
        minHeight: "100svh",
        fontFamily: "var(--font-body)",
        paddingTop: 80 /* clear fixed navbar */,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Crop marks ── */}
      <CropMark style={{ top: 88, left: 24 }} />
      <CropMark style={{ top: 88, right: 24 }} />
      <CropMark style={{ bottom: 58, left: 24 }} />
      <CropMark style={{ bottom: 58, right: 24 }} />

      {/* ══════════════════════════════════════════════════════
          COLOSSAL "D." MONOGRAM WATERMARK (from reference)
      ══════════════════════════════════════════════════════ */}
      <div
        ref={monogramRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "2%",
          top: "22%",
          transform: "translateY(-50%)",
          zIndex: 1,
          pointerEvents: "none",
          userSelect: "none",
          display: "flex",
          alignItems: "baseline",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(260px, 44vw, 680px)",
          lineHeight: 0.8,
          color: "rgba(17, 17, 17, 0.048)",
          letterSpacing: "-0.04em",
        }}
      >
        <span>D</span>
        <span
          style={{
            display: "inline-block",
            fontSize: "0.24em",
            marginLeft: "0.03em",
            lineHeight: 1,
            color: "rgba(17, 17, 17, 0.07)",
          }}
        >
          ●
        </span>
      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT ZONE
      ══════════════════════════════════════════════════════ */}
      <div style={{ position: "relative", zIndex: 3 }}>
        {/* ── Headline Block ── */}
        <div
          style={{
            padding: "clamp(24px, 4vw, 56px) 44px 0",
            position: "relative",
          }}
        >
          {/* Line 0: BE HARD */}
          <div className="clip-reveal">
            <h1
              ref={line0}
              className="display text-ink"
              style={{ fontSize: HL, lineHeight: 0.9, margin: 0 }}
            >
              BE HARD
            </h1>
          </div>

          {/* Line 1: TO IGNORE + Optical Frosted Glass Lens Overlay */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              position: "relative",
            }}
          >
            <div className="clip-reveal" style={{ flex: "0 0 auto" }}>
              <h1
                ref={line1}
                className="display text-ink"
                style={{ fontSize: HL, lineHeight: 0.9, margin: 0 }}
              >
                TO IGNORE
              </h1>
            </div>

            {/* Signal Red dot */}
            <span
              ref={dotRef}
              aria-hidden="true"
              style={{
                display: "inline-block",
                color: "#FF3B4F",
                fontSize: `calc(${HL} * 0.68)`,
                lineHeight: 1,
                marginLeft: "0.07em",
                marginBottom: "0.05em",
              }}
            >
              ●
            </span>
          </div>

          {/* Line 2 & 3: EASY TO CHOOSE : offset right */}
          <div
            style={{
              marginLeft: "clamp(80px, 32%, 460px)",
              marginTop: "clamp(6px, 1vw, 14px)",
            }}
          >
            <div className="clip-reveal">
              <h1
                ref={line2}
                className="display text-ink"
                style={{ fontSize: HL, lineHeight: 0.9, margin: 0 }}
              >
                EASY TO
              </h1>
            </div>
            <div className="clip-reveal">
              <h1
                ref={line3}
                className="display text-ink"
                style={{ fontSize: HL, lineHeight: 0.9, margin: 0 }}
              >
                CHOOSE.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
