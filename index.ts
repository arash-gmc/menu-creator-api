import express, { Request, Response } from "express";
import restaurants from "./routes";
import items from "./routes";
import applyRoutes from "./routes";

const app = express();

app.use(express.json());

app.use("/hello", (req: Request, res: Response) => {
  res.send("Hello Word");
});

applyRoutes(app);

app.listen(5000, () => {
  console.log("listening to port 5000...");
});
