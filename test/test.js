const assert = require('assert');
const request = require('supertest')
const app = require('../src/app')
const WebSocket = require('ws');

// probar con un ejemplo sencillo el funcionamiento del REST/API
describe('GET /', ()=>{
    it('responde a fizz', function(done) {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res=>{
                assert(res.body.valor, "buzz")
                done()
            })
            .catch(err=>done(err))
    })
})

/**
 * - Enviar un clave-valor por WebSocket
 * - Leer valor por API
 */
const ws = new WebSocket('ws://localhost:5000/', {
            perMessageDeflate: false
        });
        ws.on('open', function open() {
            ws.send('hola mundo');
        });

describe('GET /hola', ()=>{
    it('responde a ejemplo', function(done) {

        request(app)
            .get('/hola')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res=>{
                assert(res.body.valor, "mundo")
                done()
            })
            .catch(err=>done(err))
    })
})
