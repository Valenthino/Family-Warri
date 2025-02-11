export interface BudgetItem {
  name: string;
  period: string;
  amount: number;
  type?: string;
}

export const convertToMonthly = (amount: number, period: string): number => {
  switch (period.toLowerCase()) {
    case "weekly":
      return (amount * 52) / 12;
    case "every 2 weeks":
      return (amount * 26) / 12;
    case "monthly":
      return amount;
    case "annually":
      return amount / 12;
    default:
      return amount;
  }
};

export const calculateMonthlyTotals = (items: BudgetItem[]): number => {
  return items.reduce((total, item) => {
    return total + convertToMonthly(item.amount, item.period);
  }, 0);
};

export const calculateSavingsRate = (
  income: number,
  savings: number,
): number => {
  return income > 0 ? (savings / income) * 100 : 0;
};

export const calculateDebtToIncomeRatio = (
  monthlyDebt: number,
  monthlyIncome: number,
): number => {
  return monthlyIncome > 0 ? (monthlyDebt / monthlyIncome) * 100 : 0;
};

export const calculateEmergencyFundRatio = (
  emergencyFund: number,
  monthlyExpenses: number,
): number => {
  return monthlyExpenses > 0 ? emergencyFund / monthlyExpenses : 0;
};

export const calculateDiscretionaryIncome = (
  monthlyIncome: number,
  monthlyExpenses: number,
  monthlySavings: number,
  monthlyDebt: number,
): number => {
  return monthlyIncome - monthlyExpenses - monthlySavings - monthlyDebt;
};

export const calculateProjectedSavings = (
  currentSavings: number,
  monthlySavings: number,
  months: number,
  interestRate: number = 0.02, // Default 2% annual interest rate
): number => {
  const monthlyRate = interestRate / 12;
  return (
    currentSavings * Math.pow(1 + monthlyRate, months) +
    monthlySavings * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  );
};

export const getFinancialHealthScore = (
  savingsRate: number,
  debtToIncomeRatio: number,
  emergencyFundRatio: number,
): number => {
  // Weights for different factors
  const savingsWeight = 0.4;
  const debtWeight = 0.3;
  const emergencyWeight = 0.3;

  // Score calculations (0-100 for each)
  const savingsScore = Math.min(savingsRate * 5, 100); // 20% savings rate = 100
  const debtScore = Math.max(100 - debtToIncomeRatio * 2, 0); // 50% DTI = 0
  const emergencyScore = Math.min(emergencyFundRatio * 16.67, 100); // 6 months = 100

  return (
    savingsScore * savingsWeight +
    debtScore * debtWeight +
    emergencyScore * emergencyWeight
  );
};
