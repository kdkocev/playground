#include<iostream>
using namespace std;

class String {
private:
    char *arr = NULL;
    int length;
public:
    String() {
        arr = new char[0];
        length = 0;
    }
    String(char *a) {
        length = mystrlen(a);
        
        arr = new char[length];
        for(int i=0; i<length; i++) {
            arr[i] = a[i];
        }
    }

    int mystrlen(const char* str)
    {
      return (*str) ? 1 + mystrlen(++str) : 0;
    }

    int len() {
        return length;
    }

    char get(int n) {
        return arr[n];
    }

    String concat(String s) {
        char *result = new char[this->length + s.length + 1];

        for (int i=0; i<this->length; i++) {
            result[i] = this->arr[i];
        }
        for (int i=0; i<s.length; i++) {
            result[this->length + i] = s.arr[i];
        }
        result[this->length + s.length] = '\0';

        String response = String(result);
        delete [] result;
        return response;
    }

    void print() {
        for(int i=0; i<length; i++) {
            cout<<arr[i];
        }
    }
    void println() {
        print();
        cout<<endl;
    }

    char operator [](int n) const {
        return arr[n];
    }

    char & operator [](int n) {
        return arr[n];
    }
};

ostream & operator << (ostream & os, String A) {
    for(int i=0; i<A.len(); i++) {
        os<<A.get(i);
    }
    return os;
}

String operator + (String A, String B) {
    return A.concat(B);
}

String operator + (String A, char *B) {
    return A.concat(String(B));
}

String operator + (char *A, String B) {
    return String(A).concat(B);
}

int main() {
    String s1 = String((char*)"It's been great");
    String s2 = String((char*)"writing in C++ again!");
    String s3 = s1 + (char*)" " + s2;

    cout<<s1[0]<<endl;
    s1[0] = 'E';


    cout<<s1<<" + "<<s2<<" = "<<s3<<endl;
    // s3.println();

    String s4 = (String)"Hello! " + "Can I even do " + "this for a change?";

    cout<<s4<<endl;

    cout<<"Awesome!!!!!"<<endl;

    return 0;
}