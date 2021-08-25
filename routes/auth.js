/*
    Path: '/api/login'
 */

const {validarJWT} = require("../middlewares/validar-jwt");
const {body} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");
const {Router}=require('express')
const {login,renewToken}=require('../controllers/auth')

const router=Router()


router.post('/',[
        body('email','El email es obligatorio').isEmail(),
        body('password','El password es obligatorio').not().isEmpty(),
        validarCampos
    ],login
)


// router.post('/google',[
//         body('token','El token de google es obligatorio').not().isEmpty(),
//         validarCampos
//     ],googleSignIn
// )

router.get('/renew',validarJWT,renewToken
)








module.exports=router
