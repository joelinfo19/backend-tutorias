const {Schema,model}=require('mongoose')


const TutoriaSchema=Schema({
    direccion:{
        type:String,
        required:true
    },
    codigo:{
        type:String,
        required:true,
        unique:true


    },
    fecha :{
        type:Object,
        required:true,

    },
    tipoTutoria:{
        type:String,
        required:true

    },
    descripcion :{
        type:String,
        required:true,

    },
    estudiante:{
        type:Schema.Types.ObjectId,
        ref:'Estudiante',
        required:true
    },
    docente:{
        type:Schema.Types.ObjectId,
        ref:'Docente',
        required:true
    }


})
TutoriaSchema.method('toJson',function () {
    const {__v,...object}=this.toObject()
    return object
})
module.exports=model('Tutoria',TutoriaSchema)
