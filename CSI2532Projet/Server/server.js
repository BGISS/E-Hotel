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
async function transform({payment}){
    const res = await client.query('Insert into Location(date_reserver,end_date,num_chambre,reservation_id,nas_client,employee_id,nom_hôtel) Values()')

}
async function getReservations(){
    const res = await client.query('SELECT * FROM reservation;')
    return res.rows
}
app.get('/reservations', async (req, res) => {
    const data = await getReservations();
    console.log(data)
    res.send(data)
});
async function addReservation(){}
async function getQuery(){}
async function addLocation({firstName,lastName,}){

}
connectPostgres();

app.listen(3000,()=>{console.log("Server started on port 3000")})