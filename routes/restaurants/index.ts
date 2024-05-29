import express from "express";
import getAllRestaurants from "./getAll";
import login from "./login";
import register from "./register";
import getOneRestaurant from "./getOne";
import addView from "./addView";
import getViews from "./getViews";
import changeTheme from "./changeTheme";

const router = express.Router();

getAllRestaurants(router);
getOneRestaurant(router);
login(router);
register(router);
addView(router)
getViews(router)
changeTheme(router)

export default router;
