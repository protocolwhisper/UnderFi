"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle } from "lucide-react"

interface WithdrawModalProps {
  isOpen: boolean
  onClose: () => void
  onWithdraw: (asset: string, amount: string) => Promise<void>
  userAssets: { address: string; symbol: string; balance: string }[]
}

export function WithdrawModal({ isOpen, onClose, onWithdraw, userAssets }: WithdrawModalProps) {
  const [selectedAsset, setSelectedAsset] = useState(userAssets[0]?.address || "")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleWithdraw = async () => {
    if (!selectedAsset || !amount) return
    
    try {
      setIsLoading(true)
      setError(null)
      
      await onWithdraw(selectedAsset, amount)
      
      setAmount("")
      onClose()
    } catch (error) {
      console.error("Withdraw error:", error)
      setError("Failed to withdraw. Your collateral ratio may be too low.")
    } finally {
      setIsLoading(false)
    }
  }

  const selectedAssetDetails = userAssets.find(asset => asset.address === selectedAsset)
  const selectedAssetSymbol = selectedAssetDetails?.symbol || ""
  const selectedAssetBalance = selectedAssetDetails?.balance || "0"

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Withdraw Collateral</DialogTitle>
          <DialogDescription>
            Withdraw your collateral from the vault.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="asset">Asset</Label>
            <Select
              value={selectedAsset}
              onValueChange={setSelectedAsset}
            >
              <SelectTrigger id="asset">
                <SelectValue placeholder="Select asset" />
              </SelectTrigger>
              <SelectContent>
                {userAssets.map((asset) => (
                  <SelectItem key={asset.address} value={asset.address}>
                    {asset.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="amount">Amount</Label>
              <span className="text-xs text-muted-foreground">
                Available: {selectedAssetBalance} {selectedAssetSymbol}
              </span>
            </div>
            <Input
              id="amount"
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              max={selectedAssetBalance}
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-1"
              onClick={() => setAmount(selectedAssetBalance)}
            >
              Max
            </Button>
          </div>
          
          {error && (
            <div className="p-3 border border-red-500 bg-red-500/10 rounded-md flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}
          
          <div className="text-sm text-muted-foreground">
            <p>Important information:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Withdrawing collateral increases your liquidation risk</li>
              <li>You cannot withdraw if it would make your position undercollateralized</li>
              <li>Withdrawing burns CDP tokens proportional to the value withdrawn</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleWithdraw} disabled={!selectedAsset || !amount || isLoading}>
            {isLoading ? "Processing..." : "Withdraw"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 