import Header from './components/Header';
import StatCard from './components/StatCard';
import SpeedTestCard from './components/SpeedTestCard';
import './App.css';

function App() {
  const stats = [
    {
      title: 'Total Users',
      value: '12,345',
      icon: '👥',
      trend: 'up',
      trendValue: '+12.5%'
    },
    {
      title: 'Revenue',
      value: '$45,231',
      icon: '💰',
      trend: 'up',
      trendValue: '+8.2%'
    },
    {
      title: 'Active Projects',
      value: '67',
      icon: '📊',
      trend: 'down',
      trendValue: '-3.1%'
    },
    {
      title: 'Completion Rate',
      value: '94.5%',
      icon: '✅',
      trend: 'up',
      trendValue: '+2.4%'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'New user registered', time: '2 minutes ago', type: 'success' },
    { id: 2, action: 'Project milestone completed', time: '15 minutes ago', type: 'info' },
    { id: 3, action: 'Payment received', time: '1 hour ago', type: 'success' },
    { id: 4, action: 'System maintenance scheduled', time: '3 hours ago', type: 'warning' },
    { id: 5, action: 'New feature deployed', time: '5 hours ago', type: 'info' }
  ];

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="dashboard-container">
          <section className="stats-section">
            <h2 className="section-title">Overview</h2>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  trend={stat.trend}
                  trendValue={stat.trendValue}
                />
              ))}
              <SpeedTestCard />
            </div>
          </section>

          <section className="activity-section">
            <div className="activity-card">
              <h2 className="section-title">Recent Activity</h2>
              <div className="activity-list">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-indicator ${activity.type}`}></div>
                    <div className="activity-content">
                      <p className="activity-action">{activity.action}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="quick-actions-card">
              <h2 className="section-title">Quick Actions</h2>
              <div className="quick-actions-grid">
                <button className="action-button">
                  <span className="action-icon">➕</span>
                  <span>Add User</span>
                </button>
                <button className="action-button">
                  <span className="action-icon">📝</span>
                  <span>New Project</span>
                </button>
                <button className="action-button">
                  <span className="action-icon">📊</span>
                  <span>Reports</span>
                </button>
                <button className="action-button">
                  <span className="action-icon">⚙️</span>
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
