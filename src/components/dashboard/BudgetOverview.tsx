import React from "react";
import BudgetAllocationChart from "./BudgetAllocationChart";
import SavingsGoalsTracker from "./SavingsGoalsTracker";
import { Card, CardContent } from "@/components/ui/card";

interface BudgetOverviewProps {
  budgetData?: {
    categories: Array<{
      name: string;
      amount: number;
      color: string;
      percentage: number;
    }>;
    totalBudget: number;
  };
  savingsGoals?: Array<{
    name: string;
    target: number;
    current: number;
    color: string;
  }>;
}

const defaultBudgetData = {
  categories: [
    { name: "Housing", amount: 2000, color: "bg-teal-500", percentage: 40 },
    { name: "Food", amount: 800, color: "bg-purple-500", percentage: 16 },
    {
      name: "Transportation",
      amount: 500,
      color: "bg-coral-500",
      percentage: 10,
    },
    { name: "Utilities", amount: 400, color: "bg-blue-500", percentage: 8 },
    {
      name: "Entertainment",
      amount: 300,
      color: "bg-green-500",
      percentage: 6,
    },
    { name: "Other", amount: 1000, color: "bg-gray-500", percentage: 20 },
  ],
  totalBudget: 5000,
};

const defaultSavingsGoals = [
  {
    name: "Emergency Fund",
    target: 10000,
    current: 6500,
    color: "bg-teal-500",
  },
  {
    name: "Vacation",
    target: 5000,
    current: 2000,
    color: "bg-purple-500",
  },
  {
    name: "New Car",
    target: 20000,
    current: 8000,
    color: "bg-coral-500",
  },
];

const BudgetOverview = ({
  budgetData = defaultBudgetData,
  savingsGoals = defaultSavingsGoals,
}: BudgetOverviewProps) => {
  return (
    <Card className="w-full bg-white p-6">
      <CardContent>
        <div className="text-2xl font-bold mb-6">Budget Overview</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex justify-center">
            <BudgetAllocationChart
              categories={budgetData.categories}
              totalBudget={budgetData.totalBudget}
            />
          </div>
          <div className="flex justify-center">
            <SavingsGoalsTracker goals={savingsGoals} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetOverview;
