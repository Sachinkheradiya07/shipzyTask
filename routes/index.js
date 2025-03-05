import productRouts from "./productRoutes.js";
import uniteRoutes from "./unitRoutes.js";

const initialRouter = (app) => {
  app.get("/", (req, res) => {
    res.render("product/Product.ejs");
  });
  app.use("/api", productRouts);

  app.get("/unite", (req, res) => {
    res.render("product/productunits.ejs");
  });
  app.use("/unite", uniteRoutes);
};

export default initialRouter;
