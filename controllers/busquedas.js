//get todo
const {response}=require('express')
const Usuario=require('../models/usuario')
const Estudiantes=require('../models/estudiante')
const Docentes=require('../models/docente')
const Tutorias=require('../models/tutoria')
const getTodo=async (req,res=response)=>{
    const busqueda=req.params.busqueda
    const regex=new RegExp(busqueda,'i')
    // const usuarios=await Usuario.find({
    //     nombre: regex
    // })
    // const medicos=await Medicos.find({
    //     nombre: regex
    // })
    // const hospitales=await Hospitales.find({
    //     nombre: regex
    // })
    const [usuarios,estudiantes,docentes,tutorias]=await Promise.all([
        Usuario.find({
            nombre: regex
        }),
        Estudiantes.find({
            nombre: regex
        }),
        Docentes.find({
            nombre: regex
        }),
        Tutorias.find({
            direccion: regex
        }),


    ])


    res.json({
        ok:true,
        usuarios,
        estudiantes,
        docentes,
        tutorias,
        busqueda
    })
}
const getDocumentoCollections=async (req,res=response)=>{
    const tabla=req.params.tabla

    const busqueda=req.params.busqueda
    const regex=new RegExp(busqueda,'i')
    let data=[]
    switch (tabla){
        case 'estudiantes':
            data=await Estudiantes.find({
                nombre: regex
            })
                // .populate('usuario','nombre img')
                // .populate('hospital','nombre img')



            break;
        case 'tutorias':
            data=await Tutorias.find({
                direccion: regex
            })
            .populate('estudiante','nombre img')
            .populate('docente','nombre img')



            break;
        case 'docentes':
            data=await Docentes.find({
                nombre: regex
            })
                // .populate('usuario','nombre img')

            break;
        case 'usuarios':
            data=await Usuario.find({
                nombre: regex
            })

            break;
        default:
            return res.status(400).json({
                ok:false,
                msg:'La tabla tienes qu eser user/estudiantes/docentes'
            })



    }

    res.json({
        ok:true,
        resultados:data
    })
}

module.exports={
    getTodo,
    getDocumentoCollections
}
