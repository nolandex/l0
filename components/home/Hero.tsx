"use client";

import { LineText } from "@/components/LineText";
import CTAButton from "@/components/home/CTAButton";
import { useTheme } from "next-themes";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const LOGOS = [
  { name: "Next.js", image: "/images/techStack/nextjs.svg" },
  { name: "React", image: "/images/techStack/react.svg" },
  { name: "Tailwind", image: "/images/techStack/tailwind.svg" },
  { name: "Framer", image: "/images/techStack/framer.svg" },
  { name: "Shadcnui", image: "/images/techStack/shadcnui.svg" },
  { name: "Nextui", image: "/images/techStack/nextui.svg" },
  { name: "TS", image: "/images/techStack/typescript.svg" },
  { name: "Vercel", image: "/images/techStack/vercel.svg" },
];

const Hero = ({
  locale,
  langName,
  CTALocale,
}: {
  locale: any;
  langName: string;
  CTALocale: any;
}) => {
  const { theme } = useTheme();

  // Fungsi untuk menyesuaikan ukuran font berdasarkan panjang teks
  const getFontSize = (text: string) => {
    const length = text.length;
    if (length > 50) return "clamp(2rem, 7vw, 4rem)"; // Teks panjang
    return "clamp(2.5rem, 8vw, 5rem)"; // Teks normal
  };

  // Gabungkan title1, title2, title3 untuk menghitung panjang total
  const fullTitle = `${locale.title1}${locale.title2}${locale.title3}`;

  return (
    <>
      <section
        lang={langName}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-16 md:pt-24 text-center"
      >
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight
                     max-w-[90vw] mx-auto hyphens-auto whitespace-normal
                     [&>*]:block sm:[&>*]:inline-block"
          style={{
            fontSize: getFontSize(fullTitle), // Sesuaikan ukuran font
            overflowWrap: "break-word", // Pecah kata panjang
          }}
        >
          {locale.title1} <LineText>{locale.title2}</LineText> {locale.title3}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl md:text-2xl tracking-tight text-slate-700 dark:text-slate-400">
          {locale.description}
        </p>
      </section>

      <CTAButton locale={CTALocale}></CTAButton>

      <section className="mx-auto w-full md:max-w-5xl lg:max-w-7xl px-0 md:px-6 lg:px-8 pt-16 pb-12">
        <Marquee direction="left" autoFill pauseOnHover>
          {LOGOS.map((image, index) => (
            <div className="mx-6 text-gray-500" key={index}>
              <Image
                src={image.image}
                alt={image.name}
                width={50}
                height={50}
                style={{ objectFit: "cover" }}
                className={`${
                  theme === "dark" ? "filter dark:invert grayscale" : ""
                } hover:filter-none transition-all duration-300 cursor-pointer text-gray-500`}
              />
            </div>
          ))}
        </Marquee>
      </section>
    </>
  );
};

export default Hero;
