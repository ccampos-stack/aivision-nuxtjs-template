import { ref } from 'vue'

export const useWebXR = () => {
  const isXRSupported = ref(false)
  const xrSession = ref<XRSession | null>(null)
  const isInVR = ref(false)

  /**
   * Verificar si el dispositivo soporta WebXR
   */
  const checkXRSupport = async () => {
    try {
      if ('xr' in navigator) {
        const supported = await (navigator as any).xr?.isSessionSupported('immersive-vr')
        isXRSupported.value = supported || false
        console.log('WebXR Support:', isXRSupported.value)
      } else {
        console.log('WebXR no disponible en este navegador')
        isXRSupported.value = false
      }
    } catch (error) {
      console.error('Error verificando soporte XR:', error)
      isXRSupported.value = false
    }
    return isXRSupported.value
  }

  /**
   * Iniciar sesión XR
   */
  const startXRSession = async (renderer: any) => {
    if (!isXRSupported.value) {
      throw new Error('WebXR no soportado en este dispositivo')
    }

    try {
      const session = await (navigator as any).xr?.requestSession('immersive-vr', {
        requiredFeatures: ['local-floor'],
        optionalFeatures: ['hand-tracking', 'layers', 'bounded-floor']
      })

      xrSession.value = session
      isInVR.value = true

      // Configurar renderer para VR
      await renderer.xr.setSession(session)

      // Manejar fin de sesión
      session.addEventListener('end', () => {
        xrSession.value = null
        isInVR.value = false
        console.log('Sesión VR terminada')
      })

      console.log('Sesión VR iniciada exitosamente')
      return session
    } catch (error) {
      console.error('Error iniciando sesión XR:', error)
      throw error
    }
  }

  /**
   * Terminar sesión XR
   */
  const endXRSession = async () => {
    if (xrSession.value) {
      await xrSession.value.end()
      xrSession.value = null
      isInVR.value = false
    }
  }

  return {
    isXRSupported,
    xrSession,
    isInVR,
    checkXRSupport,
    startXRSession,
    endXRSession
  }
}
