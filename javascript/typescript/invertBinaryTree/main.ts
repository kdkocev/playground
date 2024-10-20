/**
 * Each node looks like this:
 * {value: <any>, left: Node, right: Node}
 */

interface TreeNode<T> {
  value:T,
  left?: TreeNode<T>,
  right?: TreeNode<T>
  // Fixing a bug
}

function invertTree<T>(node: TreeNode<T>) {
  const left = node.left;
  const right = node.right;

  node.left = right;
  node.right = left;

  if(node.left) {
    invertTree(node.left)
  }
  if(node.right) {
    invertTree(node.right)
  }
}

function printTree<T>(node: TreeNode<T>) {
  if(node.left) {
    printTree(node.left)
  }
  
  console.log(node.value)
  
  if(node.right) {
    printTree(node.right)
  }
}

const tree1: TreeNode<number> = {
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
}

printTree(tree1)

invertTree(tree1)

printTree(tree1)

console.log(tree1)

