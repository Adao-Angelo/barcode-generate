const express = require("express");
const { Canvas } = require("canvas");
const jsBarcode = require("jsbarcode");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (request, resposne) => {
  resposne.render("index", { data: "" });
});
app.post("/", (req, res) => {
  const canvas = new Canvas();
  jsBarcode(canvas, req.body.qrcodee, {
    lineColor: "#000",
    width: 4,
    height: 40,
    displayValue: false,
  });
  canvas.toDataURL("image/png", (err, png) => {
    res.render("index", { data: png });
  });
});
const port = process.env.PORT || 2000;
app.listen(port, console.log("server run at port", port));
