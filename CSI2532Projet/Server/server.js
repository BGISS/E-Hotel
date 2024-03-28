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

app.get("/getUser",async (req,res) => {
    const {NAS,radioVal} = req.query
    var columnName = "nas_client"
    if(radioVal == "Employee"){
        columnName = "nas_employee"
    }
    try {
        const query = `SELECT * from ${radioVal} WHERE ${columnName} = ${NAS}`
        console.log(query)
        const data = await client.query(query)
        res.send(data.rows)
    } catch (error) {
        console.log('err')
    }
});
const baseLocationQuery= `INSERT INTO Location (date_reserver, end_date, num_chambre, reservation_id, nas_client, employee_id, nom_hôtel, location_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
async function transform({payment,date_reserver,end_date,num_chambre,reservation_id,nas_client,employee_id,nom_hôtel}){
    const res = await client.query(baseLocationQuery,
    [date_reserver, end_date, num_chambre, reservation_id, nas_client, employee_id, nom_hôtel, payment]);
    return res.rows[0];
}

async function getReservations(){
    const res = await client.query('SELECT * FROM reservation NATURAL JOIN client WHERE reservation.nas_client=client.nas;')
    return res.rows
}
async function getLocations(){ 
    const res = await client.query('SELECT* FROM location  NATURAL JOIN client WHERE location.nas_client=client.nas')
    return res.rows
}
app.get('/createLocation',async(req,res)=>{
   const{payment,date_reserver,end_date,num_chambre,nas_client,employee_id,nom_hôtel}= req.query
   console.log(baseLocationQuery)
    const data = await client.query(baseLocationQuery,
        [date_reserver,end_date,num_chambre,null,nas_client,employee_id,nom_hôtel,payment]);
       
});

app.get('/createClient',async(req,res)=>{
    const{firstName,lastName,nas_client,date}= req.query
    const query= 'INSERT INTO client(nom_client,prénom_client,nas,dâte_enregistrement) VALUES($1,$2,$3,$4)';
    const data = await client.query(query, [firstName,lastName,nas_client,date]);
})

app.get('/insertEmployee',async(req,res)=>{
    const{firstName,lastName,id,employeeNAS,hotel}= req.query
    const query= 'INSERT INTO employée(nom,prénom,nas,employee_id,nom_hôtel) VALUES($1,$2,$3,$4,$5)';
    const data = await client.query(query, [firstName,lastName,employeeNAS,id,hotel]);
})

app.get('/insertHotel',async(req,res)=>{
    const{hotel,hotelChain,email,numStars,numTel,city,postal,streetNum,country,numRooms,numClients}= req.query
    
    const hotelquery= 'INSERT INTO hôtel(nombres_chambres,nom_hôtel,nom_chaîne,nombres_clients,nombres_etoiles) VALUES($1,$2,$3,$4,$5)';
    const hoteldata = await client.query(hotelquery, [numRooms,hotel,hotelChain,numClients,numStars]);
    
    const telquery= 'INSERT INTO numero_telephone(num_telephone,nom_chaîne,num_chambre,nom_hôtel) VALUES($1,NULL,NULL,$2)';
    const teldata = await client.query(telquery, [numTel,hotel]);

    const addressquery= 'INSERT INTO addresse(pays,ville,num_rue,code_postal,nom_chaîne,nom_hôtel) VALUES($1,$2,$3,$4,NULL,$5)';
    const addressedata = await client.query(addressquery, [country,city,streetNum,postal,hotel]);

    //insert email

})

app.get('/insertHotelChain',async(req,res)=>{
    const{hotelChain,
        numHotels,
        email,
        country,
        city,
        postal,
        streetNum,
        numTel}= req.query
    const chainequery= 'INSERT INTO chaînehôtelière(nombres_hôtels,nom_chaîne) VALUES($1,$2)';
    const chainedata = await client.query(chainequery, [numHotels,hotelChain]);

    const addressquery= 'INSERT INTO addresse(pays,ville,num_rue,code_postal,nom_chaîne,nom_hôtel) VALUES($1,$2,$3,$4,$5,NULL)';
    const addressedata = await client.query(addressquery, [country,city,streetNum,postal,hotelChain]);

    const telquery= 'INSERT INTO numero_telephone(num_telephone,nom_chaîne,num_chambre,nom_hôtel) VALUES($1,$2,NULL,NULL)';
    const teldata = await client.query(telquery, [numTel,hotelChain]);
})

app.get('/insertRoom',async(req,res)=>{
    const{numRoom,
        price,
        view,
        superficie,
        capacity,
        hotel,dommages,}= req.query
    const query= 'INSERT INTO chambre(prix,capacité,vue,étendue,dommages,num_chambre,nom_hôtel) VALUES($1,$2,$3,$4,$5,$6,$7)';
    const data = await client.query(query, [price,capacity,view,superficie,dommages,numRoom,hotel]);
})

app.get('/locations',async(req,res)=>{
    const data= await getLocations()
    res.send(data)

});
app.post('/transform',async(req,res)=>{
    const{payment,date_reserver,end_date,num_chambre,reservation_id,nas_client,employee_id,nom_hôtel}= req.body;
    const data= await transform({payment,date_reserver,end_date,num_chambre,reservation_id,nas_client,employee_id,nom_hôtel})
    res.send(data)
});
app.get('/reservations', async (req, res) => {
    const data = await getReservations()
    res.send(data)
});
baseGetQuery= 'SELECT * FROM '
app.get('/getClients',async(req,res)=>{
    const data= await client.query(baseGetQuery+"Client")
    res.send(data.rows)
});
app.get('/getHotels',async(req,res)=>{
    const data= await client.query(baseGetQuery+ "Hôtel")
    res.send(data.rows)
}); 
app.get('/getEmployee',async(req,res)=>{
    const data= await client.query(baseGetQuery+ "Employé")
    res.send(data.rows)
});
app.get('/getRoom',async(req,res)=>{
    const data= await client.query(baseGetQuery+ "Chambre")
    res.send(data.rows)
})
app.get('/delete',async(req,res)=>{
    const{tableName,condition}= req.query
    console.log("table",tableName)    
    deleteQuery=`DELETE FROM ${tableName} WHERE ${condition}`
    console.log(`DELETE FROM ${tableName} WHERE ${condition}`);
    const data= await client.query(deleteQuery)
});  
app.get('/getRoomNum',async(req,res)=>{
    const{checkInDate,checkOutDate,minPrice,maxPrice,hotelName}= req.query;
    searchQuery=`SELECT chambre.nom_hôtel,chambre.num_chambre,chambre.prix,chambre.capacité FROM chambre
    LEFT JOIN reservation ON chambre.num_chambre = reservation.num_chambre
        AND reservation.date_reserver <= '${checkOutDate}' 
        AND reservation.end_date >= '${checkInDate}'
        AND reservation.nom_hôtel = chambre.nom_hôtel
    LEFT JOIN location ON chambre.num_chambre = location.num_chambre
        AND location.date_reserver <= '${checkOutDate}' 
        AND location.end_date >= '${checkInDate}'
        AND location.nom_hôtel = chambre.nom_hôtel
    LEFT JOIN hôtel ON chambre.nom_hôtel = hôtel.nom_hôtel
    WHERE reservation.num_chambre IS NULL AND location.num_chambre IS NULL AND chambre.prix >= ${minPrice} AND chambre.prix <= ${maxPrice} AND chambre.nom_hôtel = '${hotelName}'`;
    const response = await client.query(searchQuery)

    res.send(response.rows)
}); 
app.get('/searchRooms',async (req, res) => {
    const{numberPeople,roomSize,hotelChain,category,checkInDate,checkOutDate,minPrice,maxPrice}=req.query;
var searchQuery = ""
if(hotelChain != "" || category != undefined){
    console.log("hote: ",hotelChain,"cate: ",category)
    searchQuery = 
    `SELECT chambre.nom_hôtel,chambre.num_chambre,chambre.prix,chambre.capacité FROM chambre
    LEFT JOIN reservation ON chambre.num_chambre = reservation.num_chambre
        AND reservation.date_reserver <= '${checkOutDate}' 
        AND reservation.end_date >= '${checkInDate}'
        AND reservation.nom_hôtel = chambre.nom_hôtel
    LEFT JOIN location ON chambre.num_chambre = location.num_chambre
        AND location.date_reserver <= '${checkOutDate}'  
        AND location.end_date >= '${checkInDate}'
        AND location.nom_hôtel = chambre.nom_hôtel
    LEFT JOIN hôtel ON chambre.nom_hôtel = hôtel.nom_hôtel
    WHERE reservation.num_chambre IS NULL AND location.num_chambre IS NULL AND chambre.prix >= ${minPrice} AND chambre.prix <= ${maxPrice}`;
    if (hotelChain != "") {
        searchQuery= searchQuery+` AND hôtel.nom_chaîne = '${hotelChain}'`
    }  
    if (category != undefined) {
        searchQuery = searchQuery + ` AND hôtel.nombres_etoiles = ${category}`
    }
}
else {

    searchQuery = 
    `SELECT chambre.nom_hôtel,chambre.num_chambre,chambre.prix,chambre.capacité FROM chambre 
    LEFT JOIN reservation ON chambre.num_chambre = reservation.num_chambre 
        AND reservation.date_reserver <= '${checkInDate}' 
        AND reservation.end_date >= '${checkOutDate}' 
        AND reservation.nom_hôtel = chambre.nom_hôtel 
    LEFT JOIN location ON chambre.num_chambre = location.num_chambre 
        AND location.date_reserver <= '${checkInDate}' 
        AND location.end_date >= '${checkOutDate}' 
        AND location.nom_hôtel = chambre.nom_hôtel 
    WHERE reservation.num_chambre IS NULL AND location.num_chambre IS NULL AND chambre.prix >= ${minPrice} AND chambre.prix <= ${maxPrice}`;
}

if (numberPeople!=-1){
    searchQuery= searchQuery+` AND chambre.capacité = ${numberPeople}`;
}
if (roomSize!=undefined){
    searchQuery= searchQuery+` AND chambre.superficie = ${roomSize}`;
}

console.log(searchQuery)
const response = await client.query(searchQuery)
res.send(response.rows)
console.log(response.rows)
});


async function addReservation(){}
async function getQuery(){}
async function addLocation({start_date,end_date,employee_id,nas_client,num_chambre,nom_hotel}){
    const baseQuery='Insert into Location(date_reserver,end_date,num_chambre,reservation_id,nas_client,employee_id,nom_hôtel)'
    const res= await client.query(baseQuery+'')
}
connectPostgres();

app.listen(3000,()=>{console.log("Server started on port 3000")})