import Crypto from './crypto.mjs';

function hash(d, s) {
  return new Crypto(d).salt(s).hash();
}

function uid() {
  return Crypto.uid();
}

export default { Crypto };

export { Crypto };
export { hash, uid };
