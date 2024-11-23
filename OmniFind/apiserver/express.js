var store = require("nedb");
var fs = require("fs");

var expenses = new store({ filename: "express.db", autoload: true });

expenses.find({}, function (err, docs) {
  if (docs.length == 0) {
    loadExpenses();
  }
});

function loadExpenses() {
  readCsv("data.csv", function (data) {
    data.forEach(function (rec, idx) {
      var item = {};
      item.name = rec[0];
      item.amount = parseFloat(rec[1]);
      item.spendDate = new Date(rec[2]);
      item.catagory = rec[3];

      expenses.insert(item, function (err, doc) {
        console.log("Inserted", doc.item_name, "with id", doc._id);
      });
    });
  });
}

function readCsv(file, callback) {
  fs.readFile(file, "utf-8", function (err, data) {
    if (err) throw err;
    var lines = data.split("\n");
    var result = lines.map(function (line) {
      return line.split(",");
    });
    callback(result);
    console.log(result);
  });
}
module.exports = expenses;
