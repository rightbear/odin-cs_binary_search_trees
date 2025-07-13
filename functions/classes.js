export { Tree }

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