package DataStructs;

public class Vector<T> implements List{
	int capacity = 10;
	int size = 0;
	T[] arr = (T[])new Object[capacity];
	
	public void add(T x) {
		if(size == capacity)
			resize();
		arr[size] = x;
		size++;
	}
	
	private void resize() {
		capacity = capacity*2;
		T[] temp = (T[]) new Object[capacity];
		for (int i = 0; i < arr.length; i++) {
			temp[i] = arr[i];
		}
		arr = temp;
	}
	
	public String toString() {
		String str = "";
		
		for (int i = 0; i < size; i++) {
			str = str + arr[i].toString() + " ";
		}
		
		return str;
	}

	public int size() {
		return size;
	}
	
	public T getElement(int i) {
		return arr[i];
	}
	
	public void setElement(int i, T data) {
		if( i > size ) new IndexOutOfBoundsException();
		arr[i] = data;
	}
	

	public void insert(int i, T data) {
		if(i > size) new IndexOutOfBoundsException();
		// Move all to the right
		for (int j = size; j > i; j--) {
			arr[j + 1] = arr[j];
		}
		size++;
		
		arr[i] = data;
	}
	
	public void remove(int i) {
		if(i > size) new IndexOutOfBoundsException();
		// Move all to the left
		for (int j = i; j < size-1; j++) {
			arr[j] = arr[j+1];
		}
		size--;
	}
	
	public boolean empty() {
		return size == 0;
	}
	
	public void pop() {
		size--;
	}
}
