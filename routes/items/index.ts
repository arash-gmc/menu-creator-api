import express from "express";
import getAll from "./getAll";
import add from "./addOne";
import addMany from "./addMany";
import EditOne from "./editOne";
import changePrices from "./changePrices";

const router = express.Router();
getAll(router);
add(router);
addMany(router);
EditOne(router);
changePrices(router);

// router.put('/change-prices',async (req: Request, res: Response) =>{
//   const {changePriceArray} = req.body
// })

export default router;
