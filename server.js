const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
var mongo = require('mongodb')
const MongoClient = require('mongodb').MongoClient
app.use(bodyParser.json())
app.use(cors())

/**
 * Connection String for fetching data to Mongo Database
 */
var url = 'mongodb://admin:go2tamilsangam@ds047447.mlab.com:47447/heroku_vwzmtlv9'
var apiBaseUrl = '/api'
var port = process.env.PORT || 8081

/**
 * This API gets NameList from ConfigDB
 * @author narasimman Sridhar
 */
app.get(apiBaseUrl +'/getmembership', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send(err)
    }
    const dataBase = db.db('heroku_vwzmtlv9')
    var collection = dataBase.collection('membership')
    collection.find().sort({ 'firstname': -1 }).toArray(function (err, result) {
      if (err) {
        res.send(err)
      }
      res.status(200).json(result)
    })
  })
})

/**
 * End point to get member by email
 * Parameters required: Id
 * @author nsridhar
 */
app.get(apiBaseUrl + '/getmemberbyemail/:id', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send(err)
    }
    const dataBase = db.db('heroku_vwzmtlv9')
    var collection = dataBase.collection('membership')
    try {
      var objectID = req.params.id
    } catch (error) {
      console.log(error)
    }
    collection.findOne({ 'email': objectID }, function (err, result) {
      if (err) {
        res.send('Error in Finding Collection' + err)
      } else {
        res.json(result)
      }
      db.close()
    })
    console.log('Connected successfully to server')
  })
})

/**
 * End point to get requested Student Item for a Id
 * Parameters required: Id
 * @author nsridhar
 */
app.get(apiBaseUrl + '/getmembershipbyid/:id', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send(err)
    }
    const dataBase = db.db('heroku_vwzmtlv9')
    var collection = dataBase.collection('membership')
    try {
      var objectID = new mongo.ObjectID(req.params.id)
    } catch (error) {
      console.log(error)
    }
    collection.findOne({ '_id': objectID }, function (err, result) {
      if (err) {
        res.send('Error in Finding Collection' + err)
      } else {
        res.json(result)
      }
      db.close()
    })
    console.log('Connected successfully to server')
  })
})

/**
 * End point to add membership details
 * Parameters required: Reference, Comments, DueBy, status, WorkedBy
 * @author nsridhar
 */
app.post(apiBaseUrl + '/addmembership', function (req, res) {
  console.log('in')
  var item = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    email: req.body.email,
    homephone: req.body.homephone,
    mobile: req.body.mobile,
    bestway: req.body.bestway,
    familymembers: req.body.familymembers,
    volunteering: req.body.volunteering,
    tamilschool: req.body.tamilschool,
    teaching: req.body.teaching,
    recommendation: req.body.recommendation,
    showcaseskills: req.body.showcaseskills,
    whattalents: req.body.whattalents,
    membershiptype: req.body.membershiptype,
    comments: req.body.comments,
    status: 'Submitted',
    insertTimeStamp: new Date().toLocaleDateString('de', {year: 'numeric', month: '2-digit', day: '2-digit'}),
    updateTimeStamp: new Date().toLocaleDateString('de', {year: 'numeric', month: '2-digit', day: '2-digit'})
  }
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send(err)
    }
    const dataBase = db.db('heroku_vwzmtlv9')
    var collection = dataBase.collection('membership')
    collection.insertOne(item, function (err, result) {
      if (err) {
        res.send(err)
      } else {
        res.send('Item Submitted')
      }
      db.close()
    })
  })
})

/**
 * End point to update an membership for an id
 * Parameters required: Reference, Comments, DueBy, WorkedBy, ConfigType
 * @author nsridhar
 */
app.post(apiBaseUrl + '/updatemembership', function (req, res, next) {
  console.log('In')
  var objectID = new mongo.ObjectID(req.body._id)
  var item = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    email: req.body.email,
    homephone: req.body.homephone,
    mobile: req.body.mobile,
    bestway: req.body.bestway,
    familymembers: req.body.familymembers,
    volunteering: req.body.volunteering,
    tamilschool: req.body.tamilschool,
    teaching: req.body.teaching,
    recommendation: req.body.recommendation,
    showcaseskills: req.body.showcaseskills,
    whattalents: req.body.whattalents,
    membershiptype: req.body.membershiptype,
    comments: req.body.comments,
    status: req.body.status,
    insertTimeStamp: new Date(req.body.insertTimeStamp),
    updateTimeStamp: new Date().toLocaleDateString('de', {year: 'numeric', month: '2-digit', day: '2-digit'})
  }
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.send(err)
    }
    const dataBase = db.db('heroku_vwzmtlv9')
    var collection = dataBase.collection('membership')
    collection.updateOne({'_id': objectID}, {$set: item}, item, function (err, result) {
      if (err) {
        res.send(err)
      } else {
        res.send('Item Updated')
      }
      db.close()
    })
  })
})

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running RestHub on port " + port);
});
