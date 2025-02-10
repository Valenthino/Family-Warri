import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

interface CategorySectionProps {
  title?: string;
  entries?: Array<{ id: string; description: string; amount: number }>;
  onAddEntry?: (entry: { description: string; amount: number }) => void;
}

const CategorySection = ({
  title = "Bills & Expenses",
  entries = [
    { id: "1", description: "Rent", amount: 1200 },
    { id: "2", description: "Utilities", amount: 150 },
    { id: "3", description: "Internet", amount: 80 },
  ],
  onAddEntry = () => {},
}: CategorySectionProps) => {
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description && amount) {
      onAddEntry({
        description,
        amount: parseFloat(amount),
      });
      setDescription("");
      setAmount("");
    }
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Existing Entries */}
          <div className="space-y-2">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
              >
                <span className="text-gray-700">{entry.description}</span>
                <span className="font-medium text-gray-900">
                  ${entry.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Add New Entry Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full"
                step="0.01"
                min="0"
              />
            </div>

            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Add Entry
            </Button>
          </form>

          {/* Total */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Total</span>
              <span className="font-bold text-lg text-gray-900">
                $
                {entries
                  .reduce((sum, entry) => sum + entry.amount, 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySection;
