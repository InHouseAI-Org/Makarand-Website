-- ==========================================
-- ACTUAL SEED DATA FROM OFFICER LIST A WARD.PDF
-- Mumbai A Ward (Colaba/Fort Area)
-- ==========================================

-- ==========================================
-- WARD OFFICERS (16 Officers)
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
-- 1. Assistant Commissioner
(
  'wo_001',
  'Mr. Jaydeep More',
  'Assistant Commissioner "A"',
  'Municipal Administration',
  '9769666505',
  'ac.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort, Mumbai',
  'Monday to Friday: 10:00 AM - 5:00 PM',
  1,
  true,
  NOW(),
  NOW()
),

-- 2. Complaint Officer
(
  'wo_002',
  'Mr. Mahesh Patil',
  'Complaint Officer',
  'Civic Complaints',
  '9029007188',
  'complaint.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort, Mumbai',
  'Monday to Friday: 10:00 AM - 5:00 PM',
  2,
  true,
  NOW(),
  NOW()
),

-- 3. Medical Officer Health
(
  'wo_003',
  'Mr. Prafula Yadav',
  'Medical Officer Health',
  'Public Health & Licensing',
  '9821890590',
  'mo.health.award@mcgm.gov.in',
  'A Ward Health Office, Colaba, Mumbai',
  'Monday to Saturday: 9:00 AM - 4:00 PM',
  3,
  true,
  NOW(),
  NOW()
),

-- 4. A.E Solid Waste Management
(
  'wo_004',
  'Mr. Arun Vaidya',
  'A.E Solid Waste Management',
  'Solid Waste Management & Sanitation',
  '9820739100',
  'ae.swm.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort, Mumbai',
  'Monday to Sunday: 8:00 AM - 4:00 PM',
  4,
  true,
  NOW(),
  NOW()
),

-- 5. A.E Building & Factory
(
  'wo_005',
  'Mr. Rahul Jadhav',
  'A.E Building & Factory',
  'Building & Factories Department',
  '9930025277',
  'ae.building.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort, Mumbai',
  'Monday to Friday: 10:30 AM - 5:30 PM',
  5,
  true,
  NOW(),
  NOW()
),

-- 6. A.E Maintenance
(
  'wo_006',
  'Mr. Ravi Mhaske',
  'A.E Maintenance',
  'Road & Footpath Maintenance',
  '9004688678',
  'ae.maintenance.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort, Mumbai',
  'Monday to Friday: 10:00 AM - 5:00 PM',
  6,
  true,
  NOW(),
  NOW()
),

-- 7. A.E Water Works
(
  'wo_007',
  'Ms. Neeta Arote',
  'A.E Water Works',
  'Water Supply & Distribution',
  '8655358122',
  'ae.water.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort, Mumbai',
  'Monday to Friday: 10:00 AM - 5:00 PM',
  7,
  true,
  NOW(),
  NOW()
),

-- 8. Sr. Inspector (License)
(
  'wo_008',
  'Mr. Nilay Pawar',
  'Sr. Inspector (License)',
  'License Department',
  '9819074701',
  'si.license.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort, Mumbai',
  'Monday to Friday: 10:00 AM - 5:00 PM',
  8,
  true,
  NOW(),
  NOW()
),

-- 9. Sr. Inspector (Encroachment)
(
  'wo_009',
  'Mr. Parikshit Patil',
  'Sr. Inspector (Encroachment)',
  'Encroachment Department',
  '8369512377',
  'si.encroachment.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort, Mumbai',
  'Monday to Friday: 10:00 AM - 5:00 PM',
  9,
  true,
  NOW(),
  NOW()
),

-- 10. Pest Control Officer
(
  'wo_010',
  'Mr. Tushar Wagh',
  'Pest Control Officer',
  'Pest Control & Vector Management',
  '9096375894',
  'pco.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort, Mumbai',
  'Monday to Friday: 10:00 AM - 5:00 PM',
  10,
  true,
  NOW(),
  NOW()
),

-- 11. Horticulture Assistant (Garden)
(
  'wo_011',
  'Mr. Sudarshan Aaware',
  'Horticulture Assistant (Garden)',
  'Parks & Gardens',
  '9763230130',
  'ha.garden.award@mcgm.gov.in',
  'A Ward Garden Office, Colaba, Mumbai',
  'Monday to Saturday: 8:00 AM - 4:00 PM',
  11,
  true,
  NOW(),
  NOW()
),

