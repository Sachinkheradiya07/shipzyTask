import express from "express";
import "./config/db.js";
import initializeRoutes from "./routes/index.js";
import methodOverride from "method-override";
import "./data.js";
const app = express();
const port = 8080;

app.use(express.json());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", "./views");
app.use(methodOverride("_method"));

initializeRoutes(app);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
