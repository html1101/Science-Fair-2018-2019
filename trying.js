var fs = require('fs');
fs.readFile("./trying.json", "utf8", function (err, dataa) {
    if (err) throw err;
    // Only look at the first two dates for now; we'll try to establish weights after that.
    // We need to turn this into an array.
    Object.prototype.turnArray = function () {
        var ans = [];
        for (var i = 0; i < Object.getOwnPropertyNames(this).length; i++) {
            ans.push(this[Object.getOwnPropertyNames(this)[i]]);
        }
        return ans;
    };
    var data = JSON.parse(dataa).turnArray(),
        weights = {},
        someData = {},
        fs = require("fs");
    // Now what we can do is set up all the weights. Gulp.
    for (var i = 0; i < data.length - 1; i++) {
        var sliceData = data[i + 1].slice();
        var copyData = data.slice();
        var x = data[i];
        var y = data[i + 1];
        console.log(data[i].length);
        for (var z = 0; z < data[i].length; z++) {
            var copyDataPoint = copyData[i].splice(z, 1);
            // I'm gonna cheat a little here.
            var num = 0;
            for (var zz = 0; zz <= 52; zz++) {
                if (!weights[num]) {
                    num = i;
                    break;
                }
            }
            weights[data[i][z].state + " : " + num] = {};
            for (var ii = 0; ii < copyData[i].length; ii++) {
                // Now we have the future!
                // For each state, we have a weight.
                // That rhymed.
                // Now we need to find the weights for all the other stuff...
                weights[data[i][z].state + " : " + num][copyData[i][ii].state] = copyData[i][ii].severity;
            }
        }
    }
    // Okay, now it's [severity, weight].
    // Alright. Now we are beginning.
    /*
     We need to find how the weights influence our state.
     How would we do this for any old input/output?
     We have 50 weights. Let's just say for time's sake we have two.
     From there we have xs, our input severity, our weights, which influence it somehow, and our ys, our output.
     From there we can make a super uber simple linear function.
     So here's our function.
     For now we only have one input, but we can get others like population if necessary.
    */
    // We want to start with our first point.
    var listStates = Object.getOwnPropertyNames(weights);
    // We kinda need to do a BOW(Bag of Words) thing here.
    var fullData = [];
    listStates = listStates.sort();
    for (var i = 0; i < listStates.length; i++) {
        var aa = listStates[i].split(" : ");
        listStates[i] = [aa[0], weights[listStates[i]]];
    }
    console.log(listStates);
    fs.writeFile("./NeuralDataParsed.json", JSON.stringify(weights, null, "  "), function (err) {
        if (err) throw err;
    });
});