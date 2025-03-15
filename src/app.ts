import express from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";
import superadminRoutes from "./routes/superadmin.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { sanitizeInput } from "./middlewares/sanirizeInput";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './docs/swagger';

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'https://frontprueba-seven.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // Cache preflight requests for 24 hours
};

// Aplicar CORS antes de todas las rutas
app.use(cors(corsOptions));

// Middleware para manejar preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(sanitizeInput);

// Rutas públicas
app.use("/api/v1/auth", authRoutes);

// Rutas protegidas
app.use("/api/v1/user", userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/superadmin', superadminRoutes);

// Documentación
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Manejo de errores
app.use(errorHandler);

export default app;
