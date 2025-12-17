<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';

definePageMeta({
  layout: 'blank',
});

// Composables VR
const { isXRSupported, isInVR, passthroughEnabled, checkXRSupport, startXRSession, startXRSessionWithPassthrough, endXRSession, togglePassthrough } = useWebXR();
const {
  setupVRRenderer,
  createVRButton,
  setupVRControllers,
  adjustModelScaleForVR,
  setupVRCamera,
  setupVREnvironment,
  optimizeLightingForVR,
  updateVRControls,
  setMeasureCallback,
  cleanupVR
} = useDigitalTwinVR();

const viewerContainer = ref<HTMLDivElement>();
const modelId = ref<number>(1);
const loading = ref(false);
const loadingProgress = ref(0);
const modelInfo = ref<any>(null);
const measuring = ref(false);
const areaMode = ref(false);
const errorMessage = ref<string>('');

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let animationId: number;
let modelRoot: THREE.Object3D | null = null;

// Estado original del modelo (para restaurar al salir de VR)
let originalModelPosition: THREE.Vector3 | null = null;
let originalModelScale: THREE.Vector3 | null = null;
let originalCameraPosition: THREE.Vector3 | null = null;

// Iluminación
const exposure = ref(1.0);
const ambientIntensity = ref(1.5);
const dirIntensity = ref(0.8);

let ambientLight: THREE.AmbientLight;
let dirLight: THREE.DirectionalLight;
let dirLight2: THREE.DirectionalLight;
let dirLight3: THREE.DirectionalLight;

// Raycaster para detección de clics
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Mediciones
const measurePoints: THREE.Vector3[] = [];
const measureMarkers: THREE.Mesh[] = [];
let measureLine: THREE.Line | null = null;
let measureLabel: HTMLDivElement | null = null;

// Área
const areaPoints: THREE.Vector3[] = [];
const areaMarkers: THREE.Mesh[] = [];
let areaPolygon: THREE.Line | null = null;
let areaLabel: HTMLDivElement | null = null;

const initThree = () => {
  if (!viewerContainer.value) {
    console.error('initThree: viewerContainer is null');
    return;
  }

  console.log('Initializing Three.js...');

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a1a);
  // Sin fog para que no se oscurezcan las partes lejanas del modelo

  // Camera
  const width = viewerContainer.value.clientWidth || 800;
  const height = viewerContainer.value.clientHeight || 600;
  console.log('Canvas size:', width, height);
  camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 10000);
  camera.position.set(50, 50, 50);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = exposure.value;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  // Configurar soporte VR
  setupVRRenderer(renderer);
  
  // Eventos de sesión VR
  renderer.xr.addEventListener('sessionstart', onVRSessionStart);
  renderer.xr.addEventListener('sessionend', onVRSessionEnd);
  
  viewerContainer.value.appendChild(renderer.domElement);
  
  // Asegurar que el canvas capture eventos touch (para Quest 3)
  renderer.domElement.style.touchAction = 'none';

  // Controls - Con soporte touch para Quest 3
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 0.5;
  controls.maxDistance = 5000;
  
  // Habilitar rotación touch para dispositivos móviles y Quest 3
  controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
  };
  controls.enableRotate = true;
  controls.rotateSpeed = 1.0;

  // Iluminación - Sin hemisférica para evitar degradado
  ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity.value);
  scene.add(ambientLight);

  // Luz direccional principal desde arriba
  dirLight = new THREE.DirectionalLight(0xffffff, dirIntensity.value);
  dirLight.position.set(100, 100, 50);
  dirLight.castShadow = false; // Desactivar sombras

  // Luz de relleno desde abajo para eliminar sombras oscuras
  dirLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
  dirLight2.position.set(-50, -100, -50);

  // Luz de relleno lateral
  dirLight3 = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight3.position.set(-100, 50, 100);
  dirLight.shadow.camera.top = 100;
  dirLight.shadow.camera.bottom = -100;
  dirLight.shadow.camera.left = -100;
  dirLight.shadow.camera.right = 100;
  scene.add(dirLight);
  scene.add(dirLight2);
  scene.add(dirLight3);

  // Grid y ejes desactivados para una vista más limpia
  // const gridHelper = new THREE.GridHelper(200, 50, 0x444444, 0x222222);
  // scene.add(gridHelper);

  // const axesHelper = new THREE.AxesHelper(50);
  // scene.add(axesHelper);

  // Animation loop - Compatible con VR
  const animate = () => {
    controls.update();
    
    // Si está en VR, actualizar controles con el modelo
    if (renderer.xr.isPresenting && modelRoot) {
      updateVRControls(renderer, modelRoot);
    }
    
    renderer.render(scene, camera);
    updateLabels();
  };
  
  // Usar setAnimationLoop para compatibilidad con VR y 2D
  renderer.setAnimationLoop(animate);

  // Resize handler
  window.addEventListener('resize', onResize);

  // Click handler para mediciones
  renderer.domElement.addEventListener('click', onViewerClick);
};

