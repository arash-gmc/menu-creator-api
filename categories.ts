import express, { Request, Response } from "express";
import prisma from "./prisma/client";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const restaurantId = req.header("restaurantId");
  if (!restaurantId) return res.status(400).send("not provided");
  const categories = await prisma.category.findMany({
    where: { restaurantId },
  });
  res.send(categories);
});

router.post("/", async (req: Request, res: Response) => {
  const { name, restaurantId } = req.body;
  await prisma.category.create({ data: { name, restaurantId } });
  res.send("OK");
});

export default router;
