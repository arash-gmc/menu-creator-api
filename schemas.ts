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
