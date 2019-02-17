// input: NeuralDataParsed.txt
// output: data.txt
// How:
/*
 1) For each date, find the corresponding state's info.
 2) Now we have to find the difference between the arrays.
*/
var fs = require("fs");
Array.prototype.diff = function (a) {
    return this.filter(function (i) { return a.indexOf(i) < 0; });
};
fs.readFile("./NeuralDataParsed.txt", function (err, data) {
    if (err) throw err;
    var content = JSON.parse(data),
        stuff = [];
    for (var i = 0; i < content.length / 10; i++) {
        for (var ii = 0; ii < content[i][1].length; ii++) {
            var stuff1 = [];
            for (var z = 0; z < content.length; z++) {
                for (var zz = 0; zz < content[z][1].length; zz++) {
                    if (content[z][1][zz][1] == content[i][1][ii][1]) {
                        stuff1.push([content[z][0], content[z][1][zz][0]]);
                    }
                }
            }
            stuff.push([content[i][0], content[i][1][ii][0], content[i][1][ii][1], stuff1]);
        }
        console.log(((i / (content.length / 10)) * 100) + "%");
    }
    // Okay... This was unfortunately what I feared.
    // Okay, array, we need to do some Botox on you.
    for (var i = 0; i < stuff.length; i++) {
        for (var ii = 0; ii < stuff.length; ii++) {
            if (stuff[i][0] == stuff[ii][0]) {
                // Same state... Now we need to compare their arrays.
                // 1) Compare arrays using diff function.
                // 2) Do for loop and remove the extra using a filter.
                var amountStuffI = [];
                for (var z = 0; z < stuff[i][3].length; z++) {
                    amountStuffI.push(stuff[i][3][z][0]);
                }
                var amountStuffII = [];
                for (var z = 0; z < stuff[ii][3].length; z++) {
                    amountStuffII.push(stuff[ii][3][z][0]);
                }
                var diffI = amountStuffI.diff(amountStuffII); // Tells us what amountStuffII doesn't have
                var diffII = amountStuffII.diff(amountStuffI); // Tells us what amountStuffI doesn't have
                console.log(amountStuffI, amountStuffII);
                console.log(diffII);
                for (var z = 0; z < amountStuffI.length; z++) {
                    for (var zz = 0; zz < diffI.length; zz++) {
                        if (amountStuffI[z] == diffI[zz]) {
                            amountStuffI.splice(z, 1);
                            stuff[i][3].splice(z, 1);
                        }
                    }
                }
                for (var z = 0; z < amountStuffII.length; z++) {
                    for (var zz = 0; zz < diffII.length; zz++) {
                        if (amountStuffII[z] == diffII[zz]) {
                            console.log(diffII[zz] + " removed");
                            amountStuffII.splice(z, 1);
                            stuff[ii][3].splice(z, 1);
                        }
                    }
                }
                var amountStuffI = [];
                for (var z = 0; z < stuff[i][3].length; z++) {
                    amountStuffI.push(stuff[i][3][z][0]);
                }
                var amountStuffII = [];
                for (var z = 0; z < stuff[ii][3].length; z++) {
                    amountStuffII.push(stuff[ii][3][z][0]);
                }
                var diffI = amountStuffI.diff(amountStuffII); // Tells us what amountStuffII doesn't have
                var diffII = amountStuffII.diff(amountStuffI); // Tells us what amountStuffI doesn't have
                //console.log(stuff[i][3], stuff[ii][3], diffI, diffII);
            }
        }
    }
});