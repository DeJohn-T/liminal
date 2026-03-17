

public class LinkedList{
	
	Node head;
	
	public void insert(int price){
	
		Node node = new Node();
		node.price = price;
		node.next = null; //linked list always ends at null
		
		if(price > 20) {
			node.isLuxury = true;
		}
		
		if(head == null) {
			head = node;
		}
		else {
			Node n = head;
			
			while(n.next != null) {
				n = n.next;
				
			}
			
		}
		
	}
	
	public void show() {
		
		Node n = head;
		
		{
			
		}
		
	}
	
}
