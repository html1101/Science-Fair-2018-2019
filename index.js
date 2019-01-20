var fs = require("fs");
var date = require('date-and-time');
let now = new Date();
console.log(date.format(now, 'YYYY/MM/DD HH:mm:ss'));    // => '2015/01/02 23:14:05'
date.format(now, 'ddd MMM DD YYYY');        // => 'Fri Jan 02 2015'