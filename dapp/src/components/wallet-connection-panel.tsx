import { WalletConnectButton } from "./wallet-connect-button";
import { Ghost } from 'lucide-react';

export function WalletConnectionPanel() {
  return (
    <div className="bg-gray-800 rounded-lg p-10 flex flex-col items-center justify-center text-center">
      <div className="mb-6">
        <Ghost className="w-24 h-24" />
      </div>
      <h2 className="text-white text-2xl font-semibold mb-2">
        Please, connect your wallet
      </h2>
      <p className="text-gray-400 mb-6">
        Please connect your wallet to see your supplies, borrowings, and open
        positions.
      </p>
      <WalletConnectButton />
    </div>
  );
}
