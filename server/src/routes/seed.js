const supabase = require('../config/database')

const dummyReports = [
  {
    latitude: 40.7128,
    longitude: -74.0060,
    severity: 'High',
    status: 'Reported',
    description: 'Large pile of garbage near subway entrance',
    photo_url: null
  },
  {
    latitude: 40.7580,
    longitude: -73.9855,
    severity: 'Medium',
    status: 'In Progress',
    description: 'Overflowing trash cans in Times Square',
    volunteer_id: 'volunteer_1',
    photo_url: null
  },
  {
    latitude: 40.7489,
    longitude: -73.9680,
    severity: 'Low',
    status: 'Cleaned',
    description: 'Small litter near park bench',
    volunteer_id: 'volunteer_2',
    photo_url: null
  },
  {
    latitude: 40.7614,
    longitude: -73.9776,
    severity: 'High',
    status: 'Reported',
    description: 'Illegal dumping behind building',
    photo_url: null
  },
  {
    latitude: 40.7282,
    longitude: -73.9942,
    severity: 'Medium',
    status: 'In Progress',
    description: 'Construction debris on sidewalk',
    volunteer_id: 'volunteer_3',
    photo_url: null
  }
]

async function seedDatabase() {
  try {
    console.log('Seeding database with dummy reports...')
    
    // Clear existing data
    const { error: deleteError } = await supabase
      .from('reports')
      .delete()
      .neq('id', 0)
    
    if (deleteError) {
      console.error('Error clearing existing data:', deleteError)
      return
    }
    
    // Insert dummy data
    const { data, error } = await supabase
      .from('reports')
      .insert(dummyReports)
      .select()
    
    if (error) {
      console.error('Error seeding data:', error)
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
