import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import BudgetOverview from "./dashboard/BudgetOverview";
import ExpenseTracker from "./dashboard/ExpenseTracker";
import Analytics from "./dashboard/Analytics";

interface HomeProps {
  userData?: {
    name: string;
    email: string;
    avatarUrl: string;
  };
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
  expenses?: {
    bills: Array<{ id: string; description: string; amount: number }>;
    savings: Array<{ id: string; description: string; amount: number }>;
    income: Array<{ id: string; description: string; amount: number }>;
  };
  analyticsData?: {
    spending: {
      categories: Array<{
        name: string;
        amount: number;
        percentage: number;
      }>;
      total: number;
    };
    trends: Array<{
      month: string;
      spending: number;
      budget: number;
    }>;
  };
}

const defaultUserData = {
  name: "John Doe",
  email: "john@example.com",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
};

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
  { name: "Vacation", target: 5000, current: 2000, color: "bg-purple-500" },
  { name: "New Car", target: 20000, current: 8000, color: "bg-coral-500" },
];

const defaultExpenses = {
  bills: [
    { id: "1", description: "Rent", amount: 1500 },
    { id: "2", description: "Utilities", amount: 200 },
    { id: "3", description: "Internet", amount: 80 },
  ],
  savings: [
    { id: "1", description: "Emergency Fund", amount: 500 },
    { id: "2", description: "Retirement", amount: 400 },
  ],
  income: [
    { id: "1", description: "Salary", amount: 4000 },
    { id: "2", description: "Freelance", amount: 1000 },
  ],
};

const defaultAnalyticsData = {
  spending: {
    categories: [
      { name: "Housing", amount: 1500, percentage: 35 },
      { name: "Food", amount: 600, percentage: 15 },
      { name: "Transportation", amount: 400, percentage: 10 },
      { name: "Utilities", amount: 300, percentage: 8 },
      { name: "Entertainment", amount: 200, percentage: 5 },
    ],
    total: 3000,
  },
  trends: [
    { month: "Jan", spending: 3200, budget: 4000 },
    { month: "Feb", spending: 3800, budget: 4000 },
    { month: "Mar", spending: 3500, budget: 4000 },
    { month: "Apr", spending: 4200, budget: 4000 },
    { month: "May", spending: 3700, budget: 4000 },
    { month: "Jun", spending: 3900, budget: 4000 },
  ],
};

import { useBudget } from "../hooks/useBudget";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

const Home = ({
  userData = defaultUserData,
  budgetData = defaultBudgetData,
  savingsGoals = defaultSavingsGoals,
  expenses = defaultExpenses,
  analyticsData = defaultAnalyticsData,
}: HomeProps) => {
  const { user } = useAuth();
  const {
    loading,
    error,
    data,
    addIncomeSource,
    addExpense,
    updateSavingsGoal,
  } = useBudget();
  const handleMenuClick = () => {
    console.log("Menu clicked");
  };

  const handleNotificationsClick = () => {
    console.log("Notifications clicked");
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
  };

  const handleLogoutClick = async () => {
    await supabase.auth.signOut();
  };

  const handleAddEntry = (
    category: string,
    entry: { description: string; amount: number },
  ) => {
    console.log("Adding entry to category:", category, entry);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader
        userName={userData.name}
        userEmail={userData.email}
        avatarUrl={userData.avatarUrl}
        onMenuClick={handleMenuClick}
        onNotificationsClick={handleNotificationsClick}
        onSettingsClick={handleSettingsClick}
        onLogoutClick={handleLogoutClick}
      />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <BudgetOverview budgetData={budgetData} savingsGoals={savingsGoals} />

        <ExpenseTracker
          billsAndExpenses={expenses.bills}
          savings={expenses.savings}
          income={expenses.income}
          onAddEntry={handleAddEntry}
        />

        <Analytics
          spendingData={analyticsData.spending}
          trendData={analyticsData.trends}
        />
      </main>
    </div>
  );
};

export default Home;
