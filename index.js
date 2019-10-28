const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const handler = require('./lib/handler')

// Initialize router
const router = Router()
router.use(cors())

// Routes
// router.get('/', handler.getFrontpage)
router.get('/api/case/:id', handler.getCaseMetadata)
// router.get('/api/document/', handler.getDocumentTypes)

// router.get('/api/contactperson', handler.getContactPersonMetadata)
// router.get('/api/privateperson', handler.getPrivatePersonMetadata)
// router.get('/api/enterprise', handler.getEnterpriseMetadata)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
