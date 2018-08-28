const pojo = require('../../helper/pojo')
const { success, failed, successWithCode, filterUnderLine } = pojo
const list = [
  'del',
  'add',
  'update',
]
/**
 * 
 * @param {*} config  对应的方法，要定义的哪几个方法模块，单个services层传入
 * @param {*} file 对应的controller文件名称
 * @return 返回一个对应好的对象
 */
module.exports = (config, file) => {
  const controller = require(`../../controller/${file}`)
	return config.reduce((copy, name) => {
    copy[name] = async ctx => {
      let res;
      try {
        const val = ctx.request.body
        await controller[name](val).then(result => {
          // 没有数据返回的接口直接返回msg和code
          if (list.indexOf(name) !== -1) {
            res = successWithCode('操作成功')
            return
          }
          // 其他模块方法直接过滤数据下划线
          const arr = result.map(item => filterUnderLine(item))
          res = success(arr)
        })
      } catch(err) {
        res = failed(err)
      }
      ctx.body = res
    }
	  return copy
	}, {})
}
