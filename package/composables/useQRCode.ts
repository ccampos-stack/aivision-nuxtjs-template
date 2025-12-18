import QRCode from 'qrcode';

/**
 * Composable para generar códigos QR de modelos 3D
 * Permite compartir modelos fácilmente vía escaneo desde móviles
 */
export const useQRCode = () => {
  /**
   * Añade un logo en el centro del código QR
   * @param qrDataUrl - Data URL del código QR base
   * @param logoUrl - URL del logo a usar
   * @param bgColor - Color de fondo del logo
   * @returns Data URL del código QR con logo
   */
  const addLogoToQR = async (
    qrDataUrl: string,
    logoUrl: string,
    bgColor: string
  ): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(qrDataUrl);

      const qrImage = new Image();
      qrImage.crossOrigin = 'anonymous';
      
      qrImage.onload = () => {
        canvas.width = qrImage.width;
        canvas.height = qrImage.height;

        // Dibujar el QR
        ctx.drawImage(qrImage, 0, 0);

        // Calcular dimensiones del logo (18% del tamaño del QR)
        const logoSize = qrImage.width * 0.18;
        const logoX = (qrImage.width - logoSize) / 2;
        const logoY = (qrImage.height - logoSize) / 2;

        // Dibujar fondo blanco del logo
        ctx.fillStyle = '#FFFFFF';
        const padding = 6;
        ctx.fillRect(logoX - padding, logoY - padding, logoSize + padding * 2, logoSize + padding * 2);

        // Cargar y dibujar el logo
        const logoImage = new Image();
        logoImage.crossOrigin = 'anonymous';
        
        logoImage.onload = () => {
          ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
          resolve(canvas.toDataURL('image/png'));
        };
        
        logoImage.onerror = () => {
          // Si falla la carga del logo, devolver el QR sin logo
          console.warn('No se pudo cargar el logo, usando QR sin logo');
          resolve(canvas.toDataURL('image/png'));
        };
        
        logoImage.src = logoUrl;
      };
      
      qrImage.src = qrDataUrl;
    });
  };
  /**
   * Genera un código QR que apunta a un modelo específico
   * @param modelId - ID del modelo a compartir
   * @param platform - Plataforma de destino: 'web' (WebXR), 'android' (Scene Viewer), 'ios' (Quick Look)
   * @param fileName - Nombre real del archivo GLB/USDZ (opcional)
   * @param baseUrl - URL base de la aplicación (por defecto: origen actual)
   * @returns Data URL del código QR generado o null si hay error
   */
  const generateModelQR = async (
    modelId: string | number,
    platform: 'web' | 'android' | 'ios' = 'web',
    fileName?: string,
    baseUrl?: string
  ): Promise<string | null> => {
    try {
      // URL del backend real (CYD Group)
      const API_BASE = 'https://www.inspexion.cydgroup.cl';
      const url = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
      let fullUrl = '';
      let qrColor = '#000000';
      
      if (platform === 'android') {
        // URL directa para Scene Viewer (Android detecta y abre automáticamente)
        // Usar fileName real si está disponible, sino usar modelId.glb
        const glbFile = fileName || `${modelId}.glb`;
        const glbUrl = `${API_BASE}/api/gemelo/files/${glbFile}`;
        fullUrl = `https://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(glbUrl)}&mode=ar_preferred&title=Modelo%20${modelId}`;
        qrColor = '#34A853'; // Verde de Android
        console.log('🤖 Generando QR para Android Scene Viewer:', fullUrl);
        console.log('📁 Archivo:', glbFile);
      } else if (platform === 'ios') {
        // Quick Look (AR instantáneo en iOS - requiere archivo .usdz)
        // Intentar reemplazar .glb con .usdz si hay fileName
        const usdzFile = fileName ? fileName.replace(/\.glb$/i, '.usdz') : `${modelId}.usdz`;
        fullUrl = `${API_BASE}/api/gemelo/files/${usdzFile}`;
        qrColor = '#007AFF'; // Azul de iOS
        console.log('🍎 Generando QR para iOS Quick Look:', fullUrl);
        console.log('📁 Archivo:', usdzFile);
      } else {
        // WebXR (navegador - tu implementación actual)
        fullUrl = `${url}/viewer?model=${modelId}`;
        qrColor = '#000000';
        console.log('🌐 Generando QR para WebXR:', fullUrl);
      }
      
      const qrCodeDataUrl = await QRCode.toDataURL(fullUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: qrColor,
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H' // Mayor corrección de errores para soportar logo
      });
      
      // Agregar logo según plataforma (URLs de logos SVG)
      let logoUrl = '';
      let logoBgColor = '#000000';
      
      if (platform === 'android') {
        // Logo de Android (verde) - Oficial simplificado
        logoUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48cGF0aCBmaWxsPSIjM0RkQzg0IiBkPSJNMjEuNyA1MS43YzYuNCAwIDExLjUgNS4yIDExLjUgMTEuNXYyOS41YzAgNi40LTUuMiAxMS41LTExLjUgMTEuNXMtMTEuNS01LjItMTEuNS0xMS41VjYzLjJjMC02LjMgNS4xLTExLjUgMTEuNS0xMS41ek0xMDYuMyA1MS43YzYuNCAwIDExLjUgNS4yIDExLjUgMTEuNXYyOS41YzAgNi40LTUuMiAxMS41LTExLjUgMTEuNXMtMTEuNS01LjItMTEuNS0xMS41VjYzLjJjMC02LjMgNS4xLTExLjUgMTEuNS0xMS41ek04MC41IDI5LjhjLjMgMCAuNS4xLjguMmw2LjktMTEuNWMuNS0uOC40LTEuOS0uNC0yLjQtLjgtLjUtMS45LS40LTIuNC40bC03LjEgMTEuOWMtNC42LTEuNy05LjYtMi43LTE0LjgtMi43cy0xMC4yIDEtMTQuOCAyLjdMNDEuNyAxNi42Yy0uNS0uOC0xLjYtMS0yLjQtLjQtLjguNS0xIDEuNi0uNCAyLjRsNi45IDExLjVjLjIuMS41LjIuOC4yem0tMzMuNyA4LjZjMCAyLjMgMS45IDQuMiA0LjIgNC4yczQuMi0xLjkgNC4yLTQuMi0xLjktNC4yLTQuMi00LjItNC4yIDEuOS00LjIgNC4yem0yNi40IDBoMGMwIDIuMyAxLjkgNC4yIDQuMiA0LjJzNC4yLTEuOSA0LjItNC4yLTEuOS00LjItNC4yLTQuMi00LjIgMS45LTQuMiA0LjJ6TTM5LjQgNTAuNWg0OS4ydjQ4LjhjMCAxLjgtMS41IDMuMy0zLjMgMy4zSDQyLjdjLTEuOCAwLTMuMy0xLjUtMy4zLTMuM1Y1MC41eiIvPjwvc3ZnPg==';
        logoBgColor = '#34A853';
      } else if (platform === 'ios') {
        // Logo de Apple (negro) - Oficial
        logoUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MTQuNTQgMTAwMCI+PHBhdGggZD0iTTc4OC4xIDM0MC42Yy0uOC04Mi41IDY3LjMtMTIyLjMgNzAuNC0xMjQuMi0zOC4zLTU2LjEtOTcuOS04My43LTE1OS4yLTg0LjgtNjcuOS0uOC0xMzIuNiA0MC0xNjcuMSA0MHMtODcuMi0zOC45LTE0My4zLTM3LjljLTc0LjIgMS4xLTE0Mi42IDQzLjItMTgwLjcgMTA5LjctNzcuMSAxMzMuNi0xOS43IDMzMS42IDU1LjQgNDM5LjkgMzYuOCA1Mi44IDgwLjcgMTEyLjIgMTM4LjQgMTEwLjEgNTUuNS0yLjEgNzYuNi0zNiAxNDMuOS0zNiA2Ny4yIDAgODYuNCAzNiAxNDMuMSAzNC45IDU5LjEtLjkgOTguNC01Mi45IDEzNS4xLTEwNS44IDQyLjMtNjEuMSA1OS43LTEyMC4zIDYwLjgtMTIzLjQtMS4zLS42LTExNi43LTQ0LjgtMTE3LjgtMTc3Ljl6TTY2NC40IDkwYzMwLjctMzcuMiA1MS4zLTg4LjggNDUuNi0xNDAtNDQuMSAxLjgtOTcuNSAyOS40LTEyOS4xIDY2LjUtMjguMyAzMi43LTUzLjEgODQuOS00Ni40IDEzNSA0OC45IDMuOCA5OS4xLTI1IDEyOS45LTYxLjV6IiBmaWxsPSIjMDAwIi8+PC9zdmc+';
        logoBgColor = '#000000';
      } else {
        // Logo WebXR/VR (gafas VR) - Para web
        logoUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48cGF0aCBmaWxsPSIjNTY0OEZGIiBkPSJNMTA4IDM2SDIwYy04LjggMC0xNiA3LjItMTYgMTZ2MjRjMCA4LjggNy4yIDE2IDE2IDE2aDEyYzQuNCAwIDguNC0xLjggMTEuMy00LjdMNTMuNyA3N2M1LjEtNS4xIDEzLjQtNS4xIDE4LjUgMGwxMC40IDEwLjRjMi45IDIuOSA2LjkgNC43IDExLjMgNC43aDEyYzguOCAwIDE2LTcuMiAxNi0xNlY1MmMwLTguOC03LjItMTYtMTYtMTZ6bS01NiAzNmMtNi42IDAtMTItNS40LTEyLTEyczUuNC0xMiAxMi0xMiAxMiA1LjQgMTIgMTItNS40IDEyLTEyIDEyem0yNCAwYy02LjYgMC0xMi01LjQtMTItMTJzNS40LTEyIDEyLTEyIDEyIDUuNCAxMiAxMi01LjQgMTItMTIgMTJ6Ii8+PC9zdmc+';
        logoBgColor = '#5648FF';
      }
      
      const qrWithLogo = await addLogoToQR(qrCodeDataUrl, logoUrl, logoBgColor);
      
      console.log('✅ Código QR generado exitosamente con logo');
      return qrWithLogo;
    } catch (error) {
      console.error('❌ Error generando código QR:', error);
      return null;
    }
  };

  /**
   * Descarga el código QR como imagen PNG
   * @param dataUrl - Data URL del código QR
   * @param modelName - Nombre del modelo para el archivo
   */
  const downloadQR = (dataUrl: string, modelName: string = 'modelo'): void => {
    try {
      const link = document.createElement('a');
      link.download = `qr-${modelName}-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('✅ Código QR descargado');
    } catch (error) {
      console.error('❌ Error descargando QR:', error);
    }
  };

  /**
   * Copia la URL del modelo al portapapeles
   * @param modelId - ID del modelo
   * @param baseUrl - URL base de la aplicación
   */
  const copyModelUrl = async (
    modelId: string | number,
    baseUrl?: string
  ): Promise<boolean> => {
    try {
      const url = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
      const fullUrl = `${url}/viewer?model=${modelId}`;
      
      await navigator.clipboard.writeText(fullUrl);
      console.log('✅ URL copiada al portapapeles:', fullUrl);
      return true;
    } catch (error) {
      console.error('❌ Error copiando URL:', error);
      return false;
    }
  };

  return {
    generateModelQR,
    downloadQR,
    copyModelUrl
  };
};
