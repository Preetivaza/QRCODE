const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const port = process.env.PORT || 3000;
const qrcode = require("qrcode");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(express.static('public'))


app.get("/", (req, res) => {
  res.render("index");
});

app.post("/scan", (req, res, next) => {
  const input_text = req.body.text;
  console.log(input_text);
  qrcode.toDataURL(input_text, (err, src) => {
    res.render("scan",{
      qr_code: src,
   
    });
  });
});
app.listen(port, console.log(`listening on ${port}`));
