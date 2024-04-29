import express, { Request, Response } from "express";
import prisma from "./prisma/client";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const categoryId = req.header("categoryId");
  if (!categoryId) return res.status(400).send("not provided");
  const categories = await prisma.item.findMany({
    where: { categoryId },
  });
  res.send(categories);
});

router.post("/", async (req: Request, res: Response) => {
  const { name, categoryId, price: rawPrice } = req.body;
  const price = Number(rawPrice);
  await prisma.item.create({ data: { name, categoryId, price } });
  res.send("OK");
});

export default router;
