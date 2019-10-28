module.exports = data => {
  const templateStrings = data.match(/\${((.*?))\}/g)
  if (!templateStrings || templateStrings.length === 0) {
    return []
  }

  return templateStrings.map(m => m.replace('${', '').replace('}', ''))
}
