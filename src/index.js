import timestamp from "./timestamp";
import {encode} from "./token";

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
     * @returns {Promise<any>}
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
