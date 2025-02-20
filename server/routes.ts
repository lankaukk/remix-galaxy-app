import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertArtworkSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Artwork API routes
  app.get('/api/artwork', async (req, res) => {
    try {
      const artworks = await storage.getArtworks();
      res.json(artworks);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      res.status(500).json({ error: 'Failed to fetch artworks' });
    }
  });

  app.get('/api/artwork/:id', async (req, res) => {
    try {
      const artwork = await storage.getArtwork(parseInt(req.params.id));
      if (!artwork) {
        return res.status(404).json({ error: 'Artwork not found' });
      }
      res.json(artwork);
    } catch (error) {
      console.error('Error fetching artwork:', error);
      res.status(500).json({ error: 'Failed to fetch artwork' });
    }
  });

  app.post('/api/artwork', async (req, res) => {
    try {
      const artworkData = insertArtworkSchema.parse(req.body);
      const artwork = await storage.createArtwork(artworkData);
      res.status(201).json(artwork);
    } catch (error) {
      console.error('Error creating artwork:', error);
      res.status(400).json({ error: 'Invalid artwork data' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}