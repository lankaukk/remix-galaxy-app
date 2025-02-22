import { type Artwork, type InsertArtwork } from "@shared/schema";
import Airtable from "airtable";

// Initialize Airtable with API key
if (!process.env.AIRTABLE_API_KEY) {
  throw new Error("AIRTABLE_API_KEY environment variable is required");
}

if (!process.env.AIRTABLE_BASE_ID) {
  throw new Error("AIRTABLE_BASE_ID environment variable is required");
}

// Initialize Airtable client with explicit error handling
let airtable: Airtable;
try {
  airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
    endpointUrl: 'https://api.airtable.com',
  });
} catch (error) {
  console.error('Failed to initialize Airtable client:', error);
  throw new Error('Failed to initialize Airtable client. Please check your API key.');
}

const base = airtable.base(process.env.AIRTABLE_BASE_ID);

export interface IStorage {
  getArtworks(): Promise<Artwork[]>;
  getArtwork(id: number): Promise<Artwork | undefined>;
  createArtwork(artwork: InsertArtwork): Promise<Artwork>;
}

export class AirtableStorage implements IStorage {
  private table = base('Artworks');

  async getArtworks(): Promise<Artwork[]> {
    try {
      console.log('Fetching artworks from Airtable...');
      const records = await this.table.select().all();
      console.log(`Successfully fetched ${records.length} artworks`);

      return records.map(record => {
        const artwork = {
          id: parseInt(record.id.replace(/\D/g, '')), // Clean ID to ensure it's numeric
          title: record.fields['title'] as string,
          imageUrl: record.fields['imageUrl'] as string,
          aspectRatio: record.fields['aspectRatio'] as string,
          category: record.fields['category'] as string,
        };

        // Validate required fields
        if (!artwork.title || !artwork.imageUrl) {
          console.warn(`Artwork ${artwork.id} is missing required fields:`, {
            hasTitle: !!artwork.title,
            hasImageUrl: !!artwork.imageUrl,
          });
        }

        return artwork;
      });
    } catch (error) {
      console.error('Error fetching artworks:', error);
      if (error instanceof Error) {
        // Check for specific Airtable error types
        if (error.message.includes('AUTHENTICATION_REQUIRED')) {
          throw new Error('Failed to authenticate with Airtable. Please check your API key.');
        } else if (error.message.includes('NOT_FOUND')) {
          throw new Error('Airtable base or table not found. Please check your Base ID and table name.');
        }
        console.error('Error details:', error.message);
      }
      throw new Error('Failed to fetch artworks from Airtable');
    }
  }

  async getArtwork(id: number): Promise<Artwork | undefined> {
    try {
      console.log(`Fetching artwork with ID: ${id}`);
      const records = await this.table.select({
        filterByFormula: `RECORD_ID()='${id}'`
      }).all();

      if (records.length === 0) {
        console.log(`No artwork found with ID: ${id}`);
        return undefined;
      }

      const record = records[0];
      console.log(`Successfully fetched artwork: ${record.fields['title']}`);

      return {
        id: parseInt(record.id.replace(/\D/g, '')),
        title: record.fields['title'] as string,
        imageUrl: record.fields['imageUrl'] as string,
        aspectRatio: record.fields['aspectRatio'] as string,
        category: record.fields['category'] as string,
      };
    } catch (error) {
      console.error('Error fetching artwork:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      }
      throw new Error(`Failed to fetch artwork with ID: ${id}`);
    }
  }

  async createArtwork(insertArtwork: InsertArtwork): Promise<Artwork> {
    try {
      console.log('Creating new artwork:', insertArtwork.title);
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

      console.log('Successfully created artwork:', record.fields['title']);
      return {
        id: parseInt(record.id.replace(/\D/g, '')),
        title: record.fields['title'] as string,
        imageUrl: record.fields['imageUrl'] as string,
        aspectRatio: record.fields['aspectRatio'] as string,
        category: record.fields['category'] as string,
      };
    } catch (error) {
      console.error('Error creating artwork:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        // Check for specific Airtable error types
        if (error.message.includes('AUTHENTICATION_REQUIRED')) {
          throw new Error('Failed to authenticate with Airtable. Please check your API key.');
        } else if (error.message.includes('NOT_FOUND')) {
          throw new Error('Airtable base or table not found. Please check your Base ID and table name.');
        }
      }
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