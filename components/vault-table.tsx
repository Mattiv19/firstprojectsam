'use client';

import { Avatar } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"
import { useState, useEffect } from 'react';

interface Vault {
  name: string;
  symbol: string;
  price: string;
  daily: string;
  balance: string;
  apy: string;
  state: string;
  startDate: string;
  liquidity: "high" | "medium" | "low";
}

interface PriceData {
  [key: string]: {
    usd: number;
  };
}

const initialVaults = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: "$13,643.21",
    daily: "+$213.8",
    balance: "$13,954.04",
    apy: "8.56%",
    state: "Fixed",
    startDate: "05.10.2023",
    liquidity: "high" as const,
  },
  {
    name: "USDT",
    symbol: "USDT",
    price: "$1.00",
    daily: "+$45.1",
    balance: "$3,954.04",
    apy: "5.44%",
    state: "Fixed",
    startDate: "12.03.2023",
    liquidity: "medium" as const,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "$2,123.87",
    daily: "+$13.5",
    balance: "$3,954.04",
    apy: "4.12%",
    state: "Flexible",
    startDate: "21.01.2023",
    liquidity: "low" as const,
  }]

const coinIdMap: { [key: string]: string } = {
  "Bitcoin": "bitcoin",
  "Ethereum": "ethereum",
  "USDT": "tether"
};

export function VaultTable() {
  const [vaults, setVaults] = useState<Vault[]>(initialVaults);
  const [priceError, setPriceError] = useState<string | null>(null);

  const fetchPrices = async () => {
    // Get all coin IDs for the fetch
    const coinIds = vaults.map(vault => coinIdMap[vault.name]).filter(Boolean);

    try {
      const responses = await Promise.allSettled(
        coinIds.map(async (coinId) => {
          const response = await fetch(`/api/crypto?coinId=${coinId}`);
          if (!response.ok) throw new Error(`Failed to fetch ${coinId}`);
          return { coinId, data: await response.json() };
        })
      );

      setVaults(currentVaults =>
        currentVaults.map(vault => {
          const coinId = coinIdMap[vault.name];
          const result = responses.find(r => r.status === 'fulfilled' && r.value.coinId === coinId);

          if (result && result.status === 'fulfilled') {
            return {
              ...vault,
              price: `$${result.value.data[coinId].usd.toLocaleString()}`
            };
          }
          return vault;
        })
      );
      const failed = responses.filter(r => r.status === 'rejected');
      if (failed.length > 0) {
        setPriceError(`Failed to fetch prices for ${failed.length} coin(s)`);
      } else {
        setPriceError(null);
      }

      // Clear any existing errors
      setPriceError(null);
    } catch (error) {
      setPriceError('Failed to fetch prices');
    }
  };

  // Fetch prices when component mounts
  useEffect(() => {
    fetchPrices();
    // Optional: Set up an interval to refresh prices periodically
    const interval = setInterval(fetchPrices, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vault</TableHead>
          <TableHead>Daily</TableHead>
          <TableHead>Balance ↓</TableHead>
          <TableHead>APY ↓</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Start date</TableHead>
          <TableHead>Liquidity</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vaults.map((vault) => (
          <TableRow key={vault.symbol}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <img src={`/placeholder.svg?height=24&width=24`} alt={vault.name} />
                </Avatar>
                <div>
                  <div className="font-medium">{vault.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {priceError ? (
                      <span className="text-red-500">{priceError}</span>
                    ) : vault.price ? (
                      vault.price
                    ) : (
                      <span className="text-red-500">Price unavailable</span>
                    )}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-green-500">{vault.daily}</TableCell>
            <TableCell>{vault.balance}</TableCell>
            <TableCell>{vault.apy}</TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${vault.state === "Fixed" ? "bg-yellow-500/10 text-yellow-500" : "bg-green-500/10 text-green-500"
                  }`}
              >
                {vault.state}
              </span>
            </TableCell>
            <TableCell>{vault.startDate}</TableCell>
            <TableCell>
              <div className="flex gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-3 rounded-full ${i < (vault.liquidity === "high" ? 3 : vault.liquidity === "medium" ? 2 : 1)
                      ? "bg-primary"
                      : "bg-muted"
                      }`}
                  />
                ))}
              </div>
            </TableCell>
            <TableCell>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

