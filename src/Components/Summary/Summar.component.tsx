import { Card } from "../Card/Card.component"

type SummaryProps = { label: string; value: string}

export const Summary = ({ label, value }: SummaryProps) => {
  return (
    <Card>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <h2 className="mt-2 text-3xl font-bold text-gray-900">{value}</h2>
    </Card>
  )
}
