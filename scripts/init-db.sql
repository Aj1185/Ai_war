-- Create donors table
CREATE TABLE IF NOT EXISTS donors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  blood_group TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  last_donation_date TIMESTAMP,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create hospitals table
CREATE TABLE IF NOT EXISTS hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  contact TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create blood_stock table
CREATE TABLE IF NOT EXISTS blood_stock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
  blood_group TEXT NOT NULL,
  units INTEGER NOT NULL DEFAULT 0,
  last_updated TIMESTAMP DEFAULT NOW(),
  UNIQUE(hospital_id, blood_group)
);

-- Create requests table
CREATE TABLE IF NOT EXISTS requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blood_group TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  matched_hospital UUID REFERENCES hospitals(id),
  matched_donor UUID REFERENCES donors(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create ai_logs table
CREATE TABLE IF NOT EXISTS ai_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query TEXT NOT NULL,
  result TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_donors_blood_group ON donors(blood_group);
CREATE INDEX IF NOT EXISTS idx_donors_location ON donors(location);
CREATE INDEX IF NOT EXISTS idx_blood_stock_hospital_id ON blood_stock(hospital_id);
CREATE INDEX IF NOT EXISTS idx_blood_stock_blood_group ON blood_stock(blood_group);
CREATE INDEX IF NOT EXISTS idx_requests_blood_group ON requests(blood_group);
CREATE INDEX IF NOT EXISTS idx_requests_location ON requests(location);
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);

-- Enable Row Level Security (RLS)
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow all for now, can be restricted later)
CREATE POLICY "Enable read access for all users" ON donors FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON donors FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON donors FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON hospitals FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON hospitals FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON blood_stock FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON blood_stock FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON blood_stock FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON requests FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON requests FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON ai_logs FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON ai_logs FOR INSERT WITH CHECK (true);
