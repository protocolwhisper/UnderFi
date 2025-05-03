"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle } from "lucide-react"
import { useVault } from "@/lib/hooks/useVault"

interface DepositModalProps {
  isOpen: boolean
  onClose: () => void
  supportedAssets: { address: string; symbol: string }[]
}

export function DepositModal({ isOpen, onClose, supportedAssets }: DepositModalProps) {
  const bptAsset = supportedAssets.find(asset => asset.symbol === "BPT") || supportedAssets[0]
  
  const [selectedAsset, setSelectedAsset] = useState(bptAsset?.address || "")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"approve" | "deposit">("approve")
  const [error, setError] = useState<string | null>(null)

  const { deposit, approveToken, loading, isPending } = useVault()

  useEffect(() => {
    if (bptAsset) {
      setSelectedAsset(bptAsset.address)
    }
  }, [bptAsset])

  const handleDeposit = async () => {
    if (!selectedAsset || !amount) return
    
    try {
      setIsLoading(true)
      setError(null)
      
      if (step === "approve") {
        await approveToken(selectedAsset as `0x${string}`, amount)
        setStep("deposit")
        setIsLoading(false)
        return
      }
      
      await deposit(selectedAsset as `0x${string}`, amount)
      setAmount("")
      onClose()
    } catch (error) {
      console.error("Deposit error:", error)
      setError(step === "approve" ? "Failed to approve. Please try again." : "Failed to deposit. Please try again.")
      setStep("approve") // Reset to approve step if there's an error
    } finally {
      setIsLoading(false)
    }
  }

  // Always use BPT symbol
  const assetSymbol = "BPT"

  const buttonText = isPending 
    ? "Confirming..." 
    : loading || isLoading
    ? "Processing..." 
    : step === "approve"
    ? "Approve BPT"
    : "Deposit BPT"

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deposit Collateral</DialogTitle>
          <DialogDescription>
            Deposit {assetSymbol} as collateral to borrow against.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.000001"
              min="0"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          {error && (
            <div className="p-3 border border-red-500 bg-red-500/10 rounded-md flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}
          
          <div className="text-sm text-muted-foreground">
            <p>This process requires two transactions:</p>
            <ol className="list-decimal pl-5 mt-2">
              <li className={step === "approve" ? "text-primary font-medium" : ""}>
                Approve the vault to use your {assetSymbol}
              </li>
              <li className={step === "deposit" ? "text-primary font-medium" : ""}>
                Deposit {assetSymbol} into the vault
              </li>
            </ol>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeposit} 
            disabled={!selectedAsset || !amount || isLoading || loading || isPending}
          >
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 