import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON body parser
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/lookup/:id", async (req, res) => {
    const userId = req.params.id;
    const token = process.env.DISCORD_BOT_TOKEN;

    if (!token) {
      return res.status(500).json({ error: "Server misconfiguration: Missing DISCORD_BOT_TOKEN" });
    }

    if (!userId || !/^\d{17,20}$/.test(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    try {
      const response = await fetch(`https://discord.com/api/v10/users/${userId}`, {
        headers: {
          Authorization: `Bot ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Discord API Error: ${response.status} ${response.statusText}`, errorText);
        
        if (response.status === 404) {
          return res.status(404).json({ error: "User not found" });
        }
        if (response.status === 401) {
          return res.status(401).json({ error: "Invalid Bot Token. Please check your DISCORD_BOT_TOKEN." });
        }
        return res.status(response.status).json({ error: `Discord API Error: ${response.status} ${response.statusText}` });
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Discord API Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
