// type Sigma = any
var True = function (x) { return function (y) { return x; }; };
var False = function (x) { return function (y) { return y; }; };
// console.log(True(True(False)(True))(False))
var OR = function (b1) { return function (b2) { return b1(True)(b2); }; };
var AND = function (b1) { return function (b2) { return b1(b2)(False); }; };
// console.log(OR(False)(True))
console.log(AND(True)(OR(True)(False)));
