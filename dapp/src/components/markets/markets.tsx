"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  Clock,
  Percent,
  DollarSign,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface LoanMarket {
  id: string;
  name: string;
  apr: number;
  term: string;
  minAmount: number;
  maxAmount: number;
  volume: number;
  available: number;
  collateralRatio: number;
}

interface FadeInWhenVisibleProps {
  children: React.ReactNode;
}

const MarketsComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"apr" | "term" | "volume">("apr");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState({
    term: "",
    minAmount: 0,
    maxAmount: 100000,
  });

  const loanMarkets: LoanMarket[] = [
    {
      id: "1",
      name: "Private Credit Line",
      apr: 5.9,
      term: "6-12 months",
      minAmount: 1000,
      maxAmount: 50000,
      volume: 1250000,
      available: 375000,
      collateralRatio: 0.3,
    },
    {
      id: "2",
      name: "Business Expansion Loan",
      apr: 7.2,
      term: "12-24 months",
      minAmount: 5000,
      maxAmount: 100000,
      volume: 890000,
      available: 210000,
      collateralRatio: 0.5,
    },
    {
      id: "3",
      name: "Personal Privacy Loan",
      apr: 4.5,
      term: "3-6 months",
      minAmount: 500,
      maxAmount: 10000,
      volume: 2100000,
      available: 750000,
      collateralRatio: 0.2,
    },
    {
      id: "4",
      name: "Startup Capital",
      apr: 8.9,
      term: "24-36 months",
      minAmount: 10000,
      maxAmount: 250000,
      volume: 450000,
      available: 120000,
      collateralRatio: 0.6,
    },
  ];

  const filteredMarkets = loanMarkets
    .filter(
      (market) =>
        market.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filters.term === "" || market.term === filters.term) &&
        market.minAmount >= filters.minAmount &&
        market.maxAmount <= filters.maxAmount
    )
    .sort((a, b) => {
      if (sortBy === "apr") {
        return sortDirection === "asc" ? a.apr - b.apr : b.apr - a.apr;
      } else if (sortBy === "term") {
        const aTerm = parseInt(a.term.split("-")[0]);
        const bTerm = parseInt(b.term.split("-")[0]);
        return sortDirection === "asc" ? aTerm - bTerm : bTerm - aTerm;
      } else {
        return sortDirection === "asc"
          ? a.volume - b.volume
          : b.volume - a.volume;
      }
    });

  const handleSort = (key: "apr" | "term" | "volume") => {
    if (sortBy === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  return (
    <div className="min-h-screen py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Lending Markets
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Explore available loan options with privacy-preserving terms and
              competitive rates.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Filters and Search */}
        <motion.div
          className="bg-white rounded-xl p-6 mb-8 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative col-span-1 md:col-span-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search loan markets..."
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="block w-full pl-3 pr-10 py-2 border border-slate-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-600"
              value={filters.term}
              onChange={(e) => setFilters({ ...filters, term: e.target.value })}
            >
              <option value="">All Terms</option>
              <option value="3-6 months">3-6 months</option>
              <option value="6-12 months">6-12 months</option>
              <option value="12-24 months">12-24 months</option>
              <option value="24-36 months">24-36 months</option>
            </select>
            <div className="flex items-center justify-end">
              <button className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filters
              </button>
            </div>
          </div>
        </motion.div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Market Volume"
            value="$4.5M"
            icon={<DollarSign className="h-6 w-6 text-indigo-500" />}
          />
          <StatCard
            title="Lowest APR"
            value="4.5%"
            icon={<Percent className="h-6 w-6 text-indigo-500" />}
          />
          <StatCard
            title="Average Term"
            value="12 months"
            icon={<Clock className="h-6 w-6 text-indigo-500" />}
          />
        </div>

        {/* Markets Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 bg-slate-100 p-4 font-medium text-slate-700">
            <div className="col-span-4 md:col-span-3">Loan Market</div>
            <div
              className="col-span-3 md:col-span-2 flex items-center cursor-pointer hover:text-indigo-600"
              onClick={() => handleSort("apr")}
            >
              APR
              <ArrowUpDown
                className={`ml-1 h-4 w-4 ${
                  sortBy === "apr" ? "text-indigo-500" : "text-slate-400"
                }`}
              />
            </div>
            <div
              className="col-span-3 md:col-span-2 flex items-center cursor-pointer hover:text-indigo-600"
              onClick={() => handleSort("term")}
            >
              Term
              <ArrowUpDown
                className={`ml-1 h-4 w-4 ${
                  sortBy === "term" ? "text-indigo-500" : "text-slate-400"
                }`}
              />
            </div>
            <div
              className="col-span-2 hidden md:flex items-center cursor-pointer hover:text-indigo-600"
              onClick={() => handleSort("volume")}
            >
              Volume
              <ArrowUpDown
                className={`ml-1 h-4 w-4 ${
                  sortBy === "volume" ? "text-indigo-500" : "text-slate-400"
                }`}
              />
            </div>
            <div className="col-span-2 hidden md:flex">Available</div>
          </div>

          {filteredMarkets.length > 0 ? (
            filteredMarkets.map((market, index) => (
              <MarketRow key={market.id} market={market} index={index} />
            ))
          ) : (
            <div className="p-8 text-center text-slate-500">
              No loan markets match your current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MarketRow: React.FC<{ market: LoanMarket; index: number }> = ({
  market,
  index,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="grid grid-cols-12 p-4 border-b border-slate-200 hover:bg-slate-50"
    >
      <div className="col-span-4 md:col-span-3 font-medium text-slate-800">
        {market.name}
        <div className="text-xs text-slate-500 mt-1">
          ${market.minAmount.toLocaleString()} - $
          {market.maxAmount.toLocaleString()}
        </div>
      </div>
      <div className="col-span-3 md:col-span-2 text-indigo-600 font-medium">
        {market.apr}%
      </div>
      <div className="col-span-3 md:col-span-2 text-slate-600">
        {market.term}
      </div>
      <div className="col-span-2 hidden md:flex text-slate-600">
        ${(market.volume / 1000).toFixed(0)}k
      </div>
      <div className="col-span-2 hidden md:flex items-start justify-between text-slate-600">
        ${(market.available / 1000).toFixed(0)}k
        <button className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-medium hover:bg-indigo-200">
          Apply
        </button>
      </div>
      <div className="col-span-2 md:hidden flex justify-end">
        <button className="px-3 py-1 bg-indigo-100 h-fit text-indigo-600 rounded-full text-xs font-medium hover:bg-indigo-200">
          View
        </button>
      </div>
    </motion.div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
}> = ({ title, value, icon }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <div className="flex items-center">
        <div className="p-2 rounded-lg bg-indigo-100 mr-4">{icon}</div>
        <div>
          <h3 className="text-sm font-medium text-slate-500">{title}</h3>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
      </div>
    </motion.div>
  );
};

const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

export default MarketsComponent;
