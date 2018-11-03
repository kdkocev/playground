const bool = require("./booleans.js");
const combinators = require("./combinators.js");

const Zero = f => x => x;
const One = f => x => f(x);
const Two = f => x => f(f(x));
const Three = f => x => f(f(f(x)));
const Four = f => x => f(f(f(f(x))));

const succ = n => f => x => f(n(f)(x));

const isZero = n => n(() => bool.False)(bool.True);

const plus = n1 => n2 => f => x => n1(f)(n2(f)(x));

// console.log(isZero(plus(Zero)(Zero))(true)(false));

// Tuple
const pair = a => b => c => c(a)(b);
const first = p => p(x => y => x);
const second = p => p(x => y => y);

// console.log(second(pair(1)(2)));

const zeroCase = pair(Zero)(Zero);
const mainCase = p => pair(second(p))(succ(second(p)));

const pred = n =>
  first(
    n(mainCase)(zeroCase) // return x => y => {}
  );
const minus = n => m => m(pred)(n);

// console.log(isZero(minus(Two)(One))(true)(false));

// const churchToInt = num => {
//   const f = x => {
//     if (typeof x === "function") {
//       return 2;
//     }
//     return x + 1;
//   };
//   return num(f)(0);
// };

const churchToInt = num => num(x => x + 1)(0);

// console.log(churchToInt(minus(Three)(plus(Three)(Three))));
// console.log(a(fi)(0));

// console.log(isZero(minus(Two)(minus(Three)(One)))(true)(false));
// console.log(churchToInt(One));

// const mult = n1 => n2 => n2(plus(n1))(Zero);
const mult = n1 => n2 => f => n1(n2(f));

// console.log(churchToInt(mult(Three)(Three)));

const numEqual = n1 => n2 =>
  bool.AND(isZero(minus(n1)(n2)))(isZero(minus(n2)(n1)));

// console.log(churchToInt(Two(pred)(Two)));

const numGt = n1 => n2 =>
  bool.AND(bool.NOT(isZero(minus(n1)(n2))))(isZero(minus(n2)(n1)));

// console.log(numGt(One)(One)(true)(false));

const numLt = n1 => n2 =>
  bool.AND(isZero(minus(n1)(n2)))(bool.NOT(isZero(minus(n2)(n1))));

// console.log(numLt(Two)(One)(true)(false));

const numGte = n1 => n2 => bool.OR(numGt(n1)(n2))(numEqual(n1)(n2));

// console.log(numGte(Two)(Zero)(true)(false));

const numLte = n1 => n2 => bool.OR(numLt(n1)(n2))(numEqual(n1)(n2));

// console.log(numLte(Zero)(Zero)(true)(false));

/*
  a / b =
  if a >= b do
    1 + (a - b) / b
  else
    0
  end
*/
const divide = n1 => n2 =>
  combinators.Y(divide1 => current =>
    numGte(current)(n2)
      (() => succ( divide1(minus(current)(n2)) ) )
      (() => Zero)(Zero)
  )(n1);

// console.log(churchToInt(divide(succ(succ(Four)))(Two)));

const reminder = n1 => n2 => {}; //TODO

const mod = n1 => n2 => {}; //TODO

// const churchToIntTEST = num => {
//   const f = x => {
//     if (typeof x === "function") {
//       return x(0);
//     }
//     return x + 1;
//   };
//   return num(f)(0);
// };

// console.log(churchToIntTEST(Four(Four)));

const power = n1 => n2 => f => n2(n1)(f);

// console.log(churchToInt(power(Four)(Three)));

module.exports = {
  Zero,
  One,
  Two,
  Three,
  Four,
  succ,
  pred,
  plus,
  minus,
  mult,
  churchToInt,
  numEqual,
  numGt,
  numLt,
  numGte,
  numLte,
  divide
};
