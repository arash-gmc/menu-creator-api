import { z } from "zod";

export const restaurantRegisterationSchema = z.object({
  title: z.string().min(3).max(255),
  username: z.string().min(3).max(64),
  password: z.string().min(3).max(255),
  email: z.string().min(3).max(255).optional(),
  instagramId: z.string().min(3).max(255).optional(),
});

export const authSchema = z.object({
  nameOrEmail: z.string().min(3).max(64),
  password: z.string().min(3).max(255),
});

export const addOneItemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  category: z.string(),
});

export const addManyItemsSchema = z.array(addOneItemSchema);

export const editOneItemSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
});

export const editManyItemsSchema = z.array(editOneItemSchema);
