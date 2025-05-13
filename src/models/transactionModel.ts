import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/databaseConfig";
import { Account } from "./accountModel";

export interface TransactionAttributes {
  id: string;
  accountId: string;
  type: "deposit" | "withdrawal" | "transfer";
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TransactionCreationAttributes extends Optional<TransactionAttributes, "id" | "description" | "createdAt" | "updatedAt"> {}

export class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes {
  public id!: string;
  public accountId!: string;
  public type!: "deposit" | "withdrawal" | "transfer";
  public amount!: number;
  public balanceBefore!: number;
  public balanceAfter!: number;
  public description?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate() {
    Transaction.belongsTo(Account, { foreignKey: "accountId", as: "account" });
  }
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    accountId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Account, key: "id" },
    },
    type: {
      type: DataTypes.ENUM("deposit", "withdrawal", "transfer"),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    balanceBefore: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    balanceAfter: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "transactions",
    sequelize,
    timestamps: true,
  }
);

Transaction.associate();
