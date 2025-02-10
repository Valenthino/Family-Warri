import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface SpendingChartProps {
  data?: {
    categories: Array<{
      name: string;
      amount: number;
      percentage: number;
    }>;
    total: number;
  };
}

const defaultData = {
  categories: [
    { name: "Housing", amount: 1500, percentage: 35 },
    { name: "Food", amount: 600, percentage: 15 },
    { name: "Transportation", amount: 400, percentage: 10 },
    { name: "Utilities", amount: 300, percentage: 8 },
    { name: "Entertainment", amount: 200, percentage: 5 },
  ],
  total: 3000,
};

const SpendingChart = ({ data = defaultData }: SpendingChartProps) => {
  return (
    <Card className="p-6 bg-white w-full max-w-[400px]">
      <h3 className="text-lg font-semibold mb-4">Spending Breakdown</h3>

      <Tabs defaultValue="bar" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          <TabsTrigger value="pie">Pie Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="bar" className="space-y-4">
          {data.categories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{category.name}</span>
                <span>${category.amount}</span>
              </div>
              <Progress value={category.percentage} className="h-2" />
            </div>
          ))}
        </TabsContent>

        <TabsContent
          value="pie"
          className="h-[300px] flex items-center justify-center"
        >
          <div className="text-center text-sm text-muted-foreground">
            Pie chart visualization would go here
            <br />
            (Using a charting library like Recharts or Chart.js)
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between">
          <span className="font-medium">Total Spending</span>
          <span className="font-semibold">${data.total}</span>
        </div>
      </div>
    </Card>
  );
};

export default SpendingChart;
