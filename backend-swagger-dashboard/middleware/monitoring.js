const os = require("os")
const fs = require("fs")
const path = require("path")

// Stockage des métriques en mémoire
const metrics = {
  requests: {
    total: 0,
    success: 0,
    errors: 0,
    byMethod: {},
    byRoute: {},
    byStatusCode: {},
    responseTime: [],
    slowRequests: [], // Requêtes lentes (> 1000ms)
    recentErrors: [], // Erreurs récentes avec détails
  },
  connections: {
    active: 0,
    total: 0,
    peak: 0, // Pic de connexions simultanées
    history: [], // Historique des connexions
  },
  server: {
    uptime: Date.now(),
    memory: {},
    cpu: {},
    network: {
      bytesIn: 0,
      bytesOut: 0,
      requestsPerSecond: 0,
      connections: 0,
    },
    disk: {},
    processes: [],
  },
  alerts: [], // Système d'alertes
  performance: {
    bottlenecks: [],
    recommendations: [],
  }
}

// Configuration des seuils d'alerte
const ALERT_THRESHOLDS = {
  CPU_HIGH: 80, // %
  MEMORY_HIGH: 85, // %
  RESPONSE_TIME_SLOW: 1000, // ms
  ERROR_RATE_HIGH: 5, // %
  DISK_USAGE_HIGH: 90, // %
}

// Historique des métriques pour les tendances
const metricsHistory = {
  cpu: [],
  memory: [],
  responseTime: [],
  requests: [],
  errors: [],
}

// Fonction pour générer des alertes
const generateAlert = (type, severity, message, value = null) => {
  const alert = {
    id: Date.now() + Math.random(),
    type,
    severity, // 'low', 'medium', 'high', 'critical'
    message,
    value,
    timestamp: new Date().toISOString(),
    resolved: false,
  }
  
  metrics.alerts.unshift(alert)
  
  // Garder seulement les 50 dernières alertes
  if (metrics.alerts.length > 50) {
    metrics.alerts = metrics.alerts.slice(0, 50)
  }
  
  console.log(`🚨 ALERTE [${severity.toUpperCase()}]: ${message}`)
  return alert
}

// Fonction pour analyser les performances et générer des recommandations
const analyzePerformance = () => {
  const currentMetrics = getSystemMetrics()
  const recommendations = []
  const bottlenecks = []

  // Analyse CPU
  if (currentMetrics.cpu.usage > ALERT_THRESHOLDS.CPU_HIGH) {
    bottlenecks.push({
      component: 'CPU',
      severity: 'high',
      usage: currentMetrics.cpu.usage,
      description: 'Usage CPU élevé détecté'
    })
    recommendations.push('Considérez l\'optimisation des processus ou l\'ajout de ressources CPU')
  }

  // Analyse mémoire
  const memoryUsage = (currentMetrics.memory.used / currentMetrics.memory.total) * 100
  if (memoryUsage > ALERT_THRESHOLDS.MEMORY_HIGH) {
    bottlenecks.push({
      component: 'Memory',
      severity: 'high',
      usage: memoryUsage,
      description: 'Usage mémoire élevé détecté'
    })
    recommendations.push('Vérifiez les fuites mémoire ou augmentez la RAM disponible')
  }

  // Analyse temps de réponse
  const avgResponseTime = metrics.requests.responseTime.length > 0
    ? metrics.requests.responseTime.reduce((a, b) => a + b, 0) / metrics.requests.responseTime.length
    : 0

  if (avgResponseTime > ALERT_THRESHOLDS.RESPONSE_TIME_SLOW) {
    bottlenecks.push({
      component: 'Response Time',
      severity: 'medium',
      usage: avgResponseTime,
      description: 'Temps de réponse lent détecté'
    })
    recommendations.push('Optimisez les requêtes de base de données et le cache')
  }

  // Analyse taux d'erreur
  const errorRate = metrics.requests.total > 0 
    ? (metrics.requests.errors / metrics.requests.total) * 100 
    : 0

  if (errorRate > ALERT_THRESHOLDS.ERROR_RATE_HIGH) {
    bottlenecks.push({
      component: 'Error Rate',
      severity: 'high',
      usage: errorRate,
      description: 'Taux d\'erreur élevé détecté'
    })
    recommendations.push('Vérifiez les logs d\'erreur et corrigez les problèmes récurrents')
  }

  metrics.performance.bottlenecks = bottlenecks
  metrics.performance.recommendations = recommendations
}

