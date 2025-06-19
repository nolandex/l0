"use client";

import { ALL_FEATURES } from "@/config/feature";
import React from React, { useState } from "react";
import { RoughNotation } from "react-rough-notation";
import { Modal } from "@headlessui/modal"; // Example modal library
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
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const FEATURES =
    ALL_FEATURES[`FEATURES_${langName?.toUpperCase?.()}`] ?? ALL_FEATURES.FEATURES_EN;

  // Function to open modal with the correct image
  const handleImageClick = (index: number) => {
    setSelectedImage(`/images/${index + 1}.jpg`);
    setModalOpen(true);
  };

  return (
    <>
      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <Modal.Panel className="relative max-w-lg mx-auto bg-white rounded-lg p-4">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={() => setModalOpen(false)}
          >
            &times;
          </button>
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Feature Image"
              width={500}
              height={400}
              className="rounded-lg"
            />
          )}
        </Modal.Panel>
      </Modal>

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
              <div
                key={feature.title}
                className="relative flex h-[180px] flex-col items-center justify-start rounded-md bg-background/70 p-8 shadow-md border dark:border-muted"
              >
                {/* Icon to trigger modal */}
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-primary"
                  onClick={() => handleImageClick(index)}
                >
                  {/* Example icon (you can use an SVG or icon library like react-icons) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-2h10v10H5V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

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
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Feature;
