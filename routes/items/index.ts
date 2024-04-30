import express from "express";
import getAll from "./getAll";
import add from "./add";

const router = express.Router();
getAll(router);
add(router);

// router.put('/change-prices',async (req: Request, res: Response) =>{
//   const {changePriceArray} = req.body
// })

export default router;
