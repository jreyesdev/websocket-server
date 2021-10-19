const fs = require('fs')
const path = require('path')

class Ticket{
    constructor(num, escritorio){
        this.numero = num
        this.escritorio = escritorio
    }
}

class TicketControl{
    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        this.init();
    }

    get toJson(){
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    init(){
        const { hoy, ultimo, tickets, ultimos4 } = require('../db/data.json')
        if(hoy == new Date().getDate()){
            this.ultimo = ultimo
            this.tickets = tickets
            this.ultimos4 = ultimos4
        }else{
            this.guardaBD()
        }
    }

    guardaBD(){
        const file = path.join(__dirname,'../db/data.json')
        fs.writeFileSync(file,JSON.stringify(this.toJson))
    }

    siguiente(){
        this.ultimo += 1
        this.tickets.push(new Ticket(this.ultimo,null))
        this.guardaBD()
        return 'Ticket ' + this.ultimo
    }

    atenderTicket(escritorio){
        if(this.tickets.length === 0) return null

        const ticket = this.tickets.shift()
        ticket.escritorio = escritorio
        // Agrega al principio
        this.ultimos4.unshift(ticket)
        // Elimina el 5 elemento si existe
        if(this.ultimos4.length > 4) this.ultimos4.splice(-1,1)
        this.guardaBD()
        return ticket
    }
}

module.exports = TicketControl