
public class BinarySearchTree {

	Node root;
	
	/* helper method : call another method that is helping
	
	public void a (){
		int data1 = 10;
		b(data1, data2); // call B 
	}
	
	public void b (int data1, int data2){
		
	}
	*/
	
	public void insertMethod(int data) {
		insert(root, data);
	}
	
	
	public Node insert(Node node, int data) {
		//base case and exit condition
		
		if (node == null) {
			return new Node (data);
		}
		
		// go left
		if(data < node.data) {
			node.left = insert(node.left, data);
		}
		
		if(data > node.data) {
			node.right = insert(node.right, data);
	
		}
		
		if(data == node.data) {
			System.out.println (" This is not Valid");
		}
		
		return node;
		
		/*
		 
		Node newNode = new Node (data);
		newNode.left = null;
		newNode.right = null;
		
		if(root == null) {
			root = newNode;
		}
		
		else if (root.data > data) {
			
		}
		else if (root.data < data) {
			
		}
		
			 */
	}
	
	public void inorder() {
		
	}
	
	public void search() {
		
	}
	
	public static void main(String[]args) {
		BinarySearchTree bst = new BinarySearchTree();
		bst.insertMethod(10);
		bst.insertMethod(5);
		bst.insertMethod(20);
		bst.insertMethod(45);
		bst.insertMethod(50);
	}
}
