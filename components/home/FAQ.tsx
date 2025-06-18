"use client";

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
        <h2 className="text-2xl font-bold md:text-3xl">{locale.title}</h2>
        <p className="text-lg text-muted-foreground">{locale.description}</p>
      </div>

      <Accordion type="single" collapsible className="mx-auto w-full max-w-3xl">
        {FAQS?.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            {/* PERUBAHAN DI SINI: Ukuran font judul pertanyaan dikecilkan */}
            <AccordionTrigger className="text-base text-left">
              {item.title}
            </AccordionTrigger>
            <AccordionContent>
              {/* PERUBAHAN DI SINI: Latar belakang biru ditambahkan pada konten */}
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
                <p className="text-foreground/80">{item.content}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
