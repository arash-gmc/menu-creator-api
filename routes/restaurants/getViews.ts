import { Router, Request, Response } from "express";
import prisma from "../../prisma/client";
import auth from "../../middlewares/auth";
import { z } from "zod";
import inputValidation from "../../middlewares/validateInputs";


const getViews = (router: Router) => {
  router.get(
    "/get-views",
    auth,    
    async (req: Request, res: Response) => {
      // @ts-ignore
      const restaurantId = req.payload.id as string;
      const records = await prisma.restaurantView.findMany({where:{restaurantId}})
      res.send(records);
    }
  );
};

export default getViews;
