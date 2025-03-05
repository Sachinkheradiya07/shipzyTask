import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ProductUnit = sequelize.define(
  "ProductUnit",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    orderUnit: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Name of the unit (e.g., MT, TON, KG, Litre, Pieces, etc.)",
    },
    packingUnit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    noteForMe: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Personal notes related to this unit",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

export default ProductUnit;
