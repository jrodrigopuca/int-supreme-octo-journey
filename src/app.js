// Inicializar
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

// lugar donde se guardarán los datos
var store = {"fizz":"buzz"}

/**
 * @function getValues: función para usar en el REST/API
 * @param {*} key: clave 
 * @returns valor
 */
const getValues = (key) => {
    return store[key]?({valor:store[key]}):({error:"no definido"});
}

/**
 * interacción en el Web Socket
 * - al recibir dos palabras las guarda como clave-valor
 * - devuelve lo almacenado hasta el momento
 */
wss.on('connection', (ws)=>{
    ws.on('message', (message) =>{
        if (message){
            let [key, value] = message.split(' ',2);
            value=value?value:'';
            store[key]=value;
            ws.send(JSON.stringify(store));
        }else{
            ws.send('No enviaste nada')
        }
    })

    ws.once('ready',()=>console.log('WebSocket iniciado'))
})

// iniciar servidor
server.listen(5000, ()=>{
    console.log(`servidor iniciado en puerto ${server.address().port}`)
})

// preparar REST/API
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
    res.json(getValues('fizz'));
})

app.get('/:key', (req, res)=>{
    res.send(getValues(req.params.key));
})

module.exports=app;