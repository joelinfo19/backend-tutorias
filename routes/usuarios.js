/*
* Ruta /api/usuarios
* */
const {validarJWT,validarADMIN_ROLE,validarADMIN_ROLE_o_MismoUsuario} = require("../middlewares/validar-jwt");
const {body}=require('express-validator')
const {Router}=require('express')
const {getUsuarios,crearUsuario,actualizarUsuario,borrarUsuario}=require('../controllers/usuarios')
const router=Router()
const {validarCampos}=require('../middlewares/validar-campos')



router.get('/',validarJWT,getUsuarios)
router.post('/',
    [
        body('nombre','El nombre es obligatorio').not().isEmpty(),
        body('password','El password es obligatorio').not().isEmpty(),
        body('email','El email es obligatorio').isEmail(),
        validarCampos,

    ],
    crearUsuario
)
router.put('/:id',[
    validarJWT,
    validarADMIN_ROLE_o_MismoUsuario,
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    body('email','El email es obligatorio').isEmail(),
    body('role','El role es obligatorio').not().isEmpty(),
    validarCampos

],actualizarUsuario)

router.delete('/:id',[
    [validarJWT,validarADMIN_ROLE],


],borrarUsuario)



module.exports=router
