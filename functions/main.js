#!/usr/bin/node

import { Tree, createRandomArray, getRandomIntGreaterThan } from "./classes.js";

// Step1: Create a binary search tree from an array of random numbers < 100
let BSTExample = new Tree(createRandomArray());
// a full binary search tree with height = 3
BSTExample.prettyPrint(BSTExample.root);

// Step2: Confirm that the tree is balanced by calling isBalanced()
console.log(BSTExample.isBalanced()); // true

// Step3: Print out all elements in level, pre, post, and in order
BSTExample.levelOrderForEach(BSTExample.breadthCallbackRecur);
BSTExample.inOrderForEach(BSTExample.depthCallback);
BSTExample.preOrderForEach(BSTExample.depthCallback);
BSTExample.postOrderForEach(BSTExample.depthCallback);

// Step4: Unbalance the tree by adding several numbers > 100
let random1 = getRandomIntGreaterThan(100, 1000);
let random2 = getRandomIntGreaterThan(100, 1000);
while (random2 === random1) {
  random2 = getRandomIntGreaterThan(100, 1000);
}
// insert two distinct random intergers > 100 to make a unbalanced tree
BSTExample.insert(random1);
BSTExample.insert(random2);
BSTExample.prettyPrint(BSTExample.root);

// Step5: Confirm that the tree is unbalanced by calling isBalanced()
console.log(BSTExample.isBalanced()); // false

// Step6: Balance the tree by calling rebalance()
BSTExample.rebalance();
BSTExample.prettyPrint(BSTExample.root);

// Step7: Confirm that the tree is balanced by calling isBalanced()
console.log(BSTExample.isBalanced()); // true

// Step8: Print out all elements in level, pre, post, and in order
BSTExample.levelOrderForEach(BSTExample.breadthCallbackRecur);
BSTExample.inOrderForEach(BSTExample.depthCallback);
BSTExample.preOrderForEach(BSTExample.depthCallback);
BSTExample.postOrderForEach(BSTExample.depthCallback);
