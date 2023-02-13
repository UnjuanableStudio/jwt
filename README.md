# 安装

#### npm

```shell script
npm install -S @dtlc/jwt
```

#### yarn

```shell script
yarn add @dtlc/jwt
```

# 工具

```js
import {signature, has_signed, verify_signed, parse, encode, decode, assemble, disassemble} from '@dtlc/jwt/utils'
// 签名
signature(header, payload, salt, [alg = ''])
// 是否签名
has_signed(token)
// 验证签名
verify_signed(token, salt, [alg = ''])
// 解析token数据
parse(token)
// 编码
encode(arr)
// 解码
decode(str)
// 组装
assemble(header, payload, sign)
// 分解
disassemble(token)

```