const onViewerClick = (event: MouseEvent) => {
  if (!viewerContainer.value || !modelRoot) return;
  if (!measuring.value && !areaMode.value) return;

  const rect = viewerContainer.value.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(modelRoot, true);

  if (intersects.length > 0) {
    const point = intersects[0].point.clone();

    if (measuring.value) {
      addMeasurePoint(point);
    } else if (areaMode.value) {
      addAreaPoint(point);
    }
  }
};

const addMeasurePoint = (point: THREE.Vector3) => {
  // Crear marcador visual
  const markerGeometry = new THREE.SphereGeometry(0.15, 16, 16);
  const markerMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    depthTest: false // Siempre visible
  });
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  marker.position.copy(point);
  marker.renderOrder = 999;
  scene.add(marker);
  measureMarkers.push(marker);
  measurePoints.push(point);

  // Si hay 2 puntos, calcular distancia
  if (measurePoints.length === 2) {
    const distance = measurePoints[0].distanceTo(measurePoints[1]);
    drawMeasureLine();
    showMeasureLabel(distance);
  }

  // Máximo 2 puntos
  if (measurePoints.length >= 2) {
    measuring.value = false;
  }
};

const drawMeasureLine = () => {
  if (measureLine) {
    scene.remove(measureLine);
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(measurePoints);
  const material = new THREE.LineBasicMaterial({ 
    color: 0xff0000, 
    linewidth: 3,
    depthTest: false // Hace que la línea siempre esté visible
  });
  measureLine = new THREE.Line(geometry, material);
  measureLine.renderOrder = 999; // Renderizar sobre todo lo demás
  scene.add(measureLine);
};

const showMeasureLabel = (distance: number) => {
  if (!viewerContainer.value) return;

  if (measureLabel) {
    measureLabel.remove();
  }

  measureLabel = document.createElement('div');
  measureLabel.className = 'measure-label';
  measureLabel.textContent = `${distance.toFixed(3)} m`;
  measureLabel.style.position = 'absolute';
  measureLabel.style.zIndex = '1000';
  viewerContainer.value.appendChild(measureLabel);
  
  // Posicionar inmediatamente
  updateLabels();
};

const addAreaPoint = (point: THREE.Vector3) => {
  // Crear marcador visual
  const markerGeometry = new THREE.SphereGeometry(0.15, 16, 16);
  const markerMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x00ff00,
    depthTest: false // Siempre visible
  });
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  marker.position.copy(point);
  marker.renderOrder = 999;
  scene.add(marker);
  areaMarkers.push(marker);
  areaPoints.push(point);

  // Si hay al menos 3 puntos, dibujar polígono
  if (areaPoints.length >= 3) {
    drawAreaPolygon();
  }
};

const drawAreaPolygon = () => {
  if (areaPolygon) {
    scene.remove(areaPolygon);
  }

  const points = [...areaPoints, areaPoints[0]]; // Cerrar el polígono
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ 
    color: 0x00ff00, 
    linewidth: 3,
    depthTest: false // Hace que la línea siempre esté visible
  });
  areaPolygon = new THREE.Line(geometry, material);
  areaPolygon.renderOrder = 999; // Renderizar sobre todo lo demás
  scene.add(areaPolygon);

  // Calcular área
  const area = calculatePolygonArea(areaPoints);
  showAreaLabel(area);
};

