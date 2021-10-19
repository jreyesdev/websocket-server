const nuevoTicket = document.getElementById('lblNuevoTicket');
const btn = document.querySelector('button');

const socket = io();

socket.on('connect',()=>{
    btn.disabled = false;
});

socket.on('disconnect',()=>{
    btn.disabled = true;
});

socket.on('ultimo-ticket',ticket => {
    nuevoTicket.innerText = 'Ticket ' + ticket
})

btn.addEventListener('click', e => {
    socket.emit('sig-ticket',null, ticket => {
        nuevoTicket.innerText = ticket
    });
})