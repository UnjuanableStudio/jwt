import Storage from '@unjuanable/storage'
import {V1} from '../src'

const key = import.meta.env.VITE_TIMESTAMP_ENCRYPT_KEY

// 测试模式中从storage中获取参数，正式版本的包中不集成该功能
const storage = new Storage()

const jwt = new V1('web', key, () => {
    return storage.get('Token', null)
})

console.log("V1:")
console.log("timestamp:", jwt.time_sign())
console.log("token:", jwt.get_token())
console.log("==========")
