import { type Artwork, type InsertArtwork } from "@shared/schema";
import Airtable from "airtable";

// Initialize Airtable with API key
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID!);

export interface IStorage {
  getArtworks(): Promise<Artwork[]>;
  getArtwork(id: number): Promise<Artwork | undefined>;
  createArtwork(artwork: InsertArtwork): Promise<Artwork>;
}

export class AirtableStorage implements IStorage {
  private table = airtable('Artworks');

  async getArtworks(): Promise<Artwork[]> {
    try {
      const records = await this.table.select().all();
      return records.map(record => ({
        id: parseInt(record.id.replace(/\D/g, '')), // Clean ID to ensure it's numeric
        title: record.fields['title'] as string,
        imageUrl: record.fields['imageUrl'] as string,
        aspectRatio: record.fields['aspectRatio'] as string,
        category: record.fields['category'] as string,
      }));
    } catch (error) {
      console.error('Error fetching artworks:', error);
      return [];
    }
  }

  async getArtwork(id: number): Promise<Artwork | undefined> {
    try {
      const records = await this.table.select({
        filterByFormula: `RECORD_ID()='${id}'`
      }).all();

      if (records.length === 0) return undefined;

      const record = records[0];
      return {
        id: parseInt(record.id.replace(/\D/g, '')),
        title: record.fields['title'] as string,
        imageUrl: record.fields['imageUrl'] as string,
        aspectRatio: record.fields['aspectRatio'] as string,
        category: record.fields['category'] as string,
      };
    } catch (error) {
      console.error('Error fetching artwork:', error);
      return undefined;
    }
  }

  async createArtwork(insertArtwork: InsertArtwork): Promise<Artwork> {
    try {
      const [record] = await this.table.create([
        {
          fields: {
            title: insertArtwork.title,
            imageUrl: insertArtwork.imageUrl,
            aspectRatio: insertArtwork.aspectRatio,
            category: insertArtwork.category,
          }
        }
      ]);

      return {
        id: parseInt(record.id.replace(/\D/g, '')),
        title: record.fields['title'] as string,
        imageUrl: record.fields['imageUrl'] as string,
        aspectRatio: record.fields['aspectRatio'] as string,
        category: record.fields['category'] as string,
      };
    } catch (error) {
      console.error('Error creating artwork:', error);
      throw new Error('Failed to create artwork in Airtable');
    }
  }
}

// Export the Airtable storage instance
export const storage = new AirtableStorage();

// Keep MemStorage for testing/development purposes
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