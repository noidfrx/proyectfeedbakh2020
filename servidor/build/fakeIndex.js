const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express()

//Importante para el recibir data
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res)=>{
    res.send("Hola")
})

const users = []

//Cambiar a .POST
app.post('/login', (req, res)=>{
    res.send("Login")
})

//Cambiar a .POST
app.post('/register', async (req, res)=>{
    console.log(req.body)
    try{
        //const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            //Pedimos valores del "name" en el campo determinado del formulario
            id: Date.now().toString(),
            name: req.body.nombre,
            email: req.body.email,
            password: req.body.password

        })
        res.status(200).send({message: 'Todo Ok'})
        //Lo que hará cuando salga bien
    }
    catch{
        //Si sale mal te redirige a redirect
        res.status(401).send({message: 'Todo mal'})

    }

    console.log(users)
})

app.listen(3000)