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
import { useListProductsQuery } from "./hooks/use-list-products-query";
import { useListUserPlansQuery } from "./hooks/use-list-user-plans-query";
import { formatPrice } from "./utils/format-price";

export function PricingSection() {
  const { data: products, isLoading } = useListProductsQuery();
  const { data: userPlans, isLoading: isPlansLoading } =
    useListUserPlansQuery();

  const proProduct = products?.result?.items?.find(
    (item) => item?.name === "Mandarino Pro"
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[rgb(11,12,13)] dark:to-[rgb(21,22,23)] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Get started with Mandarino today. Choose the plan that works best
            for you.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="relative h-full flex flex-col border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-lg dark:hover:shadow-2xl bg-white dark:bg-[rgb(29,30,31)]">
            <CardHeader className="text-center pb-8">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-slate-600 dark:text-slate-300" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                Mandarino Free
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 mt-2">
                Perfect for getting started and trying out our platform
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8 flex-grow">
              <div className="mb-8">
                <span className="text-5xl font-bold text-slate-900 dark:text-white">
                  $0
                </span>
                <span className="text-slate-600 dark:text-slate-400 ml-2">
                  /month
                </span>
              </div>
              <ul className="space-y-4 text-left">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">
                    1 month free trial
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Basic features included
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Community support
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Up to 3 projects
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full h-12 text-base font-semibold bg-transparent border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Get Started Free
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="relative h-full flex flex-col border-2 border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl shadow-lg dark:shadow-emerald-900/20 bg-white dark:bg-[rgb(24,25,26)]">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-4 py-1">
              Most Popular
            </Badge>
            <CardHeader className="text-center pb-8">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                {proProduct?.name}
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 mt-2">
                Pay once, yours forever
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8 flex-grow">
              <div className="mb-8">
                <span className="text-5xl font-bold text-slate-900 dark:text-white">
                  {formatPrice(
                    proProduct?.prices[0].amountType === "free"
                      ? 0
                      : (proProduct?.prices[0].amountType === "fixed" &&
                          proProduct?.prices[0].priceAmount) ||
                          0
                  )}
                </span>
                <span className="text-slate-600 dark:text-slate-400 ml-2">
                  one-time
                </span>
              </div>
              <ul className="space-y-4 text-left">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Everything in Free plan
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Unlimited projects
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Priority support
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Advanced analytics
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Custom integrations
                  </span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">
                    Lifetime updates
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white">
                Get Pro Access
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* FAQ or Additional Info */}
        <div className="text-center mt-16">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {`Need help choosing? We're here to help you find the perfect plan.`}
          </p>
          <Button
            variant="ghost"
            className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
}
