const {MongoClient} = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var _db;
module.exports = {
    connectToServer: function(callback){
        client.connect((err, db)=>{
            //verify if we got a db or not
            if(db){
                _db = db.db("journal_db");
                console.log("suceessfully connected to the database")
            }
            return callback(err);
        });
    },

    getDb: function(){
        return _db;
    }

}