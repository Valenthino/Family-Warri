import { useState } from "react";
import { format } from "date-fns";
import {
  BudgetItem,
  calculateMonthlyTotals,
  calculateSavingsRate,
  calculateDebtToIncomeRatio,
  getFinancialHealthScore,
} from "./BudgetFormulas";
import BudgetDashboard from "./BudgetDashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BudgetCategory from "./BudgetCategory";
import BudgetSummary from "./BudgetSummary";
import BudgetPeriodSelector from "./BudgetPeriodSelector";
import { Button } from "@/components/ui/button";
import { Save, AlertCircle, HelpCircle, FileSpreadsheet } from "lucide-react";

interface CategoryData {
  [key: string]: BudgetItem[];
}

export default function BudgetPlanner() {
  const [showTips, setShowTips] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("first");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [budgetData, setBudgetData] = useState<CategoryData>({
    income: [
      { name: "My net income", period: "Every 2 weeks", amount: 0 },
      { name: "Spouse's net income", period: "Every 2 weeks", amount: 0 },
      { name: "Side hustle", period: "Monthly", amount: 0 },
    ],
    savings: [
      { name: "Emergency fund", period: "Monthly", type: "CASH", amount: 0 },
      { name: "Retirement", period: "Monthly", type: "RRSP", amount: 0 },
      { name: "Investment", period: "Monthly", type: "TFSA", amount: 0 },
    ],
    expenses: [
      { name: "Rent/Mortgage", period: "Monthly", amount: 0 },
      { name: "Utilities", period: "Monthly", amount: 0 },
      { name: "Internet", period: "Monthly", amount: 0 },
      { name: "Phone", period: "Monthly", amount: 0 },
      { name: "Insurance", period: "Monthly", amount: 0 },
    ],
    food: [
      { name: "Groceries", period: "Weekly", amount: 0 },
      { name: "Restaurants", period: "Weekly", amount: 0 },
      { name: "Coffee & Snacks", period: "Weekly", amount: 0 },
    ],
    debt: [
      { name: "Credit card", period: "Monthly", amount: 0 },
      { name: "Line of credit", period: "Monthly", amount: 0 },
      { name: "Student loan", period: "Monthly", amount: 0 },
    ],
  });

  const handleItemChange = (category: string, index: number, value: number) => {
    setBudgetData((prev) => ({
      ...prev,
      [category]: prev[category].map((item, i) =>
        i === index ? { ...item, amount: value } : item,
      ),
    }));
  };

  const calculateTotals = () => {
    const income = calculateMonthlyTotals(budgetData.income);
    const savings = calculateMonthlyTotals(budgetData.savings);
    const expenses =
      calculateMonthlyTotals(budgetData.expenses) +
      calculateMonthlyTotals(budgetData.food) +
      calculateMonthlyTotals(budgetData.debt);

    return { income, savings, expenses };
  };

  const totals = calculateTotals();
  const savingsRate = calculateSavingsRate(totals.income, totals.savings);
  const debtToIncomeRatio = calculateDebtToIncomeRatio(
    calculateMonthlyTotals(budgetData.debt),
    totals.income,
  );

  const handleSaveBudget = () => {
    const budgetName = `Budget_${format(selectedDate, "MMM_yyyy")}_${selectedPeriod === "first" ? "1-15" : "16-31"}`;
    // TODO: Implement save logic
    console.log("Saving budget:", budgetName);
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-3 space-y-6">
        <BudgetPeriodSelector
          onPeriodChange={setSelectedPeriod}
          onDateChange={setSelectedDate}
        />
        <BudgetDashboard />
      </div>

      <div className="col-span-12 lg:col-span-9">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Budget Planner</h1>
            <p className="text-muted-foreground">
              {format(selectedDate, "MMMM yyyy")} (
              {selectedPeriod === "first" ? "1st-15th" : "16th-End"})
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowTips(!showTips)}>
              <HelpCircle className="w-4 h-4 mr-2" />
              Tips
            </Button>
            <Button variant="outline">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleSaveBudget}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {showTips && (
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-2">Budget Planning Tips</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Start with your income and essential expenses</li>
                    <li>Aim to save at least 20% of your income</li>
                    <li>Track your spending regularly</li>
                    <li>Plan for irregular expenses</li>
                    <li>Include an emergency fund in your savings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <Card>
              <Tabs defaultValue="income" className="w-full">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="income">Income</TabsTrigger>
                  <TabsTrigger value="savings">Savings</TabsTrigger>
                  <TabsTrigger value="expenses">Expenses</TabsTrigger>
                  <TabsTrigger value="debt">Debt</TabsTrigger>
                </TabsList>

                <CardContent className="pt-6">
                  <TabsContent value="income" className="mt-0">
                    <BudgetCategory
                      title="Income Sources"
                      items={budgetData.income}
                      onItemChange={(index, value) =>
                        handleItemChange("income", index, value)
                      }
                    />
                  </TabsContent>

                  <TabsContent value="savings" className="mt-0">
                    <BudgetCategory
                      title="Savings & Investments"
                      items={budgetData.savings}
                      onItemChange={(index, value) =>
                        handleItemChange("savings", index, value)
                      }
                    />
                  </TabsContent>

                  <TabsContent value="expenses" className="mt-0 space-y-6">
                    <BudgetCategory
                      title="Fixed Expenses"
                      items={budgetData.expenses}
                      onItemChange={(index, value) =>
                        handleItemChange("expenses", index, value)
                      }
                    />
                    <BudgetCategory
                      title="Food & Dining"
                      items={budgetData.food}
                      onItemChange={(index, value) =>
                        handleItemChange("food", index, value)
                      }
                    />
                  </TabsContent>

                  <TabsContent value="debt" className="mt-0">
                    <BudgetCategory
                      title="Debt Payments"
                      items={budgetData.debt}
                      onItemChange={(index, value) =>
                        handleItemChange("debt", index, value)
                      }
                    />
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <BudgetSummary
              income={totals.income}
              savings={totals.savings}
              expenses={totals.expenses}
              savingsRate={savingsRate}
              debtToIncomeRatio={debtToIncomeRatio}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
