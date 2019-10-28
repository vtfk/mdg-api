const render = require('es6-template-render')
const { json, send } = require('micro')

const getTemplate = (filename, response) => {
  try {
    return require(`./data/${filename}.json`)
  } catch (error) {
    send(response, 404, `Document type '${filename}' not found`)
  }
}

module.exports.getDocumentMetadata = async (request, response) => {
  try {
    const { id } = request.params
    const body = await json(request)
    const template = getTemplate(id, response)
    const data = render(JSON.stringify(template), body)

    // Verify that everything is replaced from the template
    const validation = data.match(/\${((.*?))\}/g)
    if (validation && validation.length > 0) {
      send(response, 400, `${validation.map(m => m.replace('${', '').replace('}', '')).join(', ')} needs to be filled out!`)
    }

    send(response, 200, data)
  } catch (error) {
    send(response, 500, error.message)
  }
}
