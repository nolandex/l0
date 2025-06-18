"use client";

import { Check } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { ALL_TIERS } from "@/config/tiers";
import { cn } from "@/lib/utils"; // Pastikan path ini benar
import { buttonVariants } from "@/components/ui/button"; // Pastikan path ini benar
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Pastikan path ini benar

const Pricing = ({
  id,
  locale,
  langName,
}: {
  id: string;
  locale: any;
  langName:string;
}) => {
  // Tetap menggunakan logika pengambilan data asli Anda
  const TIERS = ALL_TIERS[`TIERS_${langName.toUpperCase()}`];

  // Fungsi bantuan untuk menentukan apakah sebuah tier harus ditandai sebagai 'unggulan'
  // Anda bisa menyesuaikan logika ini, misal berdasarkan harga, nama, atau properti lain
  const isFeatured = (tier: any, index: number) => {
    // Sebagai contoh, kita tandai tier kedua sebagai unggulan, atau tier yang harganya bukan 0
    // Ini adalah asumsi karena struktur data asli tidak memiliki flag `isPro`
    return index === 1 || (typeof tier.price === 'number' && tier.price > 0);
  };

  return (
    <section id={id} className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          {locale.title}
        </h2>
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl text-primary">
          {/* RoughNotation diganti dengan styling biasa */}
          {locale.title2}
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {locale.description}
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {TIERS?.map((tier, index) => {
          const featured = isFeatured(tier, index);

          return (
            <Card
              key={tier.title}
              className={cn(
                "relative flex flex-col transition duration-200 ease-in-out",
                {
                  "border-2 border-primary shadow-lg": featured,
                  "border": !featured,
                }
              )}
            >
              <CardHeader>
                <CardTitle>{tier.title}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="mb-6 mt-2 flex items-baseline justify-center gap-x-2">
                  {typeof tier.price === "number" ? (
                    <>
                      <span className="text-5xl font-bold tracking-tight text-primary">
                        ${tier.price}
                      </span>
                      {/* Asumsi ada periode per bulan jika harga adalah angka */}
                      <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                        /month
                      </span>
                    </>
                  ) : (
                    // Jika harga adalah string (misal: "Free" atau "Custom")
                    <span className="text-4xl font-bold tracking-tight text-primary">
                      {tier.price}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 text-sm">
                  {tier.features?.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="justify-center pt-6">
                 {/* Asumsi 'tier.link' ada di data Anda, jika tidak ada, ganti dengan '#' atau link yang sesuai */}
                <Link
                  href={tier.link || "/login"}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    !featured && buttonVariants({ variant: "outline" }),
                    "w-full"
                  )}
                >
                  {tier.buttonText}
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="mx-auto mt-16 max-w-5xl text-center text-sm text-muted-foreground">
        {locale.doYouLike}
        <Link href={siteConfig.links.github} className="font-medium underline underline-offset-4" >
          {` ${locale.follow}`}
        </Link>
      </div>
    </section>
  );
};

export default Pricing;
