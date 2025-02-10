import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategorySection from "./CategorySection";

interface ExpenseEntry {
  id: string;
  description: string;
  amount: number;
}

interface ExpenseTrackerProps {
  billsAndExpenses?: ExpenseEntry[];
  savings?: ExpenseEntry[];
  income?: ExpenseEntry[];
  onAddEntry?: (
    category: string,
    entry: { description: string; amount: number },
  ) => void;
}

const defaultBillsAndExpenses: ExpenseEntry[] = [
  { id: "1", description: "Rent", amount: 1500 },
  { id: "2", description: "Utilities", amount: 200 },
  { id: "3", description: "Internet", amount: 80 },
];

const defaultSavings: ExpenseEntry[] = [
  { id: "1", description: "Emergency Fund", amount: 500 },
  { id: "2", description: "Retirement", amount: 400 },
];

const defaultIncome: ExpenseEntry[] = [
  { id: "1", description: "Salary", amount: 4000 },
  { id: "2", description: "Freelance", amount: 1000 },
];

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({
  billsAndExpenses = defaultBillsAndExpenses,
  savings = defaultSavings,
  income = defaultIncome,
  onAddEntry = () => {},
}) => {
  return (
    <Card className="w-full bg-white p-6">
      <CardContent>
        <Tabs defaultValue="bills" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="bills">Bills & Expenses</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>

          <TabsContent value="bills" className="mt-0">
            <CategorySection
              title="Bills & Expenses"
              entries={billsAndExpenses}
              onAddEntry={(entry) => onAddEntry("bills", entry)}
            />
          </TabsContent>

          <TabsContent value="savings" className="mt-0">
            <CategorySection
              title="Savings"
              entries={savings}
              onAddEntry={(entry) => onAddEntry("savings", entry)}
            />
          </TabsContent>

          <TabsContent value="income" className="mt-0">
            <CategorySection
              title="Income"
              entries={income}
              onAddEntry={(entry) => onAddEntry("income", entry)}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExpenseTracker;
