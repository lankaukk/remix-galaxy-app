import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const artwork = pgTable("artwork", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  aspectRatio: varchar("aspect_ratio", { length: 20 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
});

export const insertArtworkSchema = createInsertSchema(artwork).omit({
  id: true,
});

export type InsertArtwork = z.infer<typeof insertArtworkSchema>;
export type Artwork = typeof artwork.$inferSelect;
