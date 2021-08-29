const fs=require('fs')
const Usuario=require('../models/usuario')
const Estudiante=require('../models/estudiante')
const Docente=require('../models/docente')

// const Medico=require('../models/medico')
// const Hospital=require('../models/hospital')
// const Medico;
// const Hospital;
const borrarImagen=(path)=>{
    if(fs.existsSync(path)){
        //borrar la imagen
        fs.unlinkSync(path)

    }
}
const actualizarImagen= async (tipo,id,nombreArchivo)=>{
    let pathViejo=''
    switch (tipo) {
        case 'docentes':
            const docente=await Docente.findById(id)
            if (!docente){
                console.log('No es un Medico por id')
                return false
            }
            pathViejo=`./uploads/docentes/${docente.img}`
            borrarImagen(pathViejo)

            docente.img=nombreArchivo

            await docente.save()
            return true


            break;
        case 'estudiantes':
            const estudiante=await Estudiante.findById(id)
            if (!estudiante){
                console.log('No es un Medico por id')
                return false
            }
            pathViejo=`./uploads/estudiantes/${estudiante.img}`
            borrarImagen(pathViejo)

            estudiante.img=nombreArchivo

            await estudiante.save()
            return true
            break;
        case 'usuarios':
            const usuario=await Usuario.findById(id)
            if (!usuario){
                console.log('No es un Medico por id')
                return false
            }
            pathViejo=`./uploads/usuarios/${usuario.img}`
            borrarImagen(pathViejo)

            usuario.img=nombreArchivo

            await usuario.save()
            return true
            break;
    }
}

module.exports={
    actualizarImagen
}
