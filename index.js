const {ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:'variables.env'});

//conectar a la base de datos
conectarDB();


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>{
        const token = req.headers['authorization'] || '';
        if(token){
            try {
                const usuario = jwt.verify(token, process.env.KEY_SECRET);
                return{
                    usuario
                }
            } catch (error) {
                console.log(error);
                console.log('hubo un error de token');
            }
        }
    }
});

server.listen().then(({url})=>{
    console.log(`servidor listo en la url ${url}`);
});