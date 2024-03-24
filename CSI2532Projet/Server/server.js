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
app.use(express.json());
async function connectPostgres() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database');
    } catch (error) {
        console.error('Error connecting to PostgreSQL database:', error);
    }
}
const baseLocationQuery= `INSERT INTO Location (date_reserver, end_date, num_chambre, reservation_id, nas_client, employee_id, nom_hôtel, location_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
async function transform({payment,date_reserver,end_date,num_chambre,reservation_id,nas_client,employee_id,nom_hôtel}){
    const res = await client.query(baseLocationQuery,
    [date_reserver, end_date, num_chambre, reservation_id, nas_client, employee_id, nom_hôtel, payment]);
    console.log(res.rows[0])
    return res.rows[0];
}
async function CreateClientLocation({payment,date_reserver,end_date,num_chambre,reservation_id,nas_client,employee_id,nom_hôtel,}){

}
async function getReservations(){
    const res = await client.query('SELECT * FROM reservation NATURAL JOIN client WHERE reservation.nas_client=client.nas;')
    return res.rows
}
async function getLocations(){
    const res = await client.query('SELECT* FROM location  NATURAL JOIN client WHERE location.nas_client=client.nas')
    return res.rows
}
app.get('/locations',async(req,res)=>{
    const data= await getLocations()
    res.send(data)

})
app.post('/transform',async(req,res)=>{
    const{payment,date_reserver,end_date,num_chambre,reservation_id,nas_client,employee_id,nom_hôtel}= req.body;
    console.log("Payment:", payment);
    console.log("Date Reserver:", date_reserver);
    console.log("End Date:", end_date);
    console.log("Room Number:", num_chambre);
    const data= await transform({payment,date_reserver,end_date,num_chambre,reservation_id,nas_client,employee_id,nom_hôtel})
    res.send(data)
})
app.get('/reservations', async (req, res) => {
    const data = await getReservations()
    res.send(data)
});
async function addReservation(){}
async function getQuery(){}
async function addLocation({start_date,end_date,employee_id,nas_client,num_chambre,nom_hotel}){
    const baseQuery='Insert into Location(date_reserver,end_date,num_chambre,reservation_id,nas_client,employee_id,nom_hôtel)'
    const res= await client.query(baseQuery+'')
}
connectPostgres();

app.listen(3000,()=>{console.log("Server started on port 3000")})