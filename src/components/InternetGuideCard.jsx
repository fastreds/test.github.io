import './InternetGuideCard.css';

const InternetGuideCard = () => {
  const speedRanges = [
    {
      range: '1-10 Mbps',
      quality: 'Muy Lenta',
      description: 'Básica para navegación web y email',
      color: 'poor'
    },
    {
      range: '10-25 Mbps',
      quality: 'Lenta', 
      description: 'Streaming SD, videollamadas básicas',
      color: 'average'
    },
    {
      range: '25-50 Mbps',
      quality: 'Regular',
      description: 'Streaming HD, trabajo remoto',
      color: 'good'
    },
    {
      range: '50-100 Mbps',
      quality: 'Buena',
      description: 'Streaming 4K, juegos online',
      color: 'excellent'
    },
    {
      range: '100+ Mbps',
      quality: 'Excelente',
      description: 'Múltiples dispositivos, descargas rápidas',
      color: 'premium'
    }
  ];

  const pingRanges = [
    {
      range: '< 20 ms',
      quality: 'Excelente',
      description: 'Ideal para gaming competitivo',
      color: 'excellent'
    },
    {
      range: '20-50 ms',
      quality: 'Buena',
      description: 'Bueno para gaming y videollamadas',
      color: 'good'
    },
    {
      range: '50-100 ms',
      quality: 'Regular',
      description: 'Aceptable para uso general',
      color: 'average'
    },
    {
      range: '> 100 ms',
      quality: 'Lenta',
      description: 'Puede afectar experiencia en tiempo real',
      color: 'poor'
    }
  ];

  return (
    <div className="internet-guide-card">
      <div className="guide-header">
        <h3 className="guide-title">Guía de Velocidades</h3>
        <div className="guide-icon">📊</div>
      </div>
      
      <div className="guide-content">
        <div className="guide-section">
          <h4 className="section-title">Velocidad de Descarga</h4>
          <div className="speed-ranges">
            {speedRanges.map((range, index) => (
              <div key={index} className={`speed-range ${range.color}`}>
                <div className="range-header">
                  <span className="range-value">{range.range}</span>
                  <span className="range-quality">{range.quality}</span>
                </div>
                <p className="range-description">{range.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="guide-section">
          <h4 className="section-title">Latencia (Ping)</h4>
          <div className="ping-ranges">
            {pingRanges.map((range, index) => (
              <div key={index} className={`ping-range ${range.color}`}>
                <div className="range-header">
                  <span className="range-value">{range.range}</span>
                  <span className="range-quality">{range.quality}</span>
                </div>
                <p className="range-description">{range.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="guide-tips">
          <h4 className="section-title">Consejos Rápidos</h4>
          <ul className="tips-list">
            <li>• Usa cable Ethernet para mejor estabilidad</li>
            <li>• Reinicia el router periódicamente</li>
            <li>• Evita interferencias con otros dispositivos</li>
            <li>• Actualiza el firmware del router</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InternetGuideCard;
