var fs = require("fs");
fs.readFile("./pop.csv", function(err, res) {
    if(err) throw err;
    var format = res.toString().split("\n");
    for(var i = 0; i < format.length; i++) {
        //console.log(format[i]);
        //format[i] = format[i].split(",");
        // STATENAME,URL,WEBSITE,ACTIVITY LEVEL,ACTIVITY LEVEL LABEL,WEEKEND,WEEK,SEASON
        // YES       NO  NO      YES            NO                   YES     NO   NO
        // REGION,DIVISION,STATE,NAME,SEX,AGE,ESTIMATESBASE2000,POPESTIMATE2000,POPESTIMATE2001,POPESTIMATE2002,POPESTIMATE2003,POPESTIMATE2004,POPESTIMATE2005,POPESTIMATE2006,POPESTIMATE2007,POPESTIMATE2008,POPESTIMATE2009,CENSUS2010POP,POPESTIMATE2010
        // NO     NO       NO    YES  YES YES NO                YES             YES             YES             YES             YES             YES             YES             YES             YES             YES             NO            YES
        var thingsToRemove = [0, 1, 2, 6, 17],
        ii = 0;
        // console.log(typeof format[i] == "object");
        //console.log(i !== 0);
        // format[i].split(format[i].split(`"`).splice(1, 1)).join("").split(",")
        format[i] = (format[i].split(",").length == 8) ? format[i].split(",") : format[i].split(format[i].split(`"`).splice(1, 1)).join("").split(",");
        format[i] = format[i].filter(function(val, pos) {
            var condition = (thingsToRemove[ii] !== pos);
            if(!condition) {
                ii++;
                return false;
            }
            else {
                return true;
            }
        });
    }
    format = format.filter(function(val, pos) {
        return (val[1] == 0 && val[2] == 999);
    });
    for(var i = 0; i < format.length; i++) {
        //format[i] = format[i].split(",");
        // STATENAME,URL,WEBSITE,ACTIVITY LEVEL,ACTIVITY LEVEL LABEL,WEEKEND,WEEK,SEASON
        // YES       NO  NO      YES            NO                   YES     NO   NO
        // REGION,DIVISION,STATE,NAME,SEX,AGE,ESTIMATESBASE2000,POPESTIMATE2000,POPESTIMATE2001,POPESTIMATE2002,POPESTIMATE2003,POPESTIMATE2004,POPESTIMATE2005,POPESTIMATE2006,POPESTIMATE2007,POPESTIMATE2008,POPESTIMATE2009,CENSUS2010POP,POPESTIMATE2010
        // NO     NO       NO    YES  YES YES NO                YES             YES             YES             YES             YES             YES             YES             YES             YES             YES             NO            YES
        var thingsToRemove = [1, 2],
        ii = 0;
        // console.log(typeof format[i] == "object");
        //console.log(i !== 0);
        // format[i].split(format[i].split(`"`).splice(1, 1)).join("").split(",")
        // format[i] = (format[i].split(",").length == 8) ? format[i].split(",") : format[i].split(format[i].split(`"`).splice(1, 1)).join("").split(",");
        format[i] = format[i].filter(function(val, pos) {
            var condition = (thingsToRemove[ii] !== pos);
            if(!condition) {
                ii++;
                return false;
            }
            else {
                return true;
            }
        });
    }
    fs.writeFile("f2000-2010.csv", format.join("\n"), function(err) {
        if(err) throw err;
    });
});