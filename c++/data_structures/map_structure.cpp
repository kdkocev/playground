#include<iostream>
using namespace std;

template <typename K, typename V>
class Map {
private:
    K * keys;
    V * values;
    int size;
    int capacity;
public:
    Map() {
        capacity = 10;
        size = 0;
        keys = new K[capacity];
        values = new V[capacity];
    }

    void add(K key, V value) {
        if (size == capacity) {
            resize();
        }
        keys[size] = key;
        values[size] = value;
        size++;
    }

    V get(K key) {
        for(int i=0; i<size; i++) {
            if (keys[i] == key) {
                return values[i];
            }
        }
        return NULL;
    }

    V operator [](K key) const {
        return get(key);
    }

    V & operator [](K key) {
        for(int i=0; i<size; i++) {
            if (keys[i] == key) {
                return values[i];
            }
        }
        // There is no such key here already. We should crate it.
        if(size == capacity) {
            resize();
        }
        keys[size] = key;
        size++;
        return values[size-1];
    }

    K* get_keys () {
        return keys;
    }

    V* get_values () {
        return values;
    }

    int get_size() {
        return size;
    }

protected:
    void resize() {
        capacity += 10;
        K * newKeys = new K[capacity];
        V * newVals = new V[capacity];

        for (int i=0; i<size; i++) {
            newKeys[i] = keys[i];
            newVals[i] = values[i];
        }

        delete [] keys;
        delete [] values;

        keys = newKeys;
        values = newVals;
    }
};

int main() {
    Map<char*, int> m = Map<char*, int>();
    m.add("Kamen", 15);

    m["hava"] = 16;
    m["nagila"] = 19;

    cout<<m["Kamen"]<<endl;
    cout<<m["hava"]<<" "<<m["nagila"]<<endl;

    for(int i=0; i<m.get_size(); i++) {
        cout<<m.get_keys()[i]<<" -> "<<m.get_values()[i]<<endl;
    }

    Map<char*, Map<char*, int> > m2 = Map<char*, Map<char*, int> >();

    m2["HackSoft"] = m;

    cout<<m2["HackSoft"]["Kamen"]<<endl;
    m2["HackSoft"]["Kamen"] = 30;
    cout<<m2["HackSoft"]["Kamen"]<<endl;

    return 0;
}