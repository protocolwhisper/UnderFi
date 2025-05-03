import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { vaultAbi } from '@/abi/vault';
import { tokenAbi } from '@/abi/token';
import { parseEther } from 'viem';

// Contract addresses on Base Sepolia
const VAULT_CONTRACT_ADDRESS = '0x58E0A1975bD38f57D3ccaB2BEA04ebab2a1E0976' as `0x${string}`;
const TOKEN_CONTRACT_ADDRESS = '0x39c773e0FBA55907c2Be1661b9f030E3D15b6779' as `0x${string}`;

// Mock state for demo
let mockUserCollateral = 0;
let mockCdpBorrowed = 0;
let mockActiveCdp: {
  id: string;
  type: string;
  collateralValue: string;
  cdpValue: string;
  liquidationRisk: string;
  collateralRatio: string;
  asset: string;
} | null = null;

export function useVault() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  
  // Contract write hook
  const { writeContractAsync, isPending, data: txHash } = useWriteContract();

  // Get max positions
  const { data: maxPositions } = useReadContract({
    address: VAULT_CONTRACT_ADDRESS,
    abi: vaultAbi,
    functionName: 'MAX_POSITIONS',
  });

  // Get user collateral for a specific asset
  const useUserCollateral = () => {
    // Return mock data for demo
    return {
      data: mockUserCollateral,
      isLoading: false,
      isError: false,
    };
  };

  // Get user's CDP borrowed amount
  const useUserCdpBorrowed = () => {
    // Return mock data for demo
    return {
      data: mockCdpBorrowed,
      isLoading: false,
      isError: false,
    };
  };

  // Get pool collateral for a specific asset
  const usePoolCollateral = (assetAddress?: `0x${string}`) => {
    return useReadContract({
      address: VAULT_CONTRACT_ADDRESS,
      abi: vaultAbi,
      functionName: 'poolCollateral',
      args: assetAddress ? [assetAddress] : undefined,
      query: {
        enabled: Boolean(assetAddress),
      },
    });
  };

  // Get CDP token total supply
  const useCdpTotalSupply = () => {
    return useReadContract({
      address: TOKEN_CONTRACT_ADDRESS,
      abi: tokenAbi,
      functionName: 'totalSupply',
    });
  };

  // Calculate user health factor
  const useUserHealthFactor = () => {
    // Mock health factor for demo
    return { 
      data: mockCdpBorrowed > 0 ? 200 : 0, // 200% health factor when CDP exists
      isLoading: false,
      isError: false,
    };
  };

  // Approve token for vault
  const approveToken = async (assetAddress: `0x${string}`, amount: string) => {
    try {
      setLoading(true);
      // Still call the real contract for MetaMask interaction
      const hash = await writeContractAsync({
        address: assetAddress,
        abi: tokenAbi,
        functionName: 'approve',
        args: [VAULT_CONTRACT_ADDRESS, parseEther(amount)],
      });
      return hash;
    } catch (error) {
      console.error('Error approving token:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Deposit
  const deposit = async (assetAddress: `0x${string}`, amount: string) => {
    try {
      setLoading(true);
      
      // Call the real contract for MetaMask interaction
      const hash = await writeContractAsync({
        address: VAULT_CONTRACT_ADDRESS,
        abi: vaultAbi,
        functionName: 'deposit',
        args: [assetAddress, parseEther(amount)],
      });
      
      // Update mock state after successful transaction
      mockUserCollateral += parseFloat(amount);
      
      return hash;
    } catch (error) {
      console.error('Error depositing:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Borrow
  const borrow = async (amount: string) => {
    try {
      setLoading(true);
      // Call the real contract for MetaMask interaction
      const hash = await writeContractAsync({
        address: VAULT_CONTRACT_ADDRESS,
        abi: vaultAbi,
        functionName: 'borrow',
        args: [parseEther(amount)],
      });
      
      // Update mock state after successful transaction
      const borrowAmount = parseFloat(amount);
      mockCdpBorrowed += borrowAmount;
      
      // Subtract the borrowed amount from the user's collateral
      // In a real CDP system, collateral remains locked but we're simulating
      // the visual effect of funds being used
      mockUserCollateral = Math.max(0, mockUserCollateral - borrowAmount);
      
      // Create mock active CDP
      mockActiveCdp = {
        id: "1",
        type: "ETH-A",
        collateralValue: mockCdpBorrowed.toFixed(2),
        cdpValue: `$${mockCdpBorrowed.toFixed(2)}`,
        liquidationRisk: "10%",
        collateralRatio: "200%",
        asset: "Ethereum"
      };
      
      return hash;
    } catch (error) {
      console.error('Error borrowing:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Repay
  const repay = async (amount: string) => {
    try {
      setLoading(true);
      // First approve the CDP token
      await approveToken(TOKEN_CONTRACT_ADDRESS, amount);
      
      // Then repay - call the real contract for MetaMask interaction
      const hash = await writeContractAsync({
        address: VAULT_CONTRACT_ADDRESS,
        abi: vaultAbi,
        functionName: 'repay',
        args: [parseEther(amount)],
      });
      
      // Update mock state after successful transaction
      const repayAmount = parseFloat(amount);
      mockCdpBorrowed = Math.max(0, mockCdpBorrowed - repayAmount);
      
      // Add the repaid amount back to the user's collateral
      // In a real CDP system, this would release the equivalent amount of collateral
      mockUserCollateral += repayAmount;
      
      // If fully repaid, remove the active CDP
      if (mockCdpBorrowed === 0) {
        mockActiveCdp = null;
      }
      
      return hash;
    } catch (error) {
      console.error('Error repaying:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Withdraw
  const withdraw = async (assetAddress: `0x${string}`, amount: string) => {
    try {
      setLoading(true);
      // Call the real contract for MetaMask interaction
      const hash = await writeContractAsync({
        address: VAULT_CONTRACT_ADDRESS,
        abi: vaultAbi,
        functionName: 'withdraw',
        args: [assetAddress, parseEther(amount)],
      });
      
      // Update mock state after successful transaction
      const withdrawAmount = parseFloat(amount);
      mockUserCollateral = Math.max(0, mockUserCollateral - withdrawAmount);
      
      return hash;
    } catch (error) {
      console.error('Error withdrawing:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Liquidate
  const liquidate = async (userAddress: `0x${string}`) => {
    try {
      setLoading(true);
      // Call the real contract for MetaMask interaction
      const hash = await writeContractAsync({
        address: VAULT_CONTRACT_ADDRESS,
        abi: vaultAbi,
        functionName: 'liquidate',
        args: [userAddress],
      });
      return hash;
    } catch (error) {
      console.error('Error liquidating:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get max borrowable amount based on user's collateral
  const getMaxBorrowAmount = async () => {
    if (!address) return "0";
    
    // For demo, return a value based on mock collateral
    // Using a 66% LTV ratio (Loan-to-Value)
    // This means users can borrow up to 66% of their collateral value
    return (mockUserCollateral * 0.66).toString();
  };

  // Get active CDP for the user
  const getActiveCdp = () => {
    return mockActiveCdp;
  };

  // Reset mock state (for testing)
  const resetMockState = () => {
    mockUserCollateral = 0;
    mockCdpBorrowed = 0;
    mockActiveCdp = null;
  };

  return {
    maxPositions,
    useUserCollateral,
    useUserCdpBorrowed,
    usePoolCollateral,
    useCdpTotalSupply,
    useUserHealthFactor,
    approveToken,
    deposit,
    borrow,
    repay,
    withdraw,
    liquidate,
    getMaxBorrowAmount,
    getActiveCdp,
    resetMockState,
    loading,
    isPending,
    txHash,
    vaultAddress: VAULT_CONTRACT_ADDRESS,
    tokenAddress: TOKEN_CONTRACT_ADDRESS,
  };
} 