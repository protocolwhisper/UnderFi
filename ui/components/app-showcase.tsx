import { Card } from "./ui/card";

export function AppShowcase() {
  return (
    <section className="flex justify-center py-24 w-full">
      <div className="text-center max-w-5xl px-4">
        <h2 className="text-3xl font-semibold mb-4">
          Our all-in-one application
          is built for everybody
        </h2>
        <p className="text-muted-foreground mb-16 mx-auto">
          Underfi&apos;s dashboard unifies all the features in a
          simple and easy to use app
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="overflow-hidden text-center">
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-3">Simplified Dashboard</h3>
              <p className="text-muted-foreground">Track the TVL, Price and Collateral Ratio</p>
            </div>
            <div className="border-t">
              <img 
                src="/dashboard-preview.png" 
                alt="Dashboard preview" 
                className="w-full h-[300px] object-cover"
              />
            </div>
          </Card>

          <Card className="overflow-hidden text-center">
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-3">Portfolio Manager</h3>
              <p className="text-muted-foreground">Track your portfolio</p>
            </div>
            <div className="border-t">
              <img 
                src="/portfolio-preview.png" 
                alt="Portfolio preview" 
                className="w-full h-[300px] object-cover"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
