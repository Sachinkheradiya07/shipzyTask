import ProductUnit from "../models/unitmodel.js";

// Create a new ProductUnit
export const createProductUnit = async (req, res) => {
  try {
    const { orderUnit, packingUnit, weight, noteForMe } = req.body;
    await ProductUnit.create({
      orderUnit,
      packingUnit,
      weight,
      noteForMe,
    });
    const units = await ProductUnit.findAll();
    res.render("product/getAllunits", { units });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all ProductUnits
export const getAllProductUnits = async (req, res) => {
  try {
    const units = await ProductUnit.findAll();
    res.render("product/getAllunits", { units });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a ProductUnit by ID
export const updateProductUnit = async (req, res) => {
  try {
    const { id } = req.body; // Use req.body instead of req.params
    const { orderUnit, packingUnit, weight, noteForMe } = req.body;

    const productUnit = await ProductUnit.findByPk(id);
    if (!productUnit) {
      return res
        .status(404)
        .json({ success: false, message: "Product Unit not found" });
    }

    // Update fields
    await productUnit.update({ orderUnit, packingUnit, weight, noteForMe });

    res.redirect("/unite/getall"); // Redirect after update
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a ProductUnit by ID
export const deleteProductUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const productUnit = await ProductUnit.findByPk(id);
    if (!productUnit) {
      return res
        .status(404)
        .json({ success: false, message: "Product Unit not found" });
    }
    await productUnit.destroy();
    res.redirect("/unite/getall"); // Redirect after successful deletion
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
