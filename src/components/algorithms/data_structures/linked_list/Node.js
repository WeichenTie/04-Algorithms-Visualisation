class Node {
    constructor(value=null, prev=null, next=null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

export default Node;