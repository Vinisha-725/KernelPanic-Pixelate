function StatsCards() {
  const stats = [
    {
      value: "247",
      label: "Total Reports",
      change: "+12%",
      changeType: "positive",
      icon: "📊"
    },
    {
      value: "89",
      label: "Pending",
      change: "+5%",
      changeType: "positive",
      icon: "⏳"
    },
    {
      value: "158",
      label: "Resolved",
      change: "+18%",
      changeType: "positive",
      icon: "✅"
    },
    {
      value: "4.2",
      label: "Avg Resolution Days",
      change: "-0.8",
      changeType: "positive",
      icon: "⏱️"
    }
  ];

  return (
    <div className="stats-grid fade-in">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className={`stat-change ${stat.changeType}`}>
                {stat.changeType === 'positive' ? '↑' : '↓'} {stat.change}
              </div>
            </div>
            <div style={{ fontSize: '2rem', opacity: 0.7 }}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;