import { useState, useEffect } from 'react';
import './SpeedTestCard.css';

const SpeedTestCard = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [uploadSpeed, setUploadSpeed] = useState(null);
  const [ping, setPing] = useState(null);
  const [status, setStatus] = useState('idle');

  const simulateSpeedTest = async () => {
    setIsTesting(true);
    setStatus('Iniciando prueba...');
    
    // Simular ping
    await new Promise(resolve => setTimeout(resolve, 1000));
    const simulatedPing = Math.floor(Math.random() * 50) + 10;
    setPing(simulatedPing);
    setStatus('Midiendo velocidad de descarga...');
    
    // Simular velocidad de descarga
    await new Promise(resolve => setTimeout(resolve, 2000));
    const simulatedDownload = (Math.random() * 100 + 50).toFixed(1);
    setDownloadSpeed(simulatedDownload);
    setStatus('Midiendo velocidad de subida...');
    
    // Simular velocidad de subida
    await new Promise(resolve => setTimeout(resolve, 1500));
    const simulatedUpload = (Math.random() * 50 + 10).toFixed(1);
    setUploadSpeed(simulatedUpload);
    setStatus('Prueba completada');
    
    setIsTesting(false);
  };

  const resetTest = () => {
    setDownloadSpeed(null);
    setUploadSpeed(null);
    setPing(null);
    setStatus('idle');
  };

  const getSpeedQuality = (speed) => {
    if (!speed) return '';
    const numSpeed = parseFloat(speed);
    if (numSpeed < 25) return 'poor';
    if (numSpeed < 50) return 'average';
    if (numSpeed < 100) return 'good';
    return 'excellent';
  };

  return (
    <div className="speed-test-card">
      <div className="speed-test-header">
        <h3 className="speed-test-title">Velocidad de Internet</h3>
        <div className="speed-test-icon">🌐</div>
      </div>
      
      <div className="speed-test-content">
        {!isTesting && downloadSpeed === null && (
          <div className="speed-test-initial">
            <p className="speed-test-description">
              Mide la velocidad actual de tu conexión a internet
            </p>
            <button 
              className="speed-test-button start"
              onClick={simulateSpeedTest}
            >
              Iniciar Prueba
            </button>
          </div>
        )}

        {isTesting && (
          <div className="speed-test-progress">
            <div className="speed-test-spinner"></div>
            <p className="speed-test-status">{status}</p>
          </div>
        )}

        {!isTesting && downloadSpeed !== null && (
          <div className="speed-test-results">
            <div className="speed-metric">
              <span className="metric-label">Ping</span>
              <span className="metric-value ping">{ping} ms</span>
            </div>
            
            <div className="speed-metric">
              <span className="metric-label">Descarga</span>
              <div className="metric-with-quality">
                <span className="metric-value download">{downloadSpeed} Mbps</span>
                <span className={`quality-badge ${getSpeedQuality(downloadSpeed)}`}>
                  {getSpeedQuality(downloadSpeed) === 'excellent' && 'Excelente'}
                  {getSpeedQuality(downloadSpeed) === 'good' && 'Buena'}
                  {getSpeedQuality(downloadSpeed) === 'average' && 'Regular'}
                  {getSpeedQuality(downloadSpeed) === 'poor' && 'Lenta'}
                </span>
              </div>
            </div>
            
            <div className="speed-metric">
              <span className="metric-label">Subida</span>
              <div className="metric-with-quality">
                <span className="metric-value upload">{uploadSpeed} Mbps</span>
                <span className={`quality-badge ${getSpeedQuality(uploadSpeed)}`}>
                  {getSpeedQuality(uploadSpeed) === 'excellent' && 'Excelente'}
                  {getSpeedQuality(uploadSpeed) === 'good' && 'Buena'}
                  {getSpeedQuality(uploadSpeed) === 'average' && 'Regular'}
                  {getSpeedQuality(uploadSpeed) === 'poor' && 'Lenta'}
                </span>
              </div>
            </div>

            <div className="speed-test-actions">
              <button 
                className="speed-test-button retry"
                onClick={simulateSpeedTest}
              >
                Probar Nuevamente
              </button>
              <button 
                className="speed-test-button reset"
                onClick={resetTest}
              >
                Reiniciar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeedTestCard;
