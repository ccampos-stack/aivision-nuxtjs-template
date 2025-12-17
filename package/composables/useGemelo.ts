import { ref } from 'vue';

export interface ModelDto {
  id: number;
  filePath: string;
  convertedPath?: string;
  nombre?: string;
  estado?: string;
  uploadDate?: string;
}

export interface GemeloInfoDto {
  externalId: string;
  nombre: string;
  estado: string;
  ultimaLectura: string;
  comentario: string;
}

export const useGemelo = () => {
  const config = useRuntimeConfig();
  // En desarrollo usar proxy local, en producción usar API directa
  const baseURL = import.meta.env.DEV ? '/api/gemelo' : 'https://www.inspexion.cydgroup.cl/api/gemelo';

  /**
   * Obtener modelo por ID
   */
  const getModel = async (id: number): Promise<ModelDto | null> => {
    try {
      const response = await $fetch<ModelDto>(`${baseURL}/models/${id}`);
      return response;
    } catch (error: any) {
      console.error('Error al obtener modelo:', error);
      // Propagar el error con información útil
      if (error.status === 404) {
        throw new Error(`Modelo con ID ${id} no encontrado en la base de datos`);
      } else if (error.status === 401) {
        throw new Error('No autorizado. Verifica tus credenciales');
      } else if (error.status >= 500) {
        throw new Error('Error del servidor. Intenta más tarde');
      } else if (error.message && error.message.includes('fetch')) {
        throw new Error('Error de conexión: verifica la configuración CORS del servidor o la conectividad de red');
      }
      throw new Error(`Error al cargar modelo: ${error.message || 'Error desconocido'}`);
    }
  };

  /**
   * Obtener información del gemelo por externalId
   */
  const getInfo = async (externalId: string): Promise<GemeloInfoDto | null> => {
    try {
      const response = await $fetch<GemeloInfoDto>(`${baseURL}/info/${externalId}`);
      return response;
    } catch (error) {
      console.error('Error al obtener info:', error);
      return null;
    }
  };

  /**
   * Resolver URL del archivo para Three.js
   * Si filePath es absoluto (http/https) lo retorna tal cual
   * Si no, construye la URL usando el proxy del servidor Nuxt
   * El proxy maneja CORS y sirve los archivos desde Inspexion
   */
  const resolveFileUrl = (filePath: string): string => {
    if (!filePath) {
      console.warn('resolveFileUrl: filePath vacío');
      return '';
    }
    
    console.log('resolveFileUrl - Input:', filePath);
    
    // Si ya es una URL completa, retornarla tal cual
    if (/^https?:\/\//i.test(filePath)) {
      console.log('resolveFileUrl - URL completa detectada');
      return filePath;
    }
    
    // Limpiar el path de cualquier prefijo /api/gemelo
    let cleanPath = filePath.trim();
    
    // Remover prefijos comunes que podrían venir del backend
    const prefixesToRemove = [
      '/api/gemelo/files/',
      '/api/gemelo/v1/',
      '/api/gemelo/',
      'api/gemelo/files/',
      'api/gemelo/v1/',
      'api/gemelo/',
      '/files/',
      'files/'
    ];
    
    for (const prefix of prefixesToRemove) {
      if (cleanPath.startsWith(prefix)) {
        cleanPath = cleanPath.substring(prefix.length);
        console.log(`resolveFileUrl - Removido prefijo "${prefix}", resultado:`, cleanPath);
        break;
      }
    }
    
    // Extraer solo el nombre del archivo (último segmento del path)
    const parts = cleanPath.split('/').filter(Boolean);
    const fileName = parts.length ? parts[parts.length - 1] : cleanPath;
    
    console.log('resolveFileUrl - Nombre de archivo extraído:', fileName);
    
    // En desarrollo usar proxy local, en producción usar URL completa de cydgroup
    const finalUrl = import.meta.env.DEV 
      ? `/api/gemelo/files/${encodeURIComponent(fileName)}`
      : `https://www.inspexion.cydgroup.cl/api/gemelo/files/${encodeURIComponent(fileName)}`;
    console.log('resolveFileUrl - URL final:', finalUrl);
    
    return finalUrl;
  };

  /**
   * Obtener archivo como Blob
   */
  const getFileBlob = async (fileName: string): Promise<Blob | null> => {
    try {
      const response = await $fetch<Blob>(`${baseURL}/files/${encodeURIComponent(fileName)}`, {
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      console.error('Error al obtener archivo:', error);
      return null;
    }
  };

  /**
   * Validar extensión de archivo soportada
   */
  const isValidModelExtension = (fileName: string): boolean => {
    const validExtensions = ['.glb', '.gltf', '.ply', '.obj', '.fbx'];
    const ext = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
    return validExtensions.includes(ext);
  };

  /**
   * Detectar tipo de archivo por extensión
   */
  const detectFileType = (fileName: string): 'glb' | 'gltf' | 'ply' | 'obj' | 'fbx' | 'unknown' => {
    const ext = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
    switch (ext) {
      case '.glb': return 'glb';
      case '.gltf': return 'gltf';
      case '.ply': return 'ply';
      case '.obj': return 'obj';
      case '.fbx': return 'fbx';
      default: return 'unknown';
    }
  };

  return {
    getModel,
    getInfo,
    resolveFileUrl,
    getFileBlob,
    isValidModelExtension,
    detectFileType
  };
};
