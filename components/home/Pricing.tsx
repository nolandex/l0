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
  ButtonGroup,
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

  const [activeTier, setActiveTier] = useState("standar");

  const filteredTiers = TIERS?.filter(
    (tier) => tier.category === activeTier
  );

  return (
    <section
      id={id}
      className="flex flex-col justify-center max-w-4xl items-center pt-16"
    >
      <div className="flex flex-col text-center max-w-xl">
        <h2 className="text-center text-white text-3xl font-semibold">
          <RoughNotation type="highlight" show={true} color="#2563EB">
            {locale.title}
          </RoughNotation>
        </h2>
      </div>

      <Spacer y={4} />

      <ButtonGroup isBordered variant="solid" color="primary">
        <Button
          onPress={() => setActiveTier("standar")}
          isDisabled={activeTier === "standar"}
        >
          Standar
        </Button>
        <Button
          onPress={() => setActiveTier("pro")}
          isDisabled={activeTier === "pro"}
        >
          Pro
        </Button>
      </ButtonGroup>

      <Spacer y={6} />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 justify-items-center w-full">
        {filteredTiers?.map((tier) => (
          <Card key={tier.key} className="p-3 flex-1 w-[90%]" shadow="md">
            <CardHeader className="flex flex-col items-start gap-2 pb-6">
              <h3 className="text-large font-medium">{tier.title}</h3>
              <p className="text-medium text-default-500">{tier.description}</p>
            </CardHeader>
            <Divider />
            <CardBody className="gap-8">
              <p className="flex items-baseline gap-1 pt-2">
                <span className="inline bg-gradient-to-br from-foreground to-foreground-600 bg-clip-text text-2xl font-semibold leading-7 tracking-tight text-transparent">
                  {tier.price}
                </span>
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
