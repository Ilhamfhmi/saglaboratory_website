"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

// ─── Constants ───────────────────────────────────────────────────────────────

const SLIDES = [
  "/kegiatan1.jpg",
  "/kegiatan2.png",
  "/kegiatan3.jpg",
  "/kegiatan4.png",
];

const MARQUEE_ITEMS = [
  "SAG Laboratory",
  "Education",
  "SAG Study Group",
  "Cobit",
  "ISG Telkom University",
  "Isaca",
];

const STUDY_GROUP_TOPICS = [
  {
    title: "Enterprise Architecture",
    description:
      "Designing structural blueprints that align business strategy with IT infrastructure.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Building / layers icon — represents architectural structure */}
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="8" y1="14" x2="16" y2="14" />
      </svg>
    ),
  },
  {
    title: "Business Process",
    description:
      "Mapping and optimizing end-to-end workflows to improve efficiency and organizational performance.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Flow / process diagram icon */}
        <rect x="2" y="3" width="6" height="5" rx="1" />
        <rect x="16" y="3" width="6" height="5" rx="1" />
        <rect x="9" y="16" width="6" height="5" rx="1" />
        <path d="M5 8v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" />
        <line x1="12" y1="12" x2="12" y2="16" />
      </svg>
    ),
  },
  {
    title: "IT Governance",
    description:
      "Establishing frameworks and policies that ensure IT investments align with business goals and compliance.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Shield / governance / compliance icon */}
        <path d="M12 2l8 4v6c0 5-4 9-8 10C8 21 4 17 4 12V6l8-4z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

const RESEARCH_ARTICLES = [
  {
    image: "/business process.jpg",
    alt: "BPR Research",
    tag: "Business Process",
    title: "Mengenal Apa Itu Rekayasa Proses Bisnis (BPR)",
    excerpt:
      "Pendekatan strategis yang melibatkan pemikiran ulang secara fundamental untuk mencapai perbaikan dramatis dalam kinerja bisnis...",
    url: "https://medium.com/@SAGLaboratory/mengenal-apa-itu-rekayasa-proses-bisnis-business-process-reengineering-bpr-07ad971f253d",
    delay: 100,
  },
  {
    image: "/Togaf.jpg",
    alt: "EA Framework",
    tag: "Enterprise Architecture",
    title: "TOGAF, Zachman, FEAF: Framework EA Pilihan",
    excerpt:
      "Enterprise Architecture (EA) merupakan implementasi penting dalam mengelola struktur organisasi dan infrastruktur IT...",
    url: "https://medium.com/@SAGLaboratory/togaf-zachman-feaf-framework-enterprise-architecture-yang-perlu-anda-tahu-95eb10d1b668",
    delay: 300,
  },
  {
    image: "/bpm.jpg",
    alt: "Business Modeling",
    tag: "BPM Strategy",
    title: "Pemodelan Proses Bisnis: Strategi Visual Efisien",
    excerpt:
      "Perusahaan tidak bisa lagi bergantung pada proses yang tidak efisien di tengah ketatnya persaingan bisnis global...",
    url: "https://medium.com/@SAGLaboratory/pemodelan-proses-bisnis-strategi-visual-menuju-organisasi-yang-efisien-dan-adaptif-660fb01e84a5",
    delay: 500,
  },
];

const EVENTS = [
  {
    image: "/kuliah-umum.png",
    alt: "Kuliah Umum",
    dotColor: "bg-blue-400",
    labelColor: "text-blue-300",
    label: "Flagship Program",
    title: "Kuliah Umum",
    description:
      "Menghadirkan praktisi industri terkemuka untuk berbagi wawasan strategis mengenai tata kelola TI dan arsitektur enterprise masa kini.",
    delay: 100,
    offset: false,
    slug: "kuliah-umum",
  },
  {
    image: "/kegiatan1.jpg",
    alt: "Internal Competition",
    dotColor: "bg-green-400",
    labelColor: "text-green-300",
    label: "Internal Development",
    title: "SAG Internal Competition",
    description:
      "Wadah kompetisi bagi anggota laboratorium untuk menguji kemampuan dalam pemodelan proses bisnis dan solusi sistem informasi.",
    delay: 300,
    offset: false,
    slug: "sag-internal-competition",
  },
  {
    image: "/Rehat-sejenak.png",
    alt: "Rehat sejenak",
    dotColor: "bg-purple-400",
    labelColor: "text-purple-300",
    label: "Well-being & Psychology",
    title: "SAG Rehat Sejenak",
    description:
      "Sesi sharing santai bersama ahli psikologi untuk menjaga kesehatan mental dan keseimbangan produktivitas mahasiswa",
    delay: 500,
    offset: false,
    slug: "sag-rehat-sejenak",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArrowIcon({ className = "" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function SliderArrowIcon({ direction }) {
  return direction === "left" ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function StudyGroupCard({ title, description, icon, index }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={100 * (index + 1)}
      className="p-12 rounded-[3.5rem] bg-white border border-blue-100/50 hover:border-blue-400 cursor-pointer group shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-700"
    >
      <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-700 shadow-lg shadow-blue-100">
        {icon}
      </div>
      <h3 className="text-sag-blue text-2xl font-black mb-6 uppercase tracking-tight">
        {title}
      </h3>
      <p className="text-gray-500 text-lg leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
}

function ResearchCard({ image, alt, tag, title, excerpt, url, delay }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      onClick={() => window.open(url, "_blank")}
      className="group flex flex-col h-full bg-white rounded-[2.5rem] border border-gray-100 hover:border-blue-200 transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-6 left-6">
          <span className="bg-white/95 backdrop-blur-md text-sag-blue text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-xl">
            {tag}
          </span>
        </div>
      </div>

      <div className="p-10 flex flex-col flex-grow text-left">
        <h3 className="text-sag-blue text-2xl font-black mb-5 group-hover:text-blue-600 transition-colors duration-500 leading-[1.2]">
          {title}
        </h3>
        <p className="text-gray-500 text-base leading-relaxed mb-8 line-clamp-3 font-medium opacity-80">
          {excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 text-blue-600 font-black uppercase tracking-widest text-[11px]">
          <span className="border-b-2 border-transparent group-hover:border-blue-600 pb-1 transition-all duration-500">
            Read Full Article
          </span>
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventCard({ image, alt, dotColor, labelColor, label, title, description, delay, offset, slug }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay}
      className={`group relative bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden hover:bg-white/10 transition-all duration-700 flex flex-col ${
        offset ? "lg:translate-y-12" : ""
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sag-blue via-transparent to-transparent" />
      </div>
      <div className="p-10 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <span className={`w-2 h-2 ${dotColor} rounded-full animate-pulse`} />
          <span className={`${labelColor} text-[10px] font-black uppercase tracking-[0.2em]`}>
            {label}
          </span>
        </div>
        <h3 className="text-white text-3xl font-black mb-4 uppercase tracking-tighter leading-tight">
          {title}
        </h3>
        <p className="text-blue-100/60 text-base leading-relaxed font-medium mb-8">
          {description}
        </p>

        {/* View Article Button */}
        <div className="mt-auto">
          <button
            onClick={() => window.location.href = `/events/${slug}`}
            className="group/btn flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300"
          >
            <span className="text-[11px] font-black uppercase tracking-widest border-b border-white/20 group-hover/btn:border-white pb-1 transition-all duration-300">
              View Article
            </span>
            <div className="w-8 h-8 rounded-full border border-white/20 group-hover/btn:border-white group-hover/btn:bg-white/10 flex items-center justify-center transition-all duration-300">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });

    const timer = setInterval(nextSlide, 10000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-white font-jakarta overflow-x-hidden text-sag-blue">

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────────── */}
      <section className="min-h-screen bg-sag-blue flex items-center px-10 md:px-24 pt-20 relative overflow-hidden">
        {/* Decorative background strip */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-white/5 skew-x-12 translate-x-32 hidden lg:block" />

        <div className="container mx-auto z-10 grid lg:grid-cols-2 gap-12 items-center text-left">

          {/* Left: Text content */}
          <div className="max-w-3xl order-2 lg:order-1 lg:-mt-10 relative z-20">

            {/* Collaboration pill */}
            <div
              data-aos="fade-down"
              data-aos-delay="100"
              className="inline-block mb-12 relative group"
            >
              <div className="backdrop-blur-2xl bg-white/10 border border-white/20 py-3 px-8 rounded-full flex items-center shadow-2xl transition-all hover:bg-white/15">
                <span className="text-blue-200 text-[11px] font-bold tracking-[0.3em] uppercase opacity-90 mr-5">
                  In Collaboration With
                </span>
                <div className="h-6 w-[1px] bg-white/20 mr-5" />
                <div className="relative">
                  <div className="absolute -top-7 -bottom-7 -right-7 w-16 h-16 md:w-20 md:h-20 transition-transform duration-500 group-hover:scale-110 drop-shadow-xl">
                    <Image src="/logo-isg2.png" alt="Logo ISG" fill className="object-contain" priority />
                  </div>
                  <div className="w-12 h-7 md:w-14 md:h-8" />
                </div>
              </div>
            </div>

            <h1
              data-aos="fade-up"
              data-aos-delay="300"
              className="text-white text-6xl md:text-8xl font-black tracking-tighter leading-none mb-10 uppercase text-balance"
            >
              SAG <span className="text-blue-400">LABORATORY</span>
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="500"
              className="text-blue-100 text-xl md:text-2xl max-w-2xl leading-relaxed font-medium opacity-95 mb-16"
            >
              Empowering students to plan, design, and align information systems
              that drive real business impact.
              <span className="text-white block mt-5 font-semibold italic">
                "Bridging ideas and implementation with strategic system thinking."
              </span>
            </p>

            <div
              data-aos="fade-up"
              data-aos-delay="700"
              className="flex flex-col sm:flex-row gap-6 font-bold relative z-30"
            >
              <button className="group/btn relative px-12 py-5 bg-white text-sag-blue rounded-2xl overflow-hidden hover:bg-blue-50 transition-all duration-500 shadow-xl hover:-translate-y-2 active:scale-95 flex items-center justify-center gap-3 text-lg uppercase tracking-wider cursor-pointer">
                Explore Research
                <ArrowIcon className="transition-transform duration-500 group-hover/btn:translate-x-2" />
              </button>
              <button className="px-12 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl hover:bg-white/20 transition-all duration-500 shadow-lg hover:-translate-y-2 active:scale-95 text-lg uppercase tracking-wider cursor-pointer">
                About Our Lab
              </button>
            </div>
          </div>

          {/* Right: Image slider */}
          <div className="relative group flex justify-center lg:justify-center lg:pl-10 order-1 lg:order-2 z-10">
            <div className="relative p-3 md:p-4 rounded-[3.5rem] bg-white/5 border border-white/20 backdrop-blur-sm shadow-2xl w-full lg:max-w-[600px] aspect-[16/11] overflow-hidden group/slider">
              <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden bg-gray-900/20">

                {/* Slides track */}
                <div
                  className="flex w-full h-full transition-transform duration-1000 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {SLIDES.map((src, index) => (
                    <div key={index} className="relative w-full h-full flex-shrink-0">
                      <Image
                        src={src}
                        alt={`Activity ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>

                {/* Prev / Next buttons */}
                {[
                  { dir: "left", action: prevSlide, pos: "left-4" },
                  { dir: "right", action: nextSlide, pos: "right-4" },
                ].map(({ dir, action, pos }) => (
                  <button
                    key={dir}
                    onClick={action}
                    className={`absolute ${pos} top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-white/20 z-30 duration-500 cursor-pointer`}
                  >
                    <SliderArrowIcon direction={dir} />
                  </button>
                ))}
              </div>

              {/* Dot indicators */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-20 bg-black/10 backdrop-blur-md px-5 py-2.5 rounded-full">
                {SLIDES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 transition-all duration-700 rounded-full cursor-pointer ${
                      index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────────────────── */}
      <div className="relative bg-sag-blue overflow-hidden py-10 z-20 border-y border-white/10">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl" />
        <div className="relative z-10 flex animate-marquee whitespace-nowrap items-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              {MARQUEE_ITEMS.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-white text-xl md:text-2xl font-black uppercase tracking-tighter px-12 opacity-90">
                    {item}
                  </span>
                  <div className="flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full shadow-[0_0_20px_rgba(74,222,128,1)]" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: SAG STUDY GROUP ──────────────────────────────────────── */}
      <section className="py-40 px-10 md:px-24 bg-gradient-to-b from-white via-blue-50/50 to-blue-100/30 relative overflow-hidden text-left">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-200/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mb-24">
            <h2
              data-aos="fade-up"
              className="text-sag-blue text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none uppercase"
            >
              SAG <span className="text-blue-600">Study Group</span>
            </h2>

            <div className="flex items-center gap-3 mb-10">
              <div className="w-24 h-2.5 bg-blue-600 rounded-full shadow-lg shadow-blue-200" />
              <div className="w-8 h-2.5 bg-blue-400 rounded-full opacity-50" />
            </div>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-gray-600 text-xl md:text-2xl leading-relaxed max-w-3xl font-medium mb-12"
            >
              The SAG Study Group 2025 is focused on three key areas to empower
              students with strategic technical skills:
              <span className="text-sag-blue font-extrabold italic underline decoration-blue-200 decoration-4 underline-offset-4">
                {" "}Enterprise Architecture, Business Process, and IT Governance.
              </span>
            </p>

            <button
              data-aos="fade-up"
              data-aos-delay="300"
              onClick={() => (window.location.href = "/study-group")}
              className="group/join relative px-10 py-4 bg-sag-blue text-white rounded-2xl overflow-hidden hover:bg-blue-800 transition-all duration-700 shadow-xl hover:-translate-y-2 active:scale-95 flex items-center justify-center gap-3 text-lg font-bold uppercase tracking-wider cursor-pointer"
            >
              Join Study Group
              <ArrowIcon className="transition-transform duration-500 group-hover/join:translate-x-2" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {STUDY_GROUP_TOPICS.map((topic, i) => (
              <StudyGroupCard key={i} index={i} {...topic} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: RESEARCH ─────────────────────────────────────────────── */}
      <section className="py-40 px-10 md:px-24 bg-gradient-to-b from-white via-blue-50 to-blue-100/30 relative overflow-hidden">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#2563eb 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-200/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8 text-left">
            <div className="max-w-2xl">
              <h2
                data-aos="fade-right"
                className="text-sag-blue text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none uppercase"
              >
                Latest <span className="text-blue-600">Research</span>
              </h2>
              <p
                data-aos="fade-right"
                data-aos-delay="200"
                className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-xl"
              >
                Exploring information systems strategy through our latest
                publications on Medium.
              </p>
            </div>
            <button
              onClick={() =>
                window.open("https://medium.com/@SAGLaboratory", "_blank")
              }
              data-aos="fade-left"
              className="group flex items-center gap-3 bg-white hover:bg-blue-50 text-sag-blue font-bold px-8 py-4 rounded-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 uppercase text-xs tracking-widest cursor-pointer shadow-sm hover:shadow-md"
            >
              Visit Our Medium
              <ArrowIcon className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-10">
            {RESEARCH_ARTICLES.map((article, i) => (
              <ResearchCard key={i} {...article} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: EVENTS ───────────────────────────────────────────────── */}
      <section className="py-40 px-10 md:px-24 bg-sag-blue relative overflow-hidden text-left">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-100/10 to-transparent" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />

        <div className="container mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-3xl">
              <h2
                data-aos="fade-right"
                className="text-white text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase leading-none"
              >
                Featured <span className="text-blue-400">Events</span>
              </h2>
              <p
                data-aos="fade-right"
                data-aos-delay="200"
                className="text-blue-100/70 text-lg md:text-xl font-medium max-w-xl"
              >
                Connecting expertise and ambition through our flagship programs and
                internal development.
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/events")}
              data-aos="fade-left"
              className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-500 border border-white/20 hover:border-white/40 uppercase text-xs tracking-widest cursor-pointer shadow-sm hover:shadow-md backdrop-blur-md whitespace-nowrap"
            >
              View All Events
              <ArrowIcon className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Event cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {EVENTS.map((event, i) => (
              <EventCard key={i} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Global Styles ────────────────────────────────────────────────────── */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}