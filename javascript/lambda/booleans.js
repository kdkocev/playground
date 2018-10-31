const True = x => y => x;
const False = x => y => y;
const NOT = b => b(False)(True);
const AND = b1 => b2 => b1(b2)(False);
const OR = b1 => b2 => b1(True)(b2);
const XOR = b1 => b2 => b1(b2(False)(True))(b2);
const NXOR = b1 => b2 => b1(b2)(b2(False)(True));

const testOutcomes = (b, name) => {
  const result = x => x(true)(false);

  console.log("Testing " + name);
  console.log("False | False | " + result(b(False)(False)));
  console.log("False | True | " + result(b(False)(True)));
  console.log("True | False | " + result(b(True)(False)));
  console.log("True | True | " + result(b(True)(True)));
};

function printTests() {
  testOutcomes(NOT, "NOT");
  testOutcomes(AND, "AND");
  testOutcomes(OR), "OR";
  testOutcomes(XOR, "XOR");
  testOutcomes(NXOR, "NXOR");
}

module.exports = { True, False, NOT, AND, OR, XOR, NXOR };
