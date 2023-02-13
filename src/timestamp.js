import CryptoJS from 'crypto-js'

export default {
    /**
     *  当前时间戳
     */
    timestamp: Math.ceil(new Date().getTime() / 1000),
    /**
     * 加密
     * @param keyStr 密钥
     * @returns {string}
     */
    encrypt(keyStr) {
        if (keyStr == null) {
            console.error("Undefined Encrypt Key")
            return
        }
        const key = CryptoJS?.enc.Utf8.parse(keyStr)
        const time = CryptoJS?.enc.Utf8.parse(this.timestamp)
        const encrypted = CryptoJS?.AES.encrypt(time, key, {mode: CryptoJS?.mode.ECB, padding: CryptoJS?.pad.Pkcs7})
        return encrypted.toString()
    },
    /**
     * 解密
     * @param cypher 密文
     * @param keyStr 密钥
     * @returns {*}
     */
    decrypt(cypher, keyStr) {
        if (cypher == null) {
            console.error("Undefined Cypher String")
            return
        }
        if (keyStr == null) {
            console.error("Undefined Encrypt Key")
            return
        }
        const key = CryptoJS?.enc.Utf8.parse(keyStr)
        const decrypt = CryptoJS?.AES.decrypt(cypher, key, {mode: CryptoJS?.mode.ECB, padding: CryptoJS?.pad.Pkcs7})
        return CryptoJS?.enc.Utf8.stringify(decrypt).toString()
    }
}
