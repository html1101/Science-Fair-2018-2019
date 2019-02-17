var fs = require("fs");
fs.readFile("./Formatted.csv", function (err, data) {
    if (err) throw err;
    var content = data.toString().split("\n");
    // Combine by states.
    var state = [],
        group = "";
    for (var i = 0; i < content.length; i++) {
        content[i] = content[i].split(",");
    }
    content = content.sort(function (a, b) {
        return a[0].localeCompare(b[0]);
    })
    while (content.length) {
        if (content[1]) {
            if (content[0][0] == content[1][0]) {
                group += content[0].slice(1, content[0].length) + "\n";
            }
            else {
                // Finished with this
                state.push([content[0][0], group]);
                group = "";
            }
        }
        else {
            // Last bit...
            state.push([content[0][0], group.slice(0, -1)]); // The last one will just be ""
            group = "";
        }
        content.splice(0, 1);
    }
    for (var i = 0; i < state.length; i++) {
        state[i][1] = state[i][1].split("\n");
        for (var ii = 0; ii < state[i][1].length; ii++) {
            state[i][1][ii] = state[i][1][ii].split(",");
        }
    }
    for (var i = 0; i < state.length; i++) {
        // state[i][1] is the data
        // state[i][1][1] is our date.
        state[i][1] = state[i][1].sort(function (a, b) {
            return new Date(a[1]) - new Date(b[1]);
        });
        state[i][1] = state[i][1].map(function (val) {
            val[0] = Number(val[0].split("Level ").join(""));
            return val;
        });
    }
    fs.writeFile("./NeuralDataParsed.txt", JSON.stringify(state, null, " "), function (err) {
        if (err) throw err;
        console.log("Wrote to file NeuralDataParsed.txt");
    });
    // console.log(state[0][1] == state[1][1]); // the test as to whether all this work was worth it...
    // Now we compare the dates, remove the dates, and push that all into a new function. Are you ready?
});