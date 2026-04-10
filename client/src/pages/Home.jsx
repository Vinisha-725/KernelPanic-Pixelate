import Layout from '../components/Common/Layout';
import { Link } from 'react-router-dom';

function Home() {
  const features = [
    {
      icon: '🗑️',
      title: 'Quick Reporting',
      description: 'Easily report garbage issues with our simple form and map interface'
    },
    {
      icon: '📊',
      title: 'Real-time Tracking',
      description: 'Monitor the status of your reports and see city-wide statistics'
    },
    {
      icon: '🌍',
      title: 'Community Impact',
      description: 'Join thousands of citizens working together for a cleaner city'
    },
    {
      icon: '⚡',
      title: 'Fast Response',
      description: 'Quick resolution times with dedicated municipal response teams'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Reports Resolved' },
    { value: '48hrs', label: 'Avg Response Time' },
    { value: '95%', label: 'Satisfaction Rate' },
    { value: '500+', label: 'Active Users' }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="card fade-in" style={{ 
        background: 'linear-gradient(135deg, var(--primary-color), var(--primary-hover))',
        color: 'white',
        border: 'none',
        textAlign: 'center',
        padding: '4rem 2rem'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: '700', 
          marginBottom: '1rem',
          color: 'white'
        }}>
          Keep Our City Clean Together
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          marginBottom: '2rem',
          opacity: 0.9,
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          Report garbage and waste issues instantly. Help us maintain a cleaner, healthier environment for everyone.
        </p>
        <div className="flex gap-4" style={{ justifyContent: 'center' }}>
          <Link to="/report" className="btn" style={{ 
            backgroundColor: 'white', 
            color: 'var(--primary-color)',
            padding: '1rem 2rem',
            fontSize: '1rem'
          }}>
            📍 Report Issue
          </Link>
          <Link to="/dashboard" className="btn btn-outline" style={{ 
            borderColor: 'white', 
            color: 'white',
            padding: '1rem 2rem',
            fontSize: '1rem'
          }}>
            📊 View Dashboard
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-grid" style={{ margin: '3rem 0' }}>
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ textAlign: 'center' }}>
            <div className="stat-value" style={{ fontSize: '2.5rem' }}>{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>How It Works</h2>
        <div className="grid grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card fade-in">
              <div className="card-content" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {feature.icon}
                </div>
                <h3 style={{ marginBottom: '1rem' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="card fade-in" style={{ 
        backgroundColor: 'var(--background)',
        textAlign: 'center',
        padding: '3rem'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Ready to Make a Difference?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.125rem' }}>
          Join our community of active citizens working towards a cleaner city.
        </p>
        <Link to="/report" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
          🚀 Get Started Now
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="card fade-in" style={{ marginTop: '3rem' }}>
        <div className="card-header">
          <h3 className="card-title">🔔 Recent Activity</h3>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-4 gap-4">
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--background)', 
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--success-color)'
            }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                Just now
              </div>
              <div style={{ fontWeight: '500' }}>
                Illegal dumping reported on Main St
              </div>
            </div>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--background)', 
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--success-color)'
            }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                5 mins ago
              </div>
              <div style={{ fontWeight: '500' }}>
                Overflowing bin resolved in Central Park
              </div>
            </div>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--background)', 
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--warning-color)'
            }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                12 mins ago
              </div>
              <div style={{ fontWeight: '500' }}>
                Street cleaning requested on 5th Ave
              </div>
            </div>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--background)', 
              borderRadius: 'var(--radius-md)',
              borderLeft: '4px solid var(--success-color)'
            }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                1 hour ago
              </div>
              <div style={{ fontWeight: '500' }}>
                Debris collection completed on Riverside Dr
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;