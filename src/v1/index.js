import hs256 from "crypto-js/hmac-sha256.js";
import sha1 from "crypto-js/sha1.js";
import timestamp from "../utils/timestamp.js";
import {encode, decode, assemble, disassemble} from "../utils";

/**
 * V1 带时间戳的简单Json Web Token模式
 */
export default class {
    /**
     * 预设的JWT header数据
     * @type {{typ: string, alg: string}}
     */
    header = {typ: "jwt", alg: "hs256"}

    /**
     * @param app 应用标识
     * @param encrypt_key string 时间戳加密密钥，使用AES加密，密钥位数为4的倍数
     * @param load_token_handler function 从本地获取 Token 的方法
     * @param header JWT 中的Token自定义参数
     */
    constructor(app, encrypt_key, load_token_handler, header = {}) {
        this.header = Object.assign({app: app}, this.header, header)
        this.encrypt_key = encrypt_key
        this._load_token_handler = load_token_handler
    }

    /**
     * 加密时间戳
     */
    time_sign() {
        return timestamp.encrypt(this.encrypt_key)
    }

    /**
     * 当前 Token 数据
     * @returns {*}
     */
    get_token() {
        if (typeof this._load_token_handler != 'function') return
        let token = this._load_token_handler()
        if (token === "" || token === null) {
            token = encode(this.header)

        }
        return token
    }
}


/**
 * 数据签名
 * @param header
 * @param payload
 * @param salt
 * @param alg
 * @returns {*}
 */
export function signature(header, payload, salt, alg = '') {
    const plaintext = header + '.' + payload;
    switch (alg.toLowerCase()) {
        case 'hs256':
            return hs256(plaintext, salt).toString();
        default:
            return sha1(plaintext).toString();
    }
}

/**
 * 是否签名
 * @param token
 * @returns {boolean}
 */
export function has_signed(token) {
    const arr = token.split('.')
    return arr.length === 3
}

/**
 * 验证签名
 * @param token
 * @param salt
 * @param alg
 * @returns {boolean}
 */
export function verify_signed(token, salt, alg = '') {
    let [header, payload, sign] = disassemble(token);
    return signature(header, payload, sign, alg) === sign;
}

/**
 * 解析token数据
 * @param token
 * @returns {any}
 */
export function parse(token) {
    let [header, payload, sign] = disassemble(token);
    const h = decode(header);
    if (payload === null && sign === null) {
        return h;
    } else {
        const p = decode(payload);
        return Object.assign(h, p);
    }
}
