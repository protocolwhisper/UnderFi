import ProtocolMetrics from "./protocol-metrics";
import PortfolioManager from "./portfolio-manager";

export default function Bento() {
  return (
    <>
      <div className="flex gap-4">
        <ProtocolMetrics />
        <PortfolioManager />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <ProtocolMetrics />
        <ProtocolMetrics />
        <ProtocolMetrics />
      </div>
    </>
  )
}