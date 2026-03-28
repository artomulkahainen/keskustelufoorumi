import type { UUID } from "node:crypto";
import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/db.ts";

export class Post extends Model<
  InferAttributes<Post>,
  InferCreationAttributes<Post>
> {
  declare id: CreationOptional<UUID>;
  declare content: string;
  declare createdAt: CreationOptional<Date>;
  declare createdBy: string;
}

const tableName = "posts";

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdBy: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName,
    timestamps: false,
    indexes: [
      {
        name: "idx_created_at_desc",
        fields: [{ name: "createdAt", order: "DESC" }],
      },
    ],
  },
);
