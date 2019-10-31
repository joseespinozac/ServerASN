
const fetch   = require('node-fetch');
const chai = require('chai');
const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
//const server = require('../src/app');
const Cuenta = require('../src/dataaccess/model/Cuenta');
const should = chai.should();

const SERVER = ""

chai.use(chaiHttp);

describe('cuentas', () => {
    /*Cuenta.collection.drop();

    describe('POST', () => {
        it('Should create a new Cuenta and return json', function(done) {
            
            chai.request(server)
                .post('/api/Cuenta/')
                .send({
                    "nombre": "José",
                    "apellido": "Espinoza",
                    "password": "123",
                    "usuario": "betoes",
                    "telefono": "2282731021",
                    "correo":"ragest031@gmail.com"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
            
        });
        
    });*/
    describe('GET', function() {
        it('Should return json as default data format', function(done) {
            chai.request("http://localhost:8080")
                .get('/api/Cuenta/')
                .end((err, res) => {
                    if(err) {
                        done(err);
                    } else {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    }
                });
            
        });
        
    });

    
});