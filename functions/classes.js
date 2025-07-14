export { Tree, createRandomArray, getRandomIntGreaterThan }

class Tree {
    constructor(array = []){
        this.root = this.buildTree(array);
    }

    // take an array of data and turns it into a balanced binary tree
    buildTree(array){
        if(array.length === 0) {
            return null;
        }
        else {
            // sort array and remove duplicates
            const sortedArray = [...new Set(array.sort((a, b) => a - b))]
            return this.sortedArrayToBSTRecur(sortedArray, 0, sortedArray.length - 1);
        }
    }

    // Recursive function to construct BST
    sortedArrayToBSTRecur(array, start, end) {
        if(start > end) {
            return null;
        }
        else {
            let medium = start + Math.floor((end - start) / 2);
            let root = new Node(array[medium]);

            root.leftChild = this.sortedArrayToBSTRecur(array, start, medium - 1);
            root.rightChild = this.sortedArrayToBSTRecur(array, medium + 1, end);

            return root;
        }
    }

     // insert the given value into BST
    insert(value) {
        this.root = this.insertToBSTRecur(this.root, value);
    }

    // Recursive function to insert the value into BST
    insertToBSTRecur(root, value) {
        if(root === null) {
            return new Node(value);
        }
        
        // if root matches with the given key
        if(value === root.value) {
            console.log("Cannot insert a duplicate value into BST");
        }

        // if root doesn't match with the given key
        if(value < root.value){
            root.leftChild = this.insertToBSTRecur(root.leftChild, value);
        }
        else if(value > root.value){
            root.rightChild = this.insertToBSTRecur(root.rightChild, value);
        }
        return root;
    }

    // delete the given value from BST
    deleteItem(value) {
        this.root = this.deleteItemFromBSTRecur(this.root, value);
    }

    // recursive function to delete the value from BST
    deleteItemFromBSTRecur(root, value) {
        if(root === null){
            console.log("Cannot delete a non-existed value from BST");
            return root;
        }

        // if root doesn't match with the given key
        if(value < root.value) {
            root.leftChild = this.deleteItemFromBSTRecur(root.leftChild, value);
        }
        else if(value > root.value){
            root.rightChild = this.deleteItemFromBSTRecur(root.rightChild, value);
        }
        
        // if root matches with the given key
        if(value === root.value) {

            // Case when root has 0 children (the root is a leaf node)
            if(root.rightChild === null && root.leftChild === null) {
                return null;
            }

            // Case when root has only right child
            if(root.leftChild === null) {
                return root.rightChild;
            }

            // Case when root has only left child
            if(root.rightChild === null) {
                return root.leftChild;
            }

            // Cases when both children are present
            let successor = this.getSuccessor(root);
            root.value = successor.value;
            root.rightChild = this.deleteItemFromBSTRecur(root.rightChild, successor.value);
        }

        return root;
    }

    // find the generic inorder successor in BST
    // the function is used when the right child is not empty (so that inorder successor can exist)
    getSuccessor(current) {
        current = current.rightChild;
        if(current != null && current.leftChild != null) {
            current = current.leftChild;
        }
        return current;
    }

    // iterative function to return the node with the given value
    find(value) {
        if(this.root === null) {
            console.log("Cannot find a non-existed value in BST");
            return null;
        }

        let current = this.root;
        while(current != null) {
            if(value < current.value) {
                current = current.leftChild;
            }
            else if(value > current.value) {
                current = current.rightChild;
            }
            else {
                return current;
            }
        }

        console.log("Cannot find a non-existed value in BST");
        return null;
    }

    // traverse the BST in breadth-first level order and call the callback on each node as it traverse
    levelOrderForEach(callback) {
        // Check if the callback is provided and is a function
        if (typeof callback !== 'function') {
            throw new Error('Callback function is required.');
        }

        let traversalResult = [];

        // start with the root at level 0
        // for each visited node, its value is added to the result array, by considering the value of current level as an index in the result array
        this.levelOrderForEachRecur(callback, this.root, 0, traversalResult);

        // the final form of traversalResult will be an array with many sub-array, needed to be flattened
        const flattenedResult = traversalResult.flat();
        console.log('Level order: ' + flattenedResult.join(', '));
    }

    // recursive function to traverse the BST in breadth-first level order
    levelOrderForEachRecur(callback, root, currentLevel, result) {
        if(root === null){
            return null;
        }

        // Add a new level to the result if needed
        if (result.length <= currentLevel){
            result.push([])
        }

        // Add current node's data to its corresponding level
        callback(result, currentLevel, root.value);

        this.levelOrderForEachRecur(callback, root.leftChild, currentLevel + 1, result);
        this.levelOrderForEachRecur(callback, root.rightChild, currentLevel + 1, result);
    }

    // define a callback function to accumulate the node value with breadth-first level order
    breadthCallbackRecur(result, level, value) {
        result[level].push(value);
    }

    // iterative function to traverse the BST in breadth-first level order with quene
    levelOrderForEachIter(callback) {
        // Check if the callback is provided and is a function
        if (typeof callback !== 'function') {
            throw new Error('Callback function is required.');
        }

        if(this.root === null){
            return null;
        }

        let traversalResult = [];
        const quene = [this.root];

        while(quene.length > 0) {
            const current = quene.shift();
            callback(traversalResult, current.value);

            if(current.leftChild != null) {
                quene.push(current.leftChild);
            }

            if(current.rightChild != null) {
                quene.push(current.rightChild);
            }
        }

        console.log('Level order: ' + traversalResult.join(', '));
    }

    // define a callback function to accumulate the node value with breadth-first level order
    breadthCallbackIter(result, value) {
        result.push(value);
    }

