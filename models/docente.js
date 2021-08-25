const {Schema,model}=require('mongoose')


const DocenteSchema=Schema({
    nombre:{
        type:String,
        required:true
    },
    titulo:{
        type:String,
        required:true,
    },
    facultad :{
        type:String,
        required:true,

    },
    escuela:{
        type:String,
        required:true

    },
    categoria :{
        type:String,
        required:true,

    },
    rold :{
        type:String,
        required:true,
        default:'DOCENTE_ROLD'
    },
    img:{
        type:String,
    }


})
DocenteSchema.method('toJson',function () {
    const {__v,...object}=this.toObject()
    return object
})
module.exports=model('Docente',DocenteSchema)
