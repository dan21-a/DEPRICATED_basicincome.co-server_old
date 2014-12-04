// ---------------------------- connect to ripple-lib -----------------------------



/* Loading ripple-lib with Node.js */
var ripple = require('ripple-lib')
var Remote = ripple.Remote;


var remote = new Remote({
  // see the API Reference for available options
  servers: [ 'wss://s1.ripple.com:443' ]
});

remote.connect(function() {
  /* remote connected */
  remote.requestServerInfo(function(err, info) {
    // process err and info
  });
});



// ---------------------------- connect to mongoDB -----------------------------

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {

});

var COLLECTION = "rLaKjMvLbrAJwnH4VpawQ6ot9epZqJmbfQ"

var dividend_pathways_schema = new Schema({
    type: String,
    account: String
  , currency: String
  , taxRate: String 
  , total_pathway: String

}, { collection: COLLECTION });

var dividend_pathway = mongoose.model('dividend_pathway', dividend_pathways_schema, COLLECTION);

var wallet_schema = new Schema({
    type: String,
    currency: String, 
    taxRate:String

}, { collection: COLLECTION });

var wallet = mongoose.model('wallet', wallet_schema, COLLECTION);

var tax_blob_schema = new Schema({
    type: String,
    currency: String, 
    total_amount:String

}, { collection: COLLECTION });

var tax_blob = mongoose.model('tax_blob', tax_blob_schema, COLLECTION);


var accounts = []

    function get_collections(){
       mongoose.connection.db.collectionNames(function (err, names) {
            for(var i=0;i<names.length;i++){
                if(names[i].name.length===46)
                accounts.push(names[i].name.slice(12,46))
            }
                request_subscribe()
    })
    }

mongoose.connect('mongodb://guest:guest@ds059907.mongolab.com:59907/awesome_box');
mongoose.connection.once('open', function(){ get_collections()})


// ---------------------------- connect to basicincome.co -----------------------------


var ws = require("nodejs-websocket");

var server = ws.createServer(function (conn) {
    console.log("User connected...");


    var BLOB
    var ACCOUNT_ID
    var WALLET
    var SECRET
    var i = 0   


    conn.on("text", function (str) {
        
        function do_something(){}
        
        console.log("Received: "+str);
        BLOB = JSON.parse(str)
        ACCOUNT_ID = BLOB[0].account_id
        WALLET = BLOB[1]
        COLLECTION = ACCOUNT_ID






// ---------------------------- swarm-redistribution ----------------------------------

// FIRST, collect data from the coin platform

 // this example connects with http://client.basicincome.co

    var taxRate
    var total_amount

    
    var currency
    var q = 0



function get_dividend_lines(callback){
    
    
    tax_blob = mongoose.model('tax_blob', tax_blob_schema, ACCOUNT_ID);
    // get the currency
    tax_blob.find({type: "tax_blob"}).exec(function(err,doc){
        if(q<doc.length){
        total_amount = doc[q].total_amount
        
        wallet = mongoose.model('wallet', wallet_schema, ACCOUNT_ID);
        // get the taxRate
        wallet.findOne({type: "wallet", currency: doc[q].currency}).exec(function(err,doc){
        currency = doc.currency;
        taxRate=doc.taxRate;
        })
        }
    });
  
  
    dividend_pathway = mongoose.model('dividend_pathway', dividend_pathways_schema, COLLECTION);//to insert new COLLECTION
    console.log("scanning collection: "+ COLLECTION);
    dividend_pathway.find({type: "dividend_pathway", currency: currency} ).exec(function(err, doc) {
    
     return callback(doc)

    });



}


// ---------------------------- swarm-redistribution API ----------------------------------
// coin-agnostic general purpuse API - connect any coin platform
// my swarm-redistribution API is the major component of project resilience
// and what I called peer-to-peer-dividend-protocols
// http://resilience.me and http://basicincome.co

// the API can be used by any coin, money, thing, platform


    var lines = [];//lines.push(line)
   
    
    var x = 0;//recursion()
    var y = 0;//recursion()
   
    var temp = " ";
    
    var taxRate_quota_temp = []
    var taxRate_quota_sum = 0
    var taxRate_switch = false
    var taxRate_x;
    var taxRate_ratio_x;

var get_collection = function() {
    //connect your coin here, this is how you connect to the API
    //the callback feeds collection/dividend-pathways
    //this example connects with http://client.basicincome.co
get_dividend_lines(swarm_redistribution)
}

get_collection()




// swarm-redistribution script:

function swarm_redistribution(pathway){

console.log(pathway)
console.log("hahaha")

// ------- First, construct fractal dividend lines -----------------
// see http://www.resilience.me/theory.html


 var w = 0;
        var line = []

if(pathway.length>0){


    loop(pathway, line, w);// add taxRate ratios

    
}
else{
console.log("collection is empty")
branch()
}

    
    
    
    function loop(pathway, line, w) {
    var q = 0
    // calculate taxRatio
    console.log(w)
    console.log(pathway[w])
    var taxRate_y = pathway[w].taxRate
    if(taxRate_switch === false){
     taxRate_x = taxRate
     taxRate_ratio_x = 1
    }
    else taxRate_x = taxRate
    if(taxRate_y > taxRate_x)taxRate_y = taxRate_x
    var taxRate_ratio_y = Number(taxRate_y) / Number(taxRate_x)
    var taxRate_quota = Number(taxRate_ratio_x) * Number(taxRate_ratio_y)
    console.log(temp.indexOf(pathway[w].account))
    
    // push lines
    if (temp.indexOf(pathway[w].account) === -1){
    temp+= pathway[w].account + " "
    line.push({account: pathway[w].account, currency: currency, taxRate: taxRate, taxRate_quota: taxRate_quota});
    taxRate_quota_temp.push(taxRate_quota)
    taxRate_quota_sum = Number(taxRate_quota_sum) + Number(taxRate_quota)
    q++
    }
    else console.log("CIRCULAR");
    
    w++;
    
    if (w<pathway.length){loop(pathway, w, line)}
    else {
        if (q>0){
            console.log(line);//lists all dividend pathways in IOUs[0] for ACCOUNT_ID
            lines.push(line)
        };
        
        branch()
    }
    }

      
// STEP 2: branch out (add all dividend pathways for lines[x][i].account)        


    function branch(){
            if(x<lines.length){
            console.log("recursion nr "+x)
        if(y<lines[x].length){
            console.log("taxRate_quota:" +lines[x][y].taxRate_quota)
            taxRate_ratio_x = Number(lines[x][y].taxRate_quota)
            taxRate_x = lines[x][y].taxRate
            COLLECTION = lines[x][y].account;
            y++;
            get_collection();
        }
                
        else {
           x++;
           y = 0;
            console.log("recursion nr "+x)
            get_collection()
        }
        
            }
            else console.log(lines), console.log("END"), outgoing_payments()
        }
         
             
    // ------- SECOND, outgoing payments -----------------
    // see http://www.resilience.me/theory.html 
    function outgoing_payments(){
         var total_amount_pie = Number(total_amount)/taxRate_quota_sum
         
         // create outgoing payment
         x = 0
         y = 0
         loop()
         function loop(){
            if (x<lines.length){     
                if (y<lines[x].length){
                
                var amount = Number(total_amount_pie * lines[x][y].taxRate_quota)
                var currency = lines[x][y].currency
                var account = lines[x][y].account
                var payment = {account: account, amount: amount, currency: currency}
                send_client(payment)
                y++
                loop()
                }
                else x++
                loop()
            }else q++, get_collection();
         }
}
   

function send_client(payment){
    console.log("outgoing payments sent !")
            conn.sendText(JSON.stringify(payment));
            
}

        
}//end swarm_redistribution()








// ---------------------------- update currency/taxRate ----------------------------------

        

        // update wallet
        wallet.remove({ type: 'wallet' },function(err, wallet){})
        loop()
        function loop(){
                    new wallet({ type: "wallet", currency: WALLET[i].currency, taxRate: WALLET[i].taxRate }).save(function(err){});
                    i++
                    if(i<WALLET.length){loop()}
                    else{(i=0)
                    if(accounts.indexOf(ACCOUNT_ID)===-1){get_collections}//add collection to request_subscribe()
}
        }
        
        
        
    })
}).listen(8080); console.log("server listening on port 8080");




