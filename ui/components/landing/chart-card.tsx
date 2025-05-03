import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <Card className="w-full p-4">
      <CardContent className="p-0">
        {children}
      </CardContent>
      <CardHeader className="p-0 mt-4">
        <CardTitle className="text-3xl font-semibold">{title}</CardTitle>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </CardHeader>
    </Card>
  )
} 