import {Base64} from "js-base64";
import hs256 from 'crypto-js/hmac-sha256'
import sha1 from 'crypto-js/sha1'

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

/**
 * 编码
 * @param arr
 * @returns {string}
 */
export function encode(arr) {
    return Base64.encodeURI(JSON.stringify(arr))
}

/**
 * 解码
 * @param str
 * @returns {any}
 */
export function decode(str) {
    return JSON.parse(Base64.decode(str))
}

/**
 * 组装
 * @param header
 * @param payload
 * @param sign
 * @returns {string}
 */
export function assemble(header, payload, sign) {
    return header + '.' + payload + '.' + sign
}

/**
 * 分解
 * @param token
 * @returns {*[]|*|string[]}
 */
export function disassemble(token) {
    const arr = token.split('.')
    if (arr.length === 3) {
        return arr;
    }
    return [arr[0], null, null];
}

