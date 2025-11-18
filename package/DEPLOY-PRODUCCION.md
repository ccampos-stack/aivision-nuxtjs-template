# 🚀 DEPLOY PARA PRODUCCIÓN - AIVISION TEMPLATE

## 📦 Build Generado
**Fecha:** $(Get-Date -Format "dd/MM/yyyy HH:mm")
**Versión:** Nuxt 3.20.1
**Framework:** Vue 3.5.24
**Tamaño total:** 34.86 MB

## 📁 Archivos Listos para Deploy

### Directorio: `.output/public/`
```
├── about/              # Página About
├── auth/               # Páginas de autenticación
├── blog/               # Blog y artículos
├── contact/            # Página de contacto
├── error/              # Página de error
├── images/             # Recursos de imágenes
├── privacy-policy/     # Política de privacidad
├── projects/           # Portfolio de proyectos
├── services/           # Página de servicios
├── terms-conditions/   # Términos y condiciones
├── video/              # Recursos de video
├── _nuxt/              # Assets optimizados (JS, CSS)
├── 200.html           # Página de fallback SPA
├── 404.html           # Página de error 404
├── index.html         # Página principal
├── .htaccess          # Configuración Apache
└── robots.txt         # SEO robots
```

## 🌐 INSTRUCCIONES DE DEPLOY

### 1. Hosting Estático (Netlify, Vercel, GitHub Pages)
```bash
# Subir todo el contenido de .output/public/
# La configuración SPA está incluida
```

### 2. Servidor Apache
```bash
# 1. Copiar archivos
cp -r .output/public/* /var/www/html/

# 2. Configurar permisos
chmod -R 755 /var/www/html/
chown -R www-data:www-data /var/www/html/

# 3. Reiniciar Apache
systemctl restart apache2
```

### 3. Servidor Nginx
Agregar a la configuración Nginx:
```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/html;
    index index.html;

    # Configuración SPA
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets estáticos
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }

    # Compresión
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
}
```

### 4. Para Subdirectorio (ej: dominio.com/AIVISION/)
Si necesitas instalar en un subdirectorio, contacta para generar build específico.

## ✅ OPTIMIZACIONES INCLUIDAS

### 🎯 Performance
- ✅ Compresión GZIP automática
- ✅ Cache de assets estáticos (1 mes)
- ✅ Minificación de CSS y JS
- ✅ Optimización de imágenes
- ✅ Code splitting automático

### 🔒 Seguridad
- ✅ Headers de seguridad HTTP
- ✅ Protección XSS
- ✅ Configuración CORS
- ✅ Prevención de clickjacking

### 📱 SEO
- ✅ Meta tags optimizados
- ✅ Estructura semántica HTML5
- ✅ Robots.txt incluido
- ✅ URLs amigables

## 🧪 VALIDAR DEPLOY

### Test Local
```bash
npx serve .output/public -l 3001
```

### Checklist Pre-Deploy
- [ ] Todas las páginas cargan correctamente
- [ ] Navegación funciona sin errores 404
- [ ] Imágenes se muestran correctamente  
- [ ] Responsive design funciona
- [ ] Performance score > 90 en Lighthouse

## 🚨 TROUBLESHOOTING

### Error 404 en rutas
- Verificar que `.htaccess` está presente (Apache)
- Verificar configuración `try_files` (Nginx)

### Imágenes no cargan
- Verificar permisos de archivos (755)
- Verificar rutas relativas en código

### CSS no aplicado
- Verificar MIME types en servidor
- Verificar cache del navegador

## 📞 SOPORTE

Para problemas específicos de deploy o configuración de subdirectorios, contactar al equipo de desarrollo.

---
**Generado automáticamente** - Deploy listo para producción ✨