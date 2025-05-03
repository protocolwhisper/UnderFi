"use client"

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

type SketchyChartProps = {
  data?: { value: number; day: string }[];
  percentage: string;
  value: string;
  className?: string;
};

export function SketchyChart({ 
  data = [], 
  percentage, 
  value,
  className 
}: SketchyChartProps) {
  const mockData = [
    { value: 3000, day: "Mon" },
    { value: 3400, day: "Tue" },
    { value: 2800, day: "Wed" },
    { value: 2500, day: "Thr" },
    { value: 3200, day: "Fri" },
    { value: 3800, day: "Sat" },
    { value: 3300, day: "Sun" },
    { value: 3600, day: "Mon" },
    { value: 3000, day: "Tue" },
    { value: 2600, day: "Wed" },
    { value: 2200, day: "Thr" },
    { value: 2800, day: "Fri" },
    { value: 3200, day: "Sat" },
    { value: 3800, day: "Sun" },
  ];
  
  const chartData = data.length > 0 ? data : mockData;
  const maxValue = Math.max(...chartData.map(d => d.value));
  
  return (
    <div className={cn("relative", className)}>
      <div className="flex items-end justify-between mb-2">
        <div>
          <h3 className="text-5xl font-handwriting font-semibold">{value}</h3>
          <div className="flex items-center font-handwriting text-xl">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            {percentage}
          </div>
        </div>
        <div className="flex items-center space-x-4 font-handwriting text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-black bg-gray-200 mr-2 rotate-45"></div>
            Price
          </div>
          <div className="flex items-center">
            <div className="w-4 h-0 border-t-2 border-red-500 mr-2"></div>
            Risk
          </div>
        </div>
      </div>
      
      <div className="h-64 relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-sm font-handwriting">
          <span>4,000</span>
          <span>3,000</span>
          <span>2,000</span>
          <span>1,000</span>
          <span>0</span>
        </div>
        
        {/* Chart grid */}
        <div className="ml-12 h-full flex items-end relative">
          {/* Grid vertical lines */}
          {chartData.map((item, index) => (
            <div key={`grid-${index}`} className="flex-1 h-full border-l-2 border-gray-300 border-dashed"></div>
          ))}
          
          {/* Grid horizontal lines */}
          <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-between">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={`h-grid-${i}`} className="w-full border-b-2 border-gray-300 border-dashed"></div>
            ))}
          </div>
          
          {/* Bar charts */}
          <div className="absolute left-0 bottom-0 w-full h-full flex">
            {chartData.map((item, index) => {
              const height = (item.value / maxValue) * 100;
              return (
                <div key={`bar-${index}`} className="flex-1 flex flex-col justify-end items-center">
                  <div 
                    className="w-3/4 border-2 border-black bg-gray-200 mb-1"
                    style={{
                      height: `${height}%`,
                      transform: "rotate(1deg)",
                      boxShadow: "1px 1px 0 rgba(0,0,0,0.2)",
                    }}
                  ></div>
                  <span className="text-xs font-handwriting">{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-2">
        <div className="font-handwriting text-lg font-semibold">
          <div>Current PNL</div>
          <div className="text-2xl">$120.69</div>
        </div>
        <div className="font-handwriting text-lg font-semibold">
          <div>Total Trades</div>
          <div className="text-2xl">$12.69K</div>
        </div>
        <div className="self-end font-handwriting text-sm">
          <a href="#" className="underline">See more &gt;</a>
        </div>
      </div>
    </div>
  );
} 