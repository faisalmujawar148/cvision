import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    features: ["Resume analysis", "Job description matching", "Basic tailoring suggestions"],
  },
  {
    name: "Pro",
    price: "$19.99",
    features: [
      "All Basic features",
      "Advanced tailoring suggestions",
      "Unlimited resume versions",
      "Project recommendations",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["All Pro features", "API access", "Custom integrations", "Dedicated support"],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-card p-8 rounded-lg border border-border shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-foreground">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6 text-primary">{plan.price}</p>
              <ul className="mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2 text-muted-foreground">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

