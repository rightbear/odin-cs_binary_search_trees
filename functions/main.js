#!/usr/bin/node

import { Tree } from "./classes.js"

let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let BSTExample = new Tree(testArray);

// test function prettyPrint()
BSTExample.prettyPrint(BSTExample.root);

// test function insert() with duplicate value
BSTExample.insert(5);
// test function insert()
BSTExample.insert(250);
BSTExample.prettyPrint(BSTExample.root);

// test function delete() with non-existed value
BSTExample.deleteItem(100);
// test function delete() with value having 0 child
BSTExample.deleteItem(23);
BSTExample.prettyPrint(BSTExample.root);
// test function delete() with value having 1 child
BSTExample.deleteItem(1);
BSTExample.prettyPrint(BSTExample.root);
// test function delete() with value having 2 child
BSTExample.deleteItem(67);
BSTExample.prettyPrint(BSTExample.root);

// test function find() with non-existed value
console.log(BSTExample.find(77));
// test function find()
console.log(BSTExample.find(8));
console.log(BSTExample.find(324));
console.log(BSTExample.find(3));


// test function levelOrderForEach()
try {
    BSTExample.levelOrderForEach(BSTExample.breadthCallbackRecur);
} catch (error) {
    console.error('Caught an error:', error.message);
}
// 8, 4, 250, 3, 5, 9, 324, 7, 6345

// test function levelOrderForEach() without callback
try {
    BSTExample.levelOrderForEach();
} catch (error) {
    console.error('Caught an error:', error.message);
}
// Caught an error: Callback function is required.

// test function levelOrderForEachIter()
try {
    BSTExample.levelOrderForEachIter(BSTExample.breadthCallbackIter);
} catch (error) {
    console.error('Caught an error:', error.message);
}
// 8, 4, 250, 3, 5, 9, 324, 7, 6345

// test function levelOrderForEachIter() without callback
try {
    BSTExample.levelOrderForEachIter();
} catch (error) {
    console.error('Caught an error:', error.message);
}
// Caught an error: Callback function is required.