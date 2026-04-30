const supabase = require('../supabase/client');

const colleges = [
  {
    name: "IIT Bombay", location: "Mumbai", state: "Maharashtra", type: "Engineering",
    fees_per_year: 200000, total_fees: 800000, rating: 4.9, ranking: 1, established: 1958,
    placement_percent: 98, avg_package: 21.00, highest_package: 367.00, total_students: 10000,
    courses: ['B.Tech', 'M.Tech', 'PhD'], exams_accepted: ['JEE Advanced'], jee_cutoff_rank: 100,
    cat_cutoff_percentile: null, description: "Premier engineering institute in India."
  },
  {
    name: "IIT Delhi", location: "New Delhi", state: "Delhi", type: "Engineering",
    fees_per_year: 210000, total_fees: 840000, rating: 4.8, ranking: 2, established: 1961,
    placement_percent: 97, avg_package: 20.50, highest_package: 200.00, total_students: 9500,
    courses: ['B.Tech', 'M.Tech', 'PhD'], exams_accepted: ['JEE Advanced'], jee_cutoff_rank: 150,
    cat_cutoff_percentile: null, description: "Top engineering college located in the capital."
  },
  {
    name: "IIM Ahmedabad", location: "Ahmedabad", state: "Gujarat", type: "Management",
    fees_per_year: 1200000, total_fees: 2400000, rating: 4.9, ranking: 1, established: 1961,
    placement_percent: 100, avg_package: 32.00, highest_package: 115.00, total_students: 1200,
    courses: ['MBA', 'PhD'], exams_accepted: ['CAT'], jee_cutoff_rank: null,
    cat_cutoff_percentile: 99.5, description: "The most prestigious management institute in India."
  },
  {
    name: "AIIMS New Delhi", location: "New Delhi", state: "Delhi", type: "Medical",
    fees_per_year: 15000, total_fees: 75000, rating: 4.9, ranking: 1, established: 1956,
    placement_percent: 99, avg_package: 15.00, highest_package: 40.00, total_students: 3000,
    courses: ['MBBS', 'MD', 'MS'], exams_accepted: ['NEET'], jee_cutoff_rank: null,
    cat_cutoff_percentile: null, description: "Premier medical college and hospital."
  },
  {
    name: "NIT Trichy", location: "Tiruchirappalli", state: "Tamil Nadu", type: "Engineering",
    fees_per_year: 150000, total_fees: 600000, rating: 4.6, ranking: 9, established: 1964,
    placement_percent: 95, avg_package: 12.00, highest_package: 52.00, total_students: 6000,
    courses: ['B.Tech', 'M.Tech', 'MBA'], exams_accepted: ['JEE Main'], jee_cutoff_rank: 2000,
    cat_cutoff_percentile: null, description: "One of the best NITs in India."
  },
  {
    name: "BITS Pilani", location: "Pilani", state: "Rajasthan", type: "Engineering",
    fees_per_year: 500000, total_fees: 2000000, rating: 4.7, ranking: 15, established: 1964,
    placement_percent: 96, avg_package: 18.00, highest_package: 133.00, total_students: 4000,
    courses: ['B.E.', 'M.E.', 'Pharmacy'], exams_accepted: ['BITSAT'], jee_cutoff_rank: null,
    cat_cutoff_percentile: null, description: "Leading private engineering institute."
  },
  {
    name: "IIM Bangalore", location: "Bangalore", state: "Karnataka", type: "Management",
    fees_per_year: 1200000, total_fees: 2400000, rating: 4.8, ranking: 2, established: 1973,
    placement_percent: 100, avg_package: 30.00, highest_package: 80.00, total_students: 1100,
    courses: ['MBA', 'PhD'], exams_accepted: ['CAT'], jee_cutoff_rank: null,
    cat_cutoff_percentile: 99.0, description: "Top B-School known for excellent placements."
  },
  {
    name: "JNU", location: "New Delhi", state: "Delhi", type: "Arts",
    fees_per_year: 5000, total_fees: 15000, rating: 4.5, ranking: 2, established: 1969,
    placement_percent: 75, avg_package: 8.00, highest_package: 16.00, total_students: 8000,
    courses: ['BA', 'MA', 'PhD'], exams_accepted: ['CUET'], jee_cutoff_rank: null,
    cat_cutoff_percentile: null, description: "A highly prestigious central university."
  },
  {
    name: "IIT Madras", location: "Chennai", state: "Tamil Nadu", type: "Engineering",
    fees_per_year: 200000, total_fees: 800000, rating: 4.9, ranking: 3, established: 1959,
    placement_percent: 96, avg_package: 19.50, highest_package: 198.00, total_students: 9000,
    courses: ['B.Tech', 'M.Tech'], exams_accepted: ['JEE Advanced'], jee_cutoff_rank: 160,
    cat_cutoff_percentile: null, description: "Top ranking engineering institute."
  },
  {
    name: "IIT Kanpur", location: "Kanpur", state: "Uttar Pradesh", type: "Engineering",
    fees_per_year: 200000, total_fees: 800000, rating: 4.8, ranking: 4, established: 1959,
    placement_percent: 94, avg_package: 18.50, highest_package: 190.00, total_students: 8500,
    courses: ['B.Tech', 'M.Tech'], exams_accepted: ['JEE Advanced'], jee_cutoff_rank: 220,
    cat_cutoff_percentile: null, description: "Renowned for its strong theoretical foundation."
  },
  {
    name: "IIT Kharagpur", location: "Kharagpur", state: "West Bengal", type: "Engineering",
    fees_per_year: 200000, total_fees: 800000, rating: 4.7, ranking: 5, established: 1951,
    placement_percent: 93, avg_package: 17.50, highest_package: 240.00, total_students: 12000,
    courses: ['B.Tech', 'M.Tech', 'LLB'], exams_accepted: ['JEE Advanced'], jee_cutoff_rank: 280,
    cat_cutoff_percentile: null, description: "The oldest and largest IIT."
  },
  {
    name: "IIM Calcutta", location: "Kolkata", state: "West Bengal", type: "Management",
    fees_per_year: 1200000, total_fees: 2400000, rating: 4.8, ranking: 3, established: 1961,
    placement_percent: 100, avg_package: 31.00, highest_package: 90.00, total_students: 1100,
    courses: ['MBA', 'PhD'], exams_accepted: ['CAT'], jee_cutoff_rank: null,
    cat_cutoff_percentile: 99.0, description: "Excellent management institute with strong finance focus."
  },
  {
    name: "IIM Lucknow", location: "Lucknow", state: "Uttar Pradesh", type: "Management",
    fees_per_year: 1000000, total_fees: 2000000, rating: 4.7, ranking: 4, established: 1984,
    placement_percent: 100, avg_package: 28.00, highest_package: 60.00, total_students: 1000,
    courses: ['MBA', 'PhD'], exams_accepted: ['CAT'], jee_cutoff_rank: null,
    cat_cutoff_percentile: 98.0, description: "A premier national-level management institute."
  },
  {
    name: "Christian Medical College (CMC)", location: "Vellore", state: "Tamil Nadu", type: "Medical",
    fees_per_year: 50000, total_fees: 250000, rating: 4.8, ranking: 3, established: 1900,
    placement_percent: 98, avg_package: 12.00, highest_package: 25.00, total_students: 2500,
    courses: ['MBBS', 'BSc Nursing'], exams_accepted: ['NEET'], jee_cutoff_rank: null,
    cat_cutoff_percentile: null, description: "A highly prestigious private medical college."
  },
  {
    name: "JIPMER", location: "Puducherry", state: "Puducherry", type: "Medical",
    fees_per_year: 12000, total_fees: 60000, rating: 4.7, ranking: 5, established: 1823,
    placement_percent: 95, avg_package: 10.00, highest_package: 20.00, total_students: 2000,
    courses: ['MBBS', 'MD'], exams_accepted: ['NEET'], jee_cutoff_rank: null,
    cat_cutoff_percentile: null, description: "An Institute of National Importance under Ministry of Health."
  },
  {
    name: "NIT Surathkal", location: "Mangalore", state: "Karnataka", type: "Engineering",
    fees_per_year: 150000, total_fees: 600000, rating: 4.5, ranking: 10, established: 1960,
    placement_percent: 94, avg_package: 11.50, highest_package: 51.00, total_students: 5500,
    courses: ['B.Tech', 'M.Tech'], exams_accepted: ['JEE Main'], jee_cutoff_rank: 2500,
    cat_cutoff_percentile: null, description: "Top NIT with excellent infrastructure."
  },
  {
    name: "Delhi University (DU)", location: "New Delhi", state: "Delhi", type: "Arts",
    fees_per_year: 15000, total_fees: 45000, rating: 4.4, ranking: 11, established: 1922,
    placement_percent: 80, avg_package: 7.00, highest_package: 30.00, total_students: 25000,
    courses: ['BA', 'BCom', 'BSc'], exams_accepted: ['CUET'], jee_cutoff_rank: null,
    cat_cutoff_percentile: null, description: "Premier collegiate public central university."
  },
  {
    name: "St. Stephen's College", location: "New Delhi", state: "Delhi", type: "Arts",
    fees_per_year: 40000, total_fees: 120000, rating: 4.7, ranking: 2, established: 1881,
    placement_percent: 85, avg_package: 9.00, highest_package: 25.00, total_students: 2000,
    courses: ['BA', 'BSc'], exams_accepted: ['CUET'], jee_cutoff_rank: null,
    cat_cutoff_percentile: null, description: "Highly reputed constituent college of DU."
  },
  {
    name: "VIT Vellore", location: "Vellore", state: "Tamil Nadu", type: "Engineering",
    fees_per_year: 200000, total_fees: 800000, rating: 4.3, ranking: 12, established: 1984,
    placement_percent: 90, avg_package: 8.50, highest_package: 75.00, total_students: 30000,
    courses: ['B.Tech', 'M.Tech'], exams_accepted: ['VITEEE'], jee_cutoff_rank: null,
    cat_cutoff_percentile: null, description: "Well known private engineering institute."
  },
  {
    name: "SRM Institute of Science and Technology", location: "Chennai", state: "Tamil Nadu", type: "Engineering",
    fees_per_year: 250000, total_fees: 1000000, rating: 4.1, ranking: 20, established: 1985,
    placement_percent: 88, avg_package: 7.50, highest_package: 50.00, total_students: 35000,
    courses: ['B.Tech', 'M.Tech'], exams_accepted: ['SRMJEEE'], jee_cutoff_rank: null,
    cat_cutoff_percentile: null, description: "Private university known for engineering programs."
  },
  {
    name: "XLRI Jamshedpur", location: "Jamshedpur", state: "Jharkhand", type: "Management",
    fees_per_year: 1100000, total_fees: 2200000, rating: 4.8, ranking: 8, established: 1949,
    placement_percent: 100, avg_package: 29.00, highest_package: 75.00, total_students: 1000,
    courses: ['PGDM', 'Fellowship'], exams_accepted: ['XAT'], jee_cutoff_rank: null,
    cat_cutoff_percentile: null, description: "The oldest business school in India."
  },
  {
    name: "SPJIMR", location: "Mumbai", state: "Maharashtra", type: "Management",
    fees_per_year: 900000, total_fees: 1800000, rating: 4.6, ranking: 10, established: 1981,
    placement_percent: 100, avg_package: 26.00, highest_package: 65.00, total_students: 800,
    courses: ['PGDM'], exams_accepted: ['CAT', 'GMAT'], jee_cutoff_rank: null,
    cat_cutoff_percentile: 95.0, description: "A highly ranked private management institute."
  },
  {
    name: "Manipal Institute of Technology", location: "Manipal", state: "Karnataka", type: "Engineering",
    fees_per_year: 300000, total_fees: 1200000, rating: 4.3, ranking: 50, established: 1957,
    placement_percent: 85, avg_package: 8.00, highest_package: 45.00, total_students: 8000,
    courses: ['B.Tech', 'M.Tech'], exams_accepted: ['MET'], jee_cutoff_rank: null,
    cat_cutoff_percentile: null, description: "One of the premier private engineering colleges."
  },
  {
    name: "King George's Medical University", location: "Lucknow", state: "Uttar Pradesh", type: "Medical",
    fees_per_year: 50000, total_fees: 250000, rating: 4.6, ranking: 9, established: 1911,
    placement_percent: 92, avg_package: 9.00, highest_package: 18.00, total_students: 3000,
    courses: ['MBBS', 'BDS'], exams_accepted: ['NEET'], jee_cutoff_rank: null,
    cat_cutoff_percentile: null, description: "A prestigious state medical university."
  },
  {
    name: "AFMC Pune", location: "Pune", state: "Maharashtra", type: "Medical",
    fees_per_year: 10000, total_fees: 50000, rating: 4.8, ranking: 4, established: 1948,
    placement_percent: 100, avg_package: 10.00, highest_package: 15.00, total_students: 1000,
    courses: ['MBBS', 'Nursing'], exams_accepted: ['NEET'], jee_cutoff_rank: null,
    cat_cutoff_percentile: null, description: "Armed Forces Medical College."
  },
  {
    name: "NID Ahmedabad", location: "Ahmedabad", state: "Gujarat", type: "Arts",
    fees_per_year: 350000, total_fees: 1400000, rating: 4.7, ranking: 1, established: 1961,
    placement_percent: 90, avg_package: 14.00, highest_package: 30.00, total_students: 1500,
    courses: ['B.Des', 'M.Des'], exams_accepted: ['NID DAT'], jee_cutoff_rank: null,
    cat_cutoff_percentile: null, description: "Premier design institute."
  },
  {
    name: "Loyola College", location: "Chennai", state: "Tamil Nadu", type: "Arts",
    fees_per_year: 40000, total_fees: 120000, rating: 4.5, ranking: 4, established: 1925,
    placement_percent: 80, avg_package: 6.00, highest_package: 15.00, total_students: 8000,
    courses: ['BA', 'BSc', 'BCom'], exams_accepted: ['Direct'], jee_cutoff_rank: null,
    cat_cutoff_percentile: null, description: "An autonomous Catholic higher education institution."
  },
  {
    name: "NIT Warangal", location: "Warangal", state: "Telangana", type: "Engineering",
    fees_per_year: 150000, total_fees: 600000, rating: 4.6, ranking: 11, established: 1959,
    placement_percent: 94, avg_package: 12.50, highest_package: 55.00, total_students: 5000,
    courses: ['B.Tech', 'M.Tech'], exams_accepted: ['JEE Main'], jee_cutoff_rank: 2200,
    cat_cutoff_percentile: null, description: "First in the chain of NITs in India."
  },
  {
    name: "IIIT Hyderabad", location: "Hyderabad", state: "Telangana", type: "Engineering",
    fees_per_year: 300000, total_fees: 1200000, rating: 4.8, ranking: 54, established: 1998,
    placement_percent: 100, avg_package: 24.00, highest_package: 74.00, total_students: 2000,
    courses: ['B.Tech', 'M.Tech', 'PhD'], exams_accepted: ['JEE Main', 'UGEE'], jee_cutoff_rank: 1000,
    cat_cutoff_percentile: null, description: "Top IT institute with excellent coding culture."
  },
  {
    name: "FMS Delhi", location: "New Delhi", state: "Delhi", type: "Management",
    fees_per_year: 100000, total_fees: 200000, rating: 4.8, ranking: 5, established: 1954,
    placement_percent: 100, avg_package: 32.00, highest_package: 58.00, total_students: 500,
    courses: ['MBA', 'PhD'], exams_accepted: ['CAT'], jee_cutoff_rank: null,
    cat_cutoff_percentile: 99.0, description: "Known for lowest fee and highest ROI among top B-schools."
  }
];

async function seed() {
  console.log('Seeding colleges...');
  
  // Note: If the user schema lacks these columns, this will fail. We will ask them to update it.
  const { data, error } = await supabase.from('colleges').insert(colleges);
  if (error) {
    console.error('Error seeding colleges:', error);
  } else {
    console.log('Successfully seeded 30 colleges.');
  }
}

seed();
