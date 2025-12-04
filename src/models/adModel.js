import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./userModel.js";
import Category from "./categoryModel.js";

const Ad = sequelize.define(
  "Ad",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    condition: {
      type: DataTypes.ENUM("NEW", "USED"),
      allowNull: false,
      defaultValue: "USED",
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "ads",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Ad.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

User.hasMany(Ad, {
  foreignKey: "user_id",
  as: "ads",
});

Ad.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

Category.hasMany(Ad, {
  foreignKey: "category_id",
  as: "ads",
});

export default Ad;
