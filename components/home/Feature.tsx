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
  const FEATURES = ALL_FEATURES[`FEATURES_${langName.toUpperCase()}`];

  return (
    <section id={id}>
      <div className="container space-y-6 rounded-md bg-secondary py-14 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-4xl md:text-6xl text-white">
            <RoughNotation type="highlight" show={true} color="#2563EB">
              {locale.title}
            </RoughNotation>
          </h2>
        </div>

        <div className="mx-auto grid justify-center gap-4 text-center sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {FEATURES?.map((feature) => (
            <div
              key={feature.title}
              className="flex h-[160px] flex-col justify-between rounded-md bg-background/70 p-6 shadow-md border dark:border-muted"
            >
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                  {feature.icon && typeof feature.icon === "string" ? (
                    <span className="text-2xl">{feature.icon}</span>
                  ) : (
                    React.createElement(feature.icon, {
                      className: "text-2xl",
                    })
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">{feature.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
