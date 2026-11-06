import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useCursor } from "../../context/CursorContext";

export default function Cursor() {
  const { canCursor, cursorVariant, cursorText, setCursorVariant } =
    useCursor();

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeLabel, setActiveLabel] = useState(null);
  const [isOverInteractive, setIsOverInteractive] = useState(false);
  const [isOverLink, setIsOverLink] = useState(false);

  useEffect(() => {
    if (!canCursor) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring) return;

    // Fast, responsive GSAP quickTo tweens for buttery 60-120fps tracking
    const xDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3.out" });

    const xRing = gsap.quickTo(ring, "x", {
      duration: 0.2,
      ease: "power3.out",
    });
    const yRing = gsap.quickTo(ring, "y", {
      duration: 0.2,
      ease: "power3.out",
    });

    const xLabel = label
      ? gsap.quickTo(label, "x", { duration: 0.2, ease: "power3.out" })
      : null;
    const yLabel = label
      ? gsap.quickTo(label, "y", { duration: 0.2, ease: "power3.out" })
      : null;

    const handlePointerMove = (e) => {
      setIsVisible(true);
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
      if (xLabel && yLabel) {
        xLabel(e.clientX);
        yLabel(e.clientY);
      }

      // Check hovered element
      const target = e.target;
      if (!target) return;

      const isInput =
        target.matches("input, textarea, select, [contenteditable='true']") ||
        !!target.closest("input, textarea, select, [contenteditable='true']");

      if (isInput) {
        setIsOverInteractive(true);
        return;
      }
      setIsOverInteractive(false);

      // Check for custom data-cursor elements
      const cursorEl = target.closest("[data-cursor], [data-cursor-label]");

      if (cursorEl) {
        const variant = cursorEl.getAttribute("data-cursor");
        const customText = cursorEl.getAttribute("data-cursor-label");

        if (variant === "view") {
          setCursorVariant("view");
          setActiveLabel(customText || "EXPLORE CASE");
        } else if (variant === "hidden") {
          setCursorVariant("hidden");
          setActiveLabel(null);
        } else {
          setActiveLabel(customText);
        }
        setIsOverLink(false);
      } else {
        // Standard interactive links/buttons detection
        const isClickable = target.closest("a, button, [role='button']");
        setIsOverLink(!!isClickable);

        if (cursorVariant !== "default") {
          setCursorVariant("default");
        }
        setActiveLabel(cursorText);
      }
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [canCursor, cursorVariant, cursorText, setCursorVariant]);

  if (!canCursor) return null;

  const currentLabel = activeLabel || cursorText;
  const isViewMode = cursorVariant === "view" || !!currentLabel;
  const isHidden =
    cursorVariant === "hidden" || isOverInteractive || !isVisible;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-200 ${
        isHidden ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Follower Dot (6px) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-0.75 -mt-0.75 w-1.5 h-1.5 rounded-full bg-signal-red pointer-events-none z-50 ${
          isViewMode ? "hidden" : "block"
        }`}
      />

      {/* Follower Ring (36px default, 48px on link hover, 72px on view mode) */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-all duration-200 ease-out border ${
          isViewMode
            ? "w-18 h-18 -ml-9 -mt-9 border-signal-red bg-signal-red/10 scale-100"
            : isOverLink
              ? "w-12 h-12 -ml-6 -mt-6 border-ink/40 bg-ink/5"
              : "w-9 h-9 -ml-4.5 -mt-4.5 border-ink/25 bg-transparent"
        }`}
      />

      {/* Hover Label Pill */}
      {currentLabel && (
        <div
          ref={labelRef}
          className="fixed top-0 left-0 pointer-events-none z-50 -ml-16 -mt-16 text-center"
        >
          <span className="inline-block px-2.5 py-1 bg-signal-red text-ink font-body font-bold text-[10px] tracking-widest uppercase border border-ink shadow-[2px_2px_0_#111111]">
            {currentLabel}
          </span>
        </div>
      )}
    </div>
  );
}
