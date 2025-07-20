import React from "react";
import {
  Users,
  Target,
  Rocket,
  Shield,
  HeartHandshake,
  Zap,
  TrendingUp,
  Globe2,
  Award
} from "lucide-react";
import HappyCustomer from "../assets/About_Assests/Happycustomers.jpg";

const stats = [
  { label: "Active Users", value: "12K+" },
  { label: "Vendors / Partners", value: "480+" },
  { label: "Orders Processed", value: "250K+" },
  { label: "Avg. Satisfaction", value: "4.9/5" },
];

const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Customer First",
    text: "We design every feature to deliver real value and a smooth experience.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Trust & Security",
    text: "Data protection, secure payments, and transparent policies are core.",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Innovation",
    text: "We continuously ship improvements powered by modern tech & feedback.",
  },
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    title: "Partnership",
    text: "We grow together with creators, merchants, and our user community.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Performance",
    text: "Fast load times, optimized flows, and reliable infrastructure.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Quality",
    text: "We set a high bar for UI, accessibility, and engineering discipline.",
  },
];

const reasons = [
  {
    title: "Unified Experience",
    text: "All categories in one intuitive platform—reducing friction for discovery and purchase."
  },
  {
    title: "Verified Sellers",
    text: "Strict onboarding and monitoring ensure authenticity and reliability."
  },
  {
    title: "Smart Recommendations",
    text: "Adaptive suggestions help users find relevant products faster."
  },
  {
    title: "Scalable Architecture",
    text: "Microservice-driven backend and modular frontend for future growth."
  }
];

const team = [
  { name: "Jane Silva", role: "CEO / Co‑Founder" },
  { name: "Arun Kumar", role: "CTO / Engineering Lead" },
  { name: "Maya Patel", role: "Head of Product" },
  { name: "Daniel Lee", role: "Design Lead" },
];

const About = () => {
  return (
    <div className="bg-[#171717] text-[#EDEDED]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 flex flex-col md:flex-row items-center gap-12">
          <div className="max-w-3xl">
            <span className="inline-block text-xs tracking-wider uppercase text-[#DA0037] font-semibold mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Driving a Smarter, Trusted & Modern Shopping Ecosystem
            </h1>
            <p className="text-lg text-[#EDEDED]/80 leading-relaxed mb-8">
              We are building a high‑performance commerce platform that connects
              customers, creators, and vendors through secure technology, clean design,
              and actionable data. Our focus: reliability, transparency, and continuous
              innovation.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/special-deals"
                className="bg-[#DA0037] hover:bg-[#b8002c] transition px-6 py-3 rounded-lg font-medium"
              >
                Explore Marketplace
              </a>
              <a
                href="/contact"
                className="border border-[#444444] hover:border-[#DA0037] hover:text-[#DA0037] transition px-6 py-3 rounded-lg font-medium"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div>
            <img src={HappyCustomer} alt="About Us" className="w-[700px] h-auto rounded-lg shadow-lg" />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[radial-gradient(circle_at_30%_30%,#DA0037,transparent_60%)]" />
      </section>

      {/* Mission & Vision */}
      <section className="border-t border-b border-[#444444]">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Globe2 className="w-6 h-6 text-[#DA0037]" />
              Our Mission
            </h2>
            <p className="text-[#EDEDED]/80 leading-relaxed">
              To empower buyers and sellers with a seamless, credible, and adaptive digital
              marketplace—delivering consistent value through optimized user journeys,
              intelligent services, and resilient infrastructure.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#DA0037]" />
              Our Vision
            </h2>
            <p className="text-[#EDEDED]/80 leading-relaxed">
              To become the most trusted multi‑category platform in the region—where
              innovation, ethical commerce, and community engagement converge to define
              the future of digital trade.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-6">Core Values</h2>
        <p className="text-[#EDEDED]/70 max-w-2xl mb-12">
          These principles guide how we build, scale, and support the platform daily.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-[#171717] border border-[#444444] rounded-xl p-6 hover:border-[#DA0037] transition group"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#444444]/40 mb-4 text-[#DA0037] group-hover:scale-110 transition">
                {v.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-[#EDEDED]/70 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#111111] border-y border-[#444444]">
        <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
            <div className="grid md:grid-cols-2 gap-10">
              {reasons.map(r => (
                <div
                  key={r.title}
                  className="p-6 rounded-xl border border-[#444444] bg-[#171717] hover:border-[#DA0037] transition"
                >
                  <h3 className="font-semibold text-lg mb-2 text-[#DA0037]">{r.title}</h3>
                  <p className="text-sm text-[#EDEDED]/75 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(s => (
            <div
              key={s.label}
              className="text-center border border-[#444444] rounded-xl p-6 bg-[#171717] hover:-translate-y-1 hover:border-[#DA0037] transition"
            >
              <div className="text-3xl font-bold mb-2 text-[#DA0037]">{s.value}</div>
              <div className="uppercase tracking-wide text-xs text-[#EDEDED]/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team (Preview) */}
      <section className="bg-[#111111] border-t border-b border-[#444444]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
              <p className="text-[#EDEDED]/70 max-w-xl">
                A multidisciplinary group combining product strategy, engineering,
                design, and growth—focused on long‑term value creation.
              </p>
            </div>
            <a
              href="/careers"
              className="self-start md:self-auto border border-[#444444] hover:border-[#DA0037] hover:text-[#DA0037] rounded-lg px-5 py-2 text-sm font-medium transition"
            >
              Join Us
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map(member => (
              <div
                key={member.name}
                className="group relative rounded-xl border border-[#444444] bg-[#171717] p-6 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-[radial-gradient(circle_at_top,#DA0037,transparent_70%)] transition" />
                <div className="w-14 h-14 rounded-full bg-[#444444]/40 flex items-center justify-center text-sm font-semibold mb-4">
                  {member.name.split(" ").map(p => p[0]).join("")}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-xs uppercase tracking-wide text-[#DA0037] mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Building the Future of Modern Commerce
        </h2>
        <p className="text-[#EDEDED]/70 max-w-2xl mx-auto mb-10">
          Ready to experience a faster, smarter, and more transparent marketplace?
          Explore the platform today—or partner with us to co‑create the next evolution.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/signup"
            className="bg-[#DA0037] hover:bg-[#b8002c] transition px-8 py-3 rounded-lg font-medium"
          >
            Get Started
          </a>
          <a
            href="/partners"
            className="border border-[#444444] hover:border-[#DA0037] hover:text-[#DA0037] transition px-8 py-3 rounded-lg font-medium"
          >
            Become a Partner
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
