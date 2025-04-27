import { z } from "zod";

export const MovieDetailsSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  wishlist: z.boolean(),
  genre: z.array(z.string()),
  user: z.string(),
  ratings: z.array(z.any()),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});
