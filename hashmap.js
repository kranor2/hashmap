class Node {
    constructor(key, value, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

class HashMap {
    constructor(initialCapacity = 10) {
        this.capacity = initialCapacity;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null);
        this.loadFactor = 0.75;
    }

    // takes a key and produces a hash code with it
    hash(key) {
        let hashCode = 0;
    
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
    
        return hashCode;
    }

    // takes a key and a value; assigns value to key, or overwrites value if existing key
    set(key, value) {
        const index = this.hash(key);
        if (!this.buckets[index]) {
            this.buckets[index] = new Node(key, value);
        } else {
            let current = this.buckets[index];
            while (current) {
                if (current.key == key) {
                    current.value = value;
                    return;
                }
                if (!current.next) {
                    break;
                }
                current = current.next;
            }
            current.next = new Node(key, value);
        }
    }

    // takes one arg as a key and returns value assigned to this key; if key not found, return null
    get(key) {
        const index = this.hash(key);
        const bucket = this.bucket[index];

        if (!bucket) {
            return null;
        }
        for (const entry of bucket) {
            if (entry.key == key) {
                return entry.value;
            }
        }

        return null;
    }

    // takes a key as an arg; if key is in hash map, return true; if key is not in hash map, return false
    has(key) {
        const index = this.hash(key);
        const bucket = this.bucket[index];

        if (!bucket) {
            return false;
        }
        for (const entry of bucket) {
            if (entry.key == key) {
                return true;
            }
        }

        return false;
    }

    // takes a key as an arg; if this key is in hash map, remove entry with that key, return true; if this key isn't in hashmap, return false
    remove(key) {
        const index = this.hash(key);
        const bucket = this.bucket[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key == key) {
                bucket.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    // returns the number of stored keys in the hash map
    length() {
        let counter = 0;
        for (const bucket of this.buckets) {
            if (bucket) {
                for (const entry of bucket) {
                    if (entry.key) {
                        counter++;
                    }
                }
            }
        }
        
        return counter;
    }

    // removes all entries in the hash map
    clear() {
        this.buckets = Array(this.size).fill(null).map(() => []);
    }

    // returns an array containing all keys inside hash map
    keys() {
        let keys = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                for (const entry of bucket) {
                    keys.push(entry.key);
                }
            }
        }

        return keys;
    }

    // returns an array containing all values
    values() {
        let values = [];
        for (const bucket of this.buckets) {
            if (bucket) {
                for (const entry of bucket) {
                    values.push(entry.value);
                }
            }
        }

        return values;
    }

    // returns an array that contains each key, value pair
    entries() {
        let entriesArray = [];

        for (const bucket of this.buckets) {
            if (bucket) {
                for (const entry of bucket) {
                    let pairArray = [entry.key, entry.value];
                    entriesArray.push(pairArray);
                }
            }
        }

        return entriesArray;
    }
}

