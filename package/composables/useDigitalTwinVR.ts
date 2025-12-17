import * as THREE from 'three'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js'

export const useDigitalTwinVR = () => {
  let controllers: Array<THREE.XRGripSpace> = []
  let controllerGrips: Array<THREE.XRGripSpace> = []
  let controllerModelFactory: XRControllerModelFactory
  let vrModel: THREE.Object3D | null = null // Referencia al modelo para manipulación
  let session: XRSession | null = null
  let measureCallback: ((point: THREE.Vector3) => void) | null = null // Callback para medición
  let raycaster = new THREE.Raycaster()

  /**
   * Configurar renderer para VR
   */
  const setupVRRenderer = (renderer: THREE.WebGLRenderer) => {
    renderer.xr.enabled = true
    console.log('VR habilitado en renderer')
  }

  /**
   * Crear botón VR
   */
  const createVRButton = (renderer: THREE.WebGLRenderer, container: HTMLElement) => {
    try {
      const button = VRButton.createButton(renderer)
      button.style.position = 'fixed'
      button.style.bottom = '20px'
      button.style.left = '50%'
      button.style.transform = 'translateX(-50%)'
      button.style.padding = '12px 24px'
      button.style.fontSize = '16px'
      button.style.fontWeight = 'bold'
      button.style.borderRadius = '8px'
      button.style.backgroundColor = '#1976d2'
      button.style.color = 'white'
      button.style.border = 'none'
      button.style.cursor = 'pointer'
      button.style.zIndex = '10000'
      
      container.appendChild(button)
      console.log('✓ Botón VR agregado al DOM')
      return button
    } catch (error) {
      console.error('Error creando botón VR:', error)
      return null
    }
  }

  /**
   * Configurar controladores VR (Quest 3) con manipulación del modelo
   */
  const setupVRControllers = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, model?: THREE.Object3D) => {
    controllerModelFactory = new XRControllerModelFactory()
    
    if (model) {
      vrModel = model
    }

    // Controlador derecho (índice 0) - Para rotar
    const controller1 = renderer.xr.getController(0)
    controller1.addEventListener('selectstart', onSelectStart)
    controller1.addEventListener('selectend', onSelectEnd)
    scene.add(controller1)

    const controllerGrip1 = renderer.xr.getControllerGrip(0)
    controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1))
    scene.add(controllerGrip1)

    // Controlador izquierdo (índice 1) - Para mover arriba/abajo
    const controller2 = renderer.xr.getController(1)
    controller2.addEventListener('selectstart', onSelectStart)
    controller2.addEventListener('selectend', onSelectEnd)
    scene.add(controller2)

    const controllerGrip2 = renderer.xr.getControllerGrip(1)
    controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2))
    scene.add(controllerGrip2)

    // Añadir líneas de apuntado para los controladores
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1)
    ])

    const line1 = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x0088ff }))
    line1.name = 'line'
    line1.scale.z = 5
    controller1.add(line1)

    const line2 = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xff0088 }))
    line2.name = 'line'
    line2.scale.z = 5
    controller2.add(line2)

    controllers = [controller1, controller2]
    controllerGrips = [controllerGrip1, controllerGrip2]

    console.log('✓ Controladores VR con manipulación configurados')
  }

  /**
   * Ajustar escala y posición del modelo para VR (versión simplificada)
   */
  const adjustModelScaleForVR = (model: THREE.Object3D) => {
    // 1. Calcular dimensiones originales
    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    
    // 2. Calcular escala para que el modelo mida 1.5m
    const targetSize = 1.5
    const scaleFactor = targetSize / maxDim
    
    // 3. Aplicar escala
    model.scale.multiplyScalar(scaleFactor)
    
    // 4. IMPORTANTE: Recalcular bounding box con la nueva escala
    box.setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())
    
    // 5. Posicionar: queremos que el centro del modelo esté en (0, 1.2, -2.5)
    // Fórmula: nuevaPosición = posiciónDeseada - centroActual + posiciónActual
    const targetPos = new THREE.Vector3(0, 1.2, -2.5)
    model.position.add(targetPos.sub(center))
    
    console.log(`✓ VR v1.2.0 | Escala: ${scaleFactor.toFixed(3)}x | Pos: (${model.position.x.toFixed(2)}, ${model.position.y.toFixed(2)}, ${model.position.z.toFixed(2)})`)
  }

  /**
   * Configurar cámara para VR (la cámara en VR se controla por el headset)
   */
  const setupVRCamera = (camera: THREE.PerspectiveCamera, model: THREE.Object3D) => {
    // En VR, la cámara se mueve con el headset, pero establecemos una posición inicial
    // El usuario estará en el origen mirando hacia -Z donde está el modelo
    camera.position.set(0, 1.6, 0) // Altura estándar de los ojos (1.6m)
    camera.lookAt(0, 1.5, -2) // Mirar hacia donde está el modelo
    
    console.log('✓ Cámara VR posicionada en origen (0, 1.6, 0)')
  }

  /**
   * Habilitar teletransporte (opcional para Quest 3)
   */
  const enableTeleportation = (scene: THREE.Scene, floorY: number = 0) => {
    // Crear un plano invisible para teletransportación
    const geometry = new THREE.PlaneGeometry(100, 100)
    const material = new THREE.MeshBasicMaterial({
      visible: false,
      side: THREE.DoubleSide
    })
    const floor = new THREE.Mesh(geometry, material)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = floorY
    floor.name = 'teleport-floor'
    scene.add(floor)
    
    console.log('Teletransportación habilitada')
  }

  /**
   * Eventos de controlador
   */
  const onSelectStart = (event: any) => {
    const controller = event.target
    controller.userData.isSelecting = true
    
    // Si hay un callback de medición activo, hacer raycast
    if (measureCallback && vrModel) {
      // Configurar raycaster desde el controlador
      const tempMatrix = new THREE.Matrix4()
      tempMatrix.identity().extractRotation(controller.matrixWorld)
      
      raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld)
      raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix)
      
      // Raycast contra el modelo
      const intersects = raycaster.intersectObject(vrModel, true)
      
      if (intersects.length > 0) {
        const point = intersects[0].point.clone()
        console.log('VR Measurement point:', point)
        measureCallback(point)
      }
    }
  }

  const onSelectEnd = (event: any) => {
    const controller = event.target
    controller.userData.isSelecting = false
  }

  /**
   * Configurar callback para medición en VR
   */
  const setMeasureCallback = (callback: ((point: THREE.Vector3) => void) | null) => {
    measureCallback = callback
    console.log('VR Measure callback:', callback ? 'activado' : 'desactivado')
  }

  /**
   * Actualizar manipulación del modelo en VR (llamar en el loop de animación)
   */
  const updateVRControls = (renderer: THREE.WebGLRenderer, model?: THREE.Object3D) => {
    // Actualizar referencia del modelo si se proporciona
    if (model) {
      vrModel = model
    }
    
    if (!vrModel) {
      console.warn('updateVRControls: No hay modelo disponible')
      return
    }

    const xrSession = renderer.xr.getSession()
    if (!xrSession) return

    // Obtener estado de los gamepads
    for (const source of xrSession.inputSources) {
      if (source.gamepad) {
        const gamepad = source.gamepad
        
        if (source.handedness === 'right') {
          // MANDO DERECHO: Rotar modelo con thumbstick
          // Eje 2 = horizontal (X), Eje 3 = vertical (Y)
          const thumbstickX = gamepad.axes[2] || 0
          const thumbstickY = gamepad.axes[3] || 0
          
          if (Math.abs(thumbstickX) > 0.1) {
            vrModel.rotation.y += thumbstickX * 0.005 // Rotar en Y (horizontal) - Velocidad perfecta
            console.log('Rotando Y:', thumbstickX)
          }
          if (Math.abs(thumbstickY) > 0.1) {
            vrModel.rotation.x += thumbstickY * 0.0015 // Rotar en X (vertical) - Muy suave
            console.log('Rotando X:', thumbstickY)
          }
        }
        
        if (source.handedness === 'left') {
          // MANDO IZQUIERDO: Mover arriba/abajo con thumbstick
          const thumbstickY = gamepad.axes[3] || 0
          
          if (Math.abs(thumbstickY) > 0.1) {
            vrModel.position.y -= thumbstickY * 0.01 // Mover verticalmente
            console.log('Moviendo Y:', thumbstickY)
          }
          
          // Opcional: Mover adelante/atrás con eje horizontal
          const thumbstickX = gamepad.axes[2] || 0
          if (Math.abs(thumbstickX) > 0.1) {
            vrModel.position.z += thumbstickX * 0.01 // Mover en profundidad
            console.log('Moviendo Z:', thumbstickX)
          }
        }
      }
    }
  }

  /**
   * Configurar entorno VR (fondo y grid)
   */
  const setupVREnvironment = (scene: THREE.Scene) => {
    // Agregar un fondo visible en VR (gris medio)
    scene.background = new THREE.Color(0x333333)
    
    // Agregar un grid de referencia para orientación
    const gridHelper = new THREE.GridHelper(20, 20, 0x888888, 0x444444)
    gridHelper.position.y = -2
    scene.add(gridHelper)
    
    console.log('✓ Entorno VR configurado (fondo + grid)')
  }

  /**
   * Optimizar iluminación para VR
   */
  const optimizeLightingForVR = (scene: THREE.Scene) => {
    // Remover luces existentes direccionales para evitar conflictos
    const lightsToRemove: THREE.Light[] = []
    scene.traverse((object) => {
      if (object instanceof THREE.DirectionalLight) {
        lightsToRemove.push(object)
      }
    })
    lightsToRemove.forEach(light => scene.remove(light))

    // Luz ambiental más intensa para VR
    let ambientLight = scene.children.find(child => child instanceof THREE.AmbientLight) as THREE.AmbientLight
    if (ambientLight) {
      ambientLight.intensity = 2.0
    } else {
      ambientLight = new THREE.AmbientLight(0xffffff, 2.0)
      scene.add(ambientLight)
    }

    // Luz hemisférica para mejor visibilidad desde todos los ángulos
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5)
    hemisphereLight.position.set(0, 20, 0)
    scene.add(hemisphereLight)

    // Luces direccionales desde múltiples ángulos
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.0)
    directionalLight1.position.set(5, 10, 7.5)
    scene.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight2.position.set(-5, 10, -7.5)
    scene.add(directionalLight2)

    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.6)
    directionalLight3.position.set(0, -10, 5)
    scene.add(directionalLight3)

    console.log('✓ Iluminación VR optimizada (ambiental + hemisférica + 3 direccionales)')
  }

  /**
   * Cleanup
   */
  const cleanupVR = (scene: THREE.Scene) => {
    controllers.forEach(controller => {
      scene.remove(controller)
    })
    controllerGrips.forEach(grip => {
      scene.remove(grip)
    })
    controllers = []
    controllerGrips = []
  }

  return {
    setupVRRenderer,
    createVRButton,
    setupVRControllers,
    adjustModelScaleForVR,
    setupVRCamera,
    enableTeleportation,
    setupVREnvironment,
    optimizeLightingForVR,
    updateVRControls,
    setMeasureCallback,
    cleanupVR
  }
}
