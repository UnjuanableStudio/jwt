import {Base64} from "js-base64";

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
