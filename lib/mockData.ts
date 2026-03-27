import { Donor, BloodStock, EmergencyRequest } from './types'

export const mockDonors: Donor[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    bloodType: 'O+',
    lastDonation: '2024-03-15',
    contact: '+20 100 123 4567',
    status: 'active',
  },
  {
    id: '2',
    name: 'Fatima Al-Mansouri',
    bloodType: 'A+',
    lastDonation: '2024-02-20',
    contact: '+20 101 234 5678',
    status: 'active',
  },
  {
    id: '3',
    name: 'Mohamed Ali',
    bloodType: 'B+',
    lastDonation: '2024-01-10',
    contact: '+20 102 345 6789',
    status: 'active',
  },
  {
    id: '4',
    name: 'Layla Ahmed',
    bloodType: 'AB+',
    lastDonation: '2023-12-05',
    contact: '+20 103 456 7890',
    status: 'inactive',
  },
  {
    id: '5',
    name: 'Khalid Ibrahim',
    bloodType: 'O-',
    lastDonation: '2024-03-01',
    contact: '+20 104 567 8901',
    status: 'active',
  },
]

export const mockBloodStock: BloodStock[] = [
  {
    bloodType: 'O+',
    units: 45,
    lastUpdated: '2024-03-25',
    expiryDate: '2024-04-24',
  },
  {
    bloodType: 'O-',
    units: 28,
    lastUpdated: '2024-03-25',
    expiryDate: '2024-04-24',
  },
  {
    bloodType: 'A+',
    units: 32,
    lastUpdated: '2024-03-25',
    expiryDate: '2024-04-24',
  },
  {
    bloodType: 'A-',
    units: 15,
    lastUpdated: '2024-03-25',
    expiryDate: '2024-04-24',
  },
  {
    bloodType: 'B+',
    units: 38,
    lastUpdated: '2024-03-25',
    expiryDate: '2024-04-24',
  },
  {
    bloodType: 'B-',
    units: 12,
    lastUpdated: '2024-03-25',
    expiryDate: '2024-04-24',
  },
  {
    bloodType: 'AB+',
    units: 22,
    lastUpdated: '2024-03-25',
    expiryDate: '2024-04-24',
  },
  {
    bloodType: 'AB-',
    units: 8,
    lastUpdated: '2024-03-25',
    expiryDate: '2024-04-24',
  },
]

export const mockEmergencyRequests: EmergencyRequest[] = [
  {
    id: 'ER001',
    bloodType: 'O+',
    units: 10,
    hospital: 'Cairo Medical Center',
    priority: 'critical',
    status: 'open',
    createdAt: '2024-03-25T08:30:00',
  },
  {
    id: 'ER002',
    bloodType: 'AB-',
    units: 5,
    hospital: 'Ain Shams University Hospital',
    priority: 'high',
    status: 'fulfilled',
    createdAt: '2024-03-24T14:15:00',
  },
  {
    id: 'ER003',
    bloodType: 'B+',
    units: 8,
    hospital: 'Helwan Hospital',
    priority: 'medium',
    status: 'open',
    createdAt: '2024-03-25T11:45:00',
  },
]
