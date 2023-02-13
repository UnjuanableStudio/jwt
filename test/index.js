import Storage from '@dtlc/storage'
import JWT from '../src'

const key = import.meta.env.VITE_TIMESTAMP_ENCRYPT_KEY

const storage = new Storage()

const jwt = new JWT('web', key, () => {
    return storage.get('Token', null)
})

console.log(jwt.time_sign())
console.log(jwt.get_token())
