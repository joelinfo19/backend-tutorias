const Docente=require('../models/docente')
const {validationResult} = require("express-validator");
const {response}=require('express')
const bcrypt=require('bcryptjs')
const {generarJWT} = require("../helpers/jwt");


const getDocentes=async (req,res)=> {
    // nombre:{
    //     type:String,
    //         required:true
    // },
    // titulo:{
    //     type:String,
    //         required:true,
    // },
    // facultad :{
    //     type:String,
    //         required:true,
    //
    // },
    // escuela:{
    //     type:String,
    //         required:true
    //
    // },
    // categoria :{
    //     type:String,
    //         required:true,
    //
    // },
    // rold :{
    //     type:String,
    //         required:true,
    // default:'DOCENTE_ROLD'
    // },
    // img:{
    //     type:String,
    // }

    // todo promise.all es un arreglo de promesas o sentencias asincronas que se ejecutan en simultaneo
    const [docentes,total]=await Promise.all([
        Docente
            .find({},'nombre titulo facultad escuela categoria rold img'),

        Docente.countDocuments()
    ])

    res.json({
        ok: true,
        docentes,
        total
    })
}
const crearDocente= async (req,res=response)=>{
    const uid=req.uid
    const docente=new Docente({
        usuario:uid,
        ...req.body})
    try{
        const docenteDB= await docente.save()
        res.json({
            ok: true,
            docente:docenteDB
        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el admin'
        })
    }






}
const actualizarDocente=async (req,res=response)=>{
    const id=req.params.id
    const uid=req.uid
    try{
        const docenteDB=await Docente.findById(id)
        if(!docenteDB){
            return res.status(404).json({
                ok:true,
                msg:'Docente no encontrado por id'
            })
        }
        const cambiosDocente={
            ...req.body,
            usuario:uid
        }
        const docenteActualizado=await Docente.findByIdAndUpdate(id,cambiosDocente,{new:true})
        res.json({
            ok: true,
            msg:'actualizardocente',
            docente:docenteActualizado
        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el admin'
        })
    }
}
const borrarDocente=async (req,res=response)=>{
    const id=req.params.id

    try{
        const docenteDB=await Docente.findById(id)
        if(!docenteDB){
            return res.status(404).json({
                ok:true,
                msg:'Docente no encontrado por id'
            })
        }
        await Docente.findByIdAndDelete(id)
        res.json({
            ok: true,
            msg:'borrardocentes'

        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el adminnnnn'
        })
    }
}
const getDocenteById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const docente = await Docente.findById(id)


        res.json({
            ok: true,
            docente
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
    getDocentes,
    crearDocente,
    actualizarDocente,
    borrarDocente,
    getDocenteById
}
