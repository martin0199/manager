export default {
  requiredRule: {
    required: true,
    message: '该项为必输项！',
    trigger: ['blur', 'change']
  },
  createTime: isTrue => {
    var now = new Date()
    var year = now.getFullYear() // 年
    var month = now.getMonth() + 1 // 月
    var day = now.getDate() // 日
    var hh = now.getHours() // 时
    var mm = now.getMinutes() // 分
    var ss = now.getSeconds() // 秒
    if (isTrue === 'year') return year
    var clock = year + '-'
    if (month < 10) clock += '0'
    if (isTrue === 'month') return (clock += month)
    clock += month + '-'
    if (day < 10) clock += '0'
    clock += day
    // 精确到天
    if (isTrue === 'day') return clock
    clock += ' '
    if (hh < 10) clock += '0'
    clock += hh + ':'
    if (mm < 10) clock += '0'
    clock += mm + ':'
    if (ss < 10) clock += '0'
    clock += ss
    return clock
  },
  getNameByCode: (codeInfo, codeValue, isMult = false) => {
    if (!codeInfo) {
      return codeValue
    }
    if (!codeValue) {
      return ''
    }
    if (isMult) codeValue = isMult ? codeValue.split(',') : codeValue
    let codeName = ''
    const codeValues = []
    for (let i = 0; i < codeInfo.length; i++) {
      if (Array.isArray(codeValue)) {
        for (let j = 0; j < codeValue.length; j++) {
          if (codeValue[j] === codeInfo[i].value) {
            codeValues.push(codeInfo[i].content)
          }
        }
      } else {
        if (codeValue === codeInfo[i].value) {
          codeName = codeInfo[i].content
          break
        }
      }
      codeName = codeValues.join(',')
    }
    return codeName === '' ? codeValue : codeName
  },
  resetFrom (value) {
    for (const key in value) {
      if (typeof value[key] === 'string') {
        value[key] = ''
      } else if (typeof value[key] === 'number') {
        value[key] = -1
      } else if (typeof value[key] === 'object') {
        if (Array.isArray(value[key])) {
          value[key] = []
        } else {
          value[key] = null
        }
      } else if (typeof value[key] === 'undefined') {
        value[key] = undefined
      }
    }
    return value
  }
}
