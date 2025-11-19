# Master Dashboard

Un dashboard moderno construido con React + Vite que incluye un medidor de velocidad de internet y sistema de temas claro/oscuro.

## 🚀 Características

- ✅ Dashboard con estadísticas en tiempo real
- ✅ Medidor de velocidad de internet
- ✅ Sistema de temas claro/oscuro
- ✅ Diseño completamente responsivo
- ✅ Optimizado para producción

## 🛠️ Desarrollo Local

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🐳 Despliegue con Docker

### Construir y ejecutar localmente

```bash
# Construir la imagen
docker build -t masterdashboard .

# Ejecutar el contenedor
docker run -p 3000:80 masterdashboard
```

### Usar Docker Compose

```bash
# Ejecutar en producción
docker-compose up -d masterdashboard

# Ejecutar en desarrollo
docker-compose up -d masterdashboard-dev
```

## ☸️ Despliegue en CapRover

### Prerrequisitos
- Instancia de CapRover configurada
- Acceso SSH al servidor
- Git configurado

### Pasos para desplegar

1. **Preparar el repositorio**
   ```bash
   git add .
   git commit -m "Preparado para CapRover"
   git push origin main
   ```

2. **Configurar en CapRover**
   - Ir al panel de CapRover
   - Crear una nueva aplicación
   - Nombre: `masterdashboard`
   - Configurar el dominio si es necesario

3. **Configurar despliegue**
   - Método: `Git Repository`
   - Branch: `main`
   - Configuración: Usar `captain-definition`

4. **Variables de entorno (opcional)**
   ```
   NODE_ENV=production
   ```

5. **Desplegar**
   - Hacer clic en "Deploy"
   - Esperar a que el build termine

### Configuración manual via SSH

```bash
# Conectarse al servidor CapRover
ssh captain@your-caprover-domain.com

# Navegar al directorio de la app
cd /captain/apps/masterdashboard

# Ver logs si es necesario
docker service logs masterdashboard --tail 100
```

## 📁 Estructura del Proyecto

```
masterdashboard/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Header.jsx      # Header con toggle de tema
│   │   ├── StatCard.jsx    # Tarjeta de estadísticas
│   │   └── SpeedTestCard.jsx # Medidor de velocidad
│   ├── context/
│   │   └── ThemeContext.jsx # Contexto de temas
│   ├── App.jsx             # Componente principal
│   └── main.jsx            # Punto de entrada
├── public/                 # Archivos estáticos
├── dist/                   # Build de producción
├── Dockerfile             # Configuración Docker
├── nginx.conf             # Configuración nginx
├── docker-compose.yml     # Orquestación Docker
└── captain-definition     # Configuración CapRover
```

## 🔧 Configuración

### Variables de entorno

| Variable | Valor por defecto | Descripción |
|----------|-------------------|-------------|
| `NODE_ENV` | `development` | Entorno de ejecución |

### Puertos

- **Desarrollo**: 5173
- **Producción**: 80 (contenedor) / 3000 (host)

## 🚢 Pipeline de CI/CD

El proyecto está configurado para despliegue automático con:

1. **Build**: Multi-stage Docker build
2. **Testing**: ESLint configurado
3. **Deploy**: Configuración CapRover lista

## 📊 Monitoreo

La aplicación incluye:

- ✅ Health check endpoint: `/health`
- ✅ Logs estructurados
- ✅ Métricas de rendimiento

## 🔒 Seguridad

Configuraciones implementadas:

- Headers de seguridad (CSP, XSS Protection)
- Rate limiting
- Configuración segura de nginx

## 🆘 Troubleshooting

### Problemas comunes

1. **Build falla en CapRover**
   - Verificar que `captain-definition` exista
   - Revisar logs de build en CapRover

2. **La aplicación no carga**
   - Verificar que nginx esté sirviendo los archivos
   - Revisar logs del contenedor

3. **Temas no funcionan**
   - Verificar que CSS esté cargando correctamente
   - Revisar la configuración de variables CSS

### Comandos útiles

```bash
# Ver logs de la aplicación
docker logs masterdashboard

# Ver uso de recursos
docker stats masterdashboard

# Reiniciar servicio
docker-compose restart masterdashboard
```

## 📄 Licencia

MIT License - ver archivo LICENSE para detalles.
