const {validarJWT,validarADMIN_ROLE,validarADMIN_ROLE_o_MismoUsuario} = require("../middlewares/validar-jwt");
const {body}=require('express-validator')
const {Router}=require('express')
const {getTutorias,crearTutoria,actualizarTutoria,borrarTutoria}=require('../controllers/tutorias')
const router=Router()
const {validarCampos}=require('../middlewares/validar-campos')



router.get('/',getTutorias)
router.post('/',
    [
        validarJWT,
        body('direccion','El direccion es obligatorio').not().isEmpty(),
        body('codigo','El codigo es obligatorio').not().isEmpty(),
        body('fecha','El fecha es obligatorio').not().isEmpty(),
        body('tipoTutoria','El tipoTutoria es obligatorio').not().isEmpty(),
        body('descripcion','El descripcion es obligatorio').not().isEmpty(),
        body('estudiante','El idestudiante es obligatorio y debe ser valido').isMongoId(),
        body('docente','El iddocente es obligatorio y debe ser valido').isMongoId(),

        validarCampos,

    ],
    crearTutoria
)
router.put('/:id',[
    validarJWT,
    body('direccion','El direccion es obligatorio').not().isEmpty(),
    body('codigo','El codigo es obligatorio').not().isEmpty(),
    body('fecha','El fecha es obligatorio').not().isEmpty(),
    body('tipoTutoria','El tipoTutoria es obligatorio').not().isEmpty(),
    body('descripcion','El descripcion es obligatorio').not().isEmpty(),
    body('estudiante','El idestudiante es obligatorio y debe ser valido').isMongoId(),
    body('docente','El iddocente es obligatorio y debe ser valido').isMongoId(),
    validarCampos

],actualizarTutoria)

router.delete('/:id',borrarTutoria)



module.exports=router
