const pg = require('pg');
const express= require('express')
const app= express()
const cors = require('cors');

app.use(cors());
const client = new pg.Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'Adarsh_22',
    database: 'Project'
})
async function connectPostgres() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database');
    } catch (error) {
        console.error('Error connecting to PostgreSQL database:', error);
    }
}

connectPostgres();

app.listen(3000,()=>{console.log("Server started on port 3000")})