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