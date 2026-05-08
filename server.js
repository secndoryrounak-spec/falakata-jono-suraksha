<<<<<<< HEAD
const XLSX = require("xlsx");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));


// 🟢 DB CONNECTION
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "735211",
  database: "falakata_db"
});


// 🟢 FILE UPLOAD SETUP
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


// ✅ LOGIN API
app.post("/user-login", (req, res) => {

  const { member_code, email, phone, password } = req.body;

  console.log("LOGIN DATA:", req.body);

  const sql = "SELECT * FROM users";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.send("ERROR");
    }

    console.log("DATABASE USERS:", result);

    const user = result.find(u =>
      u.member_code == member_code &&
      u.email == email &&
      u.phone == phone &&
      u.password == password
    );

    if (user) {

      console.log("✅ LOGIN SUCCESS");

      res.send("SUCCESS");

    } else {

      console.log("❌ INVALID LOGIN");

      res.send("INVALID");
    }

  });

});


// 🔥 ADD CASE API
app.post("/add-case", upload.single("file"), (req, res) => {

  const {
    case_name,
    case_date,
    case_type,
    lead_name,
    location,
    datetime
  } = req.body;

  const file = req.file ? req.file.filename : null;


  // 🔥 PROFESSIONAL EXCEL SAVE

  const excelData = [
    {
      "Case Name": case_name,
      "Case Date": case_date,
      "Case Type": case_type,
      "Lead Member": lead_name,
      "Location": location,
      "Date Time": datetime,
      "Uploaded File": file    
    }  
  ];

  const excelPath = "cases.xlsx";

  let workbook;
  let worksheet;

  if (fs.existsSync(excelPath)) {

    workbook = XLSX.readFile(excelPath);

    worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const oldData = XLSX.utils.sheet_to_json(worksheet);

    oldData.push(...excelData);

    const newWorksheet = XLSX.utils.json_to_sheet(oldData);

    workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;

  } else {

    workbook = XLSX.utils.book_new();

    worksheet = XLSX.utils.json_to_sheet(excelData);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Cases");
  }

  XLSX.writeFile(workbook, excelPath);


  // 🟢 MYSQL SAVE

  const sql = `
    INSERT INTO cases
    (case_name, case_date, case_type, lead_name, file, location, datetime)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [case_name, case_date, case_type, lead_name, file, location, datetime],
    (err) => {

      if (err) {
        console.log(err);
        return res.send("ERROR");
      }

      res.send("SUCCESS");
    }
  );

});


// 🏠 HOME PAGE
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


// 🚀 SERVER START
db.connect((err) => {

  if (err) {

    console.log("❌ DB Connection Failed:", err.message);

  } else {

    console.log("✅ DB Connected");

    app.listen(3000, () => {
      console.log("🚀 Server running on http://localhost:3000");
    });

  }

});
=======
require("dotenv").config();

const XLSX = require("xlsx");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));


// 🟢 DB CONNECTION
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});


// 🟢 FILE UPLOAD SETUP
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


// ✅ LOGIN API
app.post("/user-login", (req, res) => {

  const { member_code, email, phone, password } = req.body;

  console.log("LOGIN DATA:", req.body);

  const sql = "SELECT * FROM users";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.send("ERROR");
    }

    const user = result.find(u =>
      u.member_code == member_code &&
      u.email == email &&
      u.phone == phone &&
      u.password == password
    );

    if (user) {

      console.log("✅ LOGIN SUCCESS");

      res.send("SUCCESS");

    } else {

      console.log("❌ INVALID LOGIN");

      res.send("INVALID");
    }

  });

});


// 🔥 ADD CASE API
app.post("/add-case", upload.single("file"), (req, res) => {

  const {
    case_name,
    case_date,
    case_type,
    lead_name,
    location,
    datetime
  } = req.body;

  const file = req.file ? req.file.filename : null;


  // 🔥 EXCEL SAVE

  const excelData = [
    {
      "Case Name": case_name,
      "Case Date": case_date,
      "Case Type": case_type,
      "Lead Member": lead_name,
      "Location": location,
      "Date Time": datetime,
      "Uploaded File": file
    }
  ];

  const excelPath = "cases.xlsx";

  let workbook;
  let worksheet;

  if (fs.existsSync(excelPath)) {

    workbook = XLSX.readFile(excelPath);

    worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const oldData = XLSX.utils.sheet_to_json(worksheet);

    oldData.push(...excelData);

    const newWorksheet = XLSX.utils.json_to_sheet(oldData);

    workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;

  } else {

    workbook = XLSX.utils.book_new();

    worksheet = XLSX.utils.json_to_sheet(excelData);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Cases");
  }

  XLSX.writeFile(workbook, excelPath);


  // 🟢 MYSQL SAVE

  const sql = `
    INSERT INTO cases
    (case_name, case_date, case_type, lead_name, file, location, datetime)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [case_name, case_date, case_type, lead_name, file, location, datetime],
    (err) => {

      if (err) {
        console.log(err);
        return res.send("ERROR");
      }

      res.send("SUCCESS");
    }
  );

});


// 🏠 HOME PAGE
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


// 🚀 SERVER START
db.connect((err) => {

  if (err) {

    console.log("❌ DB Connection Failed:", err.message);

  } else {

    console.log("✅ DB Connected");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log("🚀 Server running");
    });

  }

});
>>>>>>> 1b232538aa8066ea8b568ed77578ab162826a7e2
