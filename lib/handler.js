const { json, send } = require('micro')
const { readdirSync, readFileSync } = require('fs')
const render = require('es6-template-render')
const md = require('markdown-it')()
const path = require('path')
const getTemplateFields = require('./get-template-fields')

const getTemplates = () => {
  const dir = path.join(__dirname, './data/')
  const files = readdirSync(dir)

  return files.map(file => {
    const templateName = file.replace('.json', '')
    const template = getTemplate(templateName)
    const templateFields = getTemplateFields(template)

    return {
      name: templateName,
      fields: templateFields,
      template: JSON.parse(template)
    }
  })
}

const getTemplate = (file, response) => {
  try {
    const template = require(`./data/${file}.json`)
    return JSON.stringify(template)
  } catch (error) {
    throw Error(`Document type '${file}' not found`)
  }
}

module.exports.getDocumentTypes = async (request, response) => {
  send(response, 200, await getTemplates())
}

module.exports.getDocumentMetadata = async (request, response) => {
  try {
    const { id } = request.params
    const body = await json(request)
    const template = getTemplate(id, response)
    const data = render(template, body)

    // Verify that everything is replaced from the template
    const validation = getTemplateFields(data)
    if (validation && validation.length > 0) {
      send(response, 400, `${validation.join(', ')} needs to be filled out!`)
    }

    send(response, 200, data)
  } catch (error) {
    send(response, 400, error.message)
  }
}

module.exports.getFrontpage = async (request, response) => {
  const readme = readFileSync(`${__dirname}/../README.md`, 'utf-8')
  send(response, 200, md.render(readme))
}
