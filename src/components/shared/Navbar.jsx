import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

const links = [
  { name: "ABOUT", href: "/about" },
  { name: "WORKS", href: "/works" },
  { name: "FEEDS", href: "/feed " },
  { name: "CONTACT", href: "/contact" },
];

/* ── Kinetic Magnetic Nav Link with Vertical Rolling Text ── */
const NavLink = ({ name, href, isCta = false }) => {
  const containerRef = useRef(null);
  const textPrimaryRef = useRef(null);
  const textSecondaryRef = useRef(null);
  const dotRef = useRef(null);

  const handleMouseEnter = () => {
    if (textPrimaryRef.current && textSecondaryRef.current) {
      gsap.to(textPrimaryRef.current, {
        y: "-100%",
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(textSecondaryRef.current, {
        y: "0%",
        duration: 0.3,
        ease: "power3.out",
      });
    }

    if (dotRef.current) {
      gsap.to(dotRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.25,
        ease: "back.out(2)",
      });
    }
  };

  const handleMouseLeave = () => {
    if (textPrimaryRef.current && textSecondaryRef.current) {
      gsap.to(textPrimaryRef.current, {
        y: "0%",
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(textSecondaryRef.current, {
        y: "100%",
        duration: 0.3,
        ease: "power3.out",
      });
    }

    if (dotRef.current) {
      gsap.to(dotRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        x: 0,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(containerRef.current, {
      x: x * 0.22,
      y: y * 0.22,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  if (isCta) {
    return (
      <a
        ref={containerRef}
        href={href}
        onMouseEnter={() => {
          gsap.to(containerRef.current, {
            scale: 1.05,
            duration: 0.25,
            ease: "power2.out",
          });
        }}
        onMouseLeave={() => {
          gsap.to(containerRef.current, {
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }}
        onMouseMove={handleMouseMove}
        className="nav-item-enter inline-flex items-center gap-2 px-4 py-1.5 bg-ink text-paper rounded-full text-xs label font-semibold tracking-wider hover:bg-signal-red hover:text-ink transition-colors duration-200 shadow-sm"
      >
        <span>{name}</span>
        <span className="text-[10px]">→</span>
      </a>
    );
  }

  return (
    <a
      ref={containerRef}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="nav-item-enter relative flex items-center gap-1.5 py-1 px-2 select-none"
    >
      {/* Pop-in registration dot */}
      <span
        ref={dotRef}
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full bg-signal-red opacity-0 scale-0"
      />

      {/* Dual-layer rolling text container */}
      <div className="relative overflow-hidden h-3.75 leading-none">
        <span
          ref={textPrimaryRef}
          className="block label text-ink text-xs font-semibold select-none"
        >
          {name}
        </span>
        <span
          ref={textSecondaryRef}
          className="absolute top-0 left-0 block label text-deep-red text-xs font-semibold translate-y-full select-none"
        >
          {name}
        </span>
      </div>
    </a>
  );
};

const Navbar = () => {
  const navRef = useRef(null);
  const brandRef = useRef(null);
  const brandIconRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const bar1Ref = useRef(null);
  const bar2Ref = useRef(null);
  const bar3Ref = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── Mobile menu open/close ── */
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => {
      const next = !prev;
      if (next) {
        // Animate in
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
        );
        gsap.fromTo(
          ".mobile-nav-link",
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.35,
            ease: "power3.out",
            delay: 0.1,
          },
        );
        // Morph hamburger → X
        gsap.to(bar1Ref.current, {
          y: 6,
          rotation: 45,
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(bar2Ref.current, { opacity: 0, scaleX: 0, duration: 0.2 });
        gsap.to(bar3Ref.current, {
          y: -6,
          rotation: -45,
          duration: 0.3,
          ease: "power3.out",
        });
      } else {
        // Animate out
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.25,
          ease: "power2.in",
        });
        // Morph X → hamburger
        gsap.to(bar1Ref.current, {
          y: 0,
          rotation: 0,
          duration: 0.3,
          ease: "power3.out",
        });
        gsap.to(bar2Ref.current, {
          opacity: 1,
          scaleX: 1,
          duration: 0.3,
          delay: 0.05,
        });
        gsap.to(bar3Ref.current, {
          y: 0,
          rotation: 0,
          duration: 0.3,
          ease: "power3.out",
        });
      }
      return next;
    });
  }, []);

  /* Close mobile menu on ESC */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && menuOpen) toggleMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, toggleMenu]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    /* ── Use gsap.context & fromTo to avoid React 19 double-mount opacity freeze ── */
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-item-enter",
        { y: -12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.05,
        },
      );

      if (brandRef.current) {
        gsap.fromTo(
          brandRef.current,
          { x: -14, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
        );
      }
    }, nav);

    /* ── Glass pill morphing on scroll ── */
    const onScroll = () => {
      const scrolled = window.scrollY > 20;
      gsap.to(nav, {
        marginLeft: scrolled ? "16px" : "0px",
        marginRight: scrolled ? "16px" : "0px",
        marginTop: scrolled ? "10px" : "0px",
        borderRadius: scrolled ? "999px" : "0px",
        paddingLeft: scrolled ? "24px" : "32px",
        paddingRight: scrolled ? "24px" : "32px",
        paddingTop: scrolled ? "12px" : "18px",
        paddingBottom: scrolled ? "12px" : "18px",
        backgroundColor: scrolled
          ? "rgba(247, 246, 242, 0.92)"
          : "rgba(247, 246, 242, 0.98)",
        boxShadow: scrolled ? "0 8px 32px -8px rgba(17,17,17,0.08)" : "none",
        ease: "power3.out",
        duration: 0.4,
        overwrite: "auto",
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ctx.revert();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4.5 backdrop-blur-md bg-paper/95 border-b border-line transition-colors"
      >
        {/* Brand */}
        <a
          ref={brandRef}
          href="/"
          onMouseEnter={() => {
            if (brandIconRef.current) {
              gsap.to(brandIconRef.current, {
                rotation: 12,
                scale: 1.15,
                duration: 0.3,
                ease: "back.out(2)",
              });
            }
          }}
          onMouseLeave={() => {
            if (brandIconRef.current) {
              gsap.to(brandIconRef.current, {
                rotation: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          }}
          className="nav-brand-enter flex items-center gap-2 cursor-pointer select-none no-underline"
        >
          <span
            ref={brandIconRef}
            className="font-display font-extrabold text-signal-red text-base tracking-tight leading-none inline-block transition-transform"
          >
            <img src="/icon.png" alt="" className="w-6 h-6" />
          </span>
          <span className="label text-ink font-bold text-[13px] tracking-[0.14em]">
            DEEZAINA
          </span>
        </a>

        {/* Desktop Nav links */}
        <ul className="hidden md:flex items-center gap-6 md:gap-8 list-none m-0 p-0">
          {links.map((link, i) => (
            <li key={link.name}>
              <NavLink
                name={link.name}
                href={link.href}
                isCta={i === links.length - 1}
              />
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="md:hidden nav-item-enter flex flex-col justify-center items-center gap-1.25 w-9 h-9 rounded-full bg-ink/8 hover:bg-ink/14 transition-colors"
        >
          <span
            ref={bar1Ref}
            className="block w-4.5 h-[1.5px] bg-ink rounded-full origin-center"
          />
          <span
            ref={bar2Ref}
            className="block w-4.5 h-[1.5px] bg-ink rounded-full origin-center"
          />
          <span
            ref={bar3Ref}
            className="block w-4.5 h-[1.5px] bg-ink rounded-full origin-center"
          />
        </button>
      </nav>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed top-0 left-0 right-0 z-40 bg-paper/98 backdrop-blur-xl pt-20 pb-10 px-8 border-b border-line shadow-lg"
        >
          <ul className="list-none m-0 p-0 flex flex-col gap-5">
            {links.map((link, i) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={toggleMenu}
                  className={`mobile-nav-link block label text-lead font-bold tracking-[0.06em] no-underline transition-colors ${
                    i === links.length - 1
                      ? "text-signal-red"
                      : "text-ink hover:text-signal-red"
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Decorative bottom detail */}
          <div className="mt-10 pt-6 border-t border-line">
            <p className="label text-slate text-[11px] tracking-widest">
              LAGOS, NIGERIA · WORKING WORLDWIDE
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
