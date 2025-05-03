"use client"

import DashboardLayout from "@/components/dashboard-layout";
import { 
  ArrowRight, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCw, 
  Calendar, 
  Download, 
  Filter 
} from "lucide-react";

export default function ActivityPage() {
  const transactions = [
    {
      id: 1,
      type: "buy",
      asset: "Bitcoin",
      symbol: "BTC",
      amount: "0.245 BTC",
      value: "$8,456.32",
      date: "May 24, 2023",
      time: "14:35:22",
      status: "Completed",
      icon: <ArrowUpRight className="text-[hsl(var(--positive))]" />
    },
    {
      id: 2,
      type: "sell",
      asset: "Ethereum",
      symbol: "ETH",
      amount: "2.5 ETH",
      value: "$4,672.09",
      date: "May 23, 2023",
      time: "09:12:45",
      status: "Completed",
      icon: <ArrowDownLeft className="text-[hsl(var(--negative))]" />
    },
    {
      id: 3,
      type: "swap",
      asset: "ETH → BTC",
      symbol: "SWAP",
      amount: "1.2 ETH",
      value: "$2,345.87",
      date: "May 22, 2023",
      time: "18:37:12",
      status: "Completed",
      icon: <RefreshCw className="text-[hsl(var(--primary))]" />
    },
    {
      id: 4,
      type: "deposit",
      asset: "USDC",
      symbol: "USDC",
      amount: "5,000 USDC",
      value: "$5,000.00",
      date: "May 21, 2023",
      time: "11:24:56",
      status: "Completed",
      icon: <ArrowUpRight className="text-[hsl(var(--positive))]" />
    },
    {
      id: 5,
      type: "withdrawal",
      asset: "Bitcoin",
      symbol: "BTC",
      amount: "0.12 BTC",
      value: "$4,124.76",
      date: "May 20, 2023",
      time: "16:42:33",
      status: "Completed",
      icon: <ArrowDownLeft className="text-[hsl(var(--negative))]" />
    }
  ];

  return (
    <DashboardLayout title="Transaction History">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search transactions..." 
              className="w-64 bg-secondary border border-border rounded-md py-2 px-3 text-sm"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>
          <button className="flex items-center gap-1 bg-secondary px-3 py-2 rounded-md text-sm">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-1 bg-secondary px-3 py-2 rounded-md text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Date Range</span>
          </button>
        </div>
        <button className="flex items-center gap-1 bg-secondary px-3 py-2 rounded-md text-sm">
          <Download className="h-4 w-4 text-muted-foreground" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="dashboard-card">
        <p className="stats-label mb-4">TRANSACTION HISTORY</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 font-medium text-muted-foreground pl-4">Transaction</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Asset</th>
                <th className="text-right py-3 font-medium text-muted-foreground">Amount</th>
                <th className="text-right py-3 font-medium text-muted-foreground">Value</th>
                <th className="text-right py-3 font-medium text-muted-foreground">Date & Time</th>
                <th className="text-right py-3 font-medium text-muted-foreground pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center">
                        {tx.icon}
                      </div>
                      <p className="font-medium capitalize">{tx.type}</p>
                    </div>
                  </td>
                  <td className="py-4">
                    <div>
                      <p className="font-medium">{tx.asset}</p>
                      <p className="text-xs text-muted-foreground">{tx.symbol}</p>
                    </div>
                  </td>
                  <td className="text-right py-4">
                    <p className="font-medium">{tx.amount}</p>
                  </td>
                  <td className="text-right py-4">
                    <p className="font-medium">{tx.value}</p>
                  </td>
                  <td className="text-right py-4">
                    <p className="font-medium">{tx.date}</p>
                    <p className="text-xs text-muted-foreground">{tx.time}</p>
                  </td>
                  <td className="text-right py-4 pr-4">
                    <div className="flex items-center justify-end gap-2">
                      <span className="px-2 py-1 bg-secondary text-xs rounded-full">{tx.status}</span>
                      <button className="h-6 w-6 rounded-full flex items-center justify-center bg-secondary/50 hover:bg-secondary transition-colors">
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4 px-4 py-2">
          <div className="text-sm text-muted-foreground">
            Showing 1-5 of 32 transactions
          </div>
          <div className="flex">
            <button className="w-8 h-8 flex items-center justify-center rounded-l-md bg-secondary border-r border-border">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-secondary">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-secondary">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-r-md bg-secondary border-l border-border">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 