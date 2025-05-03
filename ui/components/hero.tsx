import { Button } from "./ui/button";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center text-center mx-auto max-w-[1200px] py-20">
      <div className="inline-flex items-center gap-2 px-4 py-2 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
        <span className="font-medium uppercase tracking-wider">LIVE ON TESTNET</span>
        <Link href="#" target="_blank">
          <LinkIcon className="w-4 h-4" />
        </Link>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold mt-6 md:mt-8 mb-4 md:mb-6 tracking-tight">
        Unlock Overcollateralized{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary/60">
          Lending
        </span>
      </h1>

      <h2 className="text-lg md:text-xl text-muted-foreground/80 mb-8 md:mb-12 max-w-2xl leading-relaxed">
        Powered by Aztec and zkEmail, we bring privacy-first verification and secure lending to the next generation of DeFi.
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
        <Button size="lg" className="text-base px-6 md:px-8 py-5 md:py-6 bg-primary/90 hover:bg-primary/80">
          <Link href="/dashboard">Launch Dashboard</Link>
        </Button>
        <Button variant="outline" size="lg" className="text-base px-6 md:px-8 py-5 md:py-6 bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-background/80">
          Documentation
        </Button>
      </div>
    </div>
  );
}
