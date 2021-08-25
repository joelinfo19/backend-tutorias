const express = require('express');
const {dbConnection}=require('./database/config')
require('dotenv').config()

var cors=require('cors')
// Create the express serer
const app =express();

//configure cors
app.use(cors())
//lectura y parseo del body
app.use(express.json())

//base de datos
dbConnection()
//directorio publico
app.use(express.static('public'))

app.use('/api/usuarios',require('./routes/usuarios'))
app.use('/api/estudiantes',require('./routes/estudiantes'))
app.use('/api/docentes',require('./routes/docentes'))
app.use('/api/tutorias',require('./routes/tutorias'))

// app.use('/api/todo',require('./routes/busquedas'))
// app.use('/api/upload',require('./routes/uploads'))
//
//
app.use('/api/login',require('./routes/auth'))


app.listen(process.env.PORT,()=>{
    console.log('Run server'+process.env.PORT)
})
