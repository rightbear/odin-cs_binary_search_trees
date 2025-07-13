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

     // insert the given value into BST
    insert(value) {
        this.root = this.insertToBST(this.root, value);
    }

    // Recursive function to insert the value into BST
    insertToBST(root, value) {
        if(root === null) {
            return new Node(value);
        }
        
        // if root matches with the given key
        if(value === root.value) {
            console.log("Insert a duplicate value into BST");
        }

        // if root doesn't match with the given key
        if(value < root.value){
            root.leftChild = this.insertToBST(root.leftChild, value);
        }
        else if(value > root.value){
            root.rightChild = this.insertToBST(root.rightChild, value);
        }
        return root;
    }

    // delete the given value from BST
    deleteItem(value) {
        this.root = this.deleteItemFromBST(this.root, value);
    }

    // Recursive function to delete the value from BST
    deleteItemFromBST(root, value) {
        if(root === null){
            console.log("Delete a non-existed value into BST");
            return root;
        }

        // if root doesn't match with the given key
        if(value < root.value) {
            root.leftChild = this.deleteItemFromBST(root.leftChild, value);
        }
        else if(value > root.value){
            root.rightChild = this.deleteItemFromBST(root.rightChild, value);
        }
        
        // if root matches with the given key
        if(value === root.value) {

            // Case when root has 0 children
            if(root.rightChild === null && root.leftChild) {
                console.log("Delete a non-existed value into BST");
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
            root.rightChild = this.deleteItemFromBST(root.rightChild, successor.value);
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