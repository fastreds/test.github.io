import { useState, useEffect } from 'react';
import './DataReaderCard.css';

const DataReaderCard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState('7d');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [availableDevices, setAvailableDevices] = useState([]);

  // URL del Google Apps Script (misma que usa el dashboard para leer)
  const SHEET_URL = "https://script.google.com/macros/s/AKfycbxM1KUEn9LJ_BimYCl4Lbrkwc_W3ljf72sjs5TmnxoMJ_Ye9CHLRsUnGxWjlhMVK5V96w/exec";

  // Función para obtener las fechas del período
  const getPeriodDates = (range) => {
    const now = new Date();
    let currentEnd = new Date(now);
    let currentStart = new Date(now);

    switch (range) {
      case '12h': currentStart.setHours(now.getHours() - 12); break;
      case '24h': currentStart.setHours(now.getHours() - 24); break;
      case '7d': currentStart.setDate(now.getDate() - 7); break;
      case '30d': currentStart.setDate(now.getDate() - 30); break;
      default: currentStart.setDate(now.getDate() - 7);
    }

    return { currentStart, currentEnd };
  };

  // Función para obtener datos del Google Sheet
  const fetchData = async (since, until, devices = []) => {
    if (!since || !until || new Date(since) >= new Date(until)) {
      console.warn("Rango de fechas inválido.");
      return [];
    }
    
    let url = `${SHEET_URL}?since=${since.toISOString()}&until=${until.toISOString()}&limit=1000`;
    
    if (devices.length > 0) {
      url += `&devices=${encodeURIComponent(devices.join(','))}`;
    }
    
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Error en la petición: ${res.statusText}`);
      const data = await res.json();
      if(data.error) {
        throw new Error(`Error del script: ${data.error}`);
      }
      return data;
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      throw error;
    }
  };

  // Cargar datos
  const loadData = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const { currentStart, currentEnd } = getPeriodDates(dateRange);
      const rawData = await fetchData(currentStart, currentEnd, selectedDevices);
      
      // Parsear datos
      const parsedData = rawData.map(d => ({
        timestamp: new Date(d.Timestamp),
        device: (d.Device || 'Desconocido').trim(),
        download: +d.Download_Mbps,
        ping: +d.Ping_ms,
        jitter: +d.Jitter_ms || 0
      }));

      setData(parsedData);

      // Actualizar dispositivos disponibles
      const devices = [...new Set(parsedData.map(d => d.device))].filter(d => d);
      setAvailableDevices(devices);

    } catch (err) {
      setError('Error al cargar los datos. Verifica la conexión.');
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    loadData();
  }, []);

  // Manejar cambio de rango de fechas
  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  // Manejar selección de dispositivos
  const handleDeviceToggle = (device) => {
    setSelectedDevices(prev => 
      prev.includes(device) 
        ? prev.filter(d => d !== device)
        : [...prev, device]
    );
  };

  // Seleccionar todos los dispositivos
  const selectAllDevices = () => {
    setSelectedDevices(availableDevices);
  };

  // Deseleccionar todos los dispositivos
  const deselectAllDevices = () => {
    setSelectedDevices([]);
  };

  // Calcular estadísticas básicas
  const calculateStats = () => {
    if (data.length === 0) return null;

    const downloads = data.map(d => d.download);
    const pings = data.map(d => d.ping);
    const jitters = data.map(d => d.jitter);

    const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    const min = arr => Math.min(...arr);
    const max = arr => Math.max(...arr);

    return {
      totalReadings: data.length,
      avgDownload: avg(downloads),
      minDownload: min(downloads),
      maxDownload: max(downloads),
      avgPing: avg(pings),
      minPing: min(pings),
      maxPing: max(pings),
      avgJitter: avg(jitters),
      uniqueDevices: availableDevices.length
    };
  };

  const stats = calculateStats();

  return (
    <div className="data-reader-card">
      <div className="reader-header">
        <h3 className="reader-title">Lectura de Datos</h3>
        <div className="reader-icon">📊</div>
      </div>
      
      <div className="reader-content">
        {/* Filtros */}
        <div className="filters-section">
          <div className="filter-group">
            <label className="filter-label">Rango de Fechas</label>
            <select 
              value={dateRange} 
              onChange={handleDateRangeChange}
              className="filter-select"
            >
              <option value="12h">Últimas 12 horas</option>
              <option value="24h">Últimas 24 horas</option>
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
            </select>
          </div>

          <div className="filter-group">
            <div className="device-filter-header">
              <label className="filter-label">Dispositivos</label>
              <div className="device-actions">
                <button type="button" onClick={selectAllDevices} className="device-action-btn">
                  Todos
                </button>
                <button type="button" onClick={deselectAllDevices} className="device-action-btn">
                  Ninguno
                </button>
              </div>
            </div>
            <div className="device-list">
              {availableDevices.map(device => (
                <label key={device} className="device-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedDevices.includes(device)}
                    onChange={() => handleDeviceToggle(device)}
                  />
                  <span>{device}</span>
                </label>
              ))}
            </div>
          </div>

          <button 
            onClick={loadData} 
            disabled={isLoading}
            className="load-button"
          >
            {isLoading ? 'Cargando...' : 'Actualizar Datos'}
          </button>
        </div>

        {/* Estadísticas */}
        {stats && (
          <div className="stats-section">
            <h4 className="stats-title">Resumen de Datos</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Total de Lecturas</span>
                <span className="stat-value">{stats.totalReadings}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Dispositivos Únicos</span>
                <span className="stat-value">{stats.uniqueDevices}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Descarga Promedio</span>
                <span className="stat-value">{stats.avgDownload.toFixed(2)} Mbps</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Ping Promedio</span>
                <span className="stat-value">{stats.avgPing.toFixed(2)} ms</span>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de datos */}
        <div className="data-section">
          <h4 className="data-title">Registros Recientes</h4>
          {error && (
            <div className="error-message">{error}</div>
          )}
          
          {isLoading ? (
            <div className="loading">Cargando datos...</div>
          ) : data.length === 0 ? (
            <div className="no-data">No hay datos disponibles para el período seleccionado.</div>
          ) : (
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Fecha/Hora</th>
                    <th>Dispositivo</th>
                    <th>Descarga (Mbps)</th>
                    <th>Ping (ms)</th>
                    <th>Jitter (ms)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 10).map((record, index) => (
                    <tr key={index}>
                      <td>{record.timestamp.toLocaleString()}</td>
                      <td>{record.device}</td>
                      <td>{record.download.toFixed(2)}</td>
                      <td>{record.ping.toFixed(2)}</td>
                      <td>{record.jitter.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.length > 10 && (
                <div className="table-footer">
                  Mostrando 10 de {data.length} registros
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataReaderCard;
