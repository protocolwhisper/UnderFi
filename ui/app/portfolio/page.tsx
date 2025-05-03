"use client"

import DashboardLayout from "@/components/dashboard-layout";
import { ArrowUp, ArrowDown, Briefcase, PieChart, TrendingUp, Lock, Shield } from "lucide-react";
import dynamic from "next/dynamic";

const SketchyChart = dynamic(() => import("@/components/sketchy-chart"), { ssr: false });

export default function PortfolioPage() {
  const assets = [
    { name: "Bitcoin", symbol: "BTC", allocation: 45, value: "$128,456.32", change: "+3.45%", isPositive: true },
    { name: "Ethereum", symbol: "ETH", allocation: 30, value: "$53,672.09", change: "+5.18%", isPositive: true },
    { name: "Solana", symbol: "SOL", allocation: 12, value: "$19,345.87", change: "-1.24%", isPositive: false },
    { name: "Cardano", symbol: "ADA", allocation: 8, value: "$7,209.54", change: "+2.78%", isPositive: true },
    { name: "Polkadot", symbol: "DOT", allocation: 5, value: "$5,672.96", change: "-0.32%", isPositive: false }
  ];

  return (
    <DashboardLayout title="Portfolio Management">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="dashboard-card card-gradient">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="stats-label">TOTAL COLLATERAL</p>
              <h3 className="text-4xl font-semibold">$45,672.39</h3>
            </div>
            <div className="h-10 w-10 bg-primary/10 flex items-center justify-center rounded-full">
              <Lock className="text-primary h-5 w-5" />
            </div>
          </div>
          <div className="positive-change text-xs flex items-center mt-2">
            <ArrowUp className="h-4 w-4 mr-1" />
            <span>6.24%</span>
            <span className="text-muted-foreground ml-1">increase this month</span>
          </div>
        </div>

        <div className="dashboard-card card-gradient">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="stats-label">TOTAL DEBT</p>
              <h3 className="text-4xl font-semibold">$28,215.64</h3>
            </div>
            <div className="h-10 w-10 bg-primary/10 flex items-center justify-center rounded-full">
              <Shield className="text-primary h-5 w-5" />
            </div>
          </div>
          <div className="text-xs flex items-center mt-2">
            <span className="text-muted-foreground">Current collateral ratio: </span>
            <span className="font-medium ml-1">162%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="dashboard-card lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Briefcase className="text-primary h-5 w-5" />
              <p className="stats-label">PORTFOLIO OVERVIEW</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-semibold">$214,356.78</p>
              <div className="positive-change text-xs flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>8.74% ($17,345.21)</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <SketchyChart 
              data={[
                {name: 'Jan', value: 132000},
                {name: 'Feb', value: 145000},
                {name: 'Mar', value: 142000},
                {name: 'Apr', value: 165000},
                {name: 'May', value: 178000},
                {name: 'Jun', value: 195000},
                {name: 'Jul', value: 214356}
              ]}
              professional={true}
            />
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="text-primary h-5 w-5" />
            <p className="stats-label">ASSET ALLOCATION</p>
          </div>
          <div className="space-y-4">
            {assets.map((asset, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 bg-secondary rounded-full flex items-center justify-center text-xs">
                      {asset.symbol.charAt(0)}
                    </div>
                    <p className="font-medium">{asset.name}</p>
                  </div>
                  <p>{asset.allocation}%</p>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div 
                    className="h-2 bg-primary rounded-full" 
                    style={{ width: `${asset.allocation}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-card mt-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-primary h-5 w-5" />
          <p className="stats-label">PORTFOLIO ASSETS</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 font-medium text-muted-foreground">Asset</th>
                <th className="text-right py-3 font-medium text-muted-foreground">Holdings</th>
                <th className="text-right py-3 font-medium text-muted-foreground">Value</th>
                <th className="text-right py-3 font-medium text-muted-foreground">Allocation</th>
                <th className="text-right py-3 font-medium text-muted-foreground">24h Change</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center">
                        {asset.symbol.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{asset.name}</p>
                        <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-4">
                    <p>3.245 {asset.symbol}</p>
                  </td>
                  <td className="text-right py-4">
                    <p className="font-medium">{asset.value}</p>
                  </td>
                  <td className="text-right py-4">
                    <p>{asset.allocation}%</p>
                  </td>
                  <td className="text-right py-4">
                    <p className={asset.isPositive ? "positive-change" : "negative-change"}>
                      {asset.isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      {asset.change}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
} 