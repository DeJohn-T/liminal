
package doublylinkedlist;


class Node { 
    int key;
        Node prev, next; 
        Node(int key) {
            this.key = key; 
            this.prev = null; 
            this.next = null;
}
    
}
class DoublyLinkedList{ 
    Node head;
    Node tail;
    int count;
    
    DoublyLinkedList (){ 
        head = tail = null;
        count = 0;
}
    void insertF(int key) {
    Node p = new Node(key); 
    if(head == null)
        head=tail=p; 

    else {

    p.next = head;
    head.prev = p;
    head = p;

}
count++;
}
    void insertL(int key) { 
        Node p = new Node(key); 
        if (tail == null)
            head=tail=p; 
        else {
            tail.next = p;
            p.prev = tail;
            tail = p;
            
}

}

int deleteF() {
    if (count == 0) return -1; //error
    Node p = head;
    int i = p.key;
    head = head.next;

    if(head == null) tail = null; 
    else{
        head.prev = null;

}
    return i; 
}


int deleteL() {
    if (count == 0) return -1;
    Node p = tail;
    int i = p.key;
    tail = tail.prev;
    if (tail == null) head = null;
    else tail.next = null; 
    count--;

    return i;

}

void printall(){
    Node p = head; 
    while (p!=null){
        System.out.print(p.key);
        if (p.next !=null) System.out.print(" "); 
        p = p.next;
}
    System.out.println(" ");
}
public static void main(String[] args) { 
    DoublyLinkedList l = new DoublyLinkedList(); 
    l.insertF(32);
    l.insertF(42);
    l.insertL(37);
    l.insertL(27);
    int temp = l.deleteF();
    l.printall(); // output will be “32 37 27”
}


}

