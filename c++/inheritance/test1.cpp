#include<iostream>
using namespace std;

class JsonValue {
public:
    virtual int val() {
        cout<<"Father"<<endl;
    } 
};

class JsonObject: public JsonValue {
private:
    char** keys;
    int size;
    int capacity;
    JsonValue* values;
public:
    JsonObject() {
        capacity = 10;
        size = 0;
        keys = new char*[capacity];
        values = new JsonValue[capacity];
    }

    void add(char* key, JsonValue val) {
        if(size == capacity) {
            // Should have resize here
            return;
        }
        keys[size] = key;
        values[size] = val;
        size++;
    }

    JsonValue * get(char* key) {
        for (int i=0; i<size; i++) {
            if (keys[i] == key) {
                return &values[i];
            }
        }
    }
};

class JsonNumber: public JsonValue {
private:
    int value;
public:
    JsonNumber(int n) {
        value = n;
    }

    int val() override {
        cout<<value<<endl;
        return value;
    }
};

class JsonString: public JsonValue {
private:
    char* value;
public:
    JsonString(char* str) {
        // bad idea?
        value = str;
    }
};

int main() {
    JsonObject j1 = JsonObject();

    j1.add("age", JsonNumber(5));
    cout<<j1.get("age")->val()<<endl;
    
    return 0;
}
