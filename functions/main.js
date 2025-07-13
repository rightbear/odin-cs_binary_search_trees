#!/usr/bin/node

import { Tree } from "./classes.js"

let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let BSTExample = new Tree(testArray);

// test function prettyPrint()
BSTExample.prettyPrint(BSTExample.root);