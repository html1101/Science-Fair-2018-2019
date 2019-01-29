var fs = require("fs");
class DateState {
    constructor(date) {
        this.date = date;
        this.states = {};
    }
    add(name, val) {
        this.states[name] = val;
    }
}
class Need {
    constructor(state) {
        // Where we contain all our file's info
        // Where we say the state and the population
        this.state = state;
        this.dates = {};
    }
    add(name, val) {
        this.dates[name] = val;
    }
}
fs.readFile("./Formatted.csv", "utf8", function (err, data) {
    if (err) throw err;
    var formatted = data.toString().split("\n");
    for (var i = 0; i < formatted.length; i++) {
        var val = formatted[i].split(",");
        formatted[i] = [val[0], Number(val[1].split("Level ")[1]), new Date(val[2])];
    }
    formatted = formatted.sort(function (a, b) {
        return a[2] - b[2];
    });
    /* Now we've sorted it, so then what we need to do is create the weights. */
    var dates = [];
    for (var i = 0; i < formatted.length - 1; i++) {
        if (formatted[i][2].getTime() == formatted[i + 1][2].getTime() && i !== 0) {
            // Add to previous dates
            dates[dates.length - 1].add(formatted[i][0], formatted[i][1]);
        }
        else {
            dates.push(new DateState(formatted[i][2]));
            dates[dates.length - 1].add(formatted[i][0], formatted[i][1]);
        }
    }
    fs.readFile("./f2000-2010.csv", "utf8", function (err, data) {
        if (err) throw err;
        var da = data.split("\n");
        for (var i = 0; i < da.length; i++) {
            da[i] = da[i].split(",");
        }
        for (var i = 0; i < da.length; i++) {
            // da[i] = new Need(da[i][0]);
            var val = da[i].slice(1, da[i].length);
            da[i] = new Need(da[i][0]);
            for (var ii = 0; ii < val.length; ii++) {
                da[i].add(2000 + ii, Number(val[ii]));
            }
            //da[i].slice(1, da[i].length-1)
        }
        fs.readFile("./f2010-2016.csv", "utf8", function (err, data) {
            if (err) throw err;
            var dat = data.split("\n");
            for (var i = 0; i < dat.length; i++) {
                dat[i] = dat[i].split(",");
            }
            for (var i = 0; i < da.length; i++) {
                // da[i] = new Need(da[i][0]);
                var val = dat[i].slice(1, dat[i].length);
                dat[i] = new Need(dat[i][0]);
                for (var ii = 0; ii < val.length; ii++) {
                    dat[i].add(2010 + ii, Number(val[ii]));
                }
                //da[i].slice(1, da[i].length-1)
            }
            for (var i = 0; i < dat.length; i++) {
                // Combine the two
                dat[i].dates = { ...da[i].dates, ...dat[i].dates };
            }
            // 4512
            /* Dates returns the date, state [severity]
            dat returns State, and pop. by date
            */
            class newStuff {
                constructor() {
                    // This object gives us a place to sort everything.
                    // We'll get the population at a certain point w/ the population.
                }
                add(state) {
                    this[state] = {};
                }
                addState(state, severity, population, dateA) {
                    //console.log(population);
                    this[state].date = [dateA, severity, population];
                    // console.log(this[state].date, state);
                }
            }
            var newData = new newStuff(),
                getIt = JSON.parse(JSON.stringify(newData));
            for (var i = 0; i < dates.length; i++) {
                //console.log(dates[i].states);
                for (var ii = 0; ii < dat.length; ii++) {
                    // So we're going through both.
                    // Dat gives us a state and the populations in a particular year.
                    //console.log(dat[ii].state);
                    // Then dates gives us a date and the severity of the flu in those states.
                    //console.log(dates[i].states[dat[ii].state]);
                    newData.add(dat[ii].state);
                    getIt[dat[ii].state] = [];
                    if (dates[i].states[dat[ii].state] !== undefined && dat[ii].dates[dates[i].date.getFullYear().toString()] !== undefined) {
                        // This returns the severity of the illness in dat[ii].state. Now we want to find
                        // The date, so we can return the population. We can find the dates from dat[ii].date.
                        //newData[dat[ii].state] = [dat[ii].state, dates[i].states[dat[ii].state], dat[ii].dates[dates[i].date.getFullYear().toString()], dates[i].date.getFullYear().toString()];
                        getIt[dat[ii].state].push("hey");
                        //console.log(newData);
                        //console.log(dat[ii].state, dat[ii].dates[dates[i].date.getFullYear().toString()]);
                        //console.log(dat[ii].dates[dates[i].date.getFullYear().toString()]);
                    }
                    //console.log( == undefined ? [Object.keys(dates[i].states).length, dates[i].states, dat[ii]] : "Good");
                }
                if (i == dates.length - 1) {
                    console.log(getIt);
                }
            }
            //console.log(newData);
        });
    });
});