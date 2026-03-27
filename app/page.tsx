'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { StatsCard } from '@/components/stats-card'
import { BloodTypeCard } from '@/components/blood-type-card'
import { RecentDonors } from '@/components/recent-donors'
import { EmergencyAlert } from '@/components/emergency-alert'
import { supabase } from '@/lib/supabase'
import { Droplet, Users, AlertCircle, TrendingUp } from 'lucide-react'

export default function Home() {
  const [bloodStock, setBloodStock] = useState<any[]>([])
  const [donors, setDonors] = useState<any[]>([])
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const [bloodData, donorData, requestData] = await Promise.all([
        supabase.from('blood_stock').select('*').order('blood_type'),
        supabase.from('donors').select('*').order('created_at', { ascending: false }),
        supabase.from('requests').select('*').order('created_at', { ascending: false }),
      ])

      setBloodStock(bloodData.data || [])
      setDonors(donorData.data || [])
      setRequests(requestData.data || [])
      setLoading(false)
    }

    loadData()
  }, [])

  const totalUnits = bloodStock.reduce((sum, stock) => sum + (stock.units || 0), 0)
  const activeDonors = donors.filter((d) => d.status === 'active').length
  const openRequests = requests.filter((r) => r.status === 'open').length
  const criticalRequests = requests.filter(
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
              {loading ? (
                <p className="text-text-muted">Loading...</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {bloodStock.map((stock) => (
                    <BloodTypeCard key={stock.id} stock={stock} />
                  ))}
                </div>
              )}
            </div>

            {/* Emergency Alerts */}
            <div className="mt-8 bg-white rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Active Emergencies</h3>
              {loading ? (
                <p className="text-text-muted">Loading...</p>
              ) : (
                <div className="space-y-3">
                  {requests
                    .filter((r) => r.status === 'open')
                    .map((request) => (
                      <EmergencyAlert key={request.id} request={request} />
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Donors Sidebar */}
          <div className="bg-white rounded-lg border border-border p-6 h-fit">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Donors</h3>
            {loading ? <p className="text-text-muted">Loading...</p> : <RecentDonors donors={donors.slice(0, 4)} />}
          </div>
        </div>
      </main>
    </div>
  )
}
