import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 capitalize">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          No.1 job hunt website
        </span>

        {/* Headline */}
        <h1 className="mt-8 text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 leading-tight">
          Search, Apply
          <br />
          Get Your{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Dream Job
          </span>
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-8 max-w-xl text-lg text-zinc-500 leading-relaxed">
          Your career journey is unique, every application brings you closer to
          the opportunity that's meant for you. Stay persistent and keep
          believing in yourself!
        </p>
      </div>
    </section>
  );
};

export default Hero;