const calculatePolygonArea = (points: THREE.Vector3[]): number => {
  if (points.length < 3) return 0;

  // Calcular normal del polígono para determinar el plano
  const normal = new THREE.Vector3();
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length;
    const edge1 = new THREE.Vector3().subVectors(points[j], points[i]);
    const edge2 = new THREE.Vector3().subVectors(points[(i + 2) % points.length], points[j]);
    const cross = new THREE.Vector3().crossVectors(edge1, edge2);
    normal.add(cross);
  }
  normal.normalize();

  // Encontrar el eje más alineado con la normal para proyección
  const absNormal = new THREE.Vector3(Math.abs(normal.x), Math.abs(normal.y), Math.abs(normal.z));
  let projectedPoints: { x: number; y: number }[];

  if (absNormal.z > absNormal.x && absNormal.z > absNormal.y) {
    // Proyectar en plano XY
    projectedPoints = points.map(p => ({ x: p.x, y: p.y }));
  } else if (absNormal.y > absNormal.x) {
    // Proyectar en plano XZ
    projectedPoints = points.map(p => ({ x: p.x, y: p.z }));
  } else {
    // Proyectar en plano YZ
    projectedPoints = points.map(p => ({ x: p.y, y: p.z }));
  }

  // Calcular área usando fórmula del trapecio (Shoelace formula)
  let area = 0;
  for (let i = 0; i < projectedPoints.length; i++) {
    const j = (i + 1) % projectedPoints.length;
    area += projectedPoints[i].x * projectedPoints[j].y;
    area -= projectedPoints[j].x * projectedPoints[i].y;
  }

  return Math.abs(area / 2);
};

const showAreaLabel = (area: number) => {
  if (!viewerContainer.value) return;

  if (areaLabel) {
    areaLabel.remove();
  }

  areaLabel = document.createElement('div');
  areaLabel.className = 'area-label';
  areaLabel.textContent = `${area.toFixed(3)} m²`;
  areaLabel.style.position = 'absolute';
  areaLabel.style.zIndex = '1000';
  viewerContainer.value.appendChild(areaLabel);
  
  // Posicionar inmediatamente
  updateLabels();
};

const updateLabels = () => {
  if (measureLabel && measurePoints.length === 2) {
    const midPoint = new THREE.Vector3()
      .addVectors(measurePoints[0], measurePoints[1])
      .multiplyScalar(0.5);
    const screenPos = worldToScreen(midPoint);
    measureLabel.style.left = `${screenPos.x}px`;
    measureLabel.style.top = `${screenPos.y}px`;
  }

  if (areaLabel && areaPoints.length >= 3) {
    // Calcular centroide
    const centroid = new THREE.Vector3();
    areaPoints.forEach(p => centroid.add(p));
    centroid.divideScalar(areaPoints.length);
    const screenPos = worldToScreen(centroid);
    areaLabel.style.left = `${screenPos.x}px`;
    areaLabel.style.top = `${screenPos.y}px`;
  }
};

const worldToScreen = (point: THREE.Vector3): { x: number; y: number } => {
  if (!viewerContainer.value) return { x: 0, y: 0 };

  const vector = point.clone().project(camera);
  const rect = viewerContainer.value.getBoundingClientRect();
  return {
    x: ((vector.x + 1) / 2) * rect.width,
    y: (-(vector.y - 1) / 2) * rect.height
  };
};

const clearMeasurements = () => {
  // Limpiar marcadores
  measureMarkers.forEach(marker => scene.remove(marker));
  measureMarkers.length = 0;
  measurePoints.length = 0;

  // Limpiar línea
  if (measureLine) {
    scene.remove(measureLine);
    measureLine = null;
  }

  // Limpiar label
  if (measureLabel) {
    measureLabel.remove();
    measureLabel = null;
  }
  
  // Desactivar callback VR
  setMeasureCallback(null);
  measuring.value = false;
};

const clearArea = () => {
  // Limpiar marcadores
  areaMarkers.forEach(marker => scene.remove(marker));
  areaMarkers.length = 0;
  areaPoints.length = 0;

  // Limpiar polígono
  if (areaPolygon) {
    scene.remove(areaPolygon);
    areaPolygon = null;
  }

  // Limpiar label
  if (areaLabel) {
    areaLabel.remove();
    areaLabel = null;
  }
};

