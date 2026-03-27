import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function to get all donors
export async function getDonors() {
  const { data, error } = await supabase
    .from('donors')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching donors:', error)
    return []
  }
  
  return data || []
}

// Helper function to get blood stock
export async function getBloodStock() {
  const { data, error } = await supabase
    .from('blood_stock')
    .select('*')
    .order('blood_type', { ascending: true })
  
  if (error) {
    console.error('Error fetching blood stock:', error)
    return []
  }
  
  return data || []
}

// Helper function to get emergency requests
export async function getEmergencyRequests() {
  const { data, error } = await supabase
    .from('requests')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching requests:', error)
    return []
  }
  
  return data || []
}

// Helper function to get hospitals
export async function getHospitals() {
  const { data, error } = await supabase
    .from('hospitals')
    .select('*')
    .order('name', { ascending: true })
  
  if (error) {
    console.error('Error fetching hospitals:', error)
    return []
  }
  
  return data || []
}
