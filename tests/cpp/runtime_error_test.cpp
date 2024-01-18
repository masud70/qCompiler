#include <iostream>

struct Node {
    int value;
    Node* next;
};

int main() {
    Node* head = new Node();
    head -> value = 1;
    std::cout << head -> next -> value << std::endl;
}