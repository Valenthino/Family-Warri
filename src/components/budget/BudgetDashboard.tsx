import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart3,
  Download,
  Filter,
  Plus,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
  time: string;
}

export default function BudgetDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("M");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const chartData = [
    { month: "Jan", amount: 3600 },
    { month: "Feb", amount: 1200 },
    { month: "Mar", amount: 2400 },
    { month: "Apr", amount: 1800 },
    { month: "May", amount: 3200 },
    { month: "Jun", amount: 2800 },
    { month: "Jul", amount: 2671 },
    { month: "Aug", amount: 2400 },
    { month: "Sep", amount: 1398 },
    { month: "Oct", amount: 2400 },
    { month: "Nov", amount: 3200 },
    { month: "Dec", amount: 1400 },
  ];

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "expense",
      category: "Food",
      amount: 24,
      date: "Today",
      time: "18:52",
    },
    {
      id: "2",
      type: "income",
      category: "Salary",
      amount: 4800,
      date: "Yesterday",
      time: "09:16",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">CURRENT BALANCE</p>
              <h2 className="text-2xl font-bold">$24,359</h2>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">TOTAL EXPENSES</p>
              <h2 className="text-2xl font-bold text-red-500">$38,544</h2>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">TOTAL INCOME</p>
              <h2 className="text-2xl font-bold text-green-500">$62,903</h2>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overview Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Overview</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedPeriod("Y")}
            >
              Y
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedPeriod("M")}
            >
              M
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedPeriod("W")}
            >
              W
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedPeriod("D")}
            >
              D
            </Button>
            <Button variant="outline" size="sm">
              All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transactions</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    {transaction.type === "income" ? (
                      <ArrowUpCircle className="h-8 w-8 text-green-500" />
                    ) : (
                      <ArrowDownCircle className="h-8 w-8 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">{transaction.category}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date} {transaction.time}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`font-medium ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
