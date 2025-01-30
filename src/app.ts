import express from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";
import superadminRoutes from "./routes/superadmin.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { sanitizeInput } from "./middlewares/sanirizeInput";
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'http://your-allowed-origin.com',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(sanitizeInput);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
// Rutas protegidas para admin
app.use('/api/v1/admin', adminRoutes);

// Rutas protegidas para superadmin
app.use('/api/v1/superadmin', superadminRoutes);
app.use(errorHandler);

export default app;
