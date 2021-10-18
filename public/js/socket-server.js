const lblstatus = document.getElementById('lblstatus');
const msg = document.querySelector('#mensaje');
const enviar = document.querySelector('#enviar');

const socket = io();

socket.on('connect',()=>{
    lblstatus.innerText = 'Online';
    lblstatus.className = 'text-success';
});

socket.on('disconnect',()=>{
    lblstatus.innerText = 'Offline';
    lblstatus.className = 'text-danger';
});

socket.on('enviar-mensaje',pay => {
    console.log(pay)
});

enviar.addEventListener('click',e => {
    const txt = msg.value;
    const payload = {
        mensaje: txt,
        id: '121212',
        fecha: new Date().getTime()
    }
    socket.emit('enviar-mensaje',payload, id => {
        console.log(id)
    });
})