import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

// db.define(nama_tabel, field, opsi)
const Cuti = db.define(
  "cuti",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    type: DataTypes.STRING,
    reason: DataTypes.STRING,
    startDate: {
      type: DataTypes.DATEONLY,
      get: function () {
        return this.getDataValue("startDate");
      },
    },
    endDate: {
      type: DataTypes.DATEONLY,
      get: function () {
        return this.getDataValue("endDate");
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isVerifiedAtasan: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isVerifiedKadis: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isVerifiedKepegawaian: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    atasanVerificationDate: {
      type: DataTypes.DATEONLY,
    },
    kadisVerificationDate: {
      type: DataTypes.DATEONLY,
    },
    kepegawaianVerificationDate: {
      type: DataTypes.DATEONLY,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Users.hasMany(Cuti);
Cuti.belongsTo(Users, { foreignKey: "userId" });

export default Cuti;
