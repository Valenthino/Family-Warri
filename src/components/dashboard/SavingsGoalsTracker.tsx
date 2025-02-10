import React from "react";
import { Progress } from "../ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface SavingsGoal {
  name: string;
  target: number;
  current: number;
  color: string;
}

interface SavingsGoalsTrackerProps {
  goals?: SavingsGoal[];
}

const defaultGoals: SavingsGoal[] = [
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

const SavingsGoalsTracker: React.FC<SavingsGoalsTrackerProps> = ({
  goals = defaultGoals,
}) => {
  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Savings Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal, index) => {
          const progress = (goal.current / goal.target) * 100;

          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{goal.name}</span>
                <span className="text-sm text-gray-500">
                  ${goal.current.toLocaleString()} / $
                  {goal.target.toLocaleString()}
                </span>
              </div>
              <Progress
                value={progress}
                className="h-2"
                indicatorClassName={goal.color}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SavingsGoalsTracker;
