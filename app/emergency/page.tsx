'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { supabase } from '@/lib/supabase'
import { AlertCircle, Clock, CheckCircle, XCircle, Plus } from 'lucide-react'

interface Request {
  id: string
  blood_type: string
  units: number
  hospital_id: string
  priority: 'critical' | 'high' | 'medium'
  status: 'open' | 'fulfilled' | 'cancelled'
  created_at: string
}

export default function EmergencyPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRequests = async () => {
      setLoading(true)
      const { data } = await supabase.from('requests').select('*').order('created_at', { ascending: false })
      setRequests(data || [])
      setLoading(false)
    }
    loadRequests()
  }, [])

  const handleAddRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const { error } = await supabase.from('requests').insert([
      {
        blood_type: formData.get('bloodType'),
        units: parseInt(formData.get('units') as string),
        hospital_id: formData.get('hospital'),
        priority: formData.get('priority'),
        status: 'open',
      },
    ])

    if (!error) {
      const { data } = await supabase.from('requests').select('*').order('created_at', { ascending: false })
      setRequests(data || [])
      setShowForm(false)
      e.currentTarget.reset()
    }
  }

  const updateRequestStatus = async (id: string, status: 'open' | 'fulfilled' | 'cancelled') => {
    const { error } = await supabase.from('requests').update({ status }).eq('id', id)
    if (!error) {
      setRequests(requests.map((r) => (r.id === id ? { ...r, status } : r)))
    }
  }

  const openRequests = requests.filter((r) => r.status === 'open')
  const criticalCount = openRequests.filter((r) => r.priority === 'critical').length
  const totalUnitsNeeded = openRequests.reduce((sum, r) => sum + r.units, 0)

  const priorityColors = {
    critical: 'bg-red-50 border-red-200 text-red-900',
    high: 'bg-amber-50 border-amber-200 text-amber-900',
    medium: 'bg-blue-50 border-blue-200 text-blue-900',
  }

  const priorityBadge = {
    critical: 'bg-red-100 text-red-800',
    high: 'bg-amber-100 text-amber-800',
    medium: 'bg-blue-100 text-blue-800',
  }

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Emergency Requests</h2>
            <p className="text-text-muted">Manage urgent blood supply requests</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Request
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-sm text-text-muted mb-2">Open Requests</p>
            <p className="text-3xl font-bold text-foreground">{openRequests.length}</p>
            <p className="text-xs text-text-muted mt-2">{criticalCount} critical</p>
          </div>
          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-sm text-text-muted mb-2">Units Needed</p>
            <p className="text-3xl font-bold text-primary">{totalUnitsNeeded}</p>
            <p className="text-xs text-text-muted mt-2">Total for open requests</p>
          </div>
          <div className="bg-white rounded-lg border border-border p-6">
            <p className="text-sm text-text-muted mb-2">Fulfilled Today</p>
            <p className="text-3xl font-bold text-success">
              {requests.filter((r) => r.status === 'fulfilled').length}
            </p>
            <p className="text-xs text-text-muted mt-2">Completed requests</p>
          </div>
        </div>

        {/* Add Request Form */}
        {showForm && (
          <div className="bg-white rounded-lg border border-border p-6 mb-8">
            <form onSubmit={handleAddRequest} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="hospital"
                  placeholder="Hospital Name"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="units"
                  placeholder="Units Needed"
                  min="1"
                  required
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  name="priority"
                  required
                  className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Priority</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Create Request
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

        {/* Active Requests */}
        {openRequests.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Active Requests</h3>
            {loading ? (
              <p className="text-text-muted">Loading requests...</p>
            ) : (
              <div className="space-y-4">
                {openRequests.map((request) => {
                  const createdDate = new Date(request.created_at)
                  const hoursAgo = Math.round((Date.now() - createdDate.getTime()) / (1000 * 60 * 60))

                  const priorityColors = {
                    critical: 'bg-red-50 border-red-200 text-red-900',
                    high: 'bg-amber-50 border-amber-200 text-amber-900',
                    medium: 'bg-blue-50 border-blue-200 text-blue-900',
                  }

                  const priorityBadge = {
                    critical: 'bg-red-100 text-red-800',
                    high: 'bg-amber-100 text-amber-800',
                    medium: 'bg-blue-100 text-blue-800',
                  }

                  return (
                    <div key={request.id} className={`rounded-lg border p-6 ${priorityColors[request.priority]}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <AlertCircle className="w-6 h-6 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="text-lg font-semibold">Hospital {request.hospital_id}</h4>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${priorityBadge[request.priority]}`}>
                                {request.priority.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div>
                                <span className="font-semibold text-lg">{request.blood_type}</span>
                              </div>
                              <div>
                                <span className="font-semibold text-lg text-primary">{request.units}</span>
                                <span className="ml-1 text-xs opacity-75">units</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{hoursAgo}h ago</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => updateRequestStatus(request.id, 'fulfilled')}
                            className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors flex items-center gap-1"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Fulfill
                          </button>
                          <button
                            onClick={() => updateRequestStatus(request.id, 'cancelled')}
                            className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors flex items-center gap-1"
                          >
                            <XCircle className="w-4 h-4" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Past Requests */}
        {requests.filter((r) => r.status !== 'open').length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Request History</h3>
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary border-b border-border">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">ID</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Hospital</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                        Blood Type
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Units</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests
                      .filter((r) => r.status !== 'open')
                      .map((request) => (
                        <tr key={request.id} className="border-b border-border hover:bg-secondary">
                          <td className="px-6 py-4 text-sm font-medium text-foreground">{request.id}</td>
                          <td className="px-6 py-4 text-sm text-foreground">Hospital {request.hospital_id}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className="bg-primary-light bg-opacity-20 text-primary px-2 py-1 rounded font-semibold">
                              {request.blood_type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-foreground">{request.units}</td>
                          <td className="px-6 py-4 text-sm">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                request.status === 'fulfilled'
                                  ? 'bg-green-100 text-success'
                                  : 'bg-gray-100 text-text-muted'
                              }`}
                            >
                              {request.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
