import { LineText } from "@/components/LineText";
import CTAButton from "@/components/home/CTAButton";
import { FaDollarSign } from "react-icons/fa"; // 1. Impor ikon dollar

const Hero = ({
  locale,
  langName,
  CTALocale,
}: {
  locale: any;
  langName: string;
  CTALocale: any;
}) => {
  return (
    <>
      <section
        lang={langName}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-16 md:pt-24 text-center"
      >
        <h1>
          {locale.title1} <LineText>{locale.title2}</LineText> {locale.title3}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-2xl tracking-tight text-slate-700 dark:text-slate-400">
          {locale.description}
        </p>
      </section>

      <CTAButton locale={CTALocale}></CTAButton>

      {/* 2. Ikon dollar dan jarak ditambahkan di bawah ini */}
      <div className="flex justify-center pt-8 mb-12 md:mb-16">
        <FaDollarSign className="h-8 w-8 text-slate-300 dark:text-slate-700" />
      </div>
    </>
  );
};

export default Hero;
