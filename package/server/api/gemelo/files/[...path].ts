export default defineEventHandler(async (event) => {
  const pathParam = getRouterParam(event, 'path');
  const fileName = pathParam || '';
  
  if (!fileName) {
    throw createError({
      statusCode: 400,
      message: 'Nombre de archivo requerido'
    });
  }
  
  const url = `https://www.inspexion.cydgroup.cl/api/gemelo/files/${fileName}`;
  
  try {
    const response = await $fetch(url, {
      method: 'GET',
      responseType: 'arrayBuffer'
    });
    
    // Determinar content-type basado en extensión
    const ext = fileName.toLowerCase().split('.').pop();
    let contentType = 'application/octet-stream';
    
    if (ext === 'glb') contentType = 'model/gltf-binary';
    else if (ext === 'gltf') contentType = 'model/gltf+json';
    else if (ext === 'ply') contentType = 'application/octet-stream';
    else if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
    else if (ext === 'png') contentType = 'image/png';
    
    setResponseHeaders(event, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=31536000'
    });
    
    return response;
  } catch (error: any) {
    console.error('Error en proxy de archivos:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error al obtener archivo desde Inspexion'
    });
  }
});
