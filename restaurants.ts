import express, { Request, Response } from "express";
import prisma from "./prisma/client";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const restaurants = await prisma.restaurant.findMany();
  res.send(restaurants);
});

router.post("/", async (req: Request, res: Response) => {
  const { urlname, realname } = req.body;
  await prisma.restaurant.create({ data: { urlname, realname } });
  res.send("OK");
});

export default router;
