const {validarJWT,validarADMIN_ROLE,validarADMIN_ROLE_o_MismoUsuario} = require("../middlewares/validar-jwt");
const {body}=require('express-validator')
const {Router}=require('express')
const {getDocentes,crearDocente,actualizarDocente,borrarDocente}=require('../controllers/docentes')
const router=Router()
const {validarCampos}=require('../middlewares/validar-campos')



router.get('/',getDocentes)
router.post('/',
    [
        validarJWT,
        body('nombre','El nombre es obligatorio').not().isEmpty(),
        body('titulo','El titulo es obligatorio').not().isEmpty(),
        body('facultad','El facultad es obligatorio').not().isEmpty(),
        body('escuela','El escuela es obligatorio').not().isEmpty(),
        body('categoria','El categoria es obligatorio').not().isEmpty(),
        // body('rold','El rol es obligatorio').not().isEmpty(),

        validarCampos,

    ],
    crearDocente
)
router.put('/:id',[
    validarJWT,
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    body('titulo','El titulo es obligatorio').not().isEmpty(),
    body('facultad','El facultad es obligatorio').not().isEmpty(),
    body('escuela','El escuela es obligatorio').not().isEmpty(),
    body('categoria','El categoria es obligatorio').not().isEmpty(),
    // body('rold','El rol es obligatorio').not().isEmpty(),

    validarCampos,

],actualizarDocente)

router.delete('/:id',borrarDocente)



module.exports=router
