const compression = require('express-compression')
const express = require('express')
const cors = require('cors')

class Server{
    constructor(){
        this.app = express()
        this.port = process.env.APP_PORT
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(compression())
        this.app.use(cors())
        this.app.use(express.static('public'))
    }

    routes(){}

    listen(){
        this.app.listen(this.port,() => console.log(`Server on port ${this.port}`))
    }
}

module.exports = new Server()