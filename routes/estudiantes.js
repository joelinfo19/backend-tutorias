const {validarJWT,validarADMIN_ROLE,validarADMIN_ROLE_o_MismoUsuario} = require("../middlewares/validar-jwt");
const {body}=require('express-validator')
const {Router}=require('express')
const {getEstudiantes,crearEstudiante,actualizarEstudiante,borrarEstudiante,getEstudianteById}=require('../controllers/estudiantes')
const router=Router()
const {validarCampos}=require('../middlewares/validar-campos')



router.get('/',getEstudiantes)
router.post('/',
    [
        validarJWT,
        body('nombre','El nombre es obligatorio').not().isEmpty(),
        body('codigo','El codigo es obligatorio').not().isEmpty(),
        body('escuela','El escuela es obligatorio').not().isEmpty(),
        body('codigoEp','El codigoEP es obligatorio').not().isEmpty(),
        body('anioSemestre','El anioSemestre es obligatorio').not().isEmpty(),

        validarCampos,

    ],
    crearEstudiante
)
router.put('/:id',[
    validarJWT,
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    body('codigo','El codigo es obligatorio').not().isEmpty(),
    body('escuela','El escuela es obligatorio').not().isEmpty(),
    body('codigoEp','El codigoEP es obligatorio').not().isEmpty(),
    body('anioSemestre','El anioSemestre es obligatorio').not().isEmpty(),
    validarCampos

],actualizarEstudiante)

router.delete('/:id',borrarEstudiante)
router.get( '/:id',
    validarJWT,
    getEstudianteById
);


module.exports=router