// Fonction pour obtenir les informations de disque
const getDiskUsage = () => {
  try {
    const stats = fs.statSync('/')
    return {
      total: 0, // Difficile à obtenir sans librairie externe
      used: 0,
      free: 0,
      usage: 0,
    }
  } catch (error) {
    return { total: 0, used: 0, free: 0, usage: 0 }
  }
}

// Fonction pour obtenir les informations réseau (simulées)
const getNetworkStats = () => {
  // Dans un vrai environnement, vous utiliseriez une librairie comme 'node-network-info'
  return {
    interfaces: os.networkInterfaces(),
    traffic: {
      bytesIn: metrics.server.network.bytesIn,
      bytesOut: metrics.server.network.bytesOut,
      packetsIn: Math.floor(Math.random() * 1000) + 100,
      packetsOut: Math.floor(Math.random() * 800) + 80,
    },
    latency: Math.floor(Math.random() * 50) + 5,
  }
}

// Fonction pour obtenir les processus système
const getProcessInfo = () => {
  return {
    pid: process.pid,
    ppid: process.ppid,
    title: process.title,
    version: process.version,
    versions: process.versions,
    env: {
      NODE_ENV: process.env.NODE_ENV || 'development',
      PORT: process.env.PORT || 3000,
    }
  }
}

// Middleware de monitoring enrichi
const monitoringMiddleware = (io) => {
  return (req, res, next) => {
    const startTime = Date.now()
    const requestSize = parseInt(req.get('content-length')) || 0

    // Incrémenter les compteurs
    metrics.requests.total++
    metrics.server.network.bytesIn += requestSize

    // Compter par méthode
    metrics.requests.byMethod[req.method] = (metrics.requests.byMethod[req.method] || 0) + 1

    // Compter par route
    const route = req.route ? req.route.path : req.path
    metrics.requests.byRoute[route] = (metrics.requests.byRoute[route] || 0) + 1

    // Obtenir l'IP du client
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown'

    // Intercepter la réponse
    const originalSend = res.send
    res.send = function (data) {
      const responseTime = Date.now() - startTime
      const responseSize = Buffer.byteLength(data || '', 'utf8')

      // Enregistrer les métriques de réseau
      metrics.server.network.bytesOut += responseSize

      // Enregistrer le temps de réponse
      metrics.requests.responseTime.push(responseTime)
      if (metrics.requests.responseTime.length > 100) {
        metrics.requests.responseTime.shift()
      }

      // Compter par code de statut
      metrics.requests.byStatusCode[res.statusCode] = 
        (metrics.requests.byStatusCode[res.statusCode] || 0) + 1

      // Compter succès/erreurs
      if (res.statusCode >= 200 && res.statusCode < 400) {
        metrics.requests.success++
      } else {
        metrics.requests.errors++
        
        // Enregistrer les erreurs récentes
        metrics.requests.recentErrors.unshift({
          timestamp: new Date().toISOString(),
          method: req.method,
          url: req.url,
          statusCode: res.statusCode,
          responseTime,
          ip: clientIP,
          userAgent: req.get('User-Agent') || 'unknown'
        })
        
        // Garder seulement les 20 dernières erreurs
        if (metrics.requests.recentErrors.length > 20) {
          metrics.requests.recentErrors = metrics.requests.recentErrors.slice(0, 20)
        }

        // Générer une alerte pour les erreurs critiques
        if (res.statusCode >= 500) {
          generateAlert(
            'server_error',
            'high',
            `Erreur serveur ${res.statusCode} sur ${req.method} ${req.url}`,
            res.statusCode
          )
        }
      }

      // Enregistrer les requêtes lentes
      if (responseTime > ALERT_THRESHOLDS.RESPONSE_TIME_SLOW) {
        metrics.requests.slowRequests.unshift({
          timestamp: new Date().toISOString(),
          method: req.method,
          url: req.url,
          responseTime,
          ip: clientIP
        })
        
        if (metrics.requests.slowRequests.length > 10) {
          metrics.requests.slowRequests = metrics.requests.slowRequests.slice(0, 10)
        }

        generateAlert(
          'slow_request',
          'medium',
          `Requête lente détectée: ${responseTime}ms sur ${req.method} ${req.url}`,
          responseTime
        )
      }

      // Émettre les métriques en temps réel
      io.emit("metrics", getMetrics())

      originalSend.call(this, data)
    }

    next()
  }
}

