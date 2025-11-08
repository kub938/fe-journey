const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(express.static("."));

// CORS settings
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  next();
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    message: "File upload success",
    filename: req.file.filename,
    originalname: req.file.originalname,
    size: req.file.size,
  });
});

// Multiple file upload
app.post("/upload-multiple", upload.array("files", 10), (req, res) => {
  const files = req.files.map((file) => ({
    filename: file.filename,
    originalname: file.originalname,
    size: file.size,
  }));

  res.json({
    message: "Files upload success",
    files: files,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
