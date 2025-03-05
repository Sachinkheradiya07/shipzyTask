import express from "express";
import {
  createProductUnit,
  getAllProductUnits,
  updateProductUnit,
  deleteProductUnit,
} from "../controller/unitController.js";
const router = express.Router();

router.post("/create-unit", createProductUnit);
router.get("/getall", getAllProductUnits);
router.put("/edit/:id", updateProductUnit);
router.delete("/delete/:id", deleteProductUnit);

export default router;
