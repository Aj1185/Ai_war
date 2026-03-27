import { Navbar } from '@/components/navbar'
import { StatsCard } from '@/components/stats-card'
import { BloodTypeCard } from '@/components/blood-type-card'
import { RecentDonors } from '@/components/recent-donors'
import { EmergencyAlert } from '@/components/emergency-alert'
import { mockBloodStock, mockDonors, mockEmergencyRequests } from '@/lib/mockData'
import { Droplet, Users, AlertCircle, TrendingUp } from 'lucide-react'

export default function Home() {
  const totalUnits = mockBloodStock.reduce((sum, stock) => sum + stock.units, 0)
  const activeDonors = mockDonors.filter((d) => d.status === 'active').length
  const openRequests = mockEmergencyRequests.filter((r) => r.status === 'open').length
  const criticalRequests = mockEmergencyRequests.filter(
    (r) => r.priority === 'critical' && r.status === 'open'
  ).length

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
          <p className="text-text-muted">Real-time blood donation and availability tracking</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Units"
            value={totalUnits}
            icon={<Droplet className="w-6 h-6 text-primary" />}
            subtitle="All blood types"
          />
          <StatsCard
            title="Active Donors"
            value={activeDonors}
            icon={<Users className="w-6 h-6 text-primary" />}
            subtitle="Ready to donate"
          />
          <StatsCard
            title="Emergency Requests"
            value={openRequests}
            icon={<AlertCircle className="w-6 h-6 text-primary" />}
            subtitle={`${criticalRequests} critical`}
          />
          <StatsCard
            title="Availability"
            value="87%"
            icon={<TrendingUp className="w-6 h-6 text-primary" />}
            subtitle="Week average"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blood Stock */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Blood Stock Levels</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {mockBloodStock.map((stock) => (
                  <BloodTypeCard key={stock.bloodType} stock={stock} />
                ))}
              </div>
            </div>

            {/* Emergency Alerts */}
            <div className="mt-8 bg-white rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Active Emergencies</h3>
              <div className="space-y-3">
                {mockEmergencyRequests
                  .filter((r) => r.status === 'open')
                  .map((request) => (
                    <EmergencyAlert key={request.id} request={request} />
                  ))}
              </div>
            </div>
          </div>

          {/* Recent Donors Sidebar */}
          <div className="bg-white rounded-lg border border-border p-6 h-fit">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Donors</h3>
            <RecentDonors donors={mockDonors.slice(0, 4)} />
          </div>
        </div>
      </main>
    </div>
  )
}
