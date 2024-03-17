import { Crypto, hash, uid } from '../src/index.mjs';

console.log('hash: ' + new Crypto('hello').hash());
console.log('hash: ' + new Crypto('hello').salt('salt').hash());

const d = 'hello world';
const k = 'booooooo';
console.log('original: ' + d);
const c = new Crypto(d).key(k).cipher();
console.log('cipher: ' + c);
const d2 = new Crypto(c).key(k).decipher();
console.log('decipher: ' + d2);

console.log('random number: ' + Crypto.randomNumber(100));

console.log('random string: ' + Crypto.randomString(16));
console.log('uid (not UUID): ' + Crypto.uid());
