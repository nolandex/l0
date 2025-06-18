"use client";

import { ALL_FEATURES } from "@/config/feature";
import React from "react";
import { RoughNotation } from "react-rough-notation";

// Ubah nama prop dari 'locale' menjadi 'dictionary' agar lebih jelas
const Feature = ({
  id,
  dictionary,
  langName,
}: {
  id: string;
  dictionary: { title: string }; // Tipe data diperjelas: objek dengan properti 'title'
  langName: string;
}) => {
  // Logika untuk mengambil daftar fitur tidak berubah
  const FEATURES =
    ALL_FEATURES[`FEATURES_${langName?.toUpperCase?.()}`] ?? [];

  return (
    <section id={id}>
      <div className="container space-y-6 rounded-md bg-secondary py-14 lg:py-24">
        {/* Heading */}
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-4xl md:text-6xl text-white">
            <RoughNotation type="highlight" show={true} color="#2563EB">
              {/* --- PERUBAHAN DI SINI --- */}
              {/* Sekarang mengambil judul dari 'dictionary.title' */}
              {/* Fallback "Features" tetap ada untuk keamanan */}
              {dictionary?.title ?? "Features"}
            </RoughNotation>
          </h2>
        </div>

        {/* Grid (Tidak ada perubahan di sini) */}
        <div className="mx-auto grid justify-center gap-4 text-center sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="flex h-[180px] flex-col items-center justify-start rounded-md bg-background/70 p-8 shadow-md border dark:border-muted"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-3 mt-1">
                {feature.icon && typeof feature.icon === "string" ? (
                  <span className="text-3xl">{feature.icon}</span>
                ) : (
                  feature.icon &&
                  React.createElement(feature.icon, {
                    className: "text-3xl",
                  })
                )}
              </div>
              <h3 className="text-base font-semibold text-white mb-0.5 mt-[-4px]">
                {feature.title}
              </h3>
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
