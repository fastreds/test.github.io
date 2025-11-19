import './KPIInfoCard.css';

const KPIInfoCard = () => {
  const kpiMetrics = [
    {
      name: 'Descarga Promedio',
      description: 'La velocidad media a la que se reciben datos de internet. Un número más alto es mejor.',
      icon: '📥',
      color: 'blue'
    },
    {
      name: 'Estabilidad (P5)',
      description: 'Representa la velocidad del 5% de tus peores pruebas (Percentil 5). Es un indicador clave de la consistencia; una "Estabilidad" alta significa que tu conexión rara vez cae a velocidades muy bajas. Un número más alto es mejor.',
      icon: '📊',
      color: 'green'
    },
    {
      name: 'Ping Promedio',
      description: 'El tiempo que tarda un paquete de datos en ir a un servidor y volver (latencia). Un número más bajo es mejor.',
      icon: '⚡',
      color: 'orange'
    },
    {
      name: 'Jitter Promedio',
      description: 'La variación en el tiempo de llegada de los paquetes de datos (Ping). Un Jitter alto causa inestabilidad en videollamadas y juegos online. Un número más bajo es mejor.',
      icon: '📈',
      color: 'purple'
    }
  ];

  const trendInfo = [
    {
      icon: '▲',
      color: 'green',
      text: 'Verde: Indica una mejora en el rendimiento en comparación con el período anterior.'
    },
    {
      icon: '▼',
      color: 'red',
      text: 'Rojo: Señala un empeoramiento del rendimiento en comparación con el período anterior.'
    }
  ];

  return (
    <div className="kpi-info-card">
      <div className="kpi-header">
        <h3 className="kpi-title">Guía de KPIs</h3>
        <div className="kpi-icon">🎯</div>
      </div>
      
      <div className="kpi-content">
        <div className="kpi-intro">
          <p className="intro-text">
            Esta sección desglosa las métricas de rendimiento más importantes para monitorear tu conexión:
          </p>
        </div>

        <div className="kpi-metrics">
          {kpiMetrics.map((metric, index) => (
            <div key={index} className={`kpi-metric ${metric.color}`}>
              <div className="metric-header">
                <div className="metric-icon">{metric.icon}</div>
                <h4 className="metric-name">{metric.name}</h4>
              </div>
              <p className="metric-description">{metric.description}</p>
            </div>
          ))}
        </div>

        <div className="trend-info">
          <h4 className="trend-title">Semáforo de Tendencia</h4>
          <div className="trend-items">
            {trendInfo.map((trend, index) => (
              <div key={index} className={`trend-item ${trend.color}`}>
                <span className="trend-icon">{trend.icon}</span>
                <span className="trend-text">{trend.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="kpi-tips">
          <h4 className="tips-title">Consejos de Interpretación</h4>
          <ul className="tips-list">
            <li>• Compara tus KPIs con los rangos de la Guía de Velocidades</li>
            <li>• Monitorea las tendencias a lo largo del tiempo</li>
            <li>• Identifica patrones en diferentes horas del día</li>
            <li>• Considera el uso simultáneo de múltiples dispositivos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KPIInfoCard;
