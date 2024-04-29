import express, { Request, Response } from "express";

const app = express();

app.use("/", (req: Request, res: Response) => {
  res.send("Hello Word");
});

app.listen(5000, () => {
  console.log("listening to port 5000");
});
