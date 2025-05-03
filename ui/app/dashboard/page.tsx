"use client"

import DashboardLayout from "@/components/dashboard-layout";
import { ArrowUp, Info } from "lucide-react";
import ProtocolMetricsChart from "@/components/protocol-metrics-chart";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Welcome to UnderFi">
      <Card className="p-4 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="stats-label">PORTFOLIO</p>
            <button className="text-muted-foreground hover:text-primary info-button">
              <Info className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-2">
          <div className="lg:col-span-4">
            <div className="mb-4">
              <div className="flex gap-3">
                <h3 className="text-4xl font-semibold">$3,420.69</h3>
                <div className="flex text-green-500 mt-2">
                  <ArrowUp className="h-4 w-4" />
                  <span className="text-xs">13.21%</span>
                </div>
              </div>
            </div>
            <div className="h-[300px]">
              <ProtocolMetricsChart />
            </div>
          </div>

          <div className="mt-20 lg:col-span-1">
            <div className="h-full flex flex-col">
              <div>
                <div className="flex flex-col justify-left items-start mb-4">
                  <h3 className="text-muted-foreground text-xs uppercase">Current PNL</h3>
                  <span className="text-3xl font-semibold">$120.69</span>
                </div>
                <div className="flex flex-col justify-left items-start">
                  <h3 className="text-muted-foreground text-xs uppercase">Total Trades</h3>
                  <span className="text-3xl font-semibold">$12.69K</span>
                </div>
              </div>
              <div className="mt-auto text-right">
                <Link href="/vaults" className="text-sm text-primary hover:underline subtle-glow">
                  See more →
                </Link>
              </div>
            </div>
          </div>  
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <p className="stats-label">VAULTS</p>
              <button className="text-muted-foreground hover:text-primary info-button">
                <Info className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col h-full mt-2">
            <div className="flex-1">
              {[
                { name: "50BTC-50ETH", risk: "60%", price: "$3,220.69", change: "13.21%" },
                { name: "25ETH-50PEPE-25BTC", risk: "60%", price: "$3,220.69", change: "13.21%" },
                { name: "ETH-PEPE", risk: "60%", price: "$3,220.69", change: "13.21%" }
              ].map((vault, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium">{vault.name}</p>
                    <p className="text-sm text-muted-foreground">Risk: {vault.risk}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{vault.price}</p>
                    <p className="text-sm text-green-500">↑ {vault.change}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto mb-6 text-right">
              <Link href="/vaults" className="text-sm text-primary hover:underline subtle-glow">
                See more →
              </Link>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <p className="stats-label">ACTIVITY</p>
              <button className="text-muted-foreground hover:text-primary info-button">
                <Info className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col h-full mt-2">
            <div className="flex-1">
              {[
                { hash: "0xef2...a241", type: "Payback Position", token: "-1 sTOKEN", usd: "+1100.00 USD" },
                { hash: "0xef2...a241", type: "Create Position", token: "+1 sTOKEN", usd: "-1000.00 USD" }
              ].map((activity, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium">{activity.hash}</p>
                    <p className="text-sm text-muted-foreground">{activity.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{activity.token}</p>
                    <p className="text-sm text-muted-foreground">{activity.usd}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto mb-6 text-right">
              <Link href="/activity" className="text-sm text-primary hover:underline subtle-glow">
                See more →
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
} 