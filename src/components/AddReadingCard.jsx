import { useState } from 'react';
import './AddReadingCard.css';

const AddReadingCard = () => {
  const [formData, setFormData] = useState({
    device: '',
    download: '',
    ping: '',
    jitter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // URL del Google Apps Script (misma que usa el dashboard para leer)
  const SHEET_URL = "https://script.google.com/macros/s/AKfycbxM1KUEn9LJ_BimYCl4Lbrkwc_W3ljf72sjs5TmnxoMJ_Ye9CHLRsUnGxWjlhMVK5V96w/exec";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Preparar los datos para enviar al Google Sheet
      const readingData = {
        Timestamp: new Date().toISOString(),
        Device: formData.device,
        Download_Mbps: parseFloat(formData.download),
        Ping_ms: parseFloat(formData.ping),
        Jitter_ms: parseFloat(formData.jitter) || 0
      };

      // Enviar datos al Google Apps Script
      const response = await fetch(SHEET_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(readingData)
      });

      if (response.ok) {
        setMessage('✅ Lectura agregada exitosamente!');
        // Limpiar el formulario
        setFormData({
          device: '',
          download: '',
          ping: '',
          jitter: ''
        });
      } else {
        throw new Error('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Error al agregar la lectura. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickAdd = (deviceName) => {
    setFormData(prev => ({
      ...prev,
      device: deviceName
    }));
  };

  const commonDevices = ['Casa Principal', 'Oficina', 'Dispositivo Móvil', 'Laptop', 'Tablet'];

  return (
    <div className="add-reading-card">
      <div className="reading-header">
        <h3 className="reading-title">Agregar Lectura Remota</h3>
        <div className="reading-icon">📝</div>
      </div>
      
      <div className="reading-content">
        <form onSubmit={handleSubmit} className="reading-form">
          <div className="form-group">
            <label htmlFor="device" className="form-label">
              Dispositivo
            </label>
            <input
              type="text"
              id="device"
              name="device"
              value={formData.device}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Ej: Casa Principal"
              required
            />
            <div className="quick-devices">
              <span className="quick-label">Dispositivos comunes:</span>
              <div className="device-buttons">
                {commonDevices.map(device => (
                  <button
                    key={device}
                    type="button"
                    className="device-button"
                    onClick={() => handleQuickAdd(device)}
                  >
                    {device}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="download" className="form-label">
                Velocidad de Descarga (Mbps)
              </label>
              <input
                type="number"
                id="download"
                name="download"
                value={formData.download}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Ej: 85.5"
                step="0.1"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="ping" className="form-label">
                Ping (ms)
              </label>
              <input
                type="number"
                id="ping"
                name="ping"
                value={formData.ping}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Ej: 25"
                step="1"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="jitter" className="form-label">
                Jitter (ms)
              </label>
              <input
                type="number"
                id="jitter"
                name="jitter"
                value={formData.jitter}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Ej: 5"
                step="0.1"
                min="0"
              />
            </div>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                Agregando...
              </>
            ) : (
              'Agregar Lectura'
            )}
          </button>

          {message && (
            <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </form>

        <div className="reading-info">
          <h4 className="info-title">Información Importante</h4>
          <ul className="info-list">
            <li>• Los datos se guardarán en el mismo Google Sheet que usa el dashboard</li>
            <li>• La fecha y hora se registrarán automáticamente</li>
            <li>• Usa nombres consistentes para los dispositivos para mejor análisis</li>
            <li>• Las lecturas aparecerán en el dashboard después de actualizar</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddReadingCard;
