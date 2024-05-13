import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";

const getOneRestaurant = (router: Router) => {
  router.get("/get/:restaurantName", async (req: Request, res: Response) => {
    const { restaurantName } = req.params;
    if (!restaurantName) return res.status(400).send({message:"Restaurant name is not provided"});

    const restaurant = await prisma.restaurant.findUnique({
      where: { username: restaurantName },
    });
    if (!restaurant) return res.status(404).send({message:"Can not find a restaurant with this name."});
    const { password, ...noPasswordRestaurant } = restaurant;

    res.send(noPasswordRestaurant);
  });
};

export default getOneRestaurant;
