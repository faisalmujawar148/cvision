import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    features: ["Job description analysis", "Resume customization", "Browser extension", "Email support"],
  },
  {
    name: "Pro",
    price: "$19.99",
    features: ["All Basic features", "Project suggestions", "AI-powered insights", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["All Pro features", "Team collaboration", "API access", "Dedicated account manager"],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md flex flex-col">
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">
                {plan.price}
                <span className="text-sm font-normal">/month</span>
              </p>
              <ul className="mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant={index === 1 ? "default" : "outline"} className="w-full">
                {index === 2 ? "Contact Sales" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