// Fonction pour obtenir les métriques système enrichies
const getSystemMetrics = () => {
  const memUsage = process.memoryUsage()
  const cpus = os.cpus()
  
  // Calcul de l'usage CPU (simulation plus réaliste)
  const cpuUsage = Math.floor(Math.random() * 100)
  const coresUsage = cpus.map(() => Math.floor(Math.random() * 100))

  const systemMetrics = {
    memory: {
      used: Math.round(memUsage.heapUsed / 1024 / 1024),
      total: Math.round(os.totalmem() / 1024 / 1024),
      free: Math.round(os.freemem() / 1024 / 1024),
      heap: {
        used: Math.round(memUsage.heapUsed / 1024 / 1024),
        total: Math.round(memUsage.heapTotal / 1024 / 1024),
        limit: Math.round(memUsage.rss / 1024 / 1024),
      }
    },
    cpu: {
      usage: cpuUsage,
      model: cpus[0]?.model || 'Unknown',
      cores: cpus.length,
      coresUsage: coresUsage,
      loadAverage: os.loadavg(),
      speed: cpus[0]?.speed || 0,
    },
    network: {
      ...getNetworkStats(),
      traffic: (Math.random() * 100).toFixed(2),
      in: Math.floor(metrics.server.network.bytesIn / 1024 / 1024),
      out: Math.floor(metrics.server.network.bytesOut / 1024 / 1024),
      latency: Math.floor(Math.random() * 50) + 5,
      packets: Math.floor(Math.random() * 10000) + 1000,
    },
    disk: getDiskUsage(),
    uptime: Math.floor((Date.now() - metrics.server.uptime) / 1000),
    platform: os.platform(),
    arch: os.arch(),
    nodeVersion: process.version,
    hostname: os.hostname(),
    processInfo: getProcessInfo(),
  }

  // Vérifier les seuils et générer des alertes
  if (cpuUsage > ALERT_THRESHOLDS.CPU_HIGH) {
    generateAlert('cpu_high', 'high', `Usage CPU élevé: ${cpuUsage}%`, cpuUsage)
  }

  const memoryUsage = (systemMetrics.memory.used / systemMetrics.memory.total) * 100
  if (memoryUsage > ALERT_THRESHOLDS.MEMORY_HIGH) {
    generateAlert('memory_high', 'high', `Usage mémoire élevé: ${memoryUsage.toFixed(1)}%`, memoryUsage)
  }

  return systemMetrics
}

// Fonction pour calculer les tendances
const calculateTrends = () => {
  const now = Date.now()
  const currentMetrics = getSystemMetrics()
  
  // Ajouter aux historiques
  metricsHistory.cpu.push({ timestamp: now, value: currentMetrics.cpu.usage })
  metricsHistory.memory.push({ 
    timestamp: now, 
    value: (currentMetrics.memory.used / currentMetrics.memory.total) * 100 
  })
  
  const avgResponseTime = metrics.requests.responseTime.length > 0
    ? metrics.requests.responseTime.reduce((a, b) => a + b, 0) / metrics.requests.responseTime.length
    : 0
  metricsHistory.responseTime.push({ timestamp: now, value: avgResponseTime })
  
  // Garder seulement les données des 30 dernières minutes
  const thirtyMinutesAgo = now - (30 * 60 * 1000)
  Object.keys(metricsHistory).forEach(key => {
    metricsHistory[key] = metricsHistory[key].filter(item => item.timestamp > thirtyMinutesAgo)
  })

  return metricsHistory
}

