"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  Spacer,
} from "@nextui-org/react";

import { siteConfig } from "@/config/site";
import { ALL_TIERS } from "@/config/tiers";
import { FaCheck } from "react-icons/fa";

const Pricing = ({
  id,
  locale,
  langName,
}: {
  id: string;
  locale: any;
  langName: string;
}) => {
  const TIERS = ALL_TIERS[`TIERS_${langName.toUpperCase()}`];
  
  const isFeatured = (tier: any, index: number) => {
    return index === 1 || (typeof tier.price === 'number' && tier.price > 0);
  };

  return (
    <section id={id} className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          {locale.title}
        </h2>
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl text-primary">
          {locale.title2}
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {locale.description}
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {TIERS?.map((tier, index) => {
            const featured = isFeatured(tier, index);

            return(
                <Card
                    key={tier.title}
                    className={`flex flex-col transition duration-200 ease-in-out ${
                        featured ? "border-2 border-primary shadow-lg" : "border dark:border-zinc-800"
                    }`}
                >
                    <CardHeader className="flex-col items-start">
                        <h3 className="text-xl font-semibold">{tier.title}</h3>
                        <p className="text-small text-default-500">{tier.description}</p>
                    </CardHeader>

                    <CardBody className="flex-1 justify-start">
                        <div className="mb-6 mt-2 flex items-baseline justify-center gap-x-2">
                            {typeof tier.price === "number" ? (
                                <>
                                <span className="text-5xl font-bold tracking-tight text-foreground">
                                    ${tier.price}
                                </span>
                                <span className="text-sm font-semibold leading-6 tracking-wide text-default-500">
                                    /month
                                </span>
                                </>
                            ) : (
                                <span className="text-4xl font-bold tracking-tight text-foreground">
                                {tier.price}
                                </span>
                            )}
                        </div>

                        <ul className="space-y-3 text-sm">
                            {tier.features?.map((feature: string, i: number) => (
                                <li key={i} className="flex items-center gap-2">
                                <FaCheck className="h-4 w-4 text-primary" />
                                <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardBody>

                    <Divider />
                    
                    <CardFooter className="justify-center pt-4 pb-4">
                        {/* PERBAIKAN DI SINI:
                          Ganti `tier.href` dengan nama properti yang benar dari data Anda (misal: tier.url, tier.path).
                          Jika tidak ada properti untuk link, Anda bisa menggunakan link statis seperti "/register" atau "#".
                        */}
                        <Button
                            as={Link}
                            href={tier.href || "#"}
                            variant={featured ? "solid" : "bordered"}
                            color="primary"
                            className="w-full"
                            size="lg"
                        >
                            {tier.buttonText}
                        </Button>
                    </CardFooter>
                </Card>
            )
        })}
      </div>

       <div className="mx-auto mt-16 max-w-5xl text-center text-sm text-default-500">
        {locale.doYouLike}
        <Link href={siteConfig.links.github} className="font-medium text-primary underline underline-offset-4" >
          {` ${locale.follow}`}
        </Link>
      </div>
    </section>
  );
};

export default Pricing;
