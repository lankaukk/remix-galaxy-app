import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertArtworkSchema } from "@shared/schema";

declare module "express-session" {
  interface SessionData {
    shopifySidekickAuth?: boolean;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Shopify Sidekick authentication routes
  app.post("/api/auth/shopify-sidekick", (req, res) => {
    const { password } = req.body;
    const validPasswords = [
      process.env.SHOPIFY_PASSWORD,
      process.env.SHOPIFY_PASSWORD_2,
      process.env.SHOPIFY_PASSWORD_3,
    ].filter(Boolean);

    if (validPasswords.includes(password)) {
      req.session.shopifySidekickAuth = true;
      res.json({ authenticated: true });
    } else {
      res
        .status(401)
        .json({ authenticated: false, error: "Incorrect password" });
    }
  });

  app.get("/api/auth/shopify-sidekick/status", (req, res) => {
    res.json({ authenticated: !!req.session.shopifySidekickAuth });
  });

  // Artwork API routes
  app.get("/api/artwork", async (req, res) => {
    try {
      const artworks = await storage.getArtworks();
      res.json(artworks);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      // Send more specific error message to client
      if (error instanceof Error) {
        res.status(500).json({
          error: error.message || "Failed to fetch artworks",
          code: error.message.includes("AUTHENTICATION_REQUIRED")
            ? "AUTH_ERROR"
            : "SERVER_ERROR",
        });
      } else {
        res.status(500).json({ error: "Failed to fetch artworks" });
      }
    }
  });

  app.get("/api/artwork/:id", async (req, res) => {
    try {
      const artwork = await storage.getArtwork(parseInt(req.params.id));
      if (!artwork) {
        return res.status(404).json({ error: "Artwork not found" });
      }
      res.json(artwork);
    } catch (error) {
      console.error("Error fetching artwork:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to fetch artwork" });
      }
    }
  });

  app.post("/api/artwork", async (req, res) => {
    try {
      const artworkData = insertArtworkSchema.parse(req.body);
      const artwork = await storage.createArtwork(artworkData);
      res.status(201).json(artwork);
    } catch (error) {
      console.error("Error creating artwork:", error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Invalid artwork data" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
