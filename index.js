const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const handler = require('./lib/handler')

// Initialize router
const router = Router()
router.use(cors())

// Routes
router.get('/*', handler.getFrontpage)
// router.post('/api/case/:id', handler.getCaseMetadata)
// router.post('/api/document/', handler.getDocumentTypes)
router.post('/api/document/:id', handler.getDocumentMetadata)

// router.post('/api/contactperson', handler.getContactPersonMetadata)
// router.post('/api/privateperson', handler.getPrivatePersonMetadata)
// router.post('/api/enterprise', handler.getEnterpriseMetadata)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
