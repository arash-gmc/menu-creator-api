import express, { Request, Response } from "express";
import prisma from "./prisma/client";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const restaurantId = req.header("categoryId");
  if (!restaurantId) return res.status(400).send("not provided");
  const categories = await prisma.item.findMany({
    where: {  restaurantId },
  });
  res.send(categories);
});

router.post("/", async (req: Request, res: Response) => {
  const { name,  restaurantId, price: rawPrice,category } = req.body;
  const price = Number(rawPrice);
  await prisma.item.create({ data: { name,  restaurantId, price,category } });
  res.send("OK");
});

export default router;