-- 12. Executive Engineer
(
  'wo_012',
  'Mr. Kanojiya',
  'Executive Engineer',
  'Engineering Department',
  '9975673419',
  'ee.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort, Mumbai',
  'Monday to Friday: 10:00 AM - 5:00 PM',
  12,
  true,
  NOW(),
  NOW()
),

-- 13. Swan Niyantran Adhikari (City)
(
  'wo_013',
  'Dr. K.A. Pathan',
  'Swan Niyantran Adhikari (City)',
  'Animal Control & Veterinary',
  '022 25563284',
  'sna.city.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort, Mumbai',
  'Monday to Friday: 10:00 AM - 5:00 PM',
  13,
  true,
  NOW(),
  NOW()
),

-- 14. A.O (Schools)
(
  'wo_014',
  'Ms. Reena Varake',
  'A.O (Schools)',
  'Municipal Schools Administration',
  '9823517255',
  'ao.schools.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort, Mumbai',
  'Monday to Friday: 10:00 AM - 5:00 PM',
  14,
  true,
  NOW(),
  NOW()
),

-- 15. Rationing Officer "A"
(
  'wo_015',
  'Rationing Officer',
  'Rationing Officer "A"',
  'Rationing & Supply',
  NULL,
  'ro.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort, Mumbai',
  'Monday to Friday: 10:00 AM - 5:00 PM',
  15,
  true,
  NOW(),
  NOW()
),

-- 16. Div. Engineer (Street Light Maintenance), A.E Electrical
(
  'wo_016',
  'Mr. Abhijeet Dhotre',
  'Div. Engineer (Street Light Maintenance), A.E Electrical',
  'Electrical & Street Lighting',
  '9923203333',
  'de.electrical.award@mcgm.gov.in',
  'A Ward Office, Madam Cama Road, Fort, Mumbai',
  'Monday to Friday: 10:00 AM - 5:00 PM',
  16,
  true,
  NOW(),
  NOW()
);

-- ==========================================
-- POLICE STATIONS (5 Stations)
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
-- 1. MRA Marg Police Station
(
  'ps_001',
  'MRA Marg Police Station',
  'Shri. Yogesh Sable',
  'Sr. Police Inspector',
  '8976947179',
  1,
  true,
  NOW(),
  NOW()
),

-- 2. Azad Maidan Police Station
(
  'ps_002',
  'Azad Maidan Police Station',
  'Shri. Shrikant Adate',
  'Sr. Police Inspector',
  '8976947178',
  2,
  true,
  NOW(),
  NOW()
),

-- 3. Marine Drive Police Station
(
  'ps_003',
  'Marine Drive Police Station',
  'Shri. Nilesh Bagul',
  'Sr. Police Inspector',
  '8976947165',
  3,
  true,
  NOW(),
  NOW()
),

-- 4. Colaba Police Station
(
  'ps_004',
  'Colaba Police Station',
  'Shri. Sudhakar Deshmukh',
  'Sr. Police Inspector',
  '8976947163',
  4,
  true,
  NOW(),
  NOW()
),

-- 5. Cuffe Parade Police Station
(
  'ps_005',
  'Cuffe Parade Police Station',
  'Shri. Satish Gaikwad',
  'Sr. Police Inspector',
  '7768933007',
  5,
  true,
  NOW(),
  NOW()
);

-- ==========================================
-- FIRE STATIONS (3 Stations)
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
-- 1. Colaba Fire Station
(
  'fs_001',
  'Colaba Fire Station',
  '022 2204 3603',
  1,
  true,
  NOW(),
  NOW()
),

-- 2. Nariman Point Fire Station
(
  'fs_002',
  'Nariman Point Fire Station',
  '022 2288 2787',
  2,
  true,
  NOW(),
  NOW()
),

-- 3. Fort Fire Station
(
  'fs_003',
  'Fort Fire Station',
  '022 2261 1942',
  3,
  true,
  NOW(),
  NOW()
);

-- ==========================================
-- VERIFICATION QUERIES
-- Run these to verify the data was inserted
-- ==========================================

-- SELECT COUNT(*) as ward_officers FROM "WardOfficer";
-- SELECT COUNT(*) as police_stations FROM "PoliceStation";
-- SELECT COUNT(*) as fire_stations FROM "FireStation";

-- SELECT * FROM "WardOfficer" ORDER BY priority;
-- SELECT * FROM "PoliceStation" ORDER BY priority;
-- SELECT * FROM "FireStation" ORDER BY priority;

-- ==========================================
-- SUMMARY:
-- ==========================================
-- Ward Officers: 16 entries
-- Police Stations: 5 entries
-- Fire Stations: 3 entries
-- Total: 24 entries
--
-- All data extracted from "officer list A ward.pdf"
-- ==========================================
