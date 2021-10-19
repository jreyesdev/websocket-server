const lblEscritorio = document.querySelector('h1');
const btn = document.querySelector('button');
const lblSmall = document.querySelector('small');
const lblAlert = document.querySelector('#alert');
const lblPendientes = document.querySelector('#lblPendientes');
const search = window.location.search.replace('?','').split('&')

search.forEach((e,i)=>{
    search[i] = e.split('=')
})
const [escritorio] = search.filter(e => e[0] === 'escritorio')

if(!escritorio || isNaN(escritorio[1]) ){
    window.location = '/'
    throw new Error('El escritorio es obligatorio y debe ser numerico')
}

lblEscritorio.innerText = `${escritorio.join(' ').toUpperCase()}`
const socket = io();


socket.on('connect',()=>{
    btn.disabled = false;
});

socket.on('disconnect',()=>{
    btn.disabled = true;
});

socket.on('pendi-ticket',ticket => {
    lblPendientes.innerText = ticket
})

btn.addEventListener('click', e => {
    socket.emit('atender-ticket',{ escritorio }, pay => {
        const { status, ticket, msg } = pay
        if(!status){
            lblAlert.innerText = msg
            lblAlert.style.display = 'block'
            lblSmall.innerText = 'Nadie'
            return
        }
        lblSmall.innerText = 'Ticket ' + ticket.numero
    });
})