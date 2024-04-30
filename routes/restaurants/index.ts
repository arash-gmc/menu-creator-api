import express from "express";
import getAllRestaurants from "./getAll";
import login from "./login";
import register from "./register";

const router = express.Router();

getAllRestaurants(router);
login(router);
register(router);

export default router;
