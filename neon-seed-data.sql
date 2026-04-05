-- ==========================================
-- SEED DATA FOR WARD OFFICERS, POLICE STATIONS, AND FIRE STATIONS
-- Mumbai A Ward (Colaba/Fort Area)
-- ==========================================

-- ==========================================
-- WARD OFFICERS
-- ==========================================

INSERT INTO "WardOfficer" (
  "id",
  "name",
  "designation",
  "department",
  "phone",
  "email",
  "office",
  "timing",
  "priority",
  "active",
  "createdAt",
  "updatedAt"
) VALUES
-- Ward Officer
(
  'wo_001',
  'Shri Rajesh Kumar',
  'Ward Officer',
  'Municipal Administration',
  '+91 22 2266 1234',
  'wo.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort',
  'Monday to Friday: 10:00 AM - 5:00 PM',
  1,
  true,
  NOW(),
  NOW()
),

-- Assistant Engineer
(
  'wo_002',
  'Shri Amit Deshmukh',
  'Assistant Engineer',
  'Roads & Traffic',
  '+91 22 2266 1235',
  'ae.roads.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort',
  'Monday to Friday: 10:00 AM - 5:00 PM',
  2,
  true,
  NOW(),
  NOW()
),

-- Health Officer
(
  'wo_003',
  'Dr. Priya Sharma',
  'Medical Officer',
  'Public Health',
  '+91 22 2266 1236',
  'mo.award@mcgm.gov.in',
  'A Ward Health Office, Colaba',
  'Monday to Saturday: 9:00 AM - 4:00 PM',
  3,
  true,
  NOW(),
  NOW()
),

-- Sanitation Inspector
(
  'wo_004',
  'Shri Suresh Patil',
  'Sanitation Inspector',
  'Solid Waste Management',
  '+91 22 2266 1237',
  'si.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort',
  'Monday to Sunday: 8:00 AM - 4:00 PM',
  4,
  true,
  NOW(),
  NOW()
),

-- Building Proposal Officer
(
  'wo_005',
  'Shri Prakash Joshi',
  'Building Proposal Officer',
  'Building & Factories',
  '+91 22 2266 1238',
  'bpo.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort',
  'Monday to Friday: 10:30 AM - 5:30 PM',
  5,
  true,
  NOW(),
  NOW()
),

-- Licensing Inspector
(
  'wo_006',
  'Smt. Meena Kulkarni',
  'Licensing Inspector',
  'License Department',
  '+91 22 2266 1239',
  'li.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort',
  'Monday to Friday: 10:00 AM - 5:00 PM',
  6,
  true,
  NOW(),
  NOW()
),

-- Garden Superintendent
(
  'wo_007',
  'Shri Anil Bhosale',
  'Garden Superintendent',
  'Parks & Gardens',
  '+91 22 2266 1240',
  'gs.award@mcgm.gov.in',
  'A Ward Garden Office, Colaba',
  'Monday to Saturday: 8:00 AM - 4:00 PM',
  7,
  true,
  NOW(),
  NOW()
),

-- Veterinary Officer
(
  'wo_008',
  'Dr. Sandeep Rane',
  'Veterinary Officer',
  'Veterinary Services',
  '+91 22 2266 1241',
  'vo.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort',
  'Monday to Friday: 10:00 AM - 5:00 PM',
  8,
  true,
  NOW(),
  NOW()
);

-- ==========================================
-- POLICE STATIONS
-- ==========================================

INSERT INTO "PoliceStation" (
  "id",
  "stationName",
  "name",
  "designation",
  "phone",
  "priority",
  "active",
  "createdAt",
  "updatedAt"
) VALUES
-- Colaba Police Station
(
  'ps_001',
  'Colaba Police Station',
  'Shri Mahesh Khandare',
  'Senior Police Inspector',
  '+91 22 2215 3333',
  1,
  true,
  NOW(),
  NOW()
),

-- Cuffe Parade Police Station
(
  'ps_002',
  'Cuffe Parade Police Station',
  'Shri Vijay Pawar',
  'Senior Police Inspector',
  '+91 22 2218 3737',
  2,
  true,
  NOW(),
  NOW()
),

-- MRA Marg Police Station
(
  'ps_003',
  'MRA Marg Police Station',
  'Shri Sanjay Yadav',
  'Senior Police Inspector',
  '+91 22 2262 0853',
  3,
  true,
  NOW(),
  NOW()
),

-- Azad Maidan Police Station
(
  'ps_004',
  'Azad Maidan Police Station',
  'Shri Rajendra Desai',
  'Senior Police Inspector',
  '+91 22 2262 1776',
  4,
  true,
  NOW(),
  NOW()
),

-- Yellow Gate Police Station
(
  'ps_005',
  'Yellow Gate Police Station',
  'Shri Prakash Naik',
  'Senior Police Inspector',
  '+91 22 2373 2451',
  5,
  true,
  NOW(),
  NOW()
),

-- Traffic Police (South Division)
(
  'ps_006',
  'Traffic Police - South Division',
  'Shri Avinash Ambure',
  'Deputy Commissioner of Police (Traffic)',
  '+91 22 2262 0111',
  6,
  true,
  NOW(),
  NOW()
);

-- ==========================================
-- FIRE STATIONS
-- ==========================================

INSERT INTO "FireStation" (
  "id",
  "stationName",
  "phone",
  "priority",
  "active",
  "createdAt",
  "updatedAt"
) VALUES
-- Colaba Fire Station
(
  'fs_001',
  'Colaba Fire Station',
  '+91 22 2282 1234',
  1,
  true,
  NOW(),
  NOW()
),

-- Byculla Fire Station (Nearest major station)
(
  'fs_002',
  'Byculla Fire Station',
  '+91 22 2373 1234',
  2,
  true,
  NOW(),
  NOW()
),

-- Masjid Bunder Fire Station
(
  'fs_003',
  'Masjid Bunder Fire Station',
  '+91 22 2342 1234',
  3,
  true,
  NOW(),
  NOW()
),

-- Mumbai Fire Brigade HQ (Emergency)
(
  'fs_004',
  'Mumbai Fire Brigade Headquarters',
  '101',
  4,
  true,
  NOW(),
  NOW()
);

-- ==========================================
-- VERIFICATION QUERY
-- Run this to verify the data was inserted
-- ==========================================

-- SELECT COUNT(*) as ward_officers FROM "WardOfficer";
-- SELECT COUNT(*) as police_stations FROM "PoliceStation";
-- SELECT COUNT(*) as fire_stations FROM "FireStation";

-- ==========================================
-- NOTES:
-- ==========================================
-- 1. All IDs are prefixed (wo_, ps_, fs_) for easy identification
-- 2. Phone numbers are formatted for Mumbai (India)
-- 3. Priority determines display order (lower number = higher priority)
-- 4. All entries are set to active=true
-- 5. Timestamps are set to NOW()
-- 6. Email format follows typical MCGM pattern
-- 7. Office timings reflect typical government office hours
-- ==========================================
