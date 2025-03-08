class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.buckets = new Array(capacity)
            .fill(null)
            .map(() => []);
        this.size = 0;
        this.loadFactor = loadFactor;
        this.capacity = capacity;


    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
          if (bucket[i][0] === key) {
            bucket[i][1] = value;
            return;
          }
        }
        bucket.push([key, value]);
        this.size++;

        if (this.size / this.capacity > this.loadFactor) {
            this.resize();
        }
    }
    resize() {
        const newCapacity = this.capacity * 2;
        const newBuckets = new Array(newCapacity)
                                    .fill(null)
                                    .map(() => []);
        
        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                const newIndex = this.hash(key);
                newBuckets[newIndex].push([key, value]);
            }
        }
    
        this.buckets = newBuckets;
        this.capacity = newCapacity;
    }
    
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return null;
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return true;
            }
        }
        return false;

    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;

    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity)
        .fill(null)
        .map(() => []);
        this.size = 0;
    }

    keys() {
        const keysArr = [];

        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                keysArr.push(key);
            }
        }
        return keysArr;
    }

    values() {
        const valuesArr = [];

        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                valuesArr.push(value);
            }
        }

        return valuesArr;
    }

    entries() {
        const entriesArr = [];

        for (const bucket of this.buckets) {
            for (const pair of bucket) {
                entriesArr.push(pair);
            }
        }
        return entriesArr;
    }
}