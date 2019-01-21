var fs = require("fs");
var date = require('date-and-time');
let now = new Date();
fs.readFile("./Formatted.csv", "utf8", function(err, data) {
    if(err) throw err;
    var formatted = data.toString().split("\n");
    for(var i = 0; i < formatted.length; i++) {
        formatted[i] = formatted[i].split(",");
    }
    console.log(formatted);
});