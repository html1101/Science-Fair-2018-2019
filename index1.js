var getPixels = require("get-pixels"),
http = require("http"),
fs = require("fs"),
data = [];
class INFO {
    constructor(pop) {
        this.pop = pop;
    }
}
// Okay. We're going to start by finding the data.
getPixels("./pop.png", function(err, pixels) {
    if(err) throw err;
    var realPixels = pixels.data;
    // We push the pixels out to our data and transform it into something better.
    for(var i = 0; i < realPixels.length; i += 4) {
        if([realPixels[i], realPixels[i + 1], realPixels[i + 2]].join("") == "00255") {
            data.push(new INFO(0));
        }
        else {
            var dat = realPixels[i] + realPixels[i + 1] + realPixels[i + 2];
            data.push(new INFO(dat > 255 ? 255 : dat));
        }
    }
    // JSON.stringify(data, null, 4)
    http.createServer(function(req, res) {
        if(req.url == "/") {
            fs.readFile("./index1.html", "utf8", function(err, data) {
                if(err) throw err;
                res.write(data);
                res.end();
            });
        }
        else if(req.url == "/data") {
            res.write(JSON.stringify(data, null));
            res.end();
        }
    }).listen(3030, "localhost");
});