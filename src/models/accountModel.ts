import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/databaseConfig";
import { User } from "./userModel";
import { generateAccountNumber } from "../utils/generateAccountNumber";

export interface AccountAttributes {
  id: string;
  userId: string;
  accountNumber: string;
  accountType: "savings" | "current";
  balance: number;
  currency: string;
  status: "active" | "inactive" | "closed";
  pin?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
}
export interface AccountCreationAttributes extends Optional<AccountAttributes, "id" | "createdAt" | "updatedAt" | "deleted"> {}

export class Account extends Model<AccountAttributes, AccountCreationAttributes>
  implements AccountAttributes {
  public id!: string;
  public userId!: string;
  public accountNumber!: string;
  public accountType!: "savings" | "current";
  public balance!: number;
  public currency!: string;
  public status!: "active" | "inactive" | "closed";
   public pin?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public deleted!: boolean;

  public static associate() {
    Account.belongsTo(User, { foreignKey: "userId", as: "owner" });
  }
}

Account.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: () => generateAccountNumber(),
    },
    accountType: {
      type: DataTypes.ENUM("savings", "current"),
      allowNull: false,
      defaultValue: "savings",
    },
    balance: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: "NGN",
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "closed"),
      allowNull: false,
      defaultValue: "active",
    },
     pin: {
      type: DataTypes.STRING(4),
      allowNull: true,
      validate: {
        isNumeric: true,
        len: [4, 4],
      },
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "accounts",
    sequelize,
    paranoid: false,
    timestamps: true,
  }
);

Account.associate();

