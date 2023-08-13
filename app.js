const express = require("express");
const app = express();
const port = 5500;
const api = require("./route/api");
const dotenv = require("dotenv");
const connectdb = require("./db/dbcon");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

dotenv.config({ path: ".env" });
connectdb();
//route load
app.use("/api", api); //localhost:3000/api

app.listen(port, () => {
  console.log(`local server start on port ${port}`);
});
