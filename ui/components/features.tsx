import { Card } from "@/components/ui/card";
import Link from "next/link";

export function Features() {
  return (
    <section className="flex justify-center py-24 w-full">
      <div className="text-center max-w-5xl px-4">
        <h2 className="text-3xl font-semibold mb-4">Features</h2>
        <p className="text-muted-foreground mb-16 mx-auto">
          Discover all the main things that we do nicely
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-6">Maker</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li>Lorem ipsum dolor sit amet</li>
              <li>Consectetur adipiscing elit</li>
              <li>Sed do eiusmod tempor</li>
              <li>Ut labore et dolore magna</li>
            </ul>
          </Card>

          <Card className="p-8 scale-110 shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-2xl font-semibold mb-6">UnderFi</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li>Lorem ipsum dolor sit amet</li>
              <li>Consectetur adipiscing elit</li>
              <li>Sed do eiusmod tempor</li>
              <li>Ut labore et dolore magna</li>
              <li>Excepteur sint occaecat</li>
            </ul>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-6">Reflexer</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li>Lorem ipsum dolor sit amet</li>
              <li>Consectetur adipiscing elit</li>
              <li>Sed do eiusmod tempor</li>
              <li>Ut labore et dolore magna</li>
            </ul>
          </Card>
        </div>

        <Link
          href="/app"
          className="text-lg font-medium text-primary hover:underline"
        >
          Launch App
        </Link>
      </div>
    </section>
  );
}
