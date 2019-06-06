import { isNullOrUndefined } from 'util';

export function convert(source: object, iteractor?: (node) => any, callback?: (array, hashMap) => Array<any>) {
    const stack: any[] = [];
    const array: any[] = [];
    const hashMap = {};

    stack.push({ ...source });

    while (stack.length !== 0) {
        let node = { ...stack.pop() };
        if (typeof iteractor === 'function') {
            node = iteractor(node);
        }
        if (node.parent) {
            if (isNullOrUndefined(hashMap[node.parent.id])) {
                hashMap[node.parent.id] = [];
            }
            hashMap[node.parent.id].push(node);
        }
        array.push(node);
        if (node.children) {
            for (let i = node.children.length - 1; i >= 0; i--) {
                stack.push({ ...node.children[i], parent: { ...node, children: null } });
            }
        }
    }
    if (typeof callback === 'function') {
        return callback(array, hashMap);
    }
    return array;
}
