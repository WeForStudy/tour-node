const success = (result) => {
  return {
    retCode: 200,
    retValue: result
  }
}
const failed = (error) => {
  console.log(error)
  return {
    retCode: 500,
    msg: error.message || error || '服务器异常'
  }
}
const successWithCode = msg => {
  return {
    retCode: 200,
    msg,
  }
}
const  filterUnderLine = (obj, char = '_') => {
  const arr =  Object.keys(obj).filter(item => item.indexOf(char) !== -1)
  arr.forEach(item => {
    const before = obj[item]
    const key = replaceUnderLine(item)
    obj[key] = before
    delete obj[item]
  })
  return obj
}
const replaceUnderLine = (val, char = '_') => {
  const arr = val.split('')
  const index = arr.indexOf(char)
  arr.splice(index, 2, arr[index+1].toUpperCase())
  val = arr.join('')
  return val
}

module.exports = {
  success,
  failed,
  successWithCode,
  filterUnderLine,
  replaceUnderLine,
}
