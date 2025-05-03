import { ArrowUp } from "lucide-react";
import { Card } from "./ui/card";
import SketchyChart from "./sketchy-chart";

export default function PortfolioSection() {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">Portfolio</h2>
          <button className="text-muted-foreground hover:text-primary">ⓘ</button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-3">
          <h3 className="text-4xl font-semibold">$3,420.69</h3>
          <div className="flex items-center text-green-500">
            <ArrowUp className="h-4 w-4" />
            <span>13.21%</span>
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <SketchyChart />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <p className="text-muted-foreground text-sm">Current PNL</p>
          <p className="text-xl font-semibold">$120.69</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">Total Trades</p>
          <p className="text-xl font-semibold">$12.69K</p>
        </div>
      </div>
    </Card>
  );
} 