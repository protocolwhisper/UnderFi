"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle } from "lucide-react"

interface RepayModalProps {
  isOpen: boolean
  onClose: () => void
  onRepay: (amount: string) => Promise<void>
  currentDebt: string
}

export function RepayModal({ isOpen, onClose, onRepay, currentDebt }: RepayModalProps) {
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"approve" | "repay">("approve")
  const [error, setError] = useState<string | null>(null)

  const handleRepay = async () => {
    if (!amount) return
    
    try {
      setIsLoading(true)
      setError(null)
      setStep("approve")
      
      // The approval is handled inside the onRepay function in useVault
      await onRepay(amount)
      
      setAmount("")
      onClose()
    } catch (error) {
      console.error("Repay error:", error)
      setError("Failed to repay. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Repay CDP</DialogTitle>
          <DialogDescription>
            Repay your CDP debt to reduce your position.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="amount">Amount</Label>
              <span className="text-xs text-muted-foreground">
                Current Debt: {currentDebt}
              </span>
            </div>
            <Input
              id="amount"
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
              max={currentDebt}
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-1"
              onClick={() => setAmount(currentDebt)}
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
            <p>This process requires two transactions:</p>
            <ol className="list-decimal pl-5 mt-2">
              <li className={step === "approve" ? "text-primary font-medium" : ""}>
                Approve the vault to use your CDP tokens
              </li>
              <li className={step === "repay" ? "text-primary font-medium" : ""}>
                Repay your CDP debt
              </li>
            </ol>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleRepay} disabled={!amount || isLoading}>
            {isLoading ? "Processing..." : "Repay"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 