
const{response}=require('express')
const Usuario=require('../models/usuario')
const bcrypt=require('bcryptjs')
const {generarJWT} = require("../helpers/jwt");
// const{ googleVerify}=require('../helpers/google-verify')
const {getMenuFrontEnd}=require('../helpers/menu-fronted')

const login= async (req,res=response)=>{
    const {email,password}=req.body

    try{

        //Verificar email
        const usuarioDB=await Usuario.findOne({email})

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Email no encontrado '
            })
        }
        //Verificar contrasenia
        const validPassword=bcrypt.compareSync(password,usuarioDB.password)
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Contrasenia no es valida'
            })
        }


        //Generar el TOKEN-JR
        const token=await generarJWT(usuarioDB.id)



        res.json({
            ok:true,
            token,
            menu:getMenuFrontEnd(usuarioDB.role)
        })

    }
    catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        })
    }




}
// const googleSignIn= async (req,res=response)=>{
//     // const {email,password}=req.body
//     //
//     // try{
//     //
//     //     //Verificar email
//     //     const usuarioDB=await Usuario.findOne({email})
//     //
//     //     if(!usuarioDB){
//     //         return res.status(404).json({
//     //             ok:false,
//     //             msg:'Email no encontrado '
//     //         })
//     //     }
//     //     //Verificar contrasenia
//     //     const validPassword=bcrypt.compareSync(password,usuarioDB.password)
//     //     if(!validPassword){
//     //         return res.status(400).json({
//     //             ok:false,
//     //             msg:'Contrasenia no es valida'
//     //         })
//     //     }
//     //
//     //
//     //     //Generar el TOKEN-JR
//     //     const token=await generarJWT(usuarioDB.id)
//     //
//     //
//     //
//     //     res.json({
//     //         ok:true,
//     //         token
//     //     })
//     //
//     // }
//     // catch (error){
//     //     console.log(error)
//     //     res.status(500).json({
//     //         ok:false,
//     //         msg:'Hable con el admin'
//     //     })
//     // }
//
//     const googleToken=req.body.token
//
//     try{
//         const {name,email,picture}=await googleVerify(googleToken)
//         //verificar
//         const usuarioDB=await Usuario.findOne({email})
//         let usuario
//
//         if (!usuarioDB){
//             //si no existe el usuario
//             usuario=new Usuario({
//                 nombre:name,
//                 email,
//                 password:'@@@',
//                 img:picture,
//                 google:true
//             })
//         }else{
//             //existe usuario
//             usuario=usuarioDB
//             usuario.google=true
//             // if (!usuario.img) {
//             //     usuario.img = picture;
//             // }
//
//         }
//         //Guardar en base de datos
//         await usuario.save()
//         //Generar el TOKEN-JR
//         const token=await generarJWT(usuario.id)
//
//
//
//         res.json({
//             ok:true,
//             token,
//             menu:getMenuFrontEnd(usuario.role)
//
//         })
//
//
//
//
//
//
//     }catch (error){
//         res.status(401).json({
//             ok:false,
//             msg:'token no es correcto'
//         })
//
//     }
//
//
//
//
// }


const renewToken=async (req,res=response)=>{
    const uid=req.uid
    //Generar el TOKEN-JR
    const token=await generarJWT(uid)

    const usuario=await Usuario.findById(uid)
    res.json({
        ok:true,
        token,
        usuario,
        menu:getMenuFrontEnd(usuario.role)

    })
}
module.exports={
    login,
    renewToken
}
