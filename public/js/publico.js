const lblTicket1 = document.querySelector('#lblTicket1')
const lblEscritorio1 = document.querySelector('#lblEscritorio1')
const lblTicket2 = document.querySelector('#lblTicket2')
const lblEscritorio2 = document.querySelector('#lblEscritorio2')
const lblTicket3 = document.querySelector('#lblTicket3')
const lblEscritorio3 = document.querySelector('#lblEscritorio3')
const lblTicket4 = document.querySelector('#lblTicket4')
const lblEscritorio4 = document.querySelector('#lblEscritorio4')

const socket = io();

socket.on('connect',()=>{
});

socket.on('disconnect',()=>{
});

socket.on('ultimos4-ticket',tickets => {
    const [t1,t2,t3,t4] = tickets
    new Audio('./audio/new-ticket.mp3').play()
    lblTicket1.innerText = t1 ? ('Ticket ' + t1.numero) : ''
    lblEscritorio1.innerText = t1 ? ('E' + t1.escritorio.slice(1)) : ''
    lblTicket2.innerText = t2 ? ('Ticket ' + t2.numero) : ''
    lblEscritorio2.innerText = t2 ? ('E' + t2.escritorio.slice(1)) : ''
    lblTicket3.innerText = t3 ? ('Ticket ' + t3.numero) : ''
    lblEscritorio3.innerText = t3 ? ('E' + t3.escritorio.slice(1)) : ''
    lblTicket4.innerText = t4 ? ('Ticket ' + t4.numero) : ''
    lblEscritorio4.innerText = t4 ? ('E' + t4.escritorio.slice(1)) : ''
})