// Fonction pour obtenir les statistiques avancées
const getAdvancedStats = () => {
  const errorRate = metrics.requests.total > 0 
    ? ((metrics.requests.errors / metrics.requests.total) * 100).toFixed(2)
    : 0

  const avgResponseTime = metrics.requests.responseTime.length > 0
    ? Math.round(metrics.requests.responseTime.reduce((a, b) => a + b, 0) / metrics.requests.responseTime.length)
    : 0

  const requestsPerMinute = metrics.requests.total > 0 
    ? Math.round(metrics.requests.total / (Math.floor((Date.now() - metrics.server.uptime) / 1000) / 60))
    : 0

  return {
    errorRate: parseFloat(errorRate),
    avgResponseTime,
    requestsPerMinute,
    peakConnections: metrics.connections.peak,
    slowRequestsCount: metrics.requests.slowRequests.length,
    recentErrorsCount: metrics.requests.recentErrors.length,
    alertsCount: metrics.alerts.filter(alert => !alert.resolved).length,
  }
}

// Fonction pour obtenir toutes les métriques enrichies
const getMetrics = () => {
  const avgResponseTime = metrics.requests.responseTime.length > 0
    ? Math.round(metrics.requests.responseTime.reduce((a, b) => a + b, 0) / metrics.requests.responseTime.length)
    : 0

  // Analyser les performances
  analyzePerformance()

  return {
    ...metrics,
    requests: {
      ...metrics.requests,
      avgResponseTime,
    },
    server: getSystemMetrics(),
    trends: calculateTrends(),
    stats: getAdvancedStats(),
    timestamp: new Date().toISOString(),
  }
}

// Configuration du monitoring avec Socket.IO
const setupMonitoring = (app, io) => {
  // Middleware de monitoring
  app.use(monitoringMiddleware(io))

  // Gestion des connexions WebSocket
  io.on("connection", (socket) => {
    metrics.connections.active++
    metrics.connections.total++
    
    // Mettre à jour le pic de connexions
    if (metrics.connections.active > metrics.connections.peak) {
      metrics.connections.peak = metrics.connections.active
    }

    console.log(`📱 Nouvelle connexion dashboard: ${socket.id} (${metrics.connections.active} actives)`)

    // Envoyer les métriques initiales
    socket.emit("metrics", getMetrics())

    // Gestion des commandes depuis le dashboard
    socket.on("getAlerts", () => {
      socket.emit("alerts", metrics.alerts.filter(alert => !alert.resolved))
    })

    socket.on("resolveAlert", (alertId) => {
      const alert = metrics.alerts.find(a => a.id === alertId)
      if (alert) {
        alert.resolved = true
        io.emit("alertResolved", alertId)
      }
    })

    socket.on("getSlowRequests", () => {
      socket.emit("slowRequests", metrics.requests.slowRequests)
    })

    socket.on("getRecentErrors", () => {
      socket.emit("recentErrors", metrics.requests.recentErrors)
    })

    socket.on("disconnect", () => {
      metrics.connections.active--
      console.log(`📱 Déconnexion dashboard: ${socket.id} (${metrics.connections.active} actives)`)
    })
  })

  // Envoyer les métriques toutes les 3 secondes
  setInterval(() => {
    io.emit("metrics", getMetrics())
  }, 3000)

  // Nettoyage périodique des anciennes données (toutes les heures)
  setInterval(() => {
    // Nettoyer les anciennes alertes résolues
    metrics.alerts = metrics.alerts.filter(alert => 
      !alert.resolved || (Date.now() - new Date(alert.timestamp).getTime()) < 24 * 60 * 60 * 1000
    )
    
    console.log("🧹 Nettoyage des anciennes métriques effectué")
  }, 60 * 60 * 1000)
}

// Fonction pour exporter les métriques (pour sauvegarde ou analyse)
const exportMetrics = () => {
  return {
    exportTime: new Date().toISOString(),
    metrics: getMetrics(),
    alerts: metrics.alerts,
    performance: metrics.performance,
  }
}

// Fonction pour réinitialiser les métriques
const resetMetrics = () => {
  metrics.requests = {
    total: 0,
    success: 0,
    errors: 0,
    byMethod: {},
    byRoute: {},
    byStatusCode: {},
    responseTime: [],
    slowRequests: [],
    recentErrors: [],
  }
  
  metrics.connections.total = metrics.connections.active
  metrics.alerts = []
  
  console.log("🔄 Métriques réinitialisées")
}

module.exports = { 
  setupMonitoring, 
  getMetrics, 
  exportMetrics, 
  resetMetrics, 
  generateAlert,
  ALERT_THRESHOLDS 
}