const mongoose= require('mongoose')

const dbConnection=async ()=>{


        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true


        }).then(()=>{
            console.log('conectado')
        }).catch(err=>{
            console.error(err)
        })



}
module.exports={
    dbConnection
}

