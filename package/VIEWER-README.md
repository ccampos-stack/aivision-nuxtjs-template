# Visor de Gemelos Digitales 3D - Instalación

## Instalación de Three.js

Para que el visor funcione, necesitas instalar Three.js:

```bash
npm install three @types/three
```

## Ubicación del Visor

El visor está disponible en: `/viewer`

URL completa: `http://localhost:3000/viewer`

## Configuración de la API

El visor está conectado a la API de Inspexion:

**Base URL:** `https://www.inspexion.cydgroup.cl/api/gemelo`

**Endpoints utilizados:**
- `GET /api/gemelo/models/{id}` - Obtener información del modelo
- `GET /api/gemelo/files/{fileName}` - Descargar archivo del modelo
- `GET /api/gemelo/info/{externalId}` - Obtener info del gemelo

El servicio está implementado en `composables/useGemelo.ts` y maneja:
- Resolución automática de URLs de archivos
- Soporte para rutas absolutas y relativas
- Detección automática de tipo de archivo (GLB, GLTF, PLY)
- Manejo de conversiones (convertedPath vs filePath)

## Formatos Soportados

El visor actualmente soporta:
- **GLB/GLTF**: Modelos 3D con texturas y materiales
- **PLY**: Nubes de puntos (requiere agregar PLYLoader)

Para agregar soporte PLY, importa el loader:
```typescript
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
```

## Características Implementadas

✅ Visualización 3D con Three.js
✅ Controles de cámara orbital (OrbitControls)
✅ Sistema de iluminación ajustable (Ambient, Hemisphere, Directional)
✅ Panel de información del modelo
✅ Indicador de carga con progreso
✅ Grid y ejes de referencia
✅ Responsive design

## Características Por Implementar

Para implementar las funcionalidades completas del gemelo digital mencionadas en tu documentación Angular:

### 1. Sistema de Mediciones
- Agregar Raycaster para detección de clics
- Implementar marcadores 3D
- Calcular distancias euclidianas
- Calcular áreas mediante triangulación

### 2. Análisis de Colores
- Extracción de colores de texturas
- Análisis de nubes de puntos
- Conversión RGB a HSL
- Clasificación de colores

### 3. Análisis de Corrosión SSPC
- Implementar algoritmo de clasificación
- Rangos HSL para detección de óxido
- Cálculo de porcentajes de degradación
- Clasificación en Grados A-D

### 4. Anotaciones Georreferenciadas
- Sistema de markers HTML sobre coordenadas 3D
- Persistencia en backend
- CRUD de anotaciones

### 5. Exportación de Datos
- Exportar mediciones a CSV
- Exportar análisis de colores
- Generar reportes PDF

## Estructura de Archivos

```
pages/
  viewer/
    index.vue           # Componente principal del visor

public/
  models/               # Crear esta carpeta para modelos de ejemplo
    example.glb
```

## Uso del Visor

1. Ingresa el ID del modelo en el campo "Model ID" (ejemplo: 1, 2, 3, etc.)
2. Haz clic en "Cargar Modelo"
3. El visor descargará el modelo desde la API de Inspexion
4. Usa los controles de iluminación para ajustar la visualización
5. Usa el mouse para rotar, zoom y pan:
   - **Click izquierdo + arrastrar**: Rotar
   - **Rueda del mouse**: Zoom
   - **Click derecho + arrastrar**: Pan

**Nota:** El visor soporta archivos GLB, GLTF y PLY. Si el modelo tiene un archivo convertido (`convertedPath`), usará ese en lugar del original.

## Integración con el Proyecto

El visor está totalmente integrado con tu proyecto AIVision:
- Usa el mismo layout y estilos
- Responsive y adaptado a móviles
- Puede ser enlazado desde cualquier página

Para agregar un enlace al visor desde el footer o menú:
```vue
<NuxtLink to="/viewer">Visor 3D</NuxtLink>
```

## Próximos Pasos

1. Instalar Three.js: `npm install three @types/three`
2. Crear carpeta `public/models/` con modelos de prueba
3. Configurar tu API endpoint en `loadModel()`
4. Implementar funcionalidades adicionales según necesidad
