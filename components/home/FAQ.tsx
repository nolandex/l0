"use client";

import { ALL_FAQS } from "@/config/faqs";
// Kembali menggunakan Accordion dari NextUI yang sudah ada di proyek Anda
import { Accordion, AccordionItem } from "@nextui-org/react";

const FAQ = ({
  id,
  locale,
  langName,
}: {
  id: string;
  locale: any;
  langName: string;
}) => {
  const FAQS = ALL_FAQS[`FAQS_${langName.toUpperCase()}`];

  return (
    <section
      id={id}
      className="container flex flex-col items-center justify-center py-16 md:py-24"
    >
      {/* Header disederhanakan agar terlihat modern */}
      <div className="flex flex-col text-center gap-4 mb-12 max-w-2xl">
        <h2 className="text-3xl font-bold md:text-4xl">{locale.title}</h2>
        <p className="text-lg text-default-500">{locale.description}</p>
      </div>

      {/* Menggunakan Accordion dari NextUI dengan styling yang disesuaikan */}
      <Accordion
        fullWidth
        keepContentMounted
        className="w-full max-w-3xl gap-y-4" // Mengatur lebar maksimum dan jarak vertikal
        itemClasses={{
          base: "group-[.is-splitted]:shadow-none group-[.is-splitted]:border-b group-[.is-splitted]:border-default-200",
          title: "font-medium text-lg", // Membuat judul lebih besar
          trigger: "py-4",
          content: "pt-0 pb-4 text-base text-default-500",
        }}
        selectionMode="multiple"
        variant="splitted" // Variant splitted memberikan garis di antara item
      >
        {FAQS?.map((item) => (
          <AccordionItem
            key={item.title}
            aria-label={item.title}
            title={item.title}
            HeadingComponent="h3"
          >
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
