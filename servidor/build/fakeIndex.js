const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const bcrypt = require('bcrypt') //Para encriptado de contraseñas
const passport = require('passport')
const flash = require('express-flash')
//Para manejo de sesiones
const session = require('express-session')

//Para passport-config
const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email=>users.find(user=>user.email === email)
) //Entregamos passport inicializado, además busca email dentro de arreglo de users

//Importante para el recibir data
app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
    secret: 'feedbakh-secret' ,
    resave: false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())


app.get('/', (req, res)=>{
    res.send("Hola")
})

app.get('/home', (req, res)=>{
    res.status(200).send({message: "todo bien"});
})

app.get('/ok', (req, res)=>{
    res.status(200).send({message: "todo bien"});
})

const users = []

//PROBLEMA CON REDIRECT(?)
app.post('/login', passport.authenticate('local', {
    successRedirect: '/ok',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: true
    //Aun no envia errores a formulario¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡
}))

app.post('/register', async (req, res)=>{
    console.log(req.body)
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const hashedRepetirPassword = await bcrypt.hash(req.body.repetirPassword, 10)
        
        //ACÁ COMPROBARIAMOS EN DATABASE Y SI TODO OK LO SUBIMOS
        users.push({
            //Pedimos valores del "name" en el campo determinado del formulario
            id: Date.now().toString(),
            name: req.body.nombre,
            apellidoPaterno: req.body.apellidoPaterno,
            apellidoMaterno: req.body.apellidoMaterno,
            email: req.body.email,
            password: hashedPassword,
            repetirPassword: hashedRepetirPassword      

        })
        res.status(200).send({message: 'Todo Ok nos vamos al login'})
        //Lo que hará cuando salga bien
    }
    catch{
        //Si sale mal te redirige a redirect
        res.status(401).send({message: 'Todo mal volvemos a register'})

    }

    console.log(users)
})

app.listen(3000)
console.log("Servidor funcionado en http://localhost:3000")