'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { supabase } from '@/lib/supabase'
import { Search, Plus, ChevronDown } from 'lucide-react'

interface Donor {
  id: string
  name: string
  blood_type: string
  last_donation: string
  contact: string
  status: string
}

export default function DonorsPage() {
  const [donors, setDonors] = useState<Donor[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDonors = async () => {
      setLoading(true)
      const { data } = await supabase.from('donors').select('*').order('created_at', { ascending: false })
      setDonors(data || [])
      setLoading(false)
    }
    loadDonors()
  }, [])

  const filteredDonors = donors.filter((donor) => {
    const matchesSearch =
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.blood_type.includes(searchTerm) ||
      donor.contact.includes(searchTerm)
    const matchesStatus = filterStatus === 'all' || donor.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleAddDonor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const { error } = await supabase.from('donors').insert([
      {
        name: formData.get('name'),
        blood_type: formData.get('bloodType'),
        last_donation: new Date().toISOString().split('T')[0],
        contact: formData.get('contact'),
        status: 'active',
      },
    ])

    if (!error) {
      const { data } = await supabase.from('donors').select('*').order('created_at', { ascending: false })
      setDonors(data || [])
      setShowForm(false)
      e.currentTarget.reset()
    }
  }

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Donor Registry</h2>
            <p className="text-text-muted">Manage and track blood donors</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Donor
          </button>
        </div>

        {/* Add Donor Form */}
        {showForm && (
          <div className="bg-white rounded-lg border border-border p-6 mb-8">
            <form onSubmit={handleAddDonor} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  name="bloodType"
                  required
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Blood Type</option>
                  {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="tel"
                name="contact"
                placeholder="Contact Number (e.g., +1234567890)"
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Add Donor
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-lg border border-border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search by name, blood type, or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white pr-8"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Donors Table */}
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Blood Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Last Donation
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-text-muted">
                      Loading donors...
                    </td>
                  </tr>
                ) : filteredDonors.length > 0 ? (
                  filteredDonors.map((donor) => (
                    <tr key={donor.id} className="border-b border-border hover:bg-secondary transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{donor.name}</td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        <span className="bg-primary-light bg-opacity-20 text-primary px-2 py-1 rounded font-semibold">
                          {donor.blood_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-muted">{donor.last_donation}</td>
                      <td className="px-6 py-4 text-sm text-text-muted">{donor.contact}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            donor.status === 'active'
                              ? 'bg-green-100 text-success'
                              : 'bg-gray-100 text-text-muted'
                          }`}
                        >
                          {donor.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-text-muted">
                      No donors found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
