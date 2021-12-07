/**
 * Each node looks like this:
 * {value: <any>, left: Node, right: Node}
 */
function invertTree(node) {
    var left = node.left;
    var right = node.right;
    node.left = right;
    node.right = left;
    if (node.left) {
        invertTree(node.left);
    }
    if (node.right) {
        invertTree(node.right);
    }
}
function printTree(node) {
    if (node.left) {
        printTree(node.left);
    }
    console.log(node.value);
    if (node.right) {
        printTree(node.right);
    }
}
var tree1 = {
    value: 5,
    left: {
        value: 3,
        left: {
            value: 2,
            left: {
                value: 1
            }
        },
        right: {
            value: 4
        }
    },
    right: {
        value: 7,
        left: {
            value: 6
        },
        right: {
            value: 8
        }
    }
};
printTree(tree1);
invertTree(tree1);
printTree(tree1);
console.log(tree1);
