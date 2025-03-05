import express from "express";
import {
  createProduct,
  getAllProducts,
  renderEdit,
  updateProduct,
  deleteProduct,
  getProductsWithVariants,
} from "../controller/productController.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.post(
  "/create",
  upload.fields([
    { name: "productImage", maxCount: 1 },
    { name: "variantImage_0", maxCount: 1 },
    { name: "variantImage_1", maxCount: 1 },
    { name: "variantImage_2", maxCount: 1 },
    { name: "variantImage_3", maxCount: 1 },
  ]),
  createProduct
);
router.get("/getall", getAllProducts);
router.get("/edit/:id", renderEdit);
router.put(
  "/updateproduct/:id",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "variantImage_0", maxCount: 1 },
    { name: "variantImage_1", maxCount: 1 },
    { name: "variantImage_2", maxCount: 1 },
    { name: "variantImage_3", maxCount: 1 },
  ]),
  updateProduct
);
router.delete("/delete/:id", deleteProduct);

router.get("/dropdown", getProductsWithVariants);

export default router;
