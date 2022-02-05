const { json } = require("express");
const express = require("express");
const recordRoutes = express.Router();
//recordRoutes is an instance of the express router
//we will use it to define our routes
//The router will be added as a middleware and will take control of requests starting with path /record.

const dbo = require("../db/conn")
//this will help us connect to the database

const ObjectId = require("mongodb").ObjectId;
//will convert id from string to objectId


//This section will help us get a list of all the records
recordRoutes.route("/record").get(function (req, res) {
    let db_connect = dbo.getDb("journal_db");
    db_connect
      .collection("entries")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });

//This section will get a single record
recordRoutes.route("/record/:id").get((req, res)=>{
  let db_connect = dbo.getDb();

  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
    .collection("entries")
    .findOne(myquery, (err, result)=>{
      if(err) throw new err;
      res.json(result);
    })
})

//This section will be used to create entries
recordRoutes.route("/record/add").post((req, res)=>{
  let db_connect = dbo.getDb();
  let myObj = {
    title: req.body.title,
    content: req.body.content
  }
  db_connect
    .collection("entries")
    .insertOne(myObj, (err, result)=>{
      if(err) throw new err;
      res.json({status : "success"});
    })
})

//This section will help you update one by id
recordRoutes.route("/update/:id").post((req, res)=>{
  let db_connect = dbo.getDb();
  let myQuery = {_id: ObjectId(req.params.id)};
  let newValues = {
    $set:{
      title: req.body.title,
      content: req.body.content
    }
  }

  db_connect.collection("entries").updateOne(myQuery, newValues, (err, result)=>{
      if(err) throw new err;
      res.json({status: "success"})
    })
})


//This section will delete One
recordRoutes.route("/:id").delete((req, res)=>{
  let db_connect = dbo.getDb();
  let myQuery = {_id: ObjectId(req.params.id)};
  db_connect.collection("entries")
  .deleteOne(myQuery, (err, result)=>{
    if(err) throw new err;
    res.json({status: "sucess"});
  })
})

module.exports = recordRoutes;