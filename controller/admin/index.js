// 在lib下封装好的mysql数据库连接池
const pool = require('../../lib/mysql')
// NtNUpdate, not null update的意思，取非空字段去更新
const { NtNUpdate } = require('../../helper')
// STATUS是定义的枚举对象
const { STATUS } = require('../../enum')
// 封装好的数据库连接池对象
const { query } = pool
// 新添管理员
const add = (val) => {
  const { account, phone, password, name, creator, type } = val
  const _sql = 'insert into tour_admin(account,phone,password,create_time,creator,name,type,status) values(?,?,?,now(),?,?,?,?);'
  return query( _sql, [ account, phone, password, creator, name, type, STATUS.NORMAL,])
}

const login = (val) => {
  const { account, password } = val
  const _sql = 'select * from tour_admin where account = ? and password = ? and status = ?'
  return query( _sql, [ account, password, STATUS.NORMAL ] )
}

// 更改管理员
const update = (val) => {
  const { account, phone, password, name, type, id } = val
  let _sql = 'update tour_admin set '
  const { sql, args } = NtNUpdate({ account, phone, password, name, type }, _sql)
  _sql = sql + 'where id = ?'
  const arr = [ ...args, id]
  return query( _sql, arr )
}

// 查询管理员
const list = val => {
  const sql = 'select * from tour_admin where status != ?'
  return query(sql, [ STATUS.DELED ])
}

// 查询单个管理员byId
const single = val => {
  const { id } = val
  const sql = 'select * from tour_admin where status != ? and id = ?'
  return query(sql, [ STATUS.DELED, id ])
}

// 删除管理员
const del = val => {
  const { id } = val
  const sql = 'update tour_admin set status = ? where id = ?'
  return query(sql, [ STATUS.DELED, id ])
}

module.exports = {
  add,
  list,
  update,
  del,
  login,
  single,
}