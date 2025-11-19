import Header from './components/Header';
import SpeedTestCard from './components/SpeedTestCard';
import InternetGuideCard from './components/InternetGuideCard';
import KPIInfoCard from './components/KPIInfoCard';
import AddReadingCard from './components/AddReadingCard';
import DataReaderCard from './components/DataReaderCard';
import './App.css';

function App() {
  const recentActivity = [
    { id: 1, action: 'Nueva lectura agregada', time: '2 minutos atrás', type: 'success' },
    { id: 2, action: 'Datos actualizados', time: '15 minutos atrás', type: 'info' },
    { id: 3, action: 'Prueba de velocidad completada', time: '1 hora atrás', type: 'success' },
    { id: 4, action: 'Mantenimiento del sistema', time: '3 horas atrás', type: 'warning' },
    { id: 5, action: 'Dashboard actualizado', time: '5 horas atrás', type: 'info' }
  ];

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="dashboard-container">
          <section className="stats-section">
            <h2 className="section-title">Dashboard de Velocidad de Internet</h2>
            <div className="stats-grid">
              <SpeedTestCard />
              <InternetGuideCard />
              <KPIInfoCard />
              <AddReadingCard />
              <DataReaderCard />
            </div>
          </section>

          <section className="activity-section">
            <div className="activity-card">
              <h2 className="section-title">Actividad Reciente</h2>
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
              <h2 className="section-title">Acciones Rápidas</h2>
              <div className="quick-actions-grid">
                <button className="action-button">
                  <span className="action-icon">📊</span>
                  <span>Ver Reportes</span>
                </button>
                <button className="action-button">
                  <span className="action-icon">📈</span>
                  <span>Análisis</span>
                </button>
                <button className="action-button">
                  <span className="action-icon">🔄</span>
                  <span>Actualizar</span>
                </button>
                <button className="action-button">
                  <span className="action-icon">⚙️</span>
                  <span>Configuración</span>
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
