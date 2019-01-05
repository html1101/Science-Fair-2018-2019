var list = [];
class Section {
    constructor(pop) {
        this.pop = pop;
    }
}
//console.log(arr);
var getPixels = require("get-pixels"),
    http = require("http"),
    fs = require("fs");

getPixels("./pop.png", function (err, pixels) {
    if (err) {
        console.log("Bad image path")
        return;
    }
    var dataa = pixels.data,
        arr = [],
        ARRR = [];
    console.log("Listening on localhost:3030");
    http.createServer(function(req, res) {
        if(req.method == "GET" && req.url == "/") {
            fs.readFile("./index.html", "utf8", function(err, data) {
                if(err) throw err;
                res.write(data);
                res.end();
            });
        }
        else if(req.method == "GET" && req.url == "/data") {
            res.write(dataa.toString());
            res.end();
        }
        else if(req.method == "GET" && req.url == "/favicon.ico") {
            fs.readFile("." + req.url, function(err, data) {
                if(err) throw err;
                res.write(data);
                res.end();
            });
        }
    }).listen(3030, "localhost");
});