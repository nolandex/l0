"use client";

import { ALL_FEATURES } from "@/config/feature";
import React from "react";
import { RoughNotation } from "react-rough-notation";

const Feature = ({
  id,
  locale,
  langName,
}: {
  id: string;
  locale: any;
  langName: string;
}) => {
  const FEATURES =
    ALL_FEATURES[`FEATURES_${langName?.toUpperCase?.()}`] ?? ALL_FEATURES.FEATURES_EN;

  return (
    <section id={id}>
      {/* MENGGANTI LATAR BELAKANG MENJADI WARNA GELAP YANG STATIS */}
      <div className="container space-y-6 rounded-md bg-slate-900 py-14 lg:py-24">
        {/* Heading */}
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          {/* Teks kembali ke putih seperti semula */}
          <h2 className="font-heading text-4xl md:text-6xl text-white">
            <RoughNotation type="highlight" show={true} color="#2563EB">
              {locale?.title ?? "Features"}
            </RoughNotation>
          </h2>
        </div>

        {/* Grid */}
        <div className="mx-auto grid justify-center gap-4 text-center sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              // Latar belakang kartu juga dibuat gelap statis agar kontras
              className="flex h-[180px] flex-col items-center justify-start rounded-md bg-slate-800/50 p-8 shadow-md border border-slate-700"
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-3 mt-1"
              >
                {feature.icon && typeof feature.icon === "string" ? (
                  <span className="text-3xl">{feature.icon}</span>
                ) : (
                  feature.icon &&
                  React.createElement(feature.icon, {
                    className: "text-3xl",
                  })
                )}
              </div>

              {/* Title */}
              {/* Teks kembali ke putih seperti semula */}
              <h3 className="text-base font-semibold text-white mb-0.5 mt-[-4px]">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mt-0">
                {feature.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
