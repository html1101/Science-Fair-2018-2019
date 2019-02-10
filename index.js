var https = require("https");
// This creates trying.json, which formulates a response like this:
// 	"Sat Jan 02 2010 00:00:00 GMT-0600 (CST)": [
// {
// 	"severity": 7,
// 	"date": "2010-01-02T06:00:00.000Z",
// 	"state": "Alabama",
// 	"pop": "4779736"
// }
// }
async function f(yr) {
    let getIt = new Promise((resolve, reject) => {
        https.get('https://api.census.gov/data/2017/pep/population?get=DATE_DESC,GEONAME,POP&for=state:*&DATE=' + yr + '&key=3317925effc6d189c00c4658b130560990241f30', (resp) => {
            // Returns [ 2010-04-01T06:00:00.000Z, 'South Dakota', '814180']
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                // 1) Convert date to Date.
                var newDates = JSON.parse(data).slice();
                for (var i = 0; i < newDates.length; i++) {
                    newDates[i][0] = new Date(newDates[i][0].split(" Census population").join(""));
                    newDates[i].splice(3, 2);
                }
                newDates = newDates.slice(1, newDates.length);
                resolve(newDates.map(function (val, ind) {
                    return [new Date(val[0]).getFullYear()].concat(val.slice(1, val.length));
                }));
            });

        }).on("error", (err) => {
            resolve("Error: " + err.message);
        });
    });
    let myAns = await getIt;
    return myAns;
}
// Now we have the population...
// New let's parse the formatted severity data.
Array.prototype.turnToClassB = function () {
    class NewClass {
        add(val, exVal) {
            this[val] = exVal;
        }
    }
    var ans = new NewClass();
    for (var i = 0; i < this.length; i++) {
        ans.add(this[i][0], this[i].slice(1, this[i].length));
    }
    return ans;
}
var fs = require("fs");
fs.readFile("./Formatted.csv", "utf8", function (err, data) {
    if (err) throw err;
    var newData = data.split("\n");
    for (var i = 0; i < newData.length; i++) {
        newData[i] = newData[i].split(",");
    }
    //console.log(newData.turnToClassA(2)); // Identify by date.
    class myPop {
        add(yr, state, severity) {
            var num = 1;
            while (this[yr.getFullYear() + " for " + state + num]) {
                num++;
            }
            this[yr.getFullYear() + " for " + state + num] = {
                severity: severity,
                date: yr,
                state: state
            };
        }
        addPop(name, pop) {
            this[name]["pop"] = pop;
        }
        findMe(name) {
            return this[name];
        }
    }
    var ii = 1,
        realYr = 0;
    f(ii)
        .then(function (val) {
            var myPopA = new myPop();
            for (var i = 0; i < newData.length; i++) {
                // Turn date into a, well, Date.
                var valit = new Date(newData[i][2]);
                newData[i].splice(2, 1);
                newData[i].splice(0, 0, valit);
            }
            for (var i = 0; i < newData.length; i++) {
                myPopA.add(...newData[i]);
            }
            //console.log(myPopA["2018 for New York City1"]);
            // Okay. Finally.
            var myAnswer = [];
            for (var i = 0; i < val.length; i++) {
                // Now we set them... Hopefully this will work.
                // We're setting this value for ALL of the values.
                var num = 1;
                //console.log(myPopA[val[i][0] + " for " + val[i][1]]);
                //while(!myPopA[val[i][]])
                if (myPopA.findMe(val[i][0] + " for " + val[i][1] + num) !== undefined) {
                    while (myPopA[val[i][0] + " for " + val[i][1] + num]) {
                        myPopA[val[i][0] + " for " + val[i][1] + num].pop = val[i][2];
                        realYr = val[i][0];
                        //console.log(myPopA[val[i][0] + " for " + val[i][1] + num]);
                        myAnswer.push(myPopA[val[i][0] + " for " + val[i][1] + num]);
                        num++;
                    }
                }
            }
            for (var i = 0; i < myAnswer.length; i++) {
                myAnswer[i].severity = Number(myAnswer[i].severity.split("Level ").join(""));
            }
            // Okay. Now we have the severity, the state, and the date.
            // YES!
            // Let's start by creating our weights.
            var weightsSeverity = [];
            // Okay. Now we need to push in all our weights.
            // So we have 50 states, meaning there will be 50 * 50 weights.
            var orderByDate = {};
            for (var i = 0; i < myAnswer.length; i++) {
                var copyMyAns = myAnswer.slice();
                copyMyAns.splice(i, 1);
                orderByDate[myAnswer[i].date] = [];
                for (var ii = 0; ii < copyMyAns.length; ii++) {
                    if (myAnswer[i].date.toString() == copyMyAns[ii].date.toString()) {
                        orderByDate[myAnswer[i].date].push(copyMyAns[ii]);
                    }
                }
            }
            /*
            Okay, so. We have some people, x. We then have the severity, y.
            Let's say y = Level 1.
            For now we won't use the pop, but maybe in the future we will.
            */
            // Okay, we're going to do a simple neural network now. One that will hopefully work.
            fs.writeFile("./trying.json", JSON.stringify(orderByDate, null, "\t"), function (e) {
                if (e) throw e;
            });
        });
});