import nzhcn from "nzh/cn"

export const sort = (data, key, type) => {
  let keys = key.split('.')
  return data.sort((a, b) => {
    let _a = a, _b = b;
    keys.forEach(f => {
      _a = _a[f]
      _b = _b[f]
    })
    switch (type) {
      case 'Date':
        _a = Date.parse(_a)
        _b = Date.parse(_b)
        break
      default:
        break
    }
    return _a > _b ? -1 : 1
  })
}

export const isunseen = (item) => {
  return item.attributes.flags.indexOf('\\Seen') < 0
}

export const dateNormalize = (date) => {
  if (typeof date === 'string') date = new Date(date)
  let now = new Date
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  let yesterday = ((t) => {
    t.setTime(today - 86400000)
    return t
  })(new Date)
  let d = now - date
  if (d < 600000) return '刚刚'
  if (d < 3600000) return `${nzhcn.encodeS(parseInt(d / 60000))}分钟前`
  if (d < 43200000) return `${nzhcn.encodeS(parseInt(d / 3600000))}小时前`
  if (date > today) return '今天'
  if (date > yesterday) return '昨天'
  return `${nzhcn.encodeS(parseInt(d / 86400000))}天前`
}