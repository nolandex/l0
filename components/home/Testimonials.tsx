/* eslint-disable react/no-unescaped-entities */
"use client";

import { TestimonialsData } from "@/config/testimonials";
// Import "Image" sudah tidak diperlukan lagi, jadi bisa dihapus atau diabaikan.
// import Image from "next/image"; 
import { useRef, useEffect, useState } from "react";
import { RoughNotation } from "react-rough-notation";

const Testimonials = ({ id, locale }: { id: string; locale: any }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoScroll && scrollRef.current) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          
          if (scrollLeft >= scrollWidth - clientWidth - 1) {
            scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            const cardWidth = 300 + 16;
            scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
          }
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoScroll]);

  const handleInteractionStart = () => {
    setIsAutoScroll(false);
  };

  const handleInteractionEnd = () => {
    setTimeout(() => {
      setIsAutoScroll(true);
    }, 5000);
  };

  return (
    <section
      id={id}
      className="flex flex-col justify-center items-center pt-16 gap-12 w-full max-w-6xl mx-auto px-4"
    >
      <div className="flex flex-col text-center max-w-xl gap-4">
        <h2 className="text-center text-white">
          <RoughNotation type="highlight" show={true} color="#2563EB">
            {locale.title}
          </RoughNotation>
        </h2>
        {/* PERUBAHAN 1: Paragraf deskripsi di bawah judul telah dihapus */}
        {/* <p className="text-large text-default-500">{locale.description1}</p> */}
      </div>
      <div className="relative w-full">
        <div
          ref={scrollRef}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          onMouseDown={handleInteractionStart}
          onMouseUp={handleInteractionEnd}
          className="w-full overflow-x-auto snap-x snap-mandatory flex flex-row gap-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {TestimonialsData.map((testimonial, index) => (
            <div
              className="snap-start flex-shrink-0 w-[300px] mb-4 transition-all"
              key={index}
            >
              {/* PERUBAHAN 2: Konten di dalam kartu disederhanakan */}
              <div className="border border-slate/10 rounded-lg p-4 flex flex-col items-start justify-center h-full bg-white/5">
                
                {/* Seluruh bagian info pengguna (foto, nama, username) telah dihapus */}

                <p className="text-slate-800 dark:text-slate-300 text-[14px]">
                  {testimonial.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
