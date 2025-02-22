import { type Artwork, type InsertArtwork, type Collection, type InsertCollection } from "@shared/schema";
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

const base = airtable.base('appr9UTq2Y6sy9dJK');

export interface IStorage {
  getArtworks(): Promise<Artwork[]>;
  getArtwork(id: number): Promise<Artwork | undefined>;
  createArtwork(artwork: InsertArtwork): Promise<Artwork>;
  getCollections(): Promise<Collection[]>;
  getCollection(id: number): Promise<Collection | undefined>;
}

export class AirtableStorage implements IStorage {
  private artworksTable = base('tbl7iUDGuQHQ6K01j'); // Artworks table
  private collectionsTable = base('tblsBk5HuQemOfMFt'); // Collections table

  async getArtworks(): Promise<Artwork[]> {
    try {
      console.log('Fetching artworks from Airtable...');
      const records = await this.artworksTable.select().all();
      console.log(`Successfully fetched ${records.length} artworks`);

      return records.map(record => {
        const artwork = {
          id: parseInt(record.id.replace(/\D/g, '')),
          title: record.fields['title'] as string,
          image: record.fields['image'] as string,
          medium: record.fields['medium'] as string,
          year: record.fields['year'] as string,
          collection: record.fields['collection'] as string,
        };

        // Validate required fields
        if (!artwork.title || !artwork.image) {
          console.warn(`Artwork ${artwork.id} is missing required fields:`, {
            hasTitle: !!artwork.title,
            hasImage: !!artwork.image,
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

  async getCollections(): Promise<Collection[]> {
    try {
      console.log('Fetching collections from Airtable...');
      const records = await this.collectionsTable.select().all();
      console.log(`Successfully fetched ${records.length} collections`);

      return records.map(record => ({
        id: parseInt(record.id.replace(/\D/g, '')),
        name: record.fields['name'] as string,
        description: record.fields['description'] as string,
        artworks: (record.fields['artworks'] as string[])?.map(id => parseInt(id)) || [],
      }));
    } catch (error) {
      console.error('Error fetching collections:', error);
      throw new Error('Failed to fetch collections from Airtable');
    }
  }

  async getCollection(id: number): Promise<Collection | undefined> {
    try {
      const records = await this.collectionsTable.select({
        filterByFormula: `RECORD_ID()='${id}'`
      }).all();

      if (records.length === 0) return undefined;

      const record = records[0];
      return {
        id: parseInt(record.id.replace(/\D/g, '')),
        name: record.fields['name'] as string,
        description: record.fields['description'] as string,
        artworks: (record.fields['artworks'] as string[])?.map(id => parseInt(id)) || [],
      };
    } catch (error) {
      console.error('Error fetching collection:', error);
      throw new Error(`Failed to fetch collection with ID: ${id}`);
    }
  }

  async getArtwork(id: number): Promise<Artwork | undefined> {
    try {
      console.log(`Fetching artwork with ID: ${id}`);
      const records = await this.artworksTable.select({
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
        image: record.fields['image'] as string,
        medium: record.fields['medium'] as string,
        year: record.fields['year'] as string,
        collection: record.fields['collection'] as string,
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
      const [record] = await this.artworksTable.create([
        {
          fields: {
            title: insertArtwork.title,
            image: insertArtwork.image,
            medium: insertArtwork.medium,
            year: insertArtwork.year,
            collection: insertArtwork.collection,
          }
        }
      ]);

      console.log('Successfully created artwork:', record.fields['title']);
      return {
        id: parseInt(record.id.replace(/\D/g, '')),
        title: record.fields['title'] as string,
        image: record.fields['image'] as string,
        medium: record.fields['medium'] as string,
        year: record.fields['year'] as string,
        collection: record.fields['collection'] as string,
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
  private collections: Map<number, Collection>;
  currentId: number;
  currentCollectionId: number;

  constructor() {
    this.artworks = new Map();
    this.collections = new Map();
    this.currentId = 1;
    this.currentCollectionId = 1;
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

  async getCollections(): Promise<Collection[]> {
    return Array.from(this.collections.values());
  }

  async getCollection(id: number): Promise<Collection | undefined> {
    return this.collections.get(id);
  }
}