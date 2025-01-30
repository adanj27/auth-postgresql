import express from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";
import superadminRoutes from "./routes/superadmin.routes";

const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
// Rutas protegidas para admin
app.use('/api/v1/admin', adminRoutes);

// Rutas protegidas para superadmin
app.use('/api/v1/superadmin', superadminRoutes);

export default app;
