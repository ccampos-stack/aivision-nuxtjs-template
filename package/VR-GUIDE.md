# Guía de Realidad Virtual - Meta Quest 3

## 🥽 Características VR Implementadas

El visor de gemelos digitales ahora soporta **visualización en realidad virtual** utilizando WebXR, totalmente compatible con **Meta Quest 3**.

### ✨ Funcionalidades

- ✅ **WebXR API**: Soporte nativo para dispositivos VR
- ✅ **Meta Quest 3**: Optimizado para los lentes Quest 3
- ✅ **Controladores Interactivos**: Control completo del modelo con los mandos Touch
- ✅ **Rotación con Controladores**: Rota el modelo con el joystick derecho
- ✅ **Movimiento con Controladores**: Mueve el modelo arriba/abajo y adelante/atrás con el joystick izquierdo
- ✅ **Escala Automática**: Los modelos se ajustan automáticamente para VR
- ✅ **Iluminación Optimizada**: Mejor visibilidad en entorno VR
- ✅ **Detección Automática**: Detecta si el dispositivo soporta VR
- ✅ **Restauración de Estado**: Al salir de VR, el modelo vuelve a su posición original

## 🚀 Cómo Usar

### Desde Meta Quest 3

1. **Abre el navegador** en tu Meta Quest 3
2. **Navega a la URL** de tu aplicación (ejemplo: `https://tudominio.com/viewer`)
3. **Carga un modelo** ingresando el ID y presionando "Cargar Modelo"
4. **Busca el botón "ENTER VR"** en la parte inferior de la pantalla
5. **Haz clic en "ENTER VR"** para iniciar la experiencia VR

### Controles en VR

#### Controlador Derecho (Mano Derecha)
- **Joystick Horizontal**: Rota el modelo en el eje Y (izquierda/derecha)
- **Joystick Vertical**: Rota el modelo en el eje X (arriba/abajo)

#### Controlador Izquierdo (Mano Izquierda)
- **Joystick Vertical**: Mueve el modelo arriba/abajo
- **Joystick Horizontal**: Mueve el modelo adelante/atrás

#### Otros Controles
- **Botón "A/X"** o **Menú**: Regresa al modo normal (salir de VR)

## 🔧 Configuración Técnica

### Composables Creados

#### `useWebXR.ts`
Maneja la sesión WebXR:
```typescript
const { isXRSupported, isInVR, checkXRSupport, startXRSession, endXRSession } = useWebXR()
```

#### `useDigitalTwinVR.ts`
Configura el entorno VR para Three.js:
```typescript
const {
  setupVRRenderer,
  createVRButton,
  setupVRControllers,
  adjustModelScaleForVR,
  updateVRControls,
  setupVRCamera,
  optimizeLightingForVR
} = useDigitalTwinVR()
```

### Flujo de Inicialización

1. El viewer carga normalmente en 2D
2. Se verifica soporte WebXR automáticamente
3. Si el dispositivo soporta VR, aparece el botón "ENTER VR"
4. Al presionar el botón, se inicia la sesión VR
5. El modelo se ajusta automáticamente para VR

## 📱 Requisitos del Dispositivo

### Meta Quest 3
- ✅ Navegador actualizado
- ✅ WebXR habilitado (por defecto)
- ✅ Conexión a internet

### Navegadores Compatibles
- ✅ Meta Quest Browser (nativo)
- ✅ Firefox Reality
- ❌ Chrome Desktop (sin casco VR)
- ❌ Safari (no soporta WebXR)

## 🌐 Despliegue para VR

### HTTPS Requerido
WebXR **REQUIERE HTTPS** en producción:

```bash
# Generar el deploy
npm run generate

# Subir a servidor HTTPS
# El servidor DEBE tener certificado SSL válido
```

### Configuración Nginx (Ejemplo)
```nginx
server {
    listen 443 ssl http2;
    server_name tudominio.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        root /var/www/aivision;
        try_files $uri $uri/ /index.html;
    }

    # Headers importantes para WebXR
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
}
```

## 🧪 Pruebas y Desarrollo

### Probar en Desarrollo
1. Asegúrate de estar en HTTPS o usar `localhost`
2. WebXR requiere contexto seguro
3. Usa Chrome DevTools > WebXR para simular

