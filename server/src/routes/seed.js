const supabase = require('../config/database')

const dummyReports = [
  {
    latitude: 19.0760,
    longitude: 72.8777,
    severity: 'High',
    status: 'Volunteer Event Planned',
    description: 'Large pile of garbage near Mumbai train station - Community cleanup planned',
    photo_url: null,
    complainant_name: 'Raj Patel',
    complainant_phone: '+91 9876543210',
    complainant_email: 'raj.patel@email.com',
    event_date: '2024-12-15',
    event_time: '09:00',
    volunteer_count: '25'
  },
  {
    latitude: 28.6139,
    longitude: 77.2090,
    severity: 'Medium',
    status: 'In Progress',
    description: 'Overflowing trash cans in Delhi market area',
    photo_url: null,
    complainant_name: 'Anita Sharma',
    complainant_phone: '+91 9123456789',
    complainant_email: 'anita.sharma@email.com',
    volunteer_id: 'volunteer_1'
  },
  {
    latitude: 12.9716,
    longitude: 77.5946,
    severity: 'Low',
    status: 'Cleaned',
    description: 'Small litter near Bangalore park - Successfully cleaned by volunteers',
    photo_url: null,
    complainant_name: 'Kumar Reddy',
    volunteer_id: 'volunteer_2'
  },
  {
    latitude: 22.5726,
    longitude: 88.3639,
    severity: 'High',
    status: 'Reported',
    description: 'Illegal dumping behind Kolkata building - Urgent cleanup needed',
    photo_url: null,
    complainant_name: 'Smita Banerjee',
    complainant_phone: '+91 8765432109',
    complainant_email: 'smita.b@email.com'
  },
  {
    latitude: 17.3850,
    longitude: 78.4867,
    severity: 'Medium',
    status: 'Volunteer Event Planned',
    description: 'Construction debris on Hyderabad sidewalk - Weekend cleanup drive',
    photo_url: null,
    complainant_name: 'Mohammed Ali',
    complainant_phone: '+91 7654321098',
    event_date: '2024-12-17',
    event_time: '07:00',
    volunteer_count: '15'
  }
]

async function seedDatabase() {
  try {
    console.log('Seeding database with dummy reports...')
    
    // Insert dummy data (skip clearing to avoid UUID error)
    const { data, error } = await supabase
      .from('reports')
      .insert(dummyReports)
      .select()
    
    if (error) {
      if (error.code === '23505') {
        console.log('Reports already exist in database')
      } else {
        console.error('Error seeding data:', error)
      }
    } else {
      console.log(`Successfully seeded ${data.length} reports`)
    }
  } catch (error) {
    console.error('Seeding error:', error)
  }
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase()
}

module.exports = { seedDatabase, dummyReports }
