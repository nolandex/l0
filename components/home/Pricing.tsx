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
import { RoughNotation } from "react-rough-notation";

// Assume these are available or can be fetched similarly to the second snippet
// For demonstration, these are mock functions/data
const getCurrentSession = async () => ({ user: null }); // Mock function
const getUserSubscriptionPlan = async (userId: string) => null; // Mock function
const cn = (...classes: string[]) => classes.filter(Boolean).join(" "); // Simple utility for class names

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  title: string;
  description: string;
  price: number;
  isPro: boolean;
  features: PlanFeature[];
  buttonText: string; // Added to align with the first snippet's tier structure
}

// Re-defining plans to align with the structure of ALL_TIERS and the second snippet's content
const plans: Plan[] = [
  {
    title: "Free Plan",
    description: "Get started with the basics",
    price: 0,
    isPro: false,
    features: [
      { text: "Up to 3 projects", included: true },
      { text: "Basic analytics", included: true },
      { text: "Community support", included: true },
      { text: "Custom domains", included: false },
      { text: "Priority support", included: false },
    ],
    buttonText: "Get Started",
  },
  {
    title: "Pro Plan",
    description: "Unlock powerful features",
    price: 10,
    isPro: true,
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Community support", included: true },
      { text: "Custom domains", included: true },
      { text: "Priority email support", included: true },
    ],
    buttonText: "Get Started", // Will be dynamically changed based on user/subscription
  },
];

const Pricing = ({
  id,
  locale,
  langName,
}: {
  id: string;
  locale: any;
  langName: string;
}) => {
  // We will use the 'plans' array directly for demonstration,
  // but you can integrate ALL_TIERS and locale similarly if needed.
  // const TIERS = ALL_TIERS[`TIERS_${langName.toUpperCase()}`];

  // Mock locale for demonstration purposes
  const mockLocale = {
    title: "Pricing",
    title2: "Choose the plan that’s right for you and start building.",
    description: "",
    doYouLike: "Do you like what you see?",
    follow: "Follow us on social media!",
  };

  // State or async fetch for user and subscription would happen here in a real app
  // For this example, we'll keep them as mock results for immediate rendering.
  const user = null; // Replace with actual session user
  const subscription = null; // Replace with actual subscription status

  return (
    <section id={id} className="container py-8">
      <div className="mx-auto flex max-w-lg flex-col items-center pb-8 pt-6 text-center lg:max-w-2xl">
        <h2 className="text-3xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {mockLocale.title}
        </h2>
        <Spacer y={4} />
        <p className="max-w-[750px] text-lg text-default-500 sm:text-xl">
          {mockLocale.title2}
        </p>
        {mockLocale.description && (
          <p className="max-w-[750px] text-lg text-default-500 sm:text-xl">
            {mockLocale.description}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        {plans.map((plan) => {
          const isCurrentPlan = subscription
            ? plan.isPro === subscription.isPro
            : false;

          let buttonLink = "/login";
          let buttonText = plan.buttonText;
          let buttonVariant: "solid" | "bordered" | "flat" | "faded" | "light" | "shadow" | "ghost" = "bordered";

          if (plan.isPro) {
            buttonLink = user ? "/dashboard/billing" : "/login";
            if (user) {
              buttonText = subscription?.isPro ? "Manage Plan" : "Upgrade to Pro";
            } else {
              buttonText = "Get Started";
            }
            buttonVariant = "solid";
          } else {
            if (user && subscription) {
              // If user is logged in and has a subscription, and this is the free plan,
              // we don't show a button or handle it differently.
              // For this example, we'll hide the button if the user has a plan and it's not pro
              if (!subscription.isPro) {
                 return null; // Don't render button for current free plan if user has one
              }
            }
            buttonVariant = "bordered";
          }


          return (
            <Card
              key={plan.title}
              className={cn(
                "relative flex flex-col transition duration-200 ease-in-out",
                {
                  "border-2 border-primary shadow-lg": plan.isPro,
                  "border": !plan.isPro,
                }
              )}
            >
              <CardHeader className="flex flex-col items-start gap-2 p-6">
                <h3 className="text-2xl font-bold">{plan.title}</h3>
                {isCurrentPlan && (
                  <span className="absolute right-4 top-4 rounded-full border border-default px-3 py-1 text-xs font-semibold">
                    Current Plan
                  </span>
                )}
                <p className="text-default-500">{plan.description}</p>
              </CardHeader>
              <CardBody className="flex-1 p-6">
                <p className="mb-6 mt-2 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-primary">
                    ${plan.price}
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-default-500">
                    /month
                  </span>
                </p>
                <ul className="space-y-3 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FaCheck
                        className={cn(
                          "h-5 w-5",
                          feature.included ? "text-primary" : "text-default-400"
                        )}
                      />
                      <span
                        className={cn({
                          "text-default-400 line-through": !feature.included,
                        })}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardBody>
              <CardFooter className="justify-center pt-6">
                {(plan.isPro || (!user || !subscription?.isPro)) && (
                  <Button
                    as={Link}
                    href={buttonLink}
                    size="lg"
                    className="w-full"
                    color={plan.isPro ? "primary" : "default"}
                    variant={buttonVariant}
                  >
                    {buttonText}
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <Spacer y={8} />

      <div className="flex flex-col items-center py-8">
        <p className="text-xl text-default-500">
          {mockLocale.doYouLike} <RoughNotation type="highlight" show={true} color="#FDE68A">
            {mockLocale.follow}
          </RoughNotation>
        </p>
        <Spacer y={4} />
        {/* Social media links from siteConfig can be added here */}
      </div>
    </section>
  );
};

export default Pricing;
