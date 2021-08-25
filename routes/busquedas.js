const {validarJWT} = require("../middlewares/validar-jwt");
const {Router}=require('express')
const {getTodo,getDocumentoCollections}=require('../controllers/busquedas')

const router=Router()

router.get('/:busqueda',validarJWT,getTodo)
router.get('/coleccion/:tabla/:busqueda',validarJWT,getDocumentoCollections)



module.exports=router
