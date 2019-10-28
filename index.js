const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const handler = require('./lib/handler')

// Initialize router
const router = Router()
router.use(cors())

// Routes
// router.post('/api/case/:id', handler.getCaseMetadata)
router.get('/api/document', handler.getDocumentTypes)
router.post('/api/document/:id', handler.getDocumentMetadata)

// router.post('/api/contactperson', handler.getContactPersonMetadata)
// router.post('/api/privateperson', handler.getPrivatePersonMetadata)
// router.post('/api/enterprise', handler.getEnterpriseMetadata)

// Frontpage
router.get('/*', handler.getFrontpage)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
