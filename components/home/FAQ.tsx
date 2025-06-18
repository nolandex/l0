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
        <h2 className="text-2xl font-bold md:text-3xl">{locale.title}</h2>
        <p className="text-lg text-muted-foreground">{locale.description}</p>
      </div>

      <Accordion type="single" collapsible className="mx-auto w-full max-w-3xl">
        {FAQS?.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            {/* EFEK BIRU DITERAPKAN DI SINI (PADA PERTANYAAN) */}
            <AccordionTrigger className="text-base text-left no-underline hover:no-underline">
              <RoughNotation
                type="highlight"
                show={true}
                color="#2563EB"
                padding={[2, 6]}
                iterations={1}
              >
                <span className="text-white relative">
                  {item.title}
                </span>
              </RoughNotation>
            </AccordionTrigger>

            {/* LATAR BELAKANG BIRU DIHILANGKAN DARI SINI (PADA JAWABAN) */}
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
