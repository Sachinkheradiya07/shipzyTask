import Product from "../models/productModel.js";
import Variant from "../models/varientModel.js";

export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      gst,
      productDescription,
      hsn_sac,
      inventoryType,
      productTag,
      unit,
      netWeight,
      grossWeight,
      Dimensionslength,
      Dimensionswidth,
      Dimensionsheight,
      sellPrice,
    } = req.body;

    const productImage = req.files?.productImage?.[0]?.filename;

    // Create Product
    const product = await Product.create({
      productName,
      productImage,
      gst,
      productDescription,
      hsn_sac,
      inventoryType,
      productTag,
      unit,
      netWeight,
      grossWeight,
      Dimensionslength,
      Dimensionswidth,
      Dimensionsheight,
      sellPrice,
    });

    const variants = [];
    // Handling variants
    for (const key in req.body) {
      if (key.startsWith("variantName_")) {
        const index = key.split("_")[1];
        variants.push({
          variantName: req.body[key],
          variantImage:
            req.files[`variantImage_${index}`]?.[0]?.filename || null,
          productId: product.id,
        });
      }
    }

    // Save variants to the database
    await Variant.bulkCreate(variants);

    // Fetch all products with variants
    const products = await Product.findAll({
      include: Variant,
    });

    res.render("product/getAllproduct.ejs", { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // Fetch all products with associated variants using Sequelize
    const products = await Product.findAll({
      include: {
        model: Variant,
        as: "Variants", // Ensure the alias matches exactly
      },
    });

    // Render the products list page with the products data
    res.render("product/getAllproduct.ejs", { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const renderEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.render("product/edit.ejs", { product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productName,
      gst,
      productDescription,
      hsn_sac,
      inventoryType,
      productTag,
      unit,
      netWeight,
      grossWeight,
      Dimensionslength,
      Dimensionswidth,
      Dimensionsheight,
      sellPrice,
    } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const productImage =
      req.files?.productImage?.[0]?.filename || product.productImage;

    // Update product details
    await product.update({
      productName,
      productImage,
      gst,
      productDescription,
      hsn_sac,
      inventoryType,
      productTag,
      unit,
      netWeight,
      grossWeight,
      Dimensionslength,
      Dimensionswidth,
      Dimensionsheight,
      sellPrice,
    });

    const variants = [];
    // Handling variants update
    for (const key in req.body) {
      if (key.startsWith("variantName_")) {
        const index = key.split("_")[1];
        variants.push({
          variantName: req.body[key],
          variantImage:
            req.files[`variantImage_${index}`]?.[0]?.filename || null,
          productId: product.id,
        });
      }
    }

    // Delete existing variants and create new ones
    await Variant.destroy({ where: { productId: product.id } });
    await Variant.bulkCreate(variants);

    const products = await Product.findAll({
      include: Variant,
    });

    res.render("product/getAllproduct.ejs", { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Delete all associated variants before deleting the product
    await Variant.destroy({ where: { productId: product.id } });
    await product.destroy();

    // Fetch updated product list and re-render the page
    const products = await Product.findAll({
      include: Variant,
    });

    res.render("product/getAllproduct.ejs", { products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// drop down
export const getProductsWithVariants = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: Variant,
    });
    console.log("Fetched Products:", JSON.stringify(products, null, 2));
    res.render("product/dropdown.ejs", { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
