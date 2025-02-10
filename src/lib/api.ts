import { supabase } from "./supabase";

// Income Sources
export async function getIncomeSources(userId: string) {
  const { data, error } = await supabase
    .from("income_sources")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addIncomeSource(
  userId: string,
  source: {
    source_type: "HUSBAND" | "WIFE" | "SIDE_HUSTLE" | "GIFT" | "MISC";
    amount: number;
    description?: string;
    date: string;
  },
) {
  const { data, error } = await supabase
    .from("income_sources")
    .insert([{ ...source, user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Savings Goals
export async function getSavingsGoals(userId: string) {
  const { data, error } = await supabase
    .from("savings_goals")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
}

export async function updateSavingsGoal(
  userId: string,
  goalId: string,
  amount: number,
) {
  const { data, error } = await supabase
    .from("savings_goals")
    .update({ current_amount: amount })
    .eq("id", goalId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Expenses
export async function getExpenses(
  userId: string,
  startDate?: string,
  endDate?: string,
) {
  let query = supabase
    .from("expenses")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (startDate) query = query.gte("date", startDate);
  if (endDate) query = query.lte("date", endDate);

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function addExpense(
  userId: string,
  expense: {
    category: "BILLS" | "SAVINGS" | "TITHE";
    subcategory?: string;
    amount: number;
    description?: string;
    date: string;
    payment_period?: "BIWEEKLY" | "MONTHLY";
  },
) {
  const { data, error } = await supabase
    .from("expenses")
    .insert([{ ...expense, user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Budget Periods
export async function getBudgetPeriod(
  userId: string,
  year: number,
  month: number,
  period: "FIRST_HALF" | "SECOND_HALF",
) {
  const { data, error } = await supabase
    .from("budget_periods")
    .select("*")
    .eq("user_id", userId)
    .eq("year", year)
    .eq("month", month)
    .eq("period", period)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function updateBudgetPeriod(
  userId: string,
  year: number,
  month: number,
  period: "FIRST_HALF" | "SECOND_HALF",
  totals: {
    total_income: number;
    total_expenses: number;
    total_savings: number;
    total_tithe: number;
    remainder: number;
  },
) {
  const { data, error } = await supabase
    .from("budget_periods")
    .upsert({
      user_id: userId,
      year,
      month,
      period,
      ...totals,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
