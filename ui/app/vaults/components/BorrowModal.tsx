"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle } from "lucide-react"

interface BorrowModalProps {
  isOpen: boolean
  onClose: () => void
  onBorrow: (amount: string) => Promise<void>
  maxBorrowAmount: string
}

export function BorrowModal({ isOpen, onClose, onBorrow, maxBorrowAmount }: BorrowModalProps) {
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleBorrow = async () => {
    if (!amount) return
    
    try {
      setIsLoading(true)
      setError(null)
      
      await onBorrow(amount)
      
      setAmount("")
      onClose()
    } catch (error) {
      console.error("Borrow error:", error)
      setError("Failed to borrow. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Borrow CDP</DialogTitle>
          <DialogDescription>
            Borrow CDP tokens against your collateral.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="amount">Amount</Label>
              <span className="text-xs text-muted-foreground">
                Max: {maxBorrowAmount}
              </span>
            </div>
            <Input
              id="amount"
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
              max={maxBorrowAmount}
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-1"
              onClick={() => setAmount(maxBorrowAmount)}
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
              <li>Borrowing increases your liquidation risk</li>
              <li>Maintain a healthy collateral ratio ({'>'}150%)</li>
              <li>Monitor market conditions regularly</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleBorrow} disabled={!amount || isLoading}>
            {isLoading ? "Processing..." : "Borrow"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 