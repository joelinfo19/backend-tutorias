const Usuario=require('../models/usuario')
const {validationResult} = require("express-validator");
const {response}=require('express')
const bcrypt=require('bcryptjs')
const {generarJWT} = require("../helpers/jwt");


const getUsuarios=async (req,res)=> {

    const desde=Number(req.query.desde)||0
    console.log(desde)

    // const usuarios=await Usuario
    //     .find({},'nombre email role google')
    //     .skip(desde)
    //     .limit(5)
    // const total=await Usuario.count()
    // todo promise.all es un arreglo de promesas o sentencias asincronas que se ejecutan en simultaneo
    const [usuarios,total]=await Promise.all([
        Usuario
            .find({},'nombre email role google img')
            .skip(desde)
            .limit(5),
        Usuario.countDocuments()
    ])

    res.json({
        ok: true,
        usuarios,
        total
    })
}
const crearUsuario= async (req,res=response)=>{
    const {email,password,nombre}=req.body

    try{

        const existeEmail= await Usuario.findOne({email})
        if (existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'el correo ya esta registrado'
            })
        }


        const usuario=new Usuario(req.body)
        //Encriptar contrasenia
        const salt=bcrypt.genSaltSync()
        usuario.password=bcrypt.hashSync(password,salt)
        //guardar usuario
        await usuario.save()
        //Generar el TOKEN-JR
        const token=await generarJWT(usuario.id)

        // console.log(req.body)
        res.json({
            ok:true,
            usuario,
            token
        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'errror inesperado...'
        })
    }






}
const actualizarUsuario=async (req,res=response)=>{
    // TODO: Valida token y comprobar si es el usurio correcto

    const uid=req.params.id
    const {nombre,role,email}=req.body
    try{
        const usuarioDB=await Usuario.findById(uid)

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'no existe un usuario par ese id'
            })

        }
        const {password,google,email,...campos}= req.body
        if(usuarioDB.email!==email){
            const existeEmail=await Usuario.findOne({email})
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'ya existe un usuario con ese email'
                })
            }
        }
        if(!usuarioDB.google){

            campos.email=email
        }else if(usuarioDB.email!==email){
            return res.status(400).json({
                ok:false,
                msg:'Usuario de google no pueden cambiar su email'
            })

        }

        const usuarioActualizado=await Usuario.findByIdAndUpdate(uid,campos,{new:true})

        res.json({
            ok:true,
            usuario:usuarioActualizado

        })
    } catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'

        })
    }
}
const borrarUsuario=async (req,res=response)=>{
    const uid=req.params.id
    const {nombre,role,email}=req.body
    try{
        const usuarioDB=await  Usuario.findById(uid)

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'no existe un usuario par ese id'
            })

        }
        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg:'Usuario eliminado'
        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        })
    }
}

module.exports={
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}
