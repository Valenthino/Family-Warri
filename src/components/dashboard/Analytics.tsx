import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpendingChart from "./SpendingChart";
import { BarChart3, PieChart, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface AnalyticsProps {
  spendingData?: {
    categories: Array<{
      name: string;
      amount: number;
      percentage: number;
    }>;
    total: number;
  };
  trendData?: Array<{
    month: string;
    spending: number;
    budget: number;
  }>;
}

const defaultTrendData = [
  { month: "Jan", spending: 3200, budget: 4000 },
  { month: "Feb", spending: 3800, budget: 4000 },
  { month: "Mar", spending: 3500, budget: 4000 },
  { month: "Apr", spending: 4200, budget: 4000 },
  { month: "May", spending: 3700, budget: 4000 },
  { month: "Jun", spending: 3900, budget: 4000 },
];

const defaultSpendingData = {
  categories: [
    { name: "Housing", amount: 1500, percentage: 35 },
    { name: "Food", amount: 600, percentage: 15 },
    { name: "Transportation", amount: 400, percentage: 10 },
    { name: "Utilities", amount: 300, percentage: 8 },
    { name: "Entertainment", amount: 200, percentage: 5 },
  ],
  total: 3000,
};

const Analytics = ({
  spendingData = defaultSpendingData,
  trendData = defaultTrendData,
}: AnalyticsProps) => {
  return (
    <div className="w-full bg-white p-6 space-y-6">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl font-bold">Analytics Overview</CardTitle>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Spending Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SpendingChart data={spendingData} />
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Spending Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="spending"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="budget"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
