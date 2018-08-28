const controller = require('../../controller/admin')
const pojo = require('../../helper/pojo')
const {
  success,
  failed,
  filterUnderLine
} = pojo
const NodeRSA = require('node-rsa')
let myKey = {
  isInit: false,
};
const initKey = () => {
  const key = new NodeRSA({
    b: 512
  }); // 生成新的512位长度密钥

  // 如果被初始化过就是解密需要的步骤
  if (myKey.isInit) {
    key.importKey(myKey.privateKey)
    return key
  }

  // 新生成的对象，保留公钥和私钥
  const publicDer = key.exportKey('public'); // 公钥
  const privateDer = key.exportKey('private'); // 私钥
  myKey = {
    publicKey: publicDer,
    privateKey: privateDer,
    isInit: true,
  }
}

// 获取公钥的接口
const getKey = async ctx => {
  try {
    let res;
    // 判断是否存在RSA-key对象
    if (!myKey.isInit) {
      initKey() // 初始化key 对象
    }
    res = success(myKey.publicKey)
    ctx.body = res
  } catch (err) {
    res = failed(err)
  }
}

// 登录接口
const login = async ctx => {
  let res;
  try {
    const val = ctx.request.body
    if (!myKey.isInit) {
      res = {
        retCode: 403,
        message: '密钥无法匹配，请重新获取密钥'
      }
    } else {
      const myKey = initKey()// 通过私钥获取RSA对象
      const data = Object.keys(val).reduce((init, key) => {
        const beforeDencrypt = val[key] // 解密前
        const item = myKey.decrypt(beforeDencrypt, 'utf8') // 解密后
        init[key] = item
        return init
      }, {})
      // 调用真正的登录接口
      await controller.login(data).then(result => {
        if (result.length === 0 || result === null || result === undefined)
          res = failed('用户名或密码不对')
        else
          res = success(filterUnderLine(result[0]))
      })
    }
    ctx.body = res
  } catch (err) {
    res = failed(err)
  }

}
module.exports = {
  login,
  getKey,
}