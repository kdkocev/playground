#include<iostream>
using namespace std;

template <class T>
struct Node {
  T value;
  Node<T> *left;
  Node<T> *right;

  Node(T val) {
    value = val;
    left = NULL;
    right = NULL;
  }
};

template <class T>
class Tree {
public:
  void add(T value) {
    add_private(value, root);
  }

  void printltr() {
    printltr_private(root);
  }

  void pretty_print() {
    pretty_print_private(root);
  }

  int size() {
    return size_private(root);
  }
private:
  Node<T> *root = NULL;

  void printltr_private(Node<T> *branch) {
    if (branch == NULL) {
      return;
    }
    printltr_private(branch->left);
    cout<<branch->value;
    printltr_private(branch->right);
  }

  void add_private(T value, Node<T> *& branch) {
    if (branch == NULL) {
      branch = new Node<T>(value);
    } else {
      if(branch->value > value) {
        add_private(value, branch->left);
      } else {
        add_private(value, branch->right);
      }
    }
  }

  void pretty_print_private(Node<T> *branch) {
    if (branch == NULL) {
      return;
    }
    int start_gap = get_start_gap_for_level(get_height(root) - get_height(branch));
    int gap = get_gap_for_level(get_height(root) - get_height(branch));

    cout<<"start gap "<<start_gap<<endl;
    cout<<"gap "<<gap<<endl;

    for (int i=0; i<start_gap; i++) {
      cout<<" ";
    }
    print_level_with_gap(get_height(branch), gap, root);
  }

  void print_level_with_gap(int l, int gap, Node<T> *branch) {
    if (l == 0) {
      cout<<branch->value;
      for (int i=0; i<gap; i++) {
        cout<<" ";
      }
    } else {
      print_level_with_gap(l-1, gap, branch->left);
      print_level_with_gap(l-1, gap, branch->right);
    }
  }

  int size_private(Node<T> * branch) {
    if (branch == NULL) {
      return 0;
    }
    return size_private(branch->left) + 1 + size_private(branch->right);
  }

  int max(int a, int b) {
    if (a > b) {
      return a;
    }
    return b;
  }

  int get_height(Node<T> * branch) {
    if (branch == NULL) {
      return 0;
    }
    return max(get_height(branch->left), get_height(branch->right)) + 1;
  }

  int get_gap_for_level(int n) {
    if (n == get_height(root)) {
      return 3;
    }
    return (get_gap_for_level(n-1) * 2) + 1;
  }

  int get_start_gap_for_level(int n) {
    return (get_gap_for_level(n) / 2) - 1;
  }
};

int main() {
    cout<<"Back to the roots"<<endl;
    
    Tree<int> t = Tree<int>();

    t.add(5);
    t.add(4);
    t.add(6);
    t.add(3);

    cout<<t.size()<<endl;

    t.pretty_print();

    return 0;
}
