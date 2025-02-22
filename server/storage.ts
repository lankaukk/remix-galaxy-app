import { type Artwork, type InsertArtwork, type Collection, type InsertCollection } from "@shared/schema";
import Airtable from "airtable";

// Initialize Airtable with API key
if (!process.env.AIRTABLE_API_KEY) {
  throw new Error("AIRTABLE_API_KEY environment variable is required");
}

// Initialize Airtable with explicit error handling and logging
console.log('Initializing Airtable client...');

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
});

const base = Airtable.base('appr9UTq2Y6sy9dJK');

export interface IStorage {
  getArtworks(): Promise<Artwork[]>;
  getArtwork(id: number): Promise<Artwork | undefined>;
  createArtwork(artwork: InsertArtwork): Promise<Artwork>;
  getCollections(): Promise<Collection[]>;
  getCollection(id: number): Promise<Collection | undefined>;
}

export class AirtableStorage implements IStorage {
  private artworksTable = base('Artworks');
  private collectionsTable = base('Collections');

  async getArtworks(): Promise<Artwork[]> {
    try {
      console.log('Fetching artworks from Airtable...');
      const token = process.env.AIRTABLE_API_KEY;
      console.log('Using API Key:', token ? `Present (starts with: ${token.substring(0, 4)}...)` : 'Missing');
      console.log('Token length:', token?.length);
      console.log('Token starts with pat.?:', token?.startsWith('pat.'));

      const records = await this.artworksTable.select({
        view: "Grid view",
        maxRecords: 100
      }).all();

      console.log(`Successfully fetched ${records.length} artworks`);
      console.log('Sample record structure:', JSON.stringify(records[0]?.fields, null, 2));

      return records.map(record => {
        // Handle Airtable attachment format for images
        const attachments = record.get('Image') as any[];
        const imageUrl = attachments && attachments.length > 0 ? attachments[0].url : '';

        const artwork = {
          id: parseInt(record.id.replace(/\D/g, '')),
          title: record.get('Title') as string,
          image: imageUrl,
          medium: record.get('Medium') as string,
          year: record.get('Year') as string,
          collection: record.get('Collection') as string,
        };

        // Log image data for debugging
        console.log(`Processing artwork ${artwork.id}:`, {
          title: artwork.title,
          hasImage: !!artwork.image,
          imageUrl: artwork.image
        });

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
        if (error.message.includes('AUTHENTICATION_REQUIRED')) {
          console.error('Authentication failed. Make sure your Personal Access Token (PAT):');
          console.error('1. Starts with "pat."');
          console.error('2. Has the correct scopes (data.records:read, data.records:write)');
          console.error('3. Has access to the base');
          throw new Error('Failed to authenticate with Airtable. Please check your Personal Access Token (PAT).');
        } else if (error.message.includes('NOT_FOUND')) {
          console.error('Base or table not found. Please verify:');
          console.error('1. Your Base ID is correct');
          console.error('2. The table named "Artworks" exists in the base');
          console.error('3. Your PAT has access to this base');
          throw new Error('Airtable base or table not found. Please check your Base ID and table name.');
        }
        console.error('Error details:', error.message);
      }
      throw error;
    }
  }

  async getArtwork(id: number): Promise<Artwork | undefined> {
    try {
      console.log(`Fetching artwork with ID: ${id}`);
      const records = await this.artworksTable.select({
        filterByFormula: `RECORD_ID()='${id}'`,
        view: "Grid view"
      }).all();

      if (records.length === 0) {
        console.log(`No artwork found with ID: ${id}`);
        return undefined;
      }

      const record = records[0];
      console.log(`Successfully fetched artwork: ${record.get('Title')}`);

      return {
        id: parseInt(record.id.replace(/\D/g, '')),
        title: record.get('Title') as string,
        image: record.get('Image') as string,
        medium: record.get('Medium') as string,
        year: record.get('Year') as string,
        collection: record.get('Collection') as string,
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
            'Title': insertArtwork.title,
            'Image': insertArtwork.image,
            'Medium': insertArtwork.medium,
            'Year': insertArtwork.year,
            'Collection': insertArtwork.collection,
          }
        }
      ]);

      console.log('Successfully created artwork:', record.get('Title'));
      return {
        id: parseInt(record.id.replace(/\D/g, '')),
        title: record.get('Title') as string,
        image: record.get('Image') as string,
        medium: record.get('Medium') as string,
        year: record.get('Year') as string,
        collection: record.get('Collection') as string,
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

  async getCollections(): Promise<Collection[]> {
    try {
      console.log('Fetching collections from Airtable...');
      const records = await this.collectionsTable.select({
        view: "Grid view"
      }).all();
      console.log(`Successfully fetched ${records.length} collections`);

      return records.map(record => ({
        id: parseInt(record.id.replace(/\D/g, '')),
        name: record.get('Collection Name') as string, //Corrected field name
        description: record.get('Description') as string,
        artworks: record.get('Artworks') as number[] || [],
      }));
    } catch (error) {
      console.error('Error fetching collections:', error);
      throw new Error('Failed to fetch collections from Airtable');
    }
  }

  async getCollection(id: number): Promise<Collection | undefined> {
    try {
      const records = await this.collectionsTable.select({
        filterByFormula: `RECORD_ID()='${id}'`,
        view: "Grid view"
      }).all();

      if (records.length === 0) return undefined;

      const record = records[0];
      return {
        id: parseInt(record.id.replace(/\D/g, '')),
        name: record.get('Collection Name') as string, //Corrected field name
        description: record.get('Description') as string,
        artworks: record.get('Artworks') as number[] || [],
      };
    } catch (error) {
      console.error('Error fetching collection:', error);
      throw new Error(`Failed to fetch collection with ID: ${id}`);
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