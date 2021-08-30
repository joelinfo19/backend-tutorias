const Tutoria=require('../models/tutoria')
const {validationResult} = require("express-validator");
const {response}=require('express')
const bcrypt=require('bcryptjs')
const {generarJWT} = require("../helpers/jwt");


const getTutorias=async (req,res=response)=> {
    const tutorias=await Tutoria.find()//muestra todo de hospitales en la base de datos
        .populate('estudiante','nombre img') // populate muestra los valores de otra coleccion
        .populate('docente','nombre img') // populate muestra los valores de otra coleccion

    res.json({
        ok: true,
        tutorias
    })
}
const crearTutoria= async (req,res=response)=>{
    const uid=req.uid
    const tutoria=new Tutoria({
        usuario:uid,
        ...req.body})
    try{
        const tutoriaDB= await tutoria.save()
        res.json({
            ok: true,
            tutoria:tutoriaDB
        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el admin'
        })
    }






}
const actualizarTutoria=async (req,res=response)=>{
    const id=req.params.id
    const uid=req.uid
    try{
        const tutoriaDB=await Tutoria.findById(id)
        if(!tutoriaDB){
            return res.status(404).json({
                ok:true,
                msg:'Tutoria no encontrado por id'
            })
        }
        const cambiosTutoria={
            ...req.body,
            usuario:uid
        }
        const tutoriaActualizado=await Tutoria.findByIdAndUpdate(id,cambiosTutoria,{new:true})
        res.json({
            ok: true,
            msg:'actualizartutorias',
            tutoria:tutoriaActualizado
        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el admin'
        })
    }
}
const borrarTutoria=async (req,res=response)=>{
    const id=req.params.id

    try{
        const tutoriaDB=await Tutoria.findById(id)
        if(!tutoriaDB){
            return res.status(404).json({
                ok:true,
                msg:'tutoria no encontrado por id'
            })
        }
        await Tutoria.findByIdAndDelete(id)
        res.json({
            ok: true,
            msg:'borrartutoria'

        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el adminnnnn'
        })
    }
}
const getTutoriaById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const tutoria = await Tutoria.findById(id)


        res.json({
            ok: true,
            tutoria
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}
module.exports={
    getTutorias,
    crearTutoria,
    actualizarTutoria,
    borrarTutoria,
    getTutoriaById
}
