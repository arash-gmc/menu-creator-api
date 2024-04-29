import express, { Request, Response } from "express";
import restaurants from "./restaurants";
import items from "./items";

const app = express();

app.use(express.json());

app.use("/hello", (req: Request, res: Response) => {
  res.send("Hello Word");
});

app.use("/api/restaurants", restaurants);

app.use("/api/items", items);

app.listen(5000, () => {
  console.log("listening to port 5000...");
});