    // traverse the BST in depth-first inorder
    inOrderForEach(callback) {
        // Check if the callback is provided and is a function
        if (typeof callback !== 'function') {
            throw new Error('Callback function is required.');
        }

        let traversalResult = [];
        this.inOrderForEachRecur(callback, this.root, traversalResult);

        console.log('Inorder: ' + traversalResult.join(', '));
    }
    
    // recursive function to traverse the BST in depth-first inorder
    inOrderForEachRecur(callback, root, result) {
        if(root === null) {
            return;
        }

        this.inOrderForEachRecur(callback, root.leftChild, result);
        callback(result, root.value);
        this.inOrderForEachRecur(callback, root.rightChild, result);
    }

    // recursive function to traverse the BST in depth-first preorder
    preOrderForEach(callback) {
        // Check if the callback is provided and is a function
        if (typeof callback !== 'function') {
            throw new Error('Callback function is required.');
        }

        let traversalResult = [];
        this.preOrderForEachRecur(callback, this.root, traversalResult);

        console.log('Preorder: ' + traversalResult.join(', '));
    }

    // traverse the BST in depth-first preorder
    preOrderForEachRecur(callback, root, result) {
        if(root === null) {
            return
        }

        callback(result, root.value);
        this.preOrderForEachRecur(callback, root.leftChild, result);
        this.preOrderForEachRecur(callback, root.rightChild, result);
    }

    // traverse the BST in depth-first postorder
    postOrderForEach(callback) {
        // Check if the callback is provided and is a function
        if (typeof callback !== 'function') {
            throw new Error('Callback function is required.');
        }

        let traversalResult = [];
        this.postOrderForEachRecur(callback, this.root, traversalResult);

        console.log('Postorder: ' + traversalResult.join(', '));
    }

    // recursive function to traverse the BST in depth-first postorder
    postOrderForEachRecur(callback, root, result) {
        if(root === null) {
            return
        }

        this.postOrderForEachRecur(callback, root.leftChild, result);
        this.postOrderForEachRecur(callback, root.rightChild, result);
        callback(result, root.value);
    }

    // define a callback function to accumulate the node value with depth-first order
    depthCallback(result, value) {
        result.push(value);
    }
    
    // return the height of the node containing the given value
    // height is defined as the number of edges in the longest path from that node to a leaf node
    height(value) {
        const currentNode = this.find(value);

        if(currentNode === null) {
            console.log("Cannot get the height of a non-existed value in BST");
            return null;
        }

        return this.getHeight(currentNode);
    }

    // recursive funtion to return the height of the node
    getHeight(root) {
        if(root === null) {
            return -1;
        }
        else {
            return (Math.max(this.getHeight(root.rightChild), this.getHeight(root.leftChild)) + 1);
        }
    }

    // iterative funtion return the depth of the node containing the given value
    // depth is defined as the number of edges in the path from that node to the root node
    depth(value) {
        if(this.root === null) {
            console.log("Cannot get the depth of a non-existed value in BST");
            return null;
        }

        let current = this.root;
        let depth = -1;

        while(current != null) {
            if(value < current.value) {
                current = current.leftChild;
                depth += 1;
            }
            else if(value > current.value) {
                current = current.rightChild;
                depth += 1;
            }
            else {
                return (depth + 1);
            }
        }

        console.log("Cannot find a non-existed value in BST");
        return null;
    }

    // check if the BST is balanced. BST is considered balanced if,
    //  1. for every node in the tree, the two subtrees is also balanced
    //  2. for every node in the tree, the height difference of two subtrees is between -1 and 1
    isBalanced() {
        return this.isBalancedRecur(this.root);
    }

    // recursive function to check if the BST is balanced
    isBalancedRecur(root) {
        // If tree is empty then return true
        if(root === null) {
            return true;
        }

        const leftHeight = this.getHeight(root.leftChild);
        const rightHeight = this.getHeight(root.rightChild);
        // the height difference of two subtrees must be between -1 and 1
        if(Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        }
        // the two subtrees must be balanced 
        return (this.isBalancedRecur(root.leftChild) && this.isBalancedRecur(root.rightChild));
    }

    // rebalance an unbalanced tree
    rebalance() {
        const rebalanceCallback = (result, value) => {
            result.push(value);
        }

        let traversalResult = [];
        // the inorder travrsel result of a BST is a sorted array
        this.inOrderForEachRecur(rebalanceCallback, this.root, traversalResult);
        
        this.root = this.buildTree(traversalResult);
    }

    // visualize the binary search tree with root of the tree as the value for the node parameter
    prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.rightChild !== null) {
            this.prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.leftChild !== null) {
            this.prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
}

class Node {
    constructor(value, leftChild = null, rightChild = null){
        this.value = value;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
}

// create array with 15 distinct elements, and all elements is between 0 to 99
function createRandomArray() {
    let newArray = []

    while(newArray.length < 15) {
        for(let i = newArray.length + 1 ; i <= 15 ; i++) {
            newArray.push(getRandomIntLessThan(100));
        }

        newArray = [...new Set(newArray)]
    }
    return newArray;
}

// get an interger between 0 to max-1
function getRandomIntLessThan(max) {
  return Math.floor(Math.random() * max);
}

// get an interger between specific+1 to max
function getRandomIntGreaterThan(specific, max) {
  // Ensure maxValue is greater than specificValue
  if (max <= specific) {
    throw new Error("maxValue must be greater than specificValue.");
  }
  // Calculate the minimum possible random integer
  const minRandom = specific + 1;
  // Generate a random integer within the desired range
  return Math.floor(Math.random() * (max - minRandom + 1)) + minRandom;
}
