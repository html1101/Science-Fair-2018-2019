var arr = [],
wid = 800,
hei = 600;
class Section {
    constructor(pop) {
        this.pop = pop;
    }
}
for(var i = 0; i < wid; i++) {
    var l = [];
    for(var ii = 0; ii < hei; ii++) {
        l.push(new Section(ii * i));
    }
    arr.push(l);
}
console.log(arr);