import Node from "./Node";

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(value) {
        const n = new Node(value, this.tail, null)
        if (this.length === 0) {
            this.head = n;
            this.tail = n;
            this.length++;
            return n.value;
        }
        this.tail.next = n;
        this.tail = n;
        this.length++;
        return n.value;
    }

    pop() {
        if (this.length === 0) {
            return null;
        }
        else if (this.length === 1) {
            const n = this.head;
            this.head = null;
            this.tail = null;
            this.length--;
            return n.value;
        }
        const n = this.tail;
        this.tail = n.prev;
        this.tail.next = null;
        this.length--;
        return n.value;
    }

    unshift(value) {
        const n = new Node(value, null, this.head)
        if (this.length === 0) {
            this.head = n;
            this.tail = n;
            this.length++;
            return n.value;
        }
        this.head.prev = n;
        this.head = n;
        this.length++;
        return n.value;
    }

    shift() {
        if (this.length === 0) {
            return null;
        }
        else if (this.length === 1) {
            const n = this.head;
            this.head = null;
            this.tail = null;
            this.length--;
            return n.value;
        }
        const n = this.head;
        this.head = n.next;
        this.head.prev = null
        this.length--;
        return n.value;
    }

    remove(index) {
        if (index >= this.length || index < 0) return null;
        if (index == 0) {
            return this.shift();
        } else if (index == this.length - 1) {
            return this.pop();
        }

        if (index < (this.length / 2)) {
            let n = this.head;
            for (let i = 0; i !== index; i++) {
                n = n.next;
            }
            n.prev.next = n.next;
            n.next.prev = n.prev;
            return n.value;
        } else {
            let n = this.tail;
            for (let i = this.length - 1; i !== index; i--) {
                n = n.prev;
            }
            n.prev.next = n.next;
            n.next.prev = n.prev;
            return n.value;
        }
    }

    get(index) {
        if (index >= this.length || index < 0) return null;
        if (index == 0) {
            return this.head.value;
        } else if (index == this.length - 1) {
            return this.tail.value();
        }

        if (index < (this.length / 2)) {
            let n = this.head;
            for (let i = 0; i !== index; i++) {
                n = n.next;
            }
            return n.value;
        } else {
            let n = this.tail;
            for (let i = this.length - 1; i !== index; i--) {
                n = n.prev;
            }
            return n.value;
        }
    }

    isEmpty() {
        return this.length === 0;
    }
}

export default LinkedList;