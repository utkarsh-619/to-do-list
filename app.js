const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const get_date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://utkarsh:Test123@cluster0.daqdblm.mongodb.net/todo",
  { useNewUrlParser: true }
);



// itemschema
const newItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const item = mongoose.model("item", newItemSchema);

const listSchema = new mongoose.Schema({
  root: {
    type: String,
    required: true,
  },
  items: [newItemSchema],
});
const list = mongoose.model("list", listSchema);

app.get("/", (req, res) => {
  item.find({}, function (err, data) {
    const day = get_date.getDate();
    res.render("index", { dayName: day, item: data, type: "" });
  });
});

let item1 = new item({
  name: "Hello , welcome to to-do-list ",
});

let item2 = new item({
  name: "Hit + for insert new item",
});

let defaultItems = [item1, item2];

app.get("/:list", function (req, res) {
  // console.log(req);
  const listRoot = req.params.list;
  
  if (listRoot != "favicon.ico"){
    list.findOne({ name: listRoot }, function (err, single_list) {
      if (!err) {
        if (single_list) {
          res.render("index", {
            dayName: listRoot,
            item: single_list.items,
            type: listRoot,
          });
        } else {
          const new_list = new list({
            root: listRoot,
            items: defaultItems,
          });
          new_list.save();
          res.redirect("/" + req.params.list);
        }
      }
    });
  }
});

app.post("/", function (req, res) {
  const new_item = new item({
    name: req.body.new_item,
  });
  new_item.save();
  res.redirect("/");
});

app.post("/delete", function (req, res) {
  let itemID = req.body._id;

  item.findByIdAndRemove(itemID, function (err) {
    if (err) console.log(err);
  });
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("app is now runing on PORT: 3000");
});
