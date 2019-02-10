// This is going to try to formulate NeuralDataParsed.csv by what really matters: the state.
var https = require("https"),
    fs = require("fs");

fs.readFile("./Formatted.csv", "utf8", function (err, data) {
    if (err) throw err;
    // Our data will need to be turned into an Array.
    let content = data.split("\n");
    // Now that it's turned into an array, and we're going to preform BOW by our state.
    // Well, it's kind of BOW.
    for (var i = 0; i < content.length; i++) {
        content[i] = content[i].split(",");
    }
    // Now we have all the stuff split up.
    // Now what we need to do is merge them according to state.
    let copyContent = (content.slice()).sort(),
        ans = [],
        info = []; // A temporary place to store our data
    // Okay, now we're going to combine all these.
    while (copyContent.length) {
        if (copyContent[1]) {
            if (copyContent[0][0] !== copyContent[1][0]) {
                // We're done w/ 1st state, moving on to second.
                ans.push([copyContent[0][0], info]);
                info.length = 0;
            }
            else {
                info.push(copyContent[0].slice(1, copyContent[0].length));
            }
        }
        copyContent.splice(0, 1);
    }
    for (var i = 0; i < ans.length; i++) {
        ans[i][1] = ans[i][1].sort(function (a, b) {
            return new Date(a[1]) - new Date(b[1]);
        });
        for (var ii = 0; ii < ans[i][1].length; ii++) {
            ans[i][1][ii][0] = Number((ans[i][1][ii][0]).toString().split("Level ").join(""));
        }
    }
    fs.writeFile("./NeuralDataParsed.csv", JSON.stringify(ans, null, " "), function (err) {
        if (err) throw err;
    });
});