"use client";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  Spacer,
} from "@nextui-org/react";
import { useState } from "react";
import { ALL_TIERS } from "@/config/tiers";
import { FaCheck } from "react-icons/fa";
import { RoughNotation } from "react-rough-notation";

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
  const [activePlan, setActivePlan] = useState<"standard" | "pro">("standard");

  return (
    <section
      id={id}
      className="flex flex-col justify-center max-w-4xl items-center pt-16"
    >
      <div className="flex flex-col text-center max-w-xl">
        <h2 className="text-center text-white">
          <RoughNotation type="highlight" show={true} color="#2563EB">
            {locale.title}
          </RoughNotation>
        </h2>
        <Spacer y={4} />
      </div>
      <Spacer y={4} />
      <ButtonGroup>
        <Button
          color={activePlan === "standard" ? "primary" : "default"}
          onPress={() => setActivePlan("standard")}
        >
          Standard
        </Button>
        <Button
          color={activePlan === "pro" ? "primary" : "default"}
          onPress={() => setActivePlan("pro")}
        >
          Pro
        </Button>
      </ButtonGroup>
      <Spacer y={6} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 justify-items-center">
        {TIERS?.slice(0, activePlan === "pro" ? 2 : 1).map((tier) => (
          <Card key={tier.key} className="p-3 flex-1 w-[90%]" shadow="md">
            <CardHeader className="flex flex-col items-start gap-2 pb-6">
              <h2 className="text-large font-medium">{tier.title}</h2>
              <p className="text-medium text-default-500">{tier.description}</p>
            </CardHeader>
            <Divider />
            <CardBody className="gap-8">
              <p className="flex items-baseline gap-1 pt-2">
                <span className="inline bg-gradient-to-br from-foreground to-foreground-600 bg-clip-text text-2xl font-semibold leading-7 tracking-tight text-transparent">
                  {tier.price}
                </span>
                {typeof tier.price !== "string" ? (
                  <span className="text-small font-medium text-default-400">
                    {tier.price}
                  </span>
                ) : null}
              </p>
              <ul className="flex flex-col gap-2">
                {tier.features?.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <FaCheck className="text-blue-500" />
                    <p className="text-default-500">{feature}</p>
                  </li>
                ))}
              </ul>
            </CardBody>
            <CardFooter>
              <Button
                fullWidth
                as={Link}
                color={tier.buttonColor}
                href={tier.href}
                variant={tier.buttonVariant}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                {tier.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Spacer y={12} />
    </section>
  );
};

export default Pricing;