// ---------------------------- connect to rippled -----------------------------

function request_subscribe(){

var req = remote.request_subscribe();
req.message.accounts = accounts
req.request();
remote.on('transaction', function(data){
 


// ---------------------------- connect transactions -----------------------------

console.log(data.transaction)

    COLLECTION = data.transaction.Destination
    dividend_pathway = mongoose.model('dividend_pathway', dividend_pathways_schema, COLLECTION);
    wallet = mongoose.model('wallet', wallet_schema, COLLECTION);//reloads COLLECTION
    tax_blob = mongoose.model('tax_blob', tax_blob_schema, COLLECTION);

    var query = wallet.findOne({type: "wallet", currency: data.transaction.Amount.currency})

        
        query.exec(function(err,doc){
            var taxRate;
            if(doc === null){taxRate = 0}
            else taxRate = doc.taxRate
        var query = dividend_pathway.findOne({type: "dividend_pathway", account: data.transaction.Account, currency: data.transaction.Amount.currency, taxRate: taxRate})
        query.exec(function(err,doc){
                console.log(doc)
            query.count(function(err, count){
                    if(count > 0){
                    doc.total_pathway = Number(doc.total_pathway) + Number(data.transaction.Amount.value)
                    doc.save(function (err) {
                    });
                    }
                    else{
                    var add_new = new dividend_pathway({ type: "dividend_pathway", account: data.transaction.Account, currency: data.transaction.Amount.currency, taxRate: taxRate, total_pathway: data.transaction.Amount.value});
                    add_new.save(function (err) {
                    });
                    }
            })
        })           
    });

var tax_blobQuery = tax_blob.findOne({type: "tax_blob", currency: data.transaction.Amount.currency})
    tax_blobQuery.exec(function(err,doc){
            if(doc === null){
                var add_new = new tax_blob({ type: "tax_blob", currency: data.transaction.Amount.currency, total_amount: data.transaction.Amount.value});
                add_new.save()
            }
            else{
                doc.total_amount = Number(doc.total_amount) + Number(data.transaction.Amount.value)
            
                doc.save()
            }
    })


})//end remote.on
}//end request_subscribe()

