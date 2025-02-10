import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BudgetCategory {
  name: string;
  amount: number;
  color: string;
  percentage: number;
}

interface BudgetAllocationChartProps {
  categories?: BudgetCategory[];
  totalBudget?: number;
}

const defaultCategories: BudgetCategory[] = [
  { name: "Housing", amount: 2000, color: "bg-teal-500", percentage: 40 },
  { name: "Food", amount: 800, color: "bg-purple-500", percentage: 16 },
  {
    name: "Transportation",
    amount: 500,
    color: "bg-coral-500",
    percentage: 10,
  },
  { name: "Utilities", amount: 400, color: "bg-blue-500", percentage: 8 },
  { name: "Entertainment", amount: 300, color: "bg-green-500", percentage: 6 },
  { name: "Other", amount: 1000, color: "bg-gray-500", percentage: 20 },
];

const BudgetAllocationChart = ({
  categories = defaultCategories,
  totalBudget = 5000,
}: BudgetAllocationChartProps) => {
  return (
    <Card className="p-6 bg-white w-[300px] h-[300px] flex flex-col justify-between">
      <div className="text-lg font-semibold mb-4">Budget Allocation</div>

      <div className="flex-grow">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-bold">
              ${totalBudget.toLocaleString()}
            </div>
          </div>

          <TooltipProvider>
            <div className="w-full h-full">
              {categories.map((category, index) => (
                <Tooltip key={category.name}>
                  <TooltipTrigger asChild>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{category.name}</span>
                        <span>${category.amount.toLocaleString()}</span>
                      </div>
                      <Progress
                        value={category.percentage}
                        className={`h-2 ${category.color}`}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{category.percentage}% of total budget</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>
      </div>
    </Card>
  );
};

export default BudgetAllocationChart;
