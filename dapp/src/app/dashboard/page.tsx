import Head from "next/head";
import { DashboardLayout } from "../../components/layouts/dashboard-layout";
import { WalletConnectionPanel } from "../../components/wallet-connection-panel";

function EthereumIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M12 1.75l-6.25 10.5L12 16l6.25-3.75L12 1.75zM5.75 13.5L12 22.25l6.25-8.75L12 17.25 5.75 13.5z" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Aave - Dashboard</title>
        <meta name="description" content="Aave DeFi protocol dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <div className="py-8 px-10">
          <div className="flex items-center mb-6">
            <div className="mr-2 rounded-full w-14 h-14 overflow-hidden">
              <EthereumIcon className="w-full h-full  bg-blue-400 object-contain" />
            </div>
            <div>
              <div className="flex items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-white mr-2">
                  Core Instance
                </h1>
                <div className="bg-indigo-600 text-white text-xs px-1.5 py-0.5 rounded">
                  V3
                </div>
                <button className="ml-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-gray-400 text-sm">
                Main Ethereum market with the largest selection of assets and
                yield options
              </p>
            </div>
          </div>

          <div className="flex space-x-12 mb-8">
            <div>
              <div className="text-gray-400 text-sm">Net worth</div>
              <div className="text-white text-xl">—</div>
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-gray-400 text-sm mr-1">Net APY</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-white text-xl">—</div>
            </div>
          </div>

          <WalletConnectionPanel />
        </div>
      </DashboardLayout>
    </>
  );
}
