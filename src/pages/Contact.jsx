import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import {
  RiMailLine,
  RiTimeLine,
  RiCheckLine,
  RiArrowRightLine,
} from "react-icons/ri";

const SERVICES_OPTIONS = [
  "Brand Strategy",
  "Visual Identity",
  "Web & Interaction Design",
  "Complete Brand Platform",
  "Design Systems",
  "Packaging & Print",
];

const TIMELINES = [
  "Immediately",
  "In 2 to 4 Weeks",
  "Next Quarter",
  "Flexible / Exploring",
];

const BUDGETS = ["$10k - $20k", "$20k - $40k", "$40k - $75k", "$75k+"];

const Contact = () => {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const formRef = useRef(null);
  const sidebarRef = useRef(null);

  // Lagos local time live ticker
  const [lagosTime, setLagosTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setLagosTime(new Intl.DateTimeFormat([], options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Form state
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    services: ["Brand Strategy", "Visual Identity"],
    timeline: "In 2 to 4 Weeks",
    budget: "$20k - $40k",
    story: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const toggleService = (svc) => {
    setForm((prev) => {
      const exists = prev.services.includes(svc);
      if (exists) {
        return { ...prev, services: prev.services.filter((s) => s !== svc) };
      } else {
        return { ...prev, services: [...prev.services, svc] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg(
        "Please provide at least your name and email so we can reply.",
      );
      return;
    }
    setErrorMsg("");
    setSubmitted(true);
    // Smooth scroll to top of form
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
      );
      gsap.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", delay: 0.15 },
      );
      gsap.fromTo(
        sidebarRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", delay: 0.25 },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-paper min-h-screen text-ink font-body"
    >
      <Navbar />

      <main className="pt-28 md:pt-36 pb-20 px-6 md:px-14 max-w-350 mx-auto">
        {/* ── Top Header Deck ── */}
        <div ref={headlineRef} className="border-b border-line pb-12 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="label text-slate text-[11px] tracking-[0.14em]">
                § START A DIALOGUE
              </span>
              <span className="text-line text-xs">/</span>
              <span className="label text-ink text-[11px] font-semibold">
                COMMISSION INTAKE
              </span>
            </div>

            <div className="flex items-center gap-2 label text-slate text-[11px]">
              <RiTimeLine className="text-signal-red w-3.5 h-3.5" />
              <span>LAGOS WAT (UTC+1):</span>
              <span className="text-ink font-semibold">
                {lagosTime || "12:00:00"}
              </span>
            </div>
          </div>

          <h1 className="font-display font-extrabold text-ink text-[clamp(42px,6vw,92px)] leading-[0.92] tracking-tight uppercase m-0 max-w-260">
            TELL US YOUR STORY. <br />
            <span className="text-deep-red">LET'S MAKE IT ENDURE.</span>
            <span className="text-signal-red ml-2 inline-block">●</span>
          </h1>

          <p className="text-slate text-sm md:text-base leading-relaxed max-w-180 mt-6 font-normal">
            We don't believe in sterile, 20-field contact funnels. Tell us your
            ambition as a living narrative: who you are, what you are building,
            and why the world needs to pay attention.
          </p>
        </div>

        {/* ── Main 2-Column Content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: The Interactive Story Builder (7 cols) */}
          <div ref={formRef} className="lg:col-span-8">
            {submitted ? (
              /* Success State */
              <div className="bg-white/80 border border-line rounded-xs p-8 md:p-14 space-y-6 shadow-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-signal-red/10 text-signal-red text-xs font-bold rounded-full">
                  <RiCheckLine className="w-4 h-4" />
                  <span>STORY RECEIVED</span>
                </div>

                <h2 className="font-display font-extrabold text-[clamp(28px,3.5vw,48px)] leading-[1.05] tracking-tight uppercase m-0 text-ink">
                  THANK YOU, {form.name.trim() || "FOUNDER"}. <br />
                  YOUR AMBITION IS LOGGED.
                </h2>

                <p className="text-slate text-base leading-relaxed font-normal">
                  We have received your strategic narrative for{" "}
                  <strong className="text-ink font-semibold">
                    {form.company.trim() || "your brand"}
                  </strong>
                  . Ayo and our design leads review every brief thoroughly.
                  Expect a considered response at{" "}
                  <strong className="text-ink font-semibold">
                    {form.email}
                  </strong>{" "}
                  within 24 to 48 hours.
                </p>

                <div className="pt-4 border-t border-line flex items-center justify-between">
                  <span className="label text-slate text-[11px] tracking-wider">
                    DEEZAINA STUDIOS · WORKING WORLDWIDE
                  </span>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="label text-deep-red text-xs font-semibold hover:underline cursor-pointer"
                  >
                    EDIT THIS BRIEF ↗
                  </button>
                </div>
              </div>
            ) : (
              /* Story Form */
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* 1. Natural Language Story Sentence */}
                <div className="bg-white/60 border border-line rounded-xs p-6 md:p-10 transition-colors focus-within:border-ink/40 focus-within:bg-white shadow-xs">
                  <p className="font-display text-[clamp(20px,2.2vw,30px)] leading-[1.65] text-ink font-bold m-0">
                    <span>Hello Deezaina Studios, my name is </span>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="your full name"
                      aria-label="Your full name"
                      className="border-b-2 border-ink/20 focus:border-signal-red bg-transparent text-ink font-extrabold focus:outline-none px-2 py-0.5 inline-block min-w-45 max-w-65 placeholder:text-slate/40 placeholder:font-normal placeholder:italic transition-colors"
                    />
                    <span> and I represent </span>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      placeholder="company or brand"
                      aria-label="Company or brand name"
                      className="border-b-2 border-ink/20 focus:border-signal-red bg-transparent text-ink font-extrabold focus:outline-none px-2 py-0.5 inline-block min-w-45 max-w-65 placeholder:text-slate/40 placeholder:font-normal placeholder:italic transition-colors"
                    />
                    <span>. You can reach me at </span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="your email address"
                      aria-label="Your email address"
                      className="border-b-2 border-ink/20 focus:border-signal-red bg-transparent text-ink font-extrabold focus:outline-none px-2 py-0.5 inline-block min-w-55 max-w-85 placeholder:text-slate/40 placeholder:font-normal placeholder:italic transition-colors"
                    />
                    <span> to begin our engagement.</span>
                  </p>
                </div>

                {/* 2. Services Selection Chips */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="label text-slate text-[11px] font-semibold tracking-wider">
                      01 : WE NEED PARTNERSHIP IN (SELECT ALL THAT APPLY):
                    </span>
                    <span className="label text-slate text-[10px]">
                      {form.services.length} SELECTED
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {SERVICES_OPTIONS.map((svc) => {
                      const isSelected = form.services.includes(svc);
                      return (
                        <button
                          type="button"
                          key={svc}
                          onClick={() => toggleService(svc)}
                          className={`px-4 py-2.5 rounded-xs border text-[11px] font-body tracking-[0.06em] font-semibold uppercase select-none transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-signal-red border-signal-red text-ink shadow-sm scale-[1.02]"
                              : "bg-white/80 border-line text-ink hover:border-ink hover:bg-white"
                          }`}
                        >
                          {isSelected ? "✓ " : "+ "}
                          {svc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Timeline & Budget Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                  {/* Timeline Selection */}
                  <div className="space-y-3">
                    <span className="label text-slate text-[11px] font-semibold tracking-wider block">
                      02 : TARGET KICKOFF TIMELINE:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {TIMELINES.map((t) => {
                        const isSelected = form.timeline === t;
                        return (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setForm({ ...form, timeline: t })}
                            className={`px-3.5 py-2 rounded-xs border text-[11px] font-body tracking-wider uppercase font-semibold transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "bg-ink border-ink text-paper shadow-sm"
                                : "bg-white/70 border-line text-slate hover:text-ink hover:border-ink/60"
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Selection */}
                  <div className="space-y-3">
                    <span className="label text-slate text-[11px] font-semibold tracking-wider block">
                      03 : ESTIMATED INVESTMENT BRACKET:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {BUDGETS.map((b) => {
                        const isSelected = form.budget === b;
                        return (
                          <button
                            type="button"
                            key={b}
                            onClick={() => setForm({ ...form, budget: b })}
                            className={`px-3.5 py-2 rounded-xs border text-[11px] font-body tracking-wider uppercase font-semibold transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "bg-ink border-ink text-paper shadow-sm"
                                : "bg-white/70 border-line text-slate hover:text-ink hover:border-ink/60"
                            }`}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 4. The Narrative Heart */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="label text-slate text-[11px] font-semibold tracking-wider">
                      04 : THE HEART OF YOUR VISION:
                    </span>
                    <span className="label text-slate text-[10px]">
                      IN YOUR OWN WORDS
                    </span>
                  </div>
                  <p className="text-slate text-xs font-normal m-0 leading-relaxed">
                    What does your business do, who are your dream customers,
                    and what commercial or creative gap must we conquer?
                  </p>
                  <textarea
                    rows={5}
                    value={form.story}
                    onChange={(e) =>
                      setForm({ ...form, story: e.target.value })
                    }
                    placeholder="We're currently scaling our brand across West Africa and Europe. Our existing visual identity feels generic and doesn't match the quality of our product. We need a definitive visual system and flagship web presence that makes us impossible to ignore..."
                    className="w-full bg-white/70 border border-line focus:border-ink focus:bg-white text-ink text-sm md:text-base font-body p-5 rounded-xs focus:outline-none transition-colors placeholder:text-slate/40 placeholder:italic resize-y leading-relaxed"
                  />
                </div>

                {errorMsg && (
                  <p className="text-signal-red text-xs font-semibold m-0">
                    ⚠ {errorMsg}
                  </p>
                )}

                {/* Submit Action */}
                <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-paper rounded-full font-body text-xs font-bold tracking-[0.14em] uppercase hover:bg-signal-red hover:text-ink transition-all duration-300 shadow-sm cursor-pointer hover:scale-[1.02] group"
                  >
                    <span>DISPATCH STRATEGIC BRIEF</span>
                    <RiArrowRightLine className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2 text-slate text-[11px] label">
                    <span className="w-2 h-2 rounded-full bg-signal-red animate-pulse" />
                    <span>CAPACITY: 3 COMMISSIONS / QUARTER</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Studio Dossier & Direct Access (4 cols) */}
          <div ref={sidebarRef} className="lg:col-span-4 space-y-8">
            {/* Direct Studio Channels */}
            <div className="bg-white/60 border border-line rounded-xs p-6 md:p-8 space-y-6">
              <span className="label text-slate text-[10px] tracking-[0.16em] block">
                DIRECT INQUIRY CHANNELS
              </span>

              <div className="space-y-4">
                <div>
                  <span className="label text-slate text-[10px] block mb-1">
                    PRIMARY ELECTRONIC MAIL
                  </span>
                  <a
                    href="mailto:hello@deezaina.com"
                    className="text-signal-red font-display text-base font-bold tracking-tight hover:underline flex items-center gap-1.5"
                  >
                    <RiMailLine className="w-4 h-4" />
                    <span>hello@deezaina.com ↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Studio Capacity & Philosophy Callout */}
            <div className="border border-line rounded-xs p-6 md:p-8 bg-paper space-y-4">
              <span className="label text-slate text-[10px] tracking-[0.16em] block">
                STUDIO POLICY & SELECTIVITY
              </span>
              <p className="text-ink text-xs leading-relaxed font-normal m-0">
                We purposefully operate with a compact, senior-led team. We do
                not pass clients down to junior layers or run high-volume ticket
                mills.
              </p>
              <p className="text-slate text-xs leading-relaxed font-normal m-0">
                Every client works directly with our principal strategists and
                designers from initial discovery to production deployment.
              </p>
            </div>

            {/* Expected SLA Box */}
            <div className="p-6 border-l-2 border-signal-red bg-signal-red/5 rounded-xs space-y-2">
              <span className="label text-deep-red text-[10px] font-bold tracking-wider block">
                RESPONSE GUARANTEE
              </span>
              <p className="text-ink text-xs leading-relaxed m-0 font-medium">
                Every brief receives a thorough review. We will respond with
                honest feasibility, estimated schedule, and initial alignment
                questions within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
