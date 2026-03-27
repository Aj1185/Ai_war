export type BloodType = 'O+' | 'O-' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-'

export interface Donor {
  id: string
  name: string
  bloodType: BloodType
  lastDonation: string
  contact: string
  status: 'active' | 'inactive'
}

export interface BloodStock {
  bloodType: BloodType
  units: number
  lastUpdated: string
  expiryDate: string
}

export interface EmergencyRequest {
  id: string
  bloodType: BloodType
  units: number
  hospital: string
  priority: 'critical' | 'high' | 'medium'
  status: 'open' | 'fulfilled' | 'cancelled'
  createdAt: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}
