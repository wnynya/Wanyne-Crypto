'use strict';

import crypto from 'node:crypto';

class Crypto {
  constructor(d = crypto.randomBytes(256).toString('hex')) {
    this.d = d;
    this.s = '';
    this.k = '';
    return this;
  }

  salt(s) {
    if (s) {
      this.s = s;
    }
    return this;
  }

  key(k) {
    if (k) {
      this.k = k;
    }
    return this;
  }

  hash(algorithm = 'SHA-512') {
    const source = crypto.createHash(algorithm, this.s.toString());
    source.update(this.d.toString());
    const hash = source.digest('hex');
    return hash;
  }

  cipher(iv = Buffer.alloc(16, 0), algorithm = 'AES-256-CBC') {
    this.k = new Crypto(this.k).hash().substring(0, 32);
    const source = crypto.createCipheriv(algorithm, this.k, iv);
    let result = source.update(this.d.toString(), 'utf8', 'hex');
    result += source.final('hex');
    return result;
  }

  decipher(iv = Buffer.alloc(16, 0), algorithm = 'AES-256-CBC') {
    this.k = new Crypto(this.k).hash().substring(0, 32);
    const source = crypto.createDecipheriv(algorithm, this.k, iv);
    let result = source.update(this.d.toString(), 'hex', 'utf8');
    result += source.final('utf8');
    return result;
  }

  static randomNumber(amp = 1.0) {
    return crypto.randomInt(0, 281474976710655) / (281474976710655 / amp);
  }

  static randomString(length, pool = '0123456789abcdefghijklmnopqrstuvwxyz') {
    if (typeof pool == 'string') {
      if (pool == 'hex') {
        pool = '0123456789abcdef'.split('');
      } else if (pool == 'num' || pool == 'number') {
        pool = '0123456789'.split('');
      } else {
        pool = pool.split('');
      }
    } else if (!(pool instanceof Array)) {
      throw new Error('pool must instanceof Array or typeof string');
    }
    let string = '';
    for (let i = 0; i < length; i++) {
      string += pool[Math.floor(this.randomNumber(pool.length))];
    }
    return string;
  }

  static random(amp) {
    return this.randomNumber(amp);
  }

  static uuid() {
    return crypto.randomUUID();
  }
}

export default Crypto;
