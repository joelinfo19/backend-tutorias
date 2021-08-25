const Estudiante=require('../models/estudiante')
const {validationResult} = require("express-validator");
const {response}=require('express')
const bcrypt=require('bcryptjs')
const {generarJWT} = require("../helpers/jwt");


const getEstudiantes=async (req,res)=> {

    // todo promise.all es un arreglo de promesas o sentencias asincronas que se ejecutan en simultaneo
    const [estudiantes,total]=await Promise.all([
        Estudiante
            .find({},'nombre codigo escuela codigoEp anioSemestre img'),

        Estudiante.countDocuments()
    ])

    res.json({
        ok: true,
        estudiantes,
        total
    })
}
const crearEstudiante= async (req,res=response)=>{
    const uid=req.uid
    const estudiante=new Estudiante({
        usuario:uid,
        ...req.body})
    try{
        const estudianteDB= await estudiante.save()
        res.json({
            ok: true,
            estudiante:estudianteDB
        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el admin'
        })
    }






}
const actualizarEstudiante=async (req,res=response)=>{
    const id=req.params.id
    const uid=req.uid
    try{
        const estudianteDB=await Estudiante.findById(id)
        if(!estudianteDB){
            return res.status(404).json({
                ok:true,
                msg:'Estudiante no encontrado por id'
            })
        }
        const cambiosEstudiante={
            ...req.body,
            usuario:uid
        }
        const estudianteActualizado=await Estudiante.findByIdAndUpdate(id,cambiosEstudiante,{new:true})
        res.json({
            ok: true,
            msg:'actualizarestudiantes',
            estudiante:estudianteActualizado
        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el admin'
        })
    }
}
const borrarEstudiante=async (req,res=response)=>{
    const id=req.params.id

    try{
        const estudianteDB=await Estudiante.findById(id)
        if(!estudianteDB){
            return res.status(404).json({
                ok:true,
                msg:'Estudiante no encontrado por id'
            })
        }
        await Estudiante.findByIdAndDelete(id)
        res.json({
            ok: true,
            msg:'borrarestudiantes'

        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el adminnnnn'
        })
    }
}

module.exports={
    getEstudiantes,
    crearEstudiante,
    actualizarEstudiante,
    borrarEstudiante
}
