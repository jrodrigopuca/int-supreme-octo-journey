const express = require('express');
const http = require('http');
const WebSocket = require('ws');


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

wss.on('connection', (ws)=>{
    ws.on('message', (message) =>{
        if (message){
            console.log(`recibido ${message}`)
            ws.send(`Hola ${message}`)
        }else{
            ws.send('No enviaste nada')
        }
    })

    ws.once('ready',()=>console.log('WebSocket iniciado'))
})

server.listen(process.env.PORT || 5000, ()=>{
    console.log(`servidor iniciado en puerto ${server.address().port}`)
})