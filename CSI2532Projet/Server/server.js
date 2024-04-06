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
    database: 'Test' 
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

app.get("/ReservePopUp", async (req, res) => {
    const query = 
    `SELECT reservation.reservation_id, employé.nas_employee FROM employé LEFT JOIN reservation ON employé.nas_employee = reservation.nas_employee`
    const response = await client.query(query)
    res.send(response.rows)
});

app.get("/getUser",async (req,res) => {
    const {NAS,radioVal} = req.query
    var columnName = "nas_client"
    if(radioVal == "employé"){
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

app.get("/getHotel",async (req,res) => {
    const {hotel}=req.query;
    try {
        const query = `SELECT * from hôtel WHERE nom_hôtel = '${hotel}'`
        console.log(query)
        const data = await client.query(query)
        res.send(data.rows)
    } catch (error) {
        console.log('er')
    }
});

app.get("/getHotelChain",async (req,res) => {
    const {hotelChain}=req.query;
    try {
        const query = `SELECT * from chaînehôtelière WHERE nom_chaîne = '${hotelChain}'`
        const data = await client.query(query)
        res.send(data.rows)
    } catch (error) {
        console.log('errrrrrrrr')
    }
});


app.get("/getRoom",async (req,res) => {
    const {hotel,numRoom}=req.query;
    try {
        const query = `SELECT * from chambre WHERE nom_hôtel = '${hotel}' and num_chambre=${numRoom}`
        const data = await client.query(query)
        res.send(data.rows)
    } catch (error) {
        console.log(error)
    }
});


const baseLocationQuery= `INSERT INTO Location (location_id,reservation_id,date_reserver,end_date,num_chambre,nom_hôtel,paiement,nas_employee,nas_client) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9)`;
async function transform({location_id,reservation_id,date_reserver,end_date,num_chambre,nom_hôtel,payment,nas_employee,nas_client}){
    const res = await client.query(baseLocationQuery,
    [location_id,reservation_id,date_reserver,end_date,num_chambre,nom_hôtel,payment,nas_employee,nas_client]);
    return res.rows[0];
}

async function getReservations(){
    const res = await client.query('SELECT * FROM reservation NATURAL JOIN client WHERE reservation.nas_client=client.nas_client;')
    return res.rows
}
async function getLocations(){ 
    const res = await client.query('SELECT* FROM location  NATURAL JOIN client WHERE location.nas_client=client.nas_client')
    return res.rows
}
app.get('/createLocation',async(req,res)=>{
   const{date_reserver,end_date,num_chambre,nom_hôtel,payment,nas_employee,nas_client}= req.query
   console.log(nas_employee)
   locationQuery= `INSERT INTO Location (reservation_id,date_reserver,end_date,num_chambre,nom_hôtel,paiement,nas_employee,nas_client) VALUES (NULL,$1, $2, $3, $4, $5, $6, $7)`
    const data = await client.query(locationQuery,
        [date_reserver,end_date,num_chambre,nom_hôtel,payment,nas_employee,nas_client]);
    res.send("Success");
       
});

app.get('/createClient',async(req,res)=>{
    const{firstName,lastName,nas_client, dâte_enregistrement}= req.query
    const query= `INSERT INTO client(nas_client,nom_client,prénom_client,dâte_enregistrement) VALUES($1,$2,$3,'${dâte_enregistrement}')`;
    const data = await client.query(query, [nas_client,firstName,lastName]);
    res.send("Success");
})
app.get('/createClientAddress',async(req,res)=>{
    const{country,city,streetNum,streetName,postal,nas_client}= req.query
    const query= 'INSERT INTO adresse(nom_chaîne,num_rue,nom_rue,ville,code_postal,pays,nas_client,nas_employee,nom_hôtel) VALUES(NULL,$1,$2,$3,$4,$5,$6,NULL,NULL)'
    await client.query(query,[streetNum,streetName,city,postal,country,nas_client])
    res.send("Success");
});

app.get('/createEmployeeAddress',async(req,res)=>{
    const{country,city,streetNum,postal,employeeNAS,streetName}= req.query
    const query= 'INSERT INTO adresse(nom_chaîne,num_rue,nom_rue,ville,code_postal,pays,nas_client,nas_employee,nom_hôtel) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)'
    await client.query(query,[null,streetNum,streetName,city,postal,country,null,employeeNAS,null])
    res.send("success");
});
app.get('/createReservation',async(req,res)=>{
    const{checkInDate,checkOutDate,nom_hôtel,num_chambre,NAS,nas_employee}=req.query
    const query='INSERT INTO reservation(date_reserver,end_date,num_chambre,nom_hôtel,nas_employee,nas_client) VALUES($1,$2,$3,$4,$5,$6)'
    await client.query(query,[checkInDate,checkOutDate,num_chambre,nom_hôtel,nas_employee,NAS])
    res.send("success")
})
app.get('/insertEmployee',async(req,res)=>{
    const{firstName,lastName,role,employeeNas,hotel}= req.query
    const query= 'INSERT INTO employé(nas_employee,nom_employee,prénom_employee,nom_hôtel,role) VALUES($1,$2,$3,$4,$5)';
    const data = await client.query(query, [employeeNas,firstName,lastName,hotel,role]);
    console.log(query)
    res.send("success");
});

app.get('/insertHotel',async(req,res)=>{
    const{hotel,hotelChain,email,numStars,numTel,city,postal,streetNum,country,numRooms,numClients,streetName}= req.query
    
    const hotelquery= 'INSERT INTO hôtel(nom_hôtel,nombres_chambres,nom_chaîne,nombres_clients,nombres_etoiles) VALUES($1,$2,$3,$4,$5)';
    const hoteldata = await client.query(hotelquery, [hotel,numRooms,hotelChain,numClients,numStars]);
    
    const telquery= 'INSERT INTO numero_telephone(num_telephone,nom_hôtel,nom_chaîne) VALUES($1,$2,NULL)';
    const teldata = await client.query(telquery, [numTel,hotel]);

    const emailquery= 'INSERT INTO courriel(courriel,nom_hôtel,nom_chaîne) VALUES($1,$2,NULL)';
    const emaildata = await client.query(emailquery, [email,hotel]);

    const addressquery= 'INSERT INTO adresse(nom_chaîne,num_rue,nom_rue,ville,code_postal,pays,nas_client,nas_employee,nom_hôtel) VALUES(NULL,$1,$2,$3,$4,$5,NULL,NULL,$6)';
    const addressedata = await client.query(addressquery, [streetNum,streetName,city,postal,country,hotel]);
    res.send("success");

});

app.get('/insertHotelChain',async(req,res)=>{
    const{hotelChain,
        numHotels,
        email,
        country,
        city,
        postal,
        streetNum,
        numTel,streetName}= req.query
    const chainequery= 'INSERT INTO chaînehôtelière(nom_chaîne,nombres_hôtels) VALUES($1,$2)';
    const chainedata = await client.query(chainequery, [hotelChain,numHotels]);

    const addressquery= 'INSERT INTO adresse(nom_chaîne,num_rue,nom_rue,ville,code_postal,pays,nas_client,nas_employee,nom_hôtel) VALUES($1,$2,$3,$4,$5,$6,NULL,NULL,NULL)';
    const addressedata = await client.query(addressquery, [hotelChain,streetNum,streetName,city,postal,country]);
    
    const emailquery= 'INSERT INTO courriel(courriel,nom_hôtel,nom_chaîne) VALUES($1,NULL,$2)';
    const emaildata = await client.query(emailquery, [email,hotelChain]);

    const telquery= 'INSERT INTO numero_telephone(num_telephone,nom_hôtel,nom_chaîne) VALUES($1,NULL,$2)';
    const teldata = await client.query(telquery, [numTel,hotelChain]);
    res.send("success");

});

app.get('/insertRoom',async(req,res)=>{
    const{numRoom,
        price,
        view,
        superficie,
        capacity,
        hotel,dommages,commodity}= req.query
    const query= 'INSERT INTO chambre(num_chambre,nom_hôtel,prix,capacité,vue,étendue,dommages,superficie) VALUES($1,$2,$3,$4,$5,$6,$7,$8)';
    const data = await client.query(query, [numRoom,hotel,price,capacity,view,false,dommages,superficie]);
    const comquery= 'INSERT INTO commodite(nom_commodite,num_chambre,nom_hôtel) VALUES($1,$2,$3)';
    const comdata = await client.query(comquery, [commodity,numRoom,hotel]);
    res.send("success");

});

app.get('/locations',async(req,res)=>{
    const data= await getLocations()
    res.send(data)
});
app.post('/transform',async(req,res)=>{
    const{reservation_id,date_reserver,end_date,num_chambre,nom_hôtel,paiement,nas_employee,nas_client}= req.body;
    const data= await transform({reservation_id,date_reserver,end_date,num_chambre,nom_hôtel,paiement,nas_employee,nas_client})
    res.send(data)
});
app.get('/reservations', async (req, res) => {
    const data = await getReservations()
    res.send(data)
});
//All the get requests to the database
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
app.get('/getRooms',async(req,res)=>{
    const data= await client.query(baseGetQuery+ "Chambre")
    res.send(data.rows) 
});
app.get('/getChain',async(req,res)=>{
    const data= await client.query(baseGetQuery+"chaînehôtelière")
    res.send(data.rows)
})
//Delete Request
app.get('/delete',async(req,res)=>{
    const{tableName,condition}= req.query
    deleteQuery=`DELETE FROM ${tableName} WHERE ${condition}`;
    const data= await client.query(deleteQuery)
    res.send("Success");
});   

app.get('/getroomsbycity',async(req,res)=>{
    const{city}= req.query
    query=`SELECT COUNT(*) FROM chambres_par_zones WHERE ville = '${city}'`;
    const data= await client.query(query)
    console.log(data.rows)
    res.send(data.rows)
});

app.get('/getcapacity',async(req,res)=>{
    const{hotel}= req.query
    query=`SELECT * FROM capacité_hôtels WHERE nom_hôtel = '${hotel}'`;
    console.log(query)
    const data= await client.query(query)
    res.send(data.rows)
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
//Filter Request
app.get('/searchRooms',async (req, res) => {
    const{numberPeople,roomSize,hotelChain,category,checkInDate,checkOutDate,minPrice,maxPrice}=req.query;
var searchQuery = ""
if(hotelChain != "" || category != undefined){
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

const response = await client.query(searchQuery)
res.send(response.rows)
});

app.get('/update', async (req,res) => {
    const {encodedQuery} = req.query
    const query = decodeURIComponent(encodedQuery)
    console.log(query)
    await client.query(query)
});

app.get('/getHotelChains', async (req,res) => {
    const response = await client.query('SELECT nom_chaîne FROM chaînehôtelière')
    console.log('fess',response.rows)
    res.send(response.rows)
});
connectPostgres();
 
app.listen(3000,()=>{console.log("Server started on port 3000")})  