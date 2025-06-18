"use client";

// Import komponen RoughNotation
import { RoughNotation } from "react-rough-notation";
import { ALL_FAQS } from "@/config/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <section id={id} className="container py-16 md:py-24">
      <div className="flex flex-col text-center gap-4 mb-12 max-w-2xl mx-auto">
        {/* PERUBAHAN DI SINI:
          Highlight biru sekarang diterapkan pada judul utama ini (locale.title).
          Struktur ini meniru komponen Testimonials.
        */}
        <h2 className="text-2xl font-bold md:text-3xl text-white">
          <RoughNotation type="highlight" show={true} color="#2563EB">
            {locale.title}
          </RoughNotation>
        </h2>
        <p className="text-lg text-muted-foreground">{locale.description}</p>
      </div>

      <Accordion type="single" collapsible className="mx-auto w-full max-w-3xl">
        {FAQS?.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            {/* PERUBAHAN DI SINI:
              Highlight biru pada setiap pertanyaan telah DIHAPUS.
              Sekarang hanya menampilkan teks pertanyaan biasa.
            */}
            <AccordionTrigger className="text-base text-left">
              {item.title}
            </AccordionTrigger>

            {/* Bagian jawaban ini sudah benar (tanpa latar belakang biru) */}
            <AccordionContent className="text-muted-foreground pt-2">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
