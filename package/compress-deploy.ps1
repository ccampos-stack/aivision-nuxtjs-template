# Script para comprimir el deploy de producción
# Ejecutar: .\compress-deploy.ps1

$deployPath = ".output\public"
$zipName = "aivision-deploy-prod-$(Get-Date -Format 'yyyyMMdd-HHmm').zip"

Write-Host "🚀 COMPRIMIENDO DEPLOY PARA PRODUCCIÓN" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Yellow

# Verificar si existe el directorio de deploy
if (!(Test-Path $deployPath)) {
    Write-Host "❌ Error: No se encontró el directorio de deploy" -ForegroundColor Red
    Write-Host "   Ejecuta primero: npm run generate" -ForegroundColor Yellow
    exit 1
}

# Crear archivo ZIP
try {
    Write-Host "📦 Comprimiendo archivos..." -ForegroundColor Cyan
    Compress-Archive -Path "$deployPath\*" -DestinationPath $zipName -Force
    
    $zipSize = [math]::Round((Get-Item $zipName).Length / 1MB, 2)
    
    Write-Host "✅ Deploy comprimido exitosamente!" -ForegroundColor Green
    Write-Host "   Archivo: $zipName" -ForegroundColor White
    Write-Host "   Tamaño: $zipSize MB" -ForegroundColor White
    Write-Host ""
    Write-Host "📋 INSTRUCCIONES:" -ForegroundColor Yellow
    Write-Host "   1. Descomprimir en el directorio web del servidor"
    Write-Host "   2. Configurar servidor web (ver DEPLOY-PRODUCCION.md)"
    Write-Host "   3. Validar funcionamiento"
    Write-Host ""
    Write-Host "🌐 Para hosting estático: Subir contenido directamente" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Error al comprimir: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "================================================" -ForegroundColor Yellow
Write-Host "🎉 DEPLOY LISTO PARA PRODUCCIÓN!" -ForegroundColor Green