const {Schema,model}=require('mongoose')


const EstudianteSchema=Schema({
    nombre:{
        type:String,
        required:true
    },
    codigo:{
        type:String,
        required:true,
        unique:true


    },
    escuela :{
        type:String,
        required:true,

    },
    codigoEp:{
        type:String,
        required:true

    },
    anioSemestre :{
        type:String,
        required:true,

    },
    img:{
        type:String,
    }


})
EstudianteSchema.method('toJson',function () {
    const {__v,...object}=this.toObject()
    return object
})
module.exports=model('Estudiante',EstudianteSchema)
