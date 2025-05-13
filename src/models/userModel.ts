import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/databaseConfig";

interface UserAttributes {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  deleted: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "deleted" > {}

const User = sequelize.define<Model<UserAttributes, UserCreationAttributes>>("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  modelName: "User",
  tableName: "users",
  timestamps: true,
});

User.sync({ alter: true })
  .then(() => {
    console.log('✅ The "Users" table has been successfully created or updated.');
  })
  .catch((error) => {
    console.error('❌ Error syncing the "Users" table:', error);
  });

export { User };
