const controller = require('../../controller/admin')
const model = require('../model')
const pojo = require('../../helper/pojo')
const { success, failed, filterUnderLine }  = pojo
const m  = model([
  'list',
  'add',
  'update',
  'del',
], 'admin')

const single = async ctx => {
  let res;
  try {
    const val = ctx.request.body
    await controller.single(val).then(result => {
      if(result.length === 0 || result === null || result === undefined)  
        res = failed('操作失败')
      else 
        res = success(filterUnderLine(result[0]))
    })
  } catch(err) {
    res = failed(err)
  }
  ctx.body = res
}
const login = async ctx => {
  let res;
  try {
    const val = ctx.request.body
    await controller.login(val).then(result => {
      if(result.length === 0 || result === null || result === undefined)  
        res = failed('用户名或密码不对')
      else 
        res = success(filterUnderLine(result[0]))
    })
  } catch(err) {
    res = failed(err)
  }
  ctx.body = res
}
module.exports = {
  ...m,
  login,
  single,
}

// const add = async ctx => {
//   let res;
//   try {
//     const val = ctx.request.body
//     await controller.add(val).then(result => {
//       res = success(result)
//     })
//   } catch(err) {
//     res = failed(err)
//   }
//   ctx.body = res
// }

// const update = async ctx => {
//   let res;
//   try {
//     const val = ctx.request.body
//     await controller.update(val).then(result => {
//       res = success(result)
//     })
//   } catch(err) {
//     res = failed(err)
//   }
//   ctx.body = res
// }

// const del = async ctx => {
//   let res;
//   try {
//     const val = ctx.request.body
//     await controller.del(val).then(result => {
//       res = success(result)
//     })
//   } catch(err) {
//     res = failed(err)
//   }
//   ctx.body = res
// }

// // module.exports = {
// //   list,
// //   add,
// //   update,
// //   del,
// // }

