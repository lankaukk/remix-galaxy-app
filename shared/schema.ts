import { z } from "zod";

// Define the artwork schema using Zod
export const artworkSchema = z.object({
  id: z.number(),
  title: z.string(),
  imageUrl: z.string(),
  aspectRatio: z.string(),
  category: z.string(),
});

// Schema for inserting new artwork (without id)
export const insertArtworkSchema = artworkSchema.omit({ id: true });

// Types for TypeScript
export type InsertArtwork = z.infer<typeof insertArtworkSchema>;
export type Artwork = z.infer<typeof artworkSchema>;