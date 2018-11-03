const bool = require("./booleans.js");
const num = require("./numbers.js");
const combinators = require('./combinators.js')

const pair = left => right => f => f(left)(right);
const left = pair => pair(x => y => x);
const right = pair => pair(x => y => y);

const list = item => lizt => pair(bool.False)(pair(item)(lizt));
const nil = pair(bool.True)(bool.True);
const isEmpty = left;
const head = lizt => left(right(lizt));
const tail = lizt => right(right(lizt));

// [1]
// const testList1 = list(num.One)(nil);
// const testNum1 = head(testList1);
// console.log(num.churchToInt(testNum1));

// [3,2]
// const testList2 = list(num.Three)(list(num.Two)(nil));
// const testNum2 = head(testList2);
// const testNum3 = head(tail(testList2));
// console.log(num.churchToInt(testNum2));
// console.log(isEmpty(tail(tail(testList2)))(true)(false)); // TRUE

// [true, false, true]
// const testList4 = list(bool.True)(list(bool.False)(list(bool.True)(nil)));
// console.log(head(testList4)(true)(false)); // true
// console.log(head(tail(testList4))(true)(false)); // false
// console.log(head(tail(tail(testList4)))(true)(false)); // true

const twoArgsYCombinator = h => (f => f(f))(g => h(x => y => g(g)(x)(y)));

const reduce = initialValue => accumolator => lizt =>
  twoArgsYCombinator(reduceIterator => init => li =>
    isEmpty(li)
        (() => init)
        (() =>
          reduceIterator(accumolator(init)(head(li)))
            (tail(li))
        )
        (f => f) // (f => f) is just to lazy-call everything
  )(initialValue)(lizt)

// const testList5 = list(1)(list(2)(nil));
// console.log(reduce(0)(x => y => x + y)(testList5)); // int sum

// reduce(0, +, [1,2,3,4]) == 10
// const testList6 = list(num.One)(list(num.Two)(list(num.Three)(list(num.Four)(nil))))
// console.log(num.churchToInt(reduce(num.Zero)(num.plus)(testList6)))

// reduce(1, *, [1,2,3,4]) == 24
// const testList7 = list(num.One)(list(num.Two)(list(num.Three)(list(num.Four)(nil))))
// console.log(num.churchToInt(reduce(num.One)(num.mult)(testList7)))

const sum = lizt => reduce(num.Zero)(num.plus)(lizt)
const product = lizt => reduce(num.One)(num.mult)(lizt)

// Generates a list of range between the numbers [numFrom, numFrom + 1, numFrom + 2, ...... numTo]
const range = numFrom => numTo => combinators.Y(rangeIterator => numF => 
  num.numGte(numF)(numTo)
    (() => nil)
    (() => list(numF)(rangeIterator( num.plus(numF)(num.One) )))(f => f)
)(numFrom);

// tailrecursive func would generate the list in reversed order // TODO test this
// const rangeTailrecursive = numFrom => numTo => twoArgsYCombinator(rangeIterator => numF => res => 
//   num.numGte(numF)(numTo)
//     (() => res)
//     (() => rangeIterator(num.plus(numF)(num.One))
//       (list(numF)(res))
//     )(f => f)
// )(numFrom)(nil)


// console.log(num.churchToInt(sum(list(num.One)(list(num.Two)(list(num.Three)(nil))))))
// console.log(num.churchToInt(num.plus(num.Four)(num.One)))
// console.log(num.numGte(num.Two)(num.One)(true)(false))
// console.log(num.churchToInt(sum(range(num.Zero)(num.plus(num.Four)(num.Four))))) // 28
// console.log(num.churchToInt(sum(range(num.Two)(num.Four)))) // 5


const listToString = list => reduce("[")(res => current => res + current + ", ")(list) + "]"
// console.log(listToString(range(num.Zero)(num.Four)))
// console.log(listToString( map(x => {console.log(num.churchToInt(x)); return x;}) (range(num.Zero)(num.Four)) ))

const length = lizt => combinators.Y(iter => li => 
  isEmpty(li)
    (() => num.Zero)
    (() => num.plus(num.One)(iter(tail(li))))(f => f)
)(lizt)

// console.log(num.churchToInt(length(list(1)(list(2)(nil)))))

const reverse = lizt => twoArgsYCombinator(iter => res => li =>
  isEmpty(li)
    (() => res)
    (() => iter(list(head(li))(res))(tail(li)))(f => f)
)(nil)(lizt)

// console.log(listToString(reverse(list(1)(list(2)(nil)))))

const map = f => lizt => combinators.Y(iter => li =>
  isEmpty(li)
    (() => nil)
    (
      () => list(f(head(li)))(iter(tail(li)))
    )
    (f => f)
)(lizt);

// const listToFour = list(num.One)(list(num.Two)(list(num.Three)(list(num.Four)(nil))))
// const test = map(x => {console.log(num.churchToInt(x)); return x;})(listToFour)
// console.log(test.toString())

// console.log(listToString(map(x => x * 200)(map(x => x + 10)(map(x => num.churchToInt(x))(range(num.Zero)(num.Four))))))

// const l1 = (list(1)(nil))
// console.log(l1.toString())
// const l2 = (list(2)(l1))
// console.log(l2.toString())
// console.log(tail(nil).toString())

const append = item => lizt => combinators.Y(iter => li =>
  isEmpty(li)
    (() => list(item)(nil))
    (() => list(head(li))(iter(tail(li))))(f => f)
)(lizt)

// [0, 1, 2, 3, 1]
// console.log(listToString(map(x => num.churchToInt(x))(append(num.One)(range(num.Zero)(num.Four)))))

const filter = pred => lizt => combinators.Y(iter => li =>
  isEmpty(li)
    (() => nil)
    (
      () => pred(head(li))
        (list(head(li))(iter(tail(li))))
        (iter(tail(li)))
    )(f => f)
)(lizt)

// console.log(listToString(filter(x => x % 2 == 0?bool.True:bool.False)(map(x => num.churchToInt(x))(range(num.Zero) (num.mult(num.Four)(num.Four)) ))))

module.exports = {
  list,
  nil,
  isEmpty,
  head,
  tail,
  reduce,
  sum,
  product,
  range,
  listToString,
  length,
  map,
  append,
  filter
};
