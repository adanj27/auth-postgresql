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
  origin: 'https://frontprueba-seven.vercel.app', // Permite solo este origen
  credentials: true, // Permite el uso de credenciales (cookies, encabezados de autorización, etc.)
};

app.use(cors(corsOptions)); // Usa la configuración de CORS
app.use(express.json());
app.use(sanitizeInput);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
// Rutas protegidas para admin
app.use('/api/v1/admin', adminRoutes);

// Rutas protegidas para superadmin
app.use('/api/v1/superadmin', superadminRoutes);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(errorHandler);

export default app;
