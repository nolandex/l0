"use client";

import { ALL_FAQS } from "@/config/faqs";
// Impor diubah ke komponen accordion gaya shadcn/ui
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Pastikan path ini benar

const FAQ = ({
  id,
  locale,
  langName,
}: {
  id: string;
  locale: any;
  langName: string;
}) => {
  // Logika pengambilan data dari props tetap dipertahankan
  const FAQS = ALL_FAQS[`FAQS_${langName.toUpperCase()}`];

  return (
    <section
      id={id}
      className="container py-16 md:py-24" // Menggunakan container dan padding dari contoh target
    >
      {/* Header disederhanakan sesuai contoh target */}
      <div className="flex flex-col text-center gap-4 mb-12">
        <h2 className="text-3xl font-bold md:text-4xl">{locale.title}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {locale.description}
        </p>
      </div>

      {/* Komponen Accordion diganti dengan gaya shadcn/ui */}
      <Accordion type="single" collapsible className="mx-auto w-full max-w-3xl">
        {FAQS?.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            {/* item.title dari data Anda digunakan untuk AccordionTrigger */}
            <AccordionTrigger>{item.title}</AccordionTrigger>
            {/* item.content dari data Anda digunakan untuk AccordionContent */}
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
