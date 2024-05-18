import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import auth from "../../middlewares/auth";
import { editOneItemSchema } from "../../schemas";
import { z } from "zod";
import inputValidation from "../../middlewares/validateInputs";
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

    const categories: string[] = [];
    const userCategories = fetched.map((item) => item.category);
    const defaultCategories = initialCategories();
    [...userCategories, ...defaultCategories].forEach((item) => {
      if (item && !categories.includes(item)) categories.push(item);
    });
    res.send(categories);
  });
};

export default getCategories;
