import { Button } from "./ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="flex justify-center py-20 w-full">
      <div className="max-w-5xl px-4 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center sm:text-left">
          <h2 className="text-4xl md:text-5xl font-semibold">
            Are you ready to join UnderFi?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Button size="lg" className="min-w-[160px]" asChild>
              <Link href="/app">Launch App</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-[160px]"
              asChild
            >
              <Link href="/docs">Documentation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 