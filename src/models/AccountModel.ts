import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/databaseConfig";

interface AccountAttributes {
    id: string;
    accountNumber: string;
    accountType: string;
    balance: number;
    userId: string;
}

interface AccountCreationAttributes extends Optional<AccountAttributes, "id" | "balance"> {}

class Account extends Model<AccountAttributes, AccountCreationAttributes> implements AccountAttributes {
  public id!: string;
  public accountNumber!: string;
  public accountType!: string;
  public balance!: number;
  public userId!: string;
}

Account.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      accountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      accountType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Account",
      tableName: "accounts",
      timestamps: true,
    }
  );
  
  Account.sync({ alter: true })
      .then(() => console.log('"account" table synced'))
      .catch((err) => console.error("Failed to sync account table:", err));
  export {Account};