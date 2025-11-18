# AIVision Nuxt.js - Deployment Guide

Este documento contiene instrucciones para desplegar AIVision Nuxt.js en diferentes plataformas de hosting.

## 🚀 Opciones de Deployment

### 1. Hosting Estático (SPA) - Recomendado para empezar

**Archivos generados:** `.output/public/`
**Tamaño:** ~5.7MB optimizado

**Plataformas compatibles:**
- ✅ **Vercel** - Deploy automático desde GitHub
- ✅ **Netlify** - Deploy automático desde GitHub  
- ✅ **GitHub Pages** - Hosting gratuito
- ✅ **Firebase Hosting** - Google Cloud
- ✅ **AWS S3 + CloudFront** - Amazon Web Services

#### Vercel (Recomendado)
1. Conecta tu repositorio GitHub a Vercel
2. Configura Build Command: `npm run generate`
3. Output Directory: `.output/public`
4. Deploy automático en cada push

#### Netlify
1. Conecta tu repositorio GitHub a Netlify
2. Build command: `npm run generate`
3. Publish directory: `.output/public`
4. Deploy automático configurado

### 2. Servidor Node.js (SSR/Universal)

**Archivos generados:** `.output/server/`
**Requisitos:** Node.js 18+

**Plataformas compatibles:**
- ✅ **Railway** - Simple deploy con GitHub
- ✅ **Render** - Hosting con SSL automático
- ✅ **DigitalOcean App Platform**
- ✅ **AWS Elastic Beanstalk**
- ✅ **Google Cloud Run**
- ✅ **VPS con PM2** (DigitalOcean, Linode, etc.)

#### Railway (Más simple)
1. Conecta GitHub a Railway
2. Configura variables de entorno:
   ```
   NODE_ENV=production
   PORT=3000
   ```
3. Deploy automático

#### VPS con PM2
```bash
# Instalar PM2 globalmente
npm install -g pm2

# Copiar archivos al servidor
scp -r .output/ user@server:/var/www/aivision/
scp ecosystem.config.js user@server:/var/www/aivision/

# En el servidor
cd /var/www/aivision
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

### 3. Docker Container

**Archivos incluidos:** `Dockerfile`

```bash
# Build image
docker build -t aivision-nuxtjs .

# Run container
docker run -p 3000:3000 aivision-nuxtjs
```

## 📊 Performance Metrics

**Build optimizada incluye:**
- ✅ Code splitting automático
- ✅ Imágenes optimizadas
- ✅ CSS minificado (973KB → 134KB gzip)
- ✅ JavaScript minificado
- ✅ Tree shaking aplicado
- ✅ Lazy loading componentes

**Tamaños:**
- Total bundle: ~1.74MB
- Gzipped: ~406KB
- Critical CSS: 134KB
- Largest chunk: 362KB (Vuetify)

## 🔧 Variables de Entorno

```bash
# Producción
NODE_ENV=production
NITRO_PORT=3000

# Opcional - Analytics
GOOGLE_ANALYTICS_ID=your_ga_id
FACEBOOK_PIXEL_ID=your_pixel_id
```

## 🚦 Testing Production Build

```bash
# Servidor Node.js
node .output/server/index.mjs

# Archivos estáticos
npx serve .output/public
```

## 📋 Checklist Pre-Deploy

- ✅ Build sin errores
- ✅ Todas las imágenes PNG disponibles
- ✅ Videos banner-video2.mp4 subidos
- ✅ Variables de entorno configuradas
- ✅ SSL certificado (automático en Vercel/Netlify)
- ✅ Dominio personalizado configurado (opcional)

## 🌐 URLs Recomendadas

**Demo sites sugeridos:**
- `aivision-demo.vercel.app`
- `aivision.netlify.app` 
- `aivision-industrial.com` (dominio personalizado)

## 📞 Soporte

Si necesitas ayuda con el deployment, revisa la documentación de tu plataforma elegida o contacta soporte técnico.