const onResize = () => {
  if (!viewerContainer.value) return;
  const width = viewerContainer.value.clientWidth;
  const height = viewerContainer.value.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

// Inicializar características de VR
const initVRFeatures = async () => {
  if (!viewerContainer.value || !renderer || !scene) return;

  // Verificar soporte VR
  await checkXRSupport();

  if (isXRSupported.value) {
    console.log('✓ WebXR soportado - Configurando VR');

    // Configurar entorno VR (fondo y grid)
    setupVREnvironment(scene);

    // No creamos el botón VR por defecto, usamos botones personalizados
    // const vrButton = createVRButton(renderer, document.body);
    // console.log('Botón VR creado:', vrButton);

    // Configurar controladores VR
    setupVRControllers(renderer, scene, modelRoot);

    // Optimizar iluminación para VR si hay modelo
    if (modelRoot) {
      optimizeLightingForVR(scene);
    }

    console.log('✓ VR configurado - Listo para Meta Quest 3');
  } else {
    console.log('✗ WebXR no soportado en este dispositivo');
  }
};

// Guardar estado original del modelo
const saveModelState = () => {
  if (!modelRoot) return;
  originalModelPosition = modelRoot.position.clone();
  originalModelScale = modelRoot.scale.clone();
  originalCameraPosition = camera.position.clone();
  console.log('✓ Estado del modelo guardado');
};

// Restaurar estado original del modelo
const restoreModelState = () => {
  if (!modelRoot || !originalModelPosition || !originalModelScale || !originalCameraPosition) return;
  
  modelRoot.position.copy(originalModelPosition);
  modelRoot.scale.copy(originalModelScale);
  camera.position.copy(originalCameraPosition);
  
  console.log('✓ Estado del modelo restaurado');
};

// Función para iniciar VR con modo específico
const enterVRMode = async (usePassthrough: boolean) => {
  if (!renderer || !scene) {
    console.error('Renderer o scene no disponibles');
    return;
  }
  
  try {
    if (usePassthrough) {
      console.log('🌍 Iniciando Realidad Mixta (Passthrough)...');
      await startXRSessionWithPassthrough(renderer, scene);
    } else {
      console.log('🥽 Iniciando VR Inmersiva...');
      await startXRSession(renderer, scene);
    }
  } catch (error: any) {
    console.error('Error iniciando modo VR:', error);
    console.error('Error completo:', error.message, error.stack);
    errorMessage.value = `Error VR: ${error.message || 'Verifica que tu dispositivo soporte WebXR'}`;
  }
};

// Manejador de entrada a VR
const onVRSessionStart = () => {
  console.log('🥽 Sesión VR iniciada');
  isInVR.value = true; // Actualizar estado de VR
  if (!modelRoot) return;
  
  // Guardar estado original
  saveModelState();
  
  // Ajustar para VR
  adjustModelScaleForVR(modelRoot);
  setupVRCamera(camera, modelRoot);
};

// Manejador de salida de VR
const onVRSessionEnd = () => {
  console.log('👁️ Sesión VR finalizada');
  isInVR.value = false; // Actualizar estado de VR
  passthroughEnabled.value = false; // Resetear passthrough
  
  // Restaurar estado original
  restoreModelState();
  
  console.log('✓ Estados reseteados - isInVR:', isInVR.value, 'passthrough:', passthroughEnabled.value);
};

const loadModel = async () => {
  if (!modelId.value) return;
  
  loading.value = true;
  loadingProgress.value = 0;

  try {
    errorMessage.value = '';
    const { getModel, resolveFileUrl, detectFileType } = useGemelo();
    
    // Obtener información del modelo desde la API
    let model;
    try {
      model = await getModel(modelId.value);
    } catch (err: any) {
      errorMessage.value = err.message || 'Error al obtener modelo';
      loading.value = false;
      return;
    }
    
    if (!model || !model.filePath) {
      errorMessage.value = 'El modelo no tiene archivo asociado';
      console.error('Modelo sin archivo');
      loading.value = false;
      return;
    }

    // Resolver URL completa del archivo
    const originalPath = model.convertedPath || model.filePath;
    console.log('Path original del backend:', originalPath);
    
    const fileUrl = resolveFileUrl(originalPath);
    const fileType = detectFileType(originalPath);
    
    console.log('URL resuelta:', fileUrl);
    console.log('Tipo de archivo:', fileType);

    // Cargar según el tipo de archivo
    if (fileType === 'glb' || fileType === 'gltf') {
      // Configurar manager para resolver paths de texturas
      const manager = new THREE.LoadingManager();
      manager.setURLModifier((url) => {
        console.log('URLModifier - URL solicitada:', url);
        // Si es una textura relativa, usar el proxy de archivos
        if (!url.startsWith('http') && !url.startsWith('data:') && !url.startsWith('blob:') && !url.startsWith('/api/')) {
          // Extraer solo el nombre del archivo
          const fileName = url.split('/').pop() || url;
          const resolvedUrl = `/api/gemelo/files/${encodeURIComponent(fileName)}`;
          console.log('URLModifier - URL resuelta:', resolvedUrl);
          return resolvedUrl;
        }
        console.log('URLModifier - URL sin cambios:', url);
        return url;
      });
      
      const loader = new GLTFLoader(manager);
      loader.load(
        fileUrl,
        (gltf) => {
          if (modelRoot) {
            scene.remove(modelRoot);
          }
          modelRoot = gltf.scene;
          
          // Asegurar que todos los materiales sean visibles
          let meshCount = 0;
          let materialCount = 0;
          modelRoot.traverse((child: any) => {
            if (child.isMesh) {
              meshCount++;
              console.log('Mesh encontrado:', child.name, 'Material:', child.material?.type);
              
              // Asegurar que el material sea visible
              if (child.material) {
                materialCount++;
                child.material.side = THREE.DoubleSide;
                child.material.needsUpdate = true;
                
                // Log de texturas
                if (child.material.map) {
                  console.log('  - Tiene map texture:', child.material.map);
                }
                if (child.material.normalMap) {
                  console.log('  - Tiene normalMap');
                }
                if (child.material.roughnessMap) {
                  console.log('  - Tiene roughnessMap');
                }
                
                // Si no tiene color, asignar uno por defecto
                if (!child.material.color) {
                  child.material.color = new THREE.Color(0xcccccc);
                }
              }
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          
          console.log(`Total: ${meshCount} meshes, ${materialCount} materiales`);
          
          scene.add(modelRoot);
          console.log('Modelo agregado a la escena:', modelRoot);

          // Calcular bounding box y centrar cámara
          const box = new THREE.Box3().setFromObject(modelRoot);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          
          console.log('Bounding box:', { center, size, maxDim });
          
          const fov = camera.fov * (Math.PI / 180);
          let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
          cameraZ *= 0.8; // Mucho más cerca

          camera.position.set(center.x + cameraZ * 0.5, center.y + cameraZ * 0.5, center.z + cameraZ * 0.5);
          camera.lookAt(center);
          controls.target.copy(center);
          controls.update();
          
          console.log('Cámara posicionada en:', camera.position);
          console.log('Distancia al centro:', camera.position.distanceTo(center));

          modelInfo.value = {
            vertices: size.x.toFixed(2) + ' × ' + size.y.toFixed(2) + ' × ' + size.z.toFixed(2),
            type: fileType.toUpperCase(),
            name: model.nombre || `Modelo ${model.id}`
          };

          loading.value = false;
          
          // Configurar VR después de cargar el modelo
          initVRFeatures();
        },
        (progress) => {
          if (progress.lengthComputable) {
            loadingProgress.value = Math.round((progress.loaded / progress.total) * 100);
          }
        },
        (error) => {
          console.error('Error cargando modelo:', error);
          loading.value = false;
        }
      );
    } else if (fileType === 'ply') {
      const loader = new PLYLoader();
      loader.load(
        fileUrl,
        (geometry) => {
          if (modelRoot) {
            scene.remove(modelRoot);
          }
          
          geometry.computeVertexNormals();
          const material = new THREE.PointsMaterial({ 
            size: 0.05, 
            vertexColors: true 
          });
          modelRoot = new THREE.Points(geometry, material);
          scene.add(modelRoot);

          // Calcular bounding box y centrar cámara
          const box = new THREE.Box3().setFromObject(modelRoot);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = camera.fov * (Math.PI / 180);
          let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
          cameraZ *= 0.8; // Mucho más cerca

          camera.position.set(center.x + cameraZ * 0.5, center.y + cameraZ * 0.5, center.z + cameraZ * 0.5);
          camera.lookAt(center);
          controls.target.copy(center);
          controls.update();

          modelInfo.value = {
            vertices: size.x.toFixed(2) + ' × ' + size.y.toFixed(2) + ' × ' + size.z.toFixed(2),
            type: 'PLY (Nube de Puntos)',
            name: model.nombre || `Modelo ${model.id}`
          };

          loading.value = false;
          
          // Configurar VR después de cargar el modelo
          initVRFeatures();
        },
        (progress) => {
          if (progress.lengthComputable) {
            loadingProgress.value = Math.round((progress.loaded / progress.total) * 100);
          }
        },
        (error) => {
          console.error('Error cargando PLY:', error);
          loading.value = false;
        }
      );
    } else {
      console.error('Tipo de archivo no soportado:', fileType);
      loading.value = false;
    }
  } catch (error) {
    errorMessage.value = `Error al cargar modelo: ${error}`;
    console.error('Error:', error);
    loading.value = false;
  }
};

const updateExposure = (value: number) => {
  exposure.value = value;
  renderer.toneMappingExposure = value;
};

const updateAmbient = (value: number) => {
  ambientIntensity.value = value;
  ambientLight.intensity = value;
};

const updateDir = (value: number) => {
  dirIntensity.value = value;
  dirLight.intensity = value;
  dirLight2.intensity = value * 1.25;
  dirLight3.intensity = value;
};

const resetLighting = () => {
  updateExposure(1.0);
  updateAmbient(1.5);
  updateDir(0.8);
};

const toggleMeasure = () => {
  measuring.value = !measuring.value;
  if (measuring.value) {
    clearMeasurements();
    areaMode.value = false;
    clearArea();
    // Activar medición en VR
    setMeasureCallback(addMeasurePoint);
    console.log('✓ Modo medición activado (incluye VR)');
  } else {
    // Desactivar medición en VR
    setMeasureCallback(null);
    console.log('✓ Modo medición desactivado');
  }
};

const toggleAreaMode = () => {
  areaMode.value = !areaMode.value;
  if (areaMode.value) {
    clearArea();
    measuring.value = false;
    clearMeasurements();
  }
};

// Función para alternar passthrough
const handlePassthroughToggle = () => {
  if (renderer && scene) {
    togglePassthrough(renderer, scene);
  }
};

onMounted(async () => {
  await nextTick();
  console.log('Viewer container:', viewerContainer.value);
  if (viewerContainer.value) {
    console.log('Container dimensions:', viewerContainer.value.clientWidth, viewerContainer.value.clientHeight);
    initThree();
    // Inicializar VR inmediatamente después de Three.js
    await nextTick();
    initVRFeatures();
  } else {
    console.error('Viewer container not found!');
  }
  // loadModel(); // Descomentar cuando tengas la API lista
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
  
  // Limpiar VR
  if (scene) {
    cleanupVR(scene);
  }
  
  if (isInVR.value) {
    endXRSession();
  }
  
  if (renderer) {
    renderer.setAnimationLoop(null);
    renderer.dispose();
  }
});
</script>

<template>
  <div class="viewer-page">
    <div class="viewer-content bg-darkgray">
      <div class="container-lg">
        <div class="viewer-wrapper">
          <!-- Controls Panel -->
          <div class="controls-panel">
            <div class="control-group">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label class="text-subtitle-2 text-dark">Model ID</label>
                <span style="font-size: 10px; color: #888; font-weight: 600;">v1.5.4-VR</span>
              </div>
              <input
                v-model.number="modelId"
                type="number"
                class="model-input"
                min="1"
                placeholder="Ej: 1, 2, 3..."
              />
              <button @click="loadModel" class="btn-load">Cargar Modelo</button>
            </div>

            <div class="control-group mt-4">
              <button
                @click="toggleMeasure"
                :class="['btn-tool', { active: measuring }]"
              >
                {{ measuring ? 'Distancia: ON' : 'Distancia: OFF' }}
              </button>
              <button
                @click="toggleAreaMode"
                :class="['btn-tool', { active: areaMode }]"
              >
                {{ areaMode ? 'Área: ON' : 'Área: OFF' }}
              </button>
              <button
                @click="clearMeasurements"
                class="btn-clear"
                v-if="measurePoints.length > 0"
              >
                Limpiar Distancia
              </button>
              <button
                @click="clearArea"
                class="btn-clear"
                v-if="areaPoints.length > 0"
              >
                Limpiar Área
              </button>
            </div>

            <!-- Modos de Realidad Virtual (antes de entrar) -->
            <div class="control-group mt-4" v-if="!isInVR && isXRSupported">
              <label class="text-subtitle-2 text-dark mb-2">Seleccionar Modo VR</label>
              <button
                @click="enterVRMode(false)"
                class="btn-vr-mode"
                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin-bottom: 8px;"
              >
                🥽 Entrar a VR Inmersiva
              </button>
              <button
                @click="enterVRMode(true)"
                class="btn-vr-mode"
                style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);"
              >
                🌍 Entrar a Realidad Mixta
              </button>
              <small style="color: #999; font-size: 11px; display: block; margin-top: 8px;">
                VR Inmersiva: Entorno virtual completo<br>
                Realidad Mixta: Ve el mundo real + modelo 3D
              </small>
            </div>
          </div>

          <!-- Viewer Container -->
          <div class="viewer-container">
            <div ref="viewerContainer" class="three-canvas"></div>
            
            <!-- Error Message -->
            <div v-if="errorMessage" class="error-overlay">
              <div class="error-content">
                <p class="text-white">{{ errorMessage }}</p>
                <button @click="errorMessage = ''" class="btn-close">Cerrar</button>
              </div>
            </div>

            <!-- Loading Overlay -->
            <div v-if="loading" class="loading-overlay">
              <div class="loading-content">
                <div class="spinner"></div>
                <p class="text-white mt-3">Cargando modelo... {{ loadingProgress }}%</p>
              </div>
            </div>

            <!-- Model Info Panel -->
            <div v-if="modelInfo" class="info-panel">
              <h4 class="text-subtitle-1 mb-2">Información del Modelo</h4>
              <div class="info-row" v-if="modelInfo.name">
                <span class="info-label">Nombre:</span>
                <span class="info-value">{{ modelInfo.name }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Tipo:</span>
                <span class="info-value">{{ modelInfo.type }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Dimensiones:</span>
                <span class="info-value">{{ modelInfo.vertices }}</span>
              </div>
              <div v-if="isXRSupported" class="info-row vr-status">
                <span class="info-label">🥽 VR:</span>
                <span class="info-value" :class="{ 'vr-active': isInVR }">
                  {{ isInVR ? 'ACTIVO' : 'Disponible' }}
                </span>
              </div>
            </div>

            <!-- Lighting Controls -->
            <div class="lighting-panel">
              <h4 class="panel-title">Iluminación</h4>
              
              <label>
                Exposición: {{ exposure.toFixed(2) }}
                <input
                  type="range"
                  :value="exposure"
                  @input="updateExposure(Number(($event.target as HTMLInputElement).value))"
                  min="0.1"
                  max="2"
                  step="0.01"
                />
              </label>

              <label>
                Ambient: {{ ambientIntensity.toFixed(2) }}
                <input
                  type="range"
                  :value="ambientIntensity"
                  @input="updateAmbient(Number(($event.target as HTMLInputElement).value))"
                  min="0"
                  max="2"
                  step="0.01"
                />
              </label>

              <label>
                Directional: {{ dirIntensity.toFixed(2) }}
                <input
                  type="range"
                  :value="dirIntensity"
                  @input="updateDir(Number(($event.target as HTMLInputElement).value))"
                  min="0"
                  max="4"
                  step="0.01"
                />
              </label>

              <button @click="resetLighting" class="btn-reset">Reset</button>
            </div>
          </div>
        </div>
        
        <!-- Passthrough Toggle Button (flotante, visible solo en VR) -->
        <button
          v-if="isInVR"
          @click="handlePassthroughToggle"
          :class="['btn-passthrough-toggle', { active: passthroughEnabled }]"
        >
          {{ passthroughEnabled ? '🌍 Realidad Mixta' : '🥽 VR Inmersiva' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.viewer-page {
  height: 100vh;
  overflow: hidden;
}

.viewer-content {
  height: 100vh;
  padding: 20px;
}

.viewer-wrapper {
  display: flex;
  gap: 20px;
  height: 100%;
}

.controls-panel {
  flex-shrink: 0;
  width: 250px;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 8px;
  max-height: 100%;
  overflow-y: auto;
}

.control-group {
  label {
    display: block;
    margin-bottom: 8px;
    color: white;
  }

  .helper-text {
    margin-top: 8px;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.4;
  }
}

.model-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  margin-bottom: 12px;
}

.btn-load {
  width: 100%;
  padding: 10px;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;

  &:hover {
    background: #0052a3;
  }
}

.btn-tool {
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 8px;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &.active {
    background: #ff9800;
    border-color: #ff9800;
  }
}

.btn-clear {
  width: 100%;
  padding: 8px;
  background: rgba(220, 38, 38, 0.8);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;

  &:hover {
    background: rgba(220, 38, 38, 1);
  }
}

.btn-vr-mode {
  width: 100%;
  padding: 12px 16px;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
}

.btn-passthrough-toggle {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 10001;
  transition: all 0.3s;

  &:hover {
    transform: translateX(-50%) scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }

  &.active {
    background: linear-gradient(135deg, #56ab2f 0%, #a8e063 100%);
  }
}

.viewer-container {
  flex: 1;
  position: relative;
  background: #0a0a0a;
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
}

.three-canvas {
  width: 100%;
  height: 100%;
}

.error-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 101;
}

.error-content {
  background: rgba(220, 38, 38, 0.9);
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;

  p {
    margin: 0 0 20px 0;
    font-size: 14px;
  }

  .btn-close {
    padding: 8px 20px;
    background: white;
    color: #dc2626;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      background: #f3f4f6;
    }
  }
}

.loading-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  border-radius: 8px;
}

.loading-content {
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: #0066cc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.info-panel {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.75);
  padding: 16px;
  border-radius: 8px;
  color: white;
  min-width: 250px;
  z-index: 10;

  h4 {
    color: white;
    margin: 0;
  }
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
}

.info-label {
  opacity: 0.7;
}

.info-value {
  font-weight: 600;
  color: #4fc3f7;
}

.vr-status {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 8px;
  margin-top: 8px;
}

.vr-active {
  color: #4ade80 !important;
  font-weight: 700;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.lighting-panel {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.75);
  padding: 16px;
  border-radius: 8px;
  color: white;
  width: 240px;
  z-index: 10;

  .panel-title {
    font-weight: 600;
    margin-bottom: 12px;
    text-align: center;
    color: white;
    font-size: 14px;
  }

  label {
    display: block;
    margin: 12px 0;
    font-size: 12px;
    color: white;

    input[type="range"] {
      width: 100%;
      margin-top: 4px;
    }
  }

  .btn-reset {
    width: 100%;
    padding: 8px;
    background: #0066cc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 8px;
    font-size: 12px;

    &:hover {
      background: #0052a3;
    }
  }
}

// Labels flotantes dentro del viewer
:deep(.measure-label),
:deep(.area-label) {
  position: absolute;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
  pointer-events: none;
  z-index: 1000;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

:deep(.measure-label) {
  border: 3px solid #ff0000;
  background: rgba(220, 38, 38, 0.95);
}

:deep(.area-label) {
  border: 3px solid #00ff00;
  background: rgba(34, 197, 94, 0.95);
}

@media (max-width: 768px) {
  .viewer-wrapper {
    flex-direction: column;
  }

  .controls-panel {
    width: 100%;
    padding: 12px;
    max-height: 35vh;
    overflow-y: auto;
    
    .control-group {
      margin-bottom: 8px;
      
      label {
        font-size: 12px;
        margin-bottom: 4px;
      }
      
      .helper-text {
        font-size: 10px;
        margin-top: 4px;
      }
    }
    
    .model-input {
      padding: 6px 10px;
      font-size: 14px;
      margin-bottom: 8px;
    }
    
    .btn-load {
      padding: 8px;
      font-size: 13px;
    }
    
    .btn-tool {
      padding: 8px;
      font-size: 12px;
      margin-bottom: 6px;
    }
    
    .btn-clear {
      padding: 6px;
      font-size: 11px;
      margin-bottom: 6px;
    }
  }
  
  .info-panel {
    display: none; // Ocultar en móviles para no obstruir
  }
  
  .lighting-panel {
    top: auto;
    bottom: 12px;
    left: 12px;
    right: auto;
    width: 180px;
    max-width: calc(50% - 16px);
    padding: 8px;
    background: rgba(0, 0, 0, 0.85);
    max-height: 50vh;
    overflow-y: auto;
    
    .panel-title {
      font-size: 11px;
      margin-bottom: 6px;
    }
    
    label {
      margin: 6px 0;
      font-size: 10px;
    }
    
    .btn-reset {
      font-size: 10px;
      padding: 5px;
      margin-top: 4px;
    }
  }
}
</style>
