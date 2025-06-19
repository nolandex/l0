"use client";

import { ALL_FEATURES } from "@/config/feature";
import React, { useState } from "react";
import { RoughNotation } from "react-rough-notation";
import Image from "next/image";

const Feature = ({
  id,
  locale,
  langName,
}: {
  id: string;
  locale: any;
  langName: string;
}) => {
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState<number | null>(null);
  const FEATURES =
    ALL_FEATURES[`FEATURES_${langName?.toUpperCase?.()}`] ?? ALL_FEATURES.FEATURES_EN;

  const handleCardClick = (index: number) => {
    setSelectedFeatureIndex(index);
  };

  return (
    <section id={id}>
      <div className="container space-y-6 rounded-md bg-secondary py-14 lg:py-24">
        {/* Heading */}
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-4xl md:text-6xl text-white">
            <RoughNotation type="highlight" show={true} color="#2563EB">
              {locale?.title ?? "Features"}
            </RoughNotation>
          </h2>
        </div>

        {/* Grid */}
        <div className="mx-auto grid justify-center gap-4 text-center sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <button
              key={feature.title}
              onClick={() => handleCardClick(index)}
              className="flex h-[180px] flex-col items-center justify-start rounded-md bg-background/70 p-8 shadow-md border dark:border-muted hover:bg-background/90 transition-colors cursor-pointer"
            >
              {/* Feature Icon */}
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

              {/* Title */}
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-0.5 mt-[-4px]">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mt-0">
                {feature.content}
              </p>
            </button>
          ))}
        </div>

        {/* Image Display */}
        {selectedFeatureIndex !== null && (
          <div className="mx-auto mt-8 max-w-lg text-center">
            <Image
              src={`/images/${selectedFeatureIndex + 1}.jpg`}
              alt={`Feature ${FEATURES[selectedFeatureIndex].title}`}
              width={500}
              height={400}
              className="rounded-lg"
            />
            <button
              onClick={() => setSelectedFeatureIndex(null)}
              className="mt-4 text-sm text-primary hover:underline"
            >
              Close Image
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Feature;
