import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // Product Detail Tab Fields
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hsn_sac: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gst: {
      type: DataTypes.STRING,
      defaultValue: 0,
      allowNull: false,
    },
    productDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    productImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inventoryType: {
      type: DataTypes.ENUM("Finished Goods", "Rejection", "Raw Material"),
      allowNull: false,
    },

    // Advanced Tab Fields
    productTag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    netWeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    grossWeight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unit: {
      type: DataTypes.ENUM(
        "MT (KG)",
        "LT (ML)",
        "TON",
        "Pieces",
        "KG (KG)",
        "BOTTLES (KG)",
        "JAR (GM)",
        "CAN (KG)",
        "BOX (GM)",
        "PCS (KG)",
        "BAGS (KG)"
      ),
      allowNull: false,
    },

    Dimensionslength: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Dimensionswidth: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Dimensionsheight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    sellPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default Product;
