#include<iostream>
using namespace std;

template <class T> 
class ArrayList {
public:
    ArrayList() {
        capacity = 10;
        size = 0;
        a = new T[capacity];
    }

    ArrayList(T *arr, int _size) {
        capacity = 10;
        // Set capacity to be the next boundry after _size
        capacity = ((_size / capacity) + 1) * capacity;
        
        a = new T[capacity];
        size = _size;
        
        for(int i=0; i<size; i++) {
            a[i] = arr[i];
        }
    }

    void add(T n) {
        if (size == capacity) {
            resize();
        }

        a[size] = n;
        size++;
    }

    void resize() {
        capacity += capacity;
        T *arr = new T[capacity];
        for (int i=0; i<size; i++) {
            arr[i] = a[i];
        }
        delete [] a;
        a = arr;
    }

    void print() {
        for (int i=0; i<size; i++){
            cout<<a[i];
        }
        cout<<endl;
    }
private:
    T *a;
    int size;
    int capacity;
};

int main() {
    ArrayList<int> NL = ArrayList<int>();

    NL.add(3);
    NL.add(5);

    NL.print();

    char name[] = "The quick brown fox jumps over the lazy dog.";

    ArrayList<char> s = ArrayList<char>(name, 44);

    s.print();
}