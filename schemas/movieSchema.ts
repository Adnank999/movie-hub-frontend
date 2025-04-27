
import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z.string().url("Image URL must be valid").optional(),
  genre: z.array(z.string()).nonempty("At least one genre is required"),
  wishlist: z.boolean(),
});

export type MovieFormData = z.infer<typeof movieSchema>;
