import items from "./routes";
import restaurants from "./routes";

const applyRoutes = (app: any) => {
  app.use("/api/restaurants", restaurants);
  app.use("/api/items", items);
};

export default applyRoutes;
