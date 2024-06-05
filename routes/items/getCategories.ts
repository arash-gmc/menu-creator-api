import { Request, Response, Router } from "express";
import auth from "../../middlewares/auth";
import prisma from "../../prisma/client";
import initialCategories from "./defaultCategories";

const getCategories = (router: Router) => {
  router.get("/get-categories", auth, async (req: Request, res: Response) => {
    // @ts-ignore
    const restaurantId = req.payload.id as string;
    const fetched = await prisma.item.findMany({
      where: { restaurantId },
      orderBy: { category: "asc" },
      select: { category: true },
    });
    const lng = req.header("lng");
    const type = req.header("type");
    console.log(lng, type);
    const categories: string[] = [];
    const userCategories = fetched.map((item) => item.category);
    const defaultCategories =
      !type || !lng ? [] : initialCategories({ lng, type });
    [...userCategories, ...defaultCategories].forEach((item) => {
      if (item && !categories.includes(item)) categories.push(item);
    });
    res.send(categories);
  });
};

export default getCategories;
