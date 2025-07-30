import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Star, Zap } from "lucide-react";

export function PricingSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[rgb(11,12,13)] dark:to-[rgb(21,22,23)] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get started with Mandarino today. Choose the plan that works best
            for you.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="relative border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center pb-8">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-slate-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                Mandarino Free
              </CardTitle>
              <CardDescription className="text-slate-600 mt-2">
                Perfect for getting started and trying out our platform
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <div className="mb-8">
                <span className="text-5xl font-bold text-slate-900">$0</span>
                <span className="text-slate-600 ml-2">/month</span>
              </div>
              <ul className="space-y-4 text-left">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">1 month free trial</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">
                    Basic features included
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Community support</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Up to 3 projects</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full h-12 text-base font-semibold bg-transparent"
              >
                Get Started Free
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="relative border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl shadow-lg">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1">
              Most Popular
            </Badge>
            <CardHeader className="text-center pb-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                Mandarino Pro
              </CardTitle>
              <CardDescription className="text-slate-600 mt-2">
                Everything you need for professional use, yours forever
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <div className="mb-8">
                <span className="text-5xl font-bold text-slate-900">$501</span>
                <span className="text-slate-600 ml-2">one-time</span>
              </div>
              <ul className="space-y-4 text-left">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">
                    Everything in Free plan
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Unlimited projects</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Priority support</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">Lifetime updates</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700">
                Get Pro Access
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* FAQ or Additional Info */}
        <div className="text-center mt-16">
          <p className="text-slate-600 mb-4">
            {`Need help choosing? We're here to help you find the perfect plan.`}
          </p>
          <Button
            variant="ghost"
            className="text-emerald-600 hover:text-emerald-700"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
}
