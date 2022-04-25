let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient= mongo.MongoClient;
const mongoUrl= "mongodb+srv://falguni:falguni123@cluster0.sjcw7.mongodb.net/foodscape?retryWrites=true&w=majority";
const bodyParser = require('body-parser');
const cors = require('cors');
let port = process.env.PORT || 6800;
var db;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

// Get Request
app.get('/',(req,res)=>{
    res.send('Welcome to Express.');
})

// List of Cities
app.get('/location', (req,res)=>{
    db.collection('location').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// List of Restaurants w.r.t city/mealId
app.get('/restaurants', (req,res)=>{
    let stateId=Number(req.query.state_id);
    let mealId=Number(req.query.mealtype_id);
    let query = {};
    
    if(stateId && mealId){
        query = {"mealTypes.mealtype_id":mealId,state_id:stateId};
    }
    else if(mealId){
        query = {"mealTypes.mealtype_id":mealId};
    }
    else if(stateId){
        query = {state_id:stateId};
    }
    console.log("StateId>>>>>", stateId);
    console.log("mealId>>>>>", mealId);
    db.collection('restaurants').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// List of Restaurants w.r.t mealType (QuickSearch)
app.get('/mealType',(req,res)=>{
    db.collection('mealType').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

// Filter
app.get('/filter/:mealId',(req,res)=>{
    let sort = {cost:1};
    let skip = 0;
    let limit = 1000000000000;
    let mealId = Number(req.params.mealId);
    let cuisineId = Number(req.query.cuisine);
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    let query={};

    if(req.query.sort){
        sort= {cost:req.query.sort}
    }
    if(req.query.skip && req.query.limit){
        skip = Number(req.query.skip);
        limit = Number(req.query.limit);
    }
    if(cuisineId && lcost && hcost){
        query={"cuisines.cuisine_id":cuisineId,
        "mealTypes.mealtype_id":mealId,
        $and:[{cost:{$gt:lcost,$lt:hcost}}]}
    }
    else if(cuisineId){
        query = {"cuisines.cuisine_id":cuisineId,"mealTypes.mealtype_id":mealId};
    }
    else if(lcost && hcost){
        query= {$and:[{cost:{$gt:lcost,$lt:hcost}}],"mealTypes.mealtype_id":mealId};
    }
    
    db.collection('restaurants').find(query).sort(sort).skip(skip).limit(limit).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// Restaurant details
app.get('/details/:id',(req,res)=>{
    let restId = Number(req.params.id);
    db.collection('restaurants').find({restaurant_id:restId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// Menu w.r.t Restaurants
app.get('/menu/:id',(req,res)=>{
    let restId = Number(req.params.id);
    db.collection('menu').find({restaurant_id:restId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

//Place order(s)
app.post('/placeOrder',(req,res)=>{
    db.collection('orders').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Order Added.");
    })
})

// Menu Items Based on User's Selection
app.post('/menuItem',(req,res)=>{
    db.collection('menu').find({menu_id:{$in:req.body}}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// List of all orders
app.get('/orders',(req,res)=>{
    let email = req.query.email;
    let query = {};
    if(email){
        query = {"email":email};
    }

    db.collection('orders').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// Update Order(s)
app.patch('/updateOrder/:id',(req,res)=>{
    let oId = Number(req.params.id);
    let status = req.body.status?req.body.status:'Pending'
    db.collection('orders').updateOne(
        {id:oId},
        {$set:{
            "status":status,
            "bank_name":req.body.bank_name,
            "bank_status":req.body.bank_status,
            "date":req.body.date
        }}
        ,(err,result)=>{
        if(err) throw err;
        res.send(`Status Updated to ${status}`);
    })
})

// Delete order(s)
app.delete('/deleteOrder',(req,res)=>{
    db.collection('orders').remove({}, (err,result)=>{
        if(err) throw err;
        res.send("Orders Deleted.");
    })
}) 


MongoClient.connect(mongoUrl, (err,client) => {
    if(err) console.log("Error While Connecting");
    db = client.db('foodscape');
    app.listen(port,()=>{
        console.log(`Listening on port number ${port}`)
    });
})