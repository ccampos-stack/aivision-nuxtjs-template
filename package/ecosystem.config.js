// PM2 Configuration for Production Server
module.exports = {
  apps: [{
    name: 'aivision-nuxtjs',
    script: './.output/server/index.mjs',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NITRO_PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    // Logs
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    
    // Auto restart configuration
    watch: false,
    max_memory_restart: '1G',
    
    // Advanced features
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};