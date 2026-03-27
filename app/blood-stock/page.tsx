import { Navbar } from '@/components/navbar'
import { mockBloodStock } from '@/lib/mockData'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function BloodStockPage() {
  // Calculate trends
  const stockTrends = mockBloodStock.map((stock) => {
    const trend = Math.random() > 0.5 ? 'up' : 'down'
    const percentage = Math.floor(Math.random() * 15) + 5
    return { ...stock, trend, percentage }
  })

  const totalUnits = mockBloodStock.reduce((sum, s) => sum + s.units, 0)
  const averageUnits = Math.round(totalUnits / mockBloodStock.length)

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Blood Stock</h2>
          <p className="text-text-muted">Real-time inventory management and statistics</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-sm text-text-muted mb-2">Total Units</p>
            <p className="text-3xl font-bold text-foreground">{totalUnits}</p>
            <p className="text-xs text-text-muted mt-2">All blood types combined</p>
          </div>
          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-sm text-text-muted mb-2">Average per Type</p>
            <p className="text-3xl font-bold text-foreground">{averageUnits}</p>
            <p className="text-xs text-text-muted mt-2">8 blood types</p>
          </div>
          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-sm text-text-muted mb-2">Last Updated</p>
            <p className="text-lg font-semibold text-foreground">Today</p>
            <p className="text-xs text-text-muted mt-2">3:45 PM</p>
          </div>
        </div>

        {/* Stock Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stockTrends.map((stock) => {
            const isLow = stock.units < 15
            const isCritical = stock.units < 10
            const percentageFull = (stock.units / 50) * 100

            return (
              <div
                key={stock.bloodType}
                className={`rounded-lg border p-6 ${
                  isCritical
                    ? 'bg-red-50 border-red-200'
                    : isLow
                      ? 'bg-amber-50 border-amber-200'
                      : 'bg-white border-border'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className={`text-sm font-medium ${isCritical || isLow ? 'text-foreground' : 'text-text-muted'}`}>
                      Blood Type
                    </p>
                    <p className="text-2xl font-bold text-foreground">{stock.bloodType}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${isCritical || isLow ? 'text-foreground' : 'text-text-muted'}`}>
                      Units
                    </p>
                    <p className="text-2xl font-bold text-primary">{stock.units}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-text-muted">Capacity</span>
                    <span className="text-xs font-medium text-text-muted">
                      {Math.round(percentageFull)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isCritical
                          ? 'bg-red-500'
                          : isLow
                            ? 'bg-amber-500'
                            : 'bg-primary'
                      }`}
                      style={{ width: `${percentageFull}%` }}
                    ></div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border border-opacity-50">
                  <div>
                    <p className="text-xs text-text-muted mb-1">Last Updated</p>
                    <p className="text-sm font-medium text-foreground">{stock.lastUpdated}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted mb-1">Expiry Date</p>
                    <p className="text-sm font-medium text-foreground">{stock.expiryDate}</p>
                  </div>
                </div>

                {/* Trend */}
                <div className="mt-4 flex items-center gap-1">
                  {stock.trend === 'up' ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-success" />
                      <span className="text-xs text-success font-semibold">+{stock.percentage}%</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-4 h-4 text-primary" />
                      <span className="text-xs text-primary font-semibold">-{stock.percentage}%</span>
                    </>
                  )}
                  <span className="text-xs text-text-muted">vs. last week</span>
                </div>

                {/* Status Alert */}
                {isCritical && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded text-red-800 text-xs font-medium">
                    Critical: Urgent replenishment needed
                  </div>
                )}
                {isLow && !isCritical && (
                  <div className="mt-4 p-3 bg-amber-100 border border-amber-300 rounded text-amber-800 text-xs font-medium">
                    Low: Schedule collection soon
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
