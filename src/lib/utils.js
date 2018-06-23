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