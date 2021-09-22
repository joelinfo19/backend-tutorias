const getMenuFrontEnd=(role='USER_ROLE')=>{
    const menu= [
        {
            titulo:'Dashboard!!!',
            icon:'mdi mdi-gauge',
            submenu:[
                {titulo:'Main',url:'/'},
                // {titulo: 'ProgressBar',url:'progress'},
                // {titulo: 'Graficas',url:'grafica1'},
                // {titulo: 'Promesas',url:'promesas'},
                // {titulo: 'rxjs',url:'rxjs'},


            ]

        },
        {
            titulo:'Mantenimientos',
            icon:'mdi mdi-folder-lock-open',
            submenu:[
               // {titulo:'Usuarios',url:'usuarios'},
                {titulo:'Estudiantes',url:'estudiantes'},
                {titulo:'Docentes',url:'docentes'},
                {titulo:'Tutorias',url:'tutorias'},


            ]

        }
    ]
    if(role==='ADMIN_ROLE'){
        menu[1].submenu.unshift({titulo:'Usuarios',url:'usuarios'})
    }
    return menu
}
module.exports={
    getMenuFrontEnd
}
