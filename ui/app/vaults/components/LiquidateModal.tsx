"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertTriangle } from "lucide-react"

interface LiquidateModalProps {
  isOpen: boolean
  onClose: () => void
  onLiquidate: (userAddress: string) => Promise<void>
}

export function LiquidateModal({ isOpen, onClose, onLiquidate }: LiquidateModalProps) {
  const [userAddress, setUserAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLiquidate = async () => {
    if (!userAddress) return
    
    try {
      setIsLoading(true)
      setError(null)
      
      await onLiquidate(userAddress)
      
      setUserAddress("")
      onClose()
    } catch (error) {
      console.error("Liquidate error:", error)
      setError("Failed to liquidate. The position may not be eligible for liquidation.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Liquidate Position</DialogTitle>
          <DialogDescription>
            Liquidate an undercollateralized position and earn a reward.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="userAddress">User Address</Label>
            <Input
              id="userAddress"
              placeholder="0x..."
              value={userAddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserAddress(e.target.value)}
            />
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
              <li>You can only liquidate positions with a collateral ratio below 150%</li>
              <li>You will receive a 5% liquidation incentive plus the borrowed CDP amount</li>
              <li>You must have enough CDP tokens to burn equal to the borrowed amount</li>
              <li>The remaining collateral goes to the protocol</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleLiquidate} 
            disabled={!userAddress || isLoading}
            variant="destructive"
          >
            {isLoading ? "Processing..." : "Liquidate"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 