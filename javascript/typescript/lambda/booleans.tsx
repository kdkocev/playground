type Sigma = number

const True = <T extends Sigma>(x: T) => (y: T) => x;
const False = <T extends Sigma>(x: T) => (y: T) => y;

// console.log(True(True(False)(True))(False))

type BOOL<T> = (x: T) => (y: T) => T

const OR = <T extends Sigma, E extends Sigma, F extends Sigma>(b1: (x: (x1: F) => (y1: F) => F) => (y: E) => T) => (b2: E) => b1(True)(b2)
// const AND = <T extends Sigma>(b1: T) => (b2: T) => b1(b2)(False)

console.log(OR(False)(True))
// console.log(AND(True)(OR(True)(False)))