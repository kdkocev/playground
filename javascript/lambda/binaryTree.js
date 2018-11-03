const bool = require("./booleans.js");
const num = require("./numbers.js");

const pair = left => right => f => f(left)(right);
const left = pair => pair(x => y => x);
const right = pair => pair(x => y => y);

// Node(isEmpty, value, leftTree, rightTree)
const node = value => left => right =>
  pair(bool.False)(pair(value)(pair(left)(right)));

const nil = pair(bool.True)(pair(bool.False)(pair(bool.False)(bool.False)));

const leftTree = node => left(right(right(node)));
const rightTree = node => right(right(right(node)));
const nodeValue = node => left(right(node));
const isEmpty = node => left(node);

// console.log(nodeValue(node(1)(nil)(nil))); // 1
// console.log(nodeValue(leftTree(node(1)(node(2)(nil)(nil))(nil)))); // 2
// console.log(isEmpty(rightTree(node(1)(node(2)(nil)(nil))(nil)))(true)(false)); // True
// console.log(isEmpty(leftTree(node(1)(node(2)(nil)(nil))(nil)))(true)(false)); // False

module.exports = {
  node,
  nil,
  leftTree,
  rightTree,
  nodeValue,
  isEmpty
};
