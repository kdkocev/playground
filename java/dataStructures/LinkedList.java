package DataStructs;

public class LinkedList<T> implements List {
	private class Node<T> {
		public T data;
		public Node<T> next;
		
		public Node(T data) {
			this.data = data;
			next = null;
		}
	}

	private Node<T> head= null;
	private Node<T> tail= null;
	private int size = 0;
	
	public void add(T data) {
		Node<T> temp = new Node<T>(data);
		if(head== null) {
			head = temp;
			tail = head;
		} else {
			tail.next = temp;
			tail = tail.next;
		}
		size++;
	}
	
	public T getElem(int i) {
		Node<T> walker = head;
		
		for (int j = 0; j < i; j++) {
			walker = walker.next;
		}
		
		return walker.data;
	}
	
	public boolean empty() {
		return head== null;
	}
	
	public String toString() {
		String str = "";
		
		Node<T> walker = head;
		
		while(walker != null) {
			str = str + walker.data + ", ";
			walker = walker.next;
		}
		
		return str;
	}
	
	public int size() {
		return size;
	}

	
	public void pop() {
		head= head.next;
	}
}
