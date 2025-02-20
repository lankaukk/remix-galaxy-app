import { artwork, type Artwork, type InsertArtwork } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getArtworks(): Promise<Artwork[]>;
  getArtwork(id: number): Promise<Artwork | undefined>;
  createArtwork(artwork: InsertArtwork): Promise<Artwork>;
}

export class MemStorage implements IStorage {
  private artworks: Map<number, Artwork>;
  currentId: number;

  constructor() {
    this.artworks = new Map();
    this.currentId = 1;
  }

  async getArtworks(): Promise<Artwork[]> {
    return Array.from(this.artworks.values());
  }

  async getArtwork(id: number): Promise<Artwork | undefined> {
    return this.artworks.get(id);
  }

  async createArtwork(insertArtwork: InsertArtwork): Promise<Artwork> {
    const id = this.currentId++;
    const newArtwork: Artwork = { ...insertArtwork, id };
    this.artworks.set(id, newArtwork);
    return newArtwork;
  }
}

export class DatabaseStorage implements IStorage {
  async getArtworks(): Promise<Artwork[]> {
    return await db.select().from(artwork);
  }

  async getArtwork(id: number): Promise<Artwork | undefined> {
    const [art] = await db.select().from(artwork).where(eq(artwork.id, id));
    return art;
  }

  async createArtwork(insertArtwork: InsertArtwork): Promise<Artwork> {
    const [newArtwork] = await db.insert(artwork).values(insertArtwork).returning();
    return newArtwork;
  }
}

export const storage = new DatabaseStorage();