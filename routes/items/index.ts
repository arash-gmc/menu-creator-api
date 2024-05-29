import express from "express";
import getAll from "./getAll";
import add from "./addOne";
import addMany from "./addMany";
import EditOne from "./editOne";
import changePrices from "./changePrices";
import setDiscount from "./setDiscount";
import removeAllDiscounts from "./clearDiscounts";
import getCategories from "./getCategories";
import deleteOne from "./deleteOne";

const router = express.Router();
getAll(router);
add(router);
addMany(router);
EditOne(router);
changePrices(router);
setDiscount(router);
removeAllDiscounts(router);
getCategories(router);
deleteOne(router);

export default router;
