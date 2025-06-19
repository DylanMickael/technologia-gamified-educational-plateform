const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const http = require("http")
const socketIo = require("socket.io")
const path = require("path")

// Configuration Swagger
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

// Imports locaux
const sequelize = require("./models")
const authRoutes = require("./routes/auth")
const { setupMonitoring } = require("./middleware/monitoring")

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

const PORT = process.env.PORT || 3000

// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EcoCity API",
      version: "1.0.0",
      description: "API pour l'application EcoCity avec authentification et gestion des utilisateurs",
      contact: {
        name: "Support API",
        email: "support@ecocity.com",
      },
    },
    servers: [
      {
        url: `http://${process.env.SWAGGER_HOST || "localhost:3000"}`,
        description: "Serveur de développement",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js", "./controllers/*.js"],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

// Middleware de sécurité
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: "Trop de requêtes depuis cette IP, réessayez plus tard.",
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000"],
    credentials: true,
  }),
)

// Middleware de base
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(cookieParser())

// Créer le dossier uploads s'il n'existe pas
const fs = require("fs")
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads")
}

// Servir les fichiers statiques
app.use("/uploads", express.static("uploads"))
app.use("/dashboard", express.static(path.join(__dirname, "public/dashboard")))

// Configuration du monitoring
setupMonitoring(app, io)

// Documentation Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info { margin: 50px 0 }
    .swagger-ui .info .title { color: #2c5aa0 }
    .swagger-ui .scheme-container { background: #fafafa; padding: 20px; border-radius: 5px }
  `,
    customSiteTitle: "EcoCity API Documentation",
    customfavIcon: "/favicon.ico",
  }),
)

// Route pour le dashboard
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public/dashboard/index.html"))
})

// Appliquer le rate limiting seulement aux routes API
app.use("/api/", limiter)

// Routes API
app.use("/api/auth", authRoutes)

// Route de base
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur l'API EcoCity! 🌱",
    documentation: "/api-docs",
    dashboard: "/dashboard",
    version: "1.0.0",
    status: "running",
    timestamp: new Date().toISOString(),
  })
})

// Route de santé
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
  })
})

// Gestion des erreurs 404
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route non trouvée",
    path: req.originalUrl,
    availableRoutes: {
      documentation: "/api-docs",
      dashboard: "/dashboard",
      auth: "/api/auth",
      health: "/health",
    },
  })
})

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error("❌ Erreur:", err.stack)
  res.status(err.status || 500).json({
    message: "Erreur interne du serveur",
    error: process.env.NODE_ENV === "development" ? err.message : "Une erreur est survenue",
  })
})

// Connexion à la base de données et démarrage du serveur
sequelize.sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connexion à la base de données réussie")
    return sequelize.sequelize.sync({ alter: true })
  })
  .then(() => {
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`)
      console.log(`📚 Documentation Swagger: http://localhost:${PORT}/api-docs`)
      console.log(`📊 Dashboard de monitoring: http://localhost:${PORT}/dashboard`)
      console.log(`🔐 Route d'inscription: POST http://localhost:${PORT}/api/auth/inscription`)
      console.log(`🔑 Route de connexion: POST http://localhost:${PORT}/api/auth/login`)
      console.log(`💚 Route de santé: GET http://localhost:${PORT}/health`)
    })
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion à la base de données :", err.message)
    process.exit(1)
  })

// Gestion propre de l'arrêt du serveur
process.on("SIGTERM", () => {
  console.log("SIGTERM reçu, arrêt du serveur...")
  server.close(() => {
    console.log("Serveur arrêté")
    process.exit(0)
  })
})

process.on("SIGINT", () => {
  console.log("SIGINT reçu, arrêt du serveur...")
  server.close(() => {
    console.log("Serveur arrêté")
    process.exit(0)
  })
})
