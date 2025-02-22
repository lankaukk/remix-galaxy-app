import { z } from "zod";

// Define the artwork schema using Zod
export const artworkSchema = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string(),
  medium: z.string().optional(),
  year: z.string().optional(),
  collection: z.string().optional(),
});

export const collectionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  artworks: z.array(z.number()).optional(),
});

// Schema for inserting new artwork (without id)
export const insertArtworkSchema = artworkSchema.omit({ id: true });
export const insertCollectionSchema = collectionSchema.omit({ id: true });

// Types for TypeScript
export type InsertArtwork = z.infer<typeof insertArtworkSchema>;
export type Artwork = z.infer<typeof artworkSchema>;
export type InsertCollection = z.infer<typeof insertCollectionSchema>;
export type Collection = z.infer<typeof collectionSchema>;