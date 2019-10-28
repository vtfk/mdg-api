const render = require('es6-template-render')
const { json, send } = require('micro')

const getTemplate = filename => require(`./data/${filename}.json`)

module.exports.getDocumentMetadata = async (request, response) => {
  const { id } = request.params
  const body = await json(request)
  const template = getTemplate(id)
  const data = render(JSON.stringify(template), body)
  send(response, 200, data)
}
