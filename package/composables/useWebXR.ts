import { ref } from 'vue'
import * as THREE from 'three'

export const useWebXR = () => {
  const isXRSupported = ref(false)
  const xrSession = ref<XRSession | null>(null)
  const isInVR = ref(false)
  const passthroughEnabled = ref(false)

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
   * Iniciar sesión XR inmersiva (VR completa)
   */
  const startXRSession = async (renderer: any, scene: any) => {
    if (!isXRSupported.value) {
      throw new Error('WebXR no soportado en este dispositivo')
    }

    try {
      const session = await (navigator as any).xr?.requestSession('immersive-vr', {
        requiredFeatures: ['local-floor'],
        optionalFeatures: ['hand-tracking', 'layers', 'bounded-floor', 'depth-sensing']
      })

      xrSession.value = session
      isInVR.value = true
      passthroughEnabled.value = false

      // IMPORTANTE: Configurar fondo oscuro para VR inmersiva
      scene.background = new THREE.Color(0x333333)
      console.log('✓ Fondo VR inmersivo configurado (gris oscuro)')

      // Configurar renderer para VR
      await renderer.xr.setSession(session)

      // Limpiar xrSession cuando termine (el estado isInVR se maneja en el viewer)
      session.addEventListener('end', () => {
        xrSession.value = null
      })

      console.log('✓ Sesión VR Inmersiva iniciada')
      return session
    } catch (error) {
      console.error('Error iniciando sesión XR:', error)
      throw error
    }
  }

  /**
   * Iniciar sesión XR con passthrough (Realidad Mixta)
   */
  const startXRSessionWithPassthrough = async (renderer: any, scene: any) => {
    if (!isXRSupported.value) {
      throw new Error('WebXR no soportado en este dispositivo')
    }

    try {
      // Intentar primero immersive-ar (el modo correcto para passthrough)
      let session = null
      try {
        const arSupported = await (navigator as any).xr?.isSessionSupported('immersive-ar')
        if (arSupported) {
          console.log('✓ Immersive-AR soportado, iniciando...')
          session = await (navigator as any).xr?.requestSession('immersive-ar', {
            requiredFeatures: ['local-floor'],
            optionalFeatures: ['hand-tracking', 'layers', 'bounded-floor', 'depth-sensing']
          })
        }
      } catch (arError) {
        console.log('Immersive-AR no disponible, usando VR con background null')
      }

      // Si AR no está disponible, usar VR inmersiva con background null
      if (!session) {
        session = await (navigator as any).xr?.requestSession('immersive-vr', {
          requiredFeatures: ['local-floor'],
          optionalFeatures: ['hand-tracking', 'layers', 'bounded-floor', 'depth-sensing']
        })
        // Configurar fondo transparente para simular passthrough
        scene.background = null
      }

      xrSession.value = session
      isInVR.value = true
      passthroughEnabled.value = true

      // Configurar renderer para VR/AR
      await renderer.xr.setSession(session)

      // Limpiar xrSession cuando termine (el estado isInVR se maneja en el viewer)
      session.addEventListener('end', () => {
        xrSession.value = null
      })

      console.log('✓ Sesión Realidad Mixta iniciada')
      return session
    } catch (error) {
      console.error('Error iniciando sesión con passthrough:', error)
      throw error
    }
  }

  /**
   * Habilitar/Deshabilitar Passthrough (Realidad Mixta)
   */
  const togglePassthrough = (renderer: any, scene: any) => {
    if (!xrSession.value) {
      console.warn('No hay sesión VR activa')
      return
    }

    try {
      if (!passthroughEnabled.value) {
        // Activar passthrough - fondo transparente
        scene.background = null
        passthroughEnabled.value = true
        console.log('✓ Passthrough activado - Realidad Mixta')
      } else {
        // Desactivar passthrough - fondo gris
        scene.background = new THREE.Color(0x333333)
        passthroughEnabled.value = false
        console.log('✓ Passthrough desactivado - VR inmersiva')
      }
    } catch (error) {
      console.error('Error toggling passthrough:', error)
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
    passthroughEnabled,
    checkXRSupport,
    startXRSession,
    startXRSessionWithPassthrough,
    endXRSession,
    togglePassthrough
  }
}