### Emulador WebXR (Chrome)
```javascript
// En Chrome DevTools
// 1. Abre DevTools (F12)
// 2. Ve a "..." > More tools > WebXR
// 3. Selecciona dispositivo VR emulado
```

## 📊 Indicadores Visuales

El viewer muestra el estado VR en el panel de información:

```
🥽 VR: Disponible   ← WebXR soportado
🥽 VR: ACTIVO       ← Sesión VR activa
```

## ⚠️ Limitaciones Conocidas

1. **Mediciones**: Las herramientas de medición no funcionan en modo VR
2. **UI 2D**: Los controles 2D no son accesibles en VR (se ocultan)
3. **Rendimiento**: Modelos muy grandes pueden afectar FPS en VR
4. **Hand Tracking**: Disponible pero requiere configuración adicional

## 🎯 Optimizaciones Aplicadas

### Modelo 3D
- Escala automática a tamaño apropiado (≈2 metros)
- Centrado automático del modelo
- Ajuste de iluminación para mejor visibilidad

### Rendimiento
- Animation loop optimizado con `setAnimationLoop`
- Compatibilidad con `requestAnimationFrame` en modo 2D
- Renderizado condicional según modo VR/2D

### Cámara
- Posicionamiento automático frente al modelo
- Distancia calculada según tamaño del modelo
- Look-at al centro del modelo

## 🔍 Debugging

### Console Logs
El sistema registra eventos VR en consola:
```
✓ WebXR soportado - Configurando VR
✓ VR configurado - Listo para Meta Quest 3
✓ Sesión VR iniciada
✗ WebXR no soportado en este dispositivo
```

### Verificar Soporte
Abre la consola del navegador Quest y ejecuta:
```javascript
if ('xr' in navigator) {
  navigator.xr.isSessionSupported('immersive-vr')
    .then(supported => console.log('VR Supported:', supported))
}
```

## 📚 Referencias

- [WebXR Device API](https://www.w3.org/TR/webxr/)
- [Meta Quest Browser WebXR](https://developer.oculus.com/documentation/web/webxr/)
- [Three.js WebXR](https://threejs.org/docs/#manual/en/introduction/How-to-use-WebXR)

## 🎮 Manipulación del Modelo en VR (v1.3.0-VR)

### Nuevas Características Interactivas

A partir de la versión **v1.3.0-VR**, puedes **manipular directamente el modelo 3D** usando los controladores Touch de Meta Quest 3:

#### Control con Joystick Derecho (Rotación)
- **Mueve el joystick hacia la izquierda/derecha**: Rota el modelo en el eje Y (gira horizontalmente)
- **Mueve el joystick hacia arriba/abajo**: Rota el modelo en el eje X (inclina verticalmente)
- Velocidad de rotación: 0.02 radianes por frame
- Útil para inspeccionar el modelo desde todos los ángulos

#### Control con Joystick Izquierdo (Posición)
- **Mueve el joystick hacia arriba/abajo**: Sube o baja el modelo
- **Mueve el joystick hacia la izquierda/derecha**: Acerca o aleja el modelo
- Velocidad de movimiento: 0.01 unidades por frame
- Perfecto para ajustar la posición del modelo a tu preferencia

### Cómo Funciona

El sistema lee continuamente los valores de los **gamepad.axes** de los controladores:
- `axes[2]`: Eje horizontal del joystick (X)
- `axes[3]`: Eje vertical del joystick (Y)

Incluye una **zona muerta de 0.1** para evitar movimientos involuntarios por pequeñas desviaciones del joystick.

### Ejemplo de Uso

1. Entra en modo VR presionando "ENTER VR"
2. Usa el **joystick derecho** para girar el modelo hasta encontrar el ángulo deseado
3. Usa el **joystick izquierdo** para ajustar la altura y distancia
4. Combina ambos controles para una inspección completa del gemelo digital

## 🤝 Soporte

Para problemas con VR:
1. Verifica que estés en HTTPS
2. Confirma que el navegador Quest esté actualizado
3. Revisa la consola para mensajes de error
4. Intenta con un modelo más pequeño primero

---

**¡Disfruta explorando tus gemelos digitales en realidad virtual! 🚀🥽**
