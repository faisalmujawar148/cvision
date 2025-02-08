import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    features: ["CV analysis", "Job description matching", "Browser extension", "Up to 5 job comparisons/month"],
  },
  {
    name: "Pro",
    price: "$19.99",
    features: ["All Basic features", "Unlimited job comparisons", "Skill gap analysis", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["All Pro features", "Custom AI model training", "API access", "Dedicated account manager"],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Choose Your Plan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="border border-gray-700 rounded-lg p-6 bg-gray-800">
              <h3 className="text-xl font-semibold mb-2 text-white">{plan.name}</h3>
              <p className="text-3xl font-bold mb-4 text-blue-400">{plan.price}</p>
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

