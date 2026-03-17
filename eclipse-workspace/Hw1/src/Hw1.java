#include <iostream>

// Node class represents each node in the linked list
class Node {
public:
    int data;
    int minSoFar; // Minimum value seen so far in the list

    Node(int value, int minVal) : data(value), minSoFar(minVal) {}
};

// LinkedList class manages the linked list and supports required operations
class Hw1 {
private:
    Node* head; // Pointer to the head of the linked list

public:
    LinkedList() : head(nullptr) {}

    // Inserts a new node at the front of the list
    void insertF(int value) {
        if (head == nullptr) {
            head = new Node(value, value);
        } else {
            // Update minSoFar of the new node based on current minimum
            head = new Node(value, std::min(value, head->minSoFar));
            head->next = oldHead;
        }
    }

    // Returns the minimum value seen so far in the list
    int reportMin() {
        if (head == nullptr) {
            std::cerr << "List is empty\n";
            return -1; // or some sentinel value indicating error
        }
        return head->minSoFar;
    }
};

int main() {
    LinkedList list;
    list.insertF(5);
    list.insertF(3);
    std::cout << "Min: " << list.reportMin() << std::endl; // Output: 3
    list.insertF(6);
    list.insertF(2);
    std::cout << "Min: " << list.reportMin() << std::endl; // Output: 2

    return 0;
}