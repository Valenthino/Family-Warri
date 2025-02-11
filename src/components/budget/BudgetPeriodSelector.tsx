import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface BudgetPeriodSelectorProps {
  onPeriodChange: (period: string) => void;
  onDateChange: (date: Date) => void;
}

export default function BudgetPeriodSelector({
  onPeriodChange,
  onDateChange,
}: BudgetPeriodSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateChange(date);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Budget Period</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => onPeriodChange("first")}
                className="w-full"
              >
                1st - 15th
              </Button>
              <Button
                variant="outline"
                onClick={() => onPeriodChange("second")}
                className="w-full"
              >
                16th - End
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Select Month</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
            />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Current Period</h3>
            <p className="text-sm text-muted-foreground">
              {format(selectedDate, "MMMM yyyy")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
