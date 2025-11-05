import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import cors from "cors";

// Simple console logger
const log = (message: string) => console.log(`[express] ${message}`);

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ CORS configuration — allow frontend origins if needed
app.use(
  cors({
    origin: [
      "https://student-frontend-7nd9.onrender.com",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// ✅ Root route
app.get("/", (_req, res) => {
  res.status(200).json({ message: "Backend API is running 🚀" });
});

// ✅ Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 200) logLine = logLine.slice(0, 199) + "…";
      log(logLine);
    }
  });

  next();
});

// ✅ Async bootstrapping
(async () => {
  try {
    const httpServer = await registerRoutes(app);

    // Global error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log(`Error: ${message}`);
      res.status(status).json({ message });
    });

    // ✅ Start server
    const port = parseInt(process.env.PORT || "6000", 10);
    const server = createServer(app);

    server.listen(port, "0.0.0.0", () => {
      log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
})();
