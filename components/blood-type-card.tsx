interface BloodTypeCardProps {
  stock: {
    id: string
    blood_type: string
    units: number
  }
}

export function BloodTypeCard({ stock }: BloodTypeCardProps) {
  const isLow = stock.units < 15
  const isCritical = stock.units < 10

  return (
    <div
      className={`p-4 rounded-lg border text-center transition-all ${
        isCritical
          ? 'bg-red-50 border-red-200 text-red-900'
          : isLow
            ? 'bg-amber-50 border-amber-200 text-amber-900'
            : 'bg-white border-border hover:shadow-md'
      }`}
    >
      <div className="text-2xl font-bold mb-1">{stock.blood_type}</div>
      <div className={`text-sm font-semibold ${isCritical || isLow ? '' : 'text-foreground'}`}>
        {stock.units} units
      </div>
      {(isCritical || isLow) && (
        <div className="text-xs mt-1 font-medium">{isCritical ? 'Critical' : 'Low'}</div>
      )}
    </div>
  )
}
