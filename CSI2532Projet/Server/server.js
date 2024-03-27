const pg = require('pg');
const express= require('express')
const app= express()
const cors = require('cors');

app.use(cors());
const client = new pg.Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'Vivekdota2',
    database: 'postgres'
})

async function connectPostgres() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database');
    } catch (error) {
        console.error('Error connecting to PostgreSQL database:', error);
    }
}

app.get("/getUser",async (req,res) => {
    const {NAS,radioVal} = req.query
    var columnName = "nas_client"
    if(radioVal == "Employee"){
        columnName = "nas_employee"
    }
    try {
        const query = `SELECT * from ${radioVal} WHERE ${columnName} = ${NAS}`
        const data = await client.query(query)
        console.log(data.rowCount)
        res.sendStatus(data.rowCount)
    } catch (error) {
        
    }
});

connectPostgres();

app.listen(3000,()=>{console.log("Server started on port 3000")})