import express from "express";
import getAll from "./getAll";
import add from "./addOne";
import addMany from "./addMany";
import EditOne from "./editOne";
import changePrices from "./changePrices";
import setDiscount from "./setDiscount";
import removeAllDiscounts from "./removeAllDiscounts";

const router = express.Router();
getAll(router);
add(router);
addMany(router);
EditOne(router);
changePrices(router);
setDiscount(router);
removeAllDiscounts(router);

// router.put('/change-prices',async (req: Request, res: Response) =>{
//   const {changePriceArray} = req.body
// })

export default router;
