class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
        this.value = null;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    // Insert word
    insert(word, value) {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isEndOfWord = true;
        node.value = value;
    }

    // Search exact word
    search(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) return false;
            node = node.children.get(char);
        }
        return node.value;
    }

    // Delete word
    delete(word) {
        const _deleteRecursively = (node, depth) => {
            if (!node) return false;

            if (depth === word.length) {
                if (!node.isEndOfWord) return false;
                node.isEndOfWord = false;
                node.value = null;
                return node.children.size === 0;
            }

            const char = word[depth];
            const childNode = node.children.get(char);

            if (!_deleteRecursively(childNode, depth + 1)) {
                return false;
            }

            node.children.delete(char);
            return node.children.size === 0 && !node.isEndOfWord;
        };

        _deleteRecursively(this.root, 0);
    }
}

module.exports = Trie;