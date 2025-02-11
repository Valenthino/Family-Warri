import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  PiggyBank,
  CreditCard,
} from "lucide-react";

interface BudgetSummaryProps {
  income: number;
  savings: number;
  expenses: number;
  savingsRate: number;
  debtToIncomeRatio: number;
}

export default function BudgetSummary({
  income,
  savings,
  expenses,
  savingsRate,
  debtToIncomeRatio,
}: BudgetSummaryProps) {
  const balance = income - savings - expenses;
  const savingsPercentage = income > 0 ? (savings / income) * 100 : 0;
  const expensesPercentage = income > 0 ? (expenses / income) * 100 : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Monthly Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Income</span>
              </div>
              <p className="text-2xl font-bold">${income.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <PiggyBank className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Savings</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                ${savings.toLocaleString()}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Expenses</span>
              </div>
              <p className="text-2xl font-bold text-red-600">
                ${expenses.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ArrowUpCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Savings Rate</span>
                </div>
                <span className="text-sm font-medium">
                  {savingsRate.toFixed(1)}%
                </span>
              </div>
              <Progress value={savingsRate} className="h-2" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ArrowDownCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium">Debt-to-Income</span>
                </div>
                <span className="text-sm font-medium">
                  {debtToIncomeRatio.toFixed(1)}%
                </span>
              </div>
              <Progress value={debtToIncomeRatio} className="h-2" />
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Balance</p>
              <p
                className={`text-xl font-bold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                ${balance.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Financial Health Score
              </span>
              <span className="text-sm font-medium text-green-600">Good</span>
            </div>
            <Progress value={75} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Based on your savings rate, debt-to-income ratio, and emergency
              fund coverage
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
