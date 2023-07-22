import { Sequelize } from "sequelize";

// Sequelize(Nama_Database, User, password, option)
const db = new Sequelize("cuti_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// var query =
// `ALTER TABLE cuti
// ADD COLUMN atasanVerificationDate DATE AFTER isVerifiedKepegawaian,
// ADD COLUMN kadisVerificationDate DATE AFTER atasanVerificationDate,
// ADD COLUMN kepegawaianVerificationDate DATE AFTER kadisVerificationDate`;

// db.query(query, function (err, result) {
//   if (err) {
//     console.log("Error:" + err.message);
//   } else {
//     console.log("new column added");
//   }
// });

export default db;
