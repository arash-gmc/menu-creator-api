import express, { Request, Response } from "express";
import prisma from "../prisma/client";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/get-restaurant-items/:restaurantId", async (req: Request, res: Response) => {
  const restaurantId = req.params.restaurantId
  if (!restaurantId) return res.status(400).send("not provided");
  const items = await prisma.item.findMany({
    where: {  restaurantId },
  });
  res.send(items);
});

router.post("/add-item",auth, async (req: Request, res: Response) => {
  const { name, price: rawPrice,category } = req.body;
  // @ts-ignore
  const restaurantId = req.payload.id as string
  const price = Number(rawPrice);
  await prisma.item.create({ data: { name, price,category,restaurantId } });
  res.send("OK");
});



// router.put('/change-prices',async (req: Request, res: Response) =>{
//   const {changePriceArray} = req.body
// })

export default router;
