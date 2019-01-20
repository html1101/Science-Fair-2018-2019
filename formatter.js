var fs = require("fs");
fs.readFile("./data.csv", function(err, res) {
    if(err) throw err;
    var format = res.toString().split("\n");
    for(var i = 0; i < format.length; i++) {
        //console.log(format[i]);
        //format[i] = format[i].split(",");
        // STATENAME,URL,WEBSITE,ACTIVITY LEVEL,ACTIVITY LEVEL LABEL,WEEKEND,WEEK,SEASON
        // YES       NO  NO      YES            NO                   YES     NO   NO
        var thingsToRemove = [1, 2, 4, 6, 7],
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
    fs.writeFile("Formatted.csv", format.join("\n"), function(err) {
        if(err) throw err;
    });
});