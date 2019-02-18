// ****IMPORTANT FILE!!!! READS INFO.CSV AND PUSHES OUT DATA.TXT!!!****
var fs = require("fs"),
    csv = require("csvtojson");
var listOfStates = [
    'Virgin Islands',
    'Puerto Rico',
    'Utah',
    'Texas',
    'Colorado',
    'Louisiana',
    'Kentucky',
    'Kansas',
    'Iowa',
    'Indiana',
    'Illinois',
    'Idaho',
    'Hawaii',
    'Georgia',
    'Florida',
    'California',
    'Arkansas',
    'Arizona',
    'Alaska',
    'Alabama',
    'Delaware',
    'Connecticut',
    'Tennessee',
    'South Dakota',
    'South Carolina',
    'District of Columbia',
    'Pennsylvania',
    'Oregon',
    'Oklahoma',
    'Ohio',
    'North Dakota',
    'North Carolina',
    'New York',
    'New Mexico',
    'New Jersey',
    'New Hampshire',
    'Nevada',
    'Nebraska',
    'Montana',
    'Missouri',
    'Mississippi',
    'Minnesota',
    'Michigan',
    'Massachusetts',
    'Maryland',
    'Maine',
    'Wyoming',
    'Wisconsin',
    'West Virginia',
    'Washington',
    'Virginia',
    'Vermont',
    'Rhode Island',
    'District of Columbia'
]
csv()
    .fromFile("./info.csv")
    .then((data) => {
        var answer = [];
        for (var i = 0; i < data.length; i++) {
            // 1) We need to look at each state, and the date.
            // field1 is our date.
            // Then we push in all the values in there.
            var weights = [],
                values = Object.getOwnPropertyNames(data[i]);
            for (var ii = 1; ii < values.length; ii++) {
                // data[values[ii]] gives severity.
                weights.push(Number(data[i][values[ii]]));
            }
            //console.log(weights + "\n");
            // Now for each state in here we need to push [state, date, severity, [weights]].
            for (var ii = 1; ii < values.length; ii++) {
                answer.push([values[ii], data[i][values[0]], weights[ii - 1], weights]);
            }
        }
        //console.log(JSON.stringify(answer, null, "  "));
        // We did it! Now order this by date.
        answer = answer.sort(function (a, b) {
            if (a[0].localeCompare(b[0]) !== 0) {
                return a[0].localeCompare(b[0]);
            }
            else {
                return new Date(a[1]) - new Date(b[1]);
            }
        });
        // console.log(JSON.stringify(answer, null, "  "));
        fs.writeFile("./data.txt", JSON.stringify(answer, null, "  "), function (err) {
            if (err) return err;
            console.log("Finished formatting; see data.txt for file");
        });
    });