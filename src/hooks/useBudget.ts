import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import * as api from "@/lib/api";

export function useBudget() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState({
    incomeSources: [],
    savingsGoals: [],
    expenses: [],
    currentPeriod: null,
  });

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const period = day <= 15 ? "FIRST_HALF" : "SECOND_HALF";

        const [incomeSources, savingsGoals, expenses, currentPeriod] =
          await Promise.all([
            api.getIncomeSources(user.id),
            api.getSavingsGoals(user.id),
            api.getExpenses(user.id),
            api.getBudgetPeriod(user.id, year, month, period),
          ]);

        setData({ incomeSources, savingsGoals, expenses, currentPeriod });
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const addIncomeSource = async (
    source: Parameters<typeof api.addIncomeSource>[1],
  ) => {
    if (!user) return;
    try {
      const newSource = await api.addIncomeSource(user.id, source);
      setData((prev) => ({
        ...prev,
        incomeSources: [newSource, ...prev.incomeSources],
      }));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    }
  };

  const addExpense = async (expense: Parameters<typeof api.addExpense>[1]) => {
    if (!user) return;
    try {
      const newExpense = await api.addExpense(user.id, expense);
      setData((prev) => ({
        ...prev,
        expenses: [newExpense, ...prev.expenses],
      }));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    }
  };

  const updateSavingsGoal = async (goalId: string, amount: number) => {
    if (!user) return;
    try {
      const updatedGoal = await api.updateSavingsGoal(user.id, goalId, amount);
      setData((prev) => ({
        ...prev,
        savingsGoals: prev.savingsGoals.map((goal) =>
          goal.id === goalId ? updatedGoal : goal,
        ),
      }));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    }
  };

  return {
    loading,
    error,
    data,
    addIncomeSource,
    addExpense,
    updateSavingsGoal,
  };
}
