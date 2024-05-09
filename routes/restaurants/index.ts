import express from "express";
import getAllRestaurants from "./getAll";
import login from "./login";
import register from "./register";
import getOneRestaurant from "./getOne";

const router = express.Router();

getAllRestaurants(router);
getOneRestaurant(router);
login(router);
register(router);

export default router;
