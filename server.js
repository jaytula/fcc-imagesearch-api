// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const axios = require('axios')

const endpoint = 'https://www.googleapis.com/customsearch/v1'
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

const client = new MongoClient(process.env.DB, {useNewUrlParser: true})
let db = null

client.connect(async function(err) {
  try {
    if(err) throw err  
    db = client.db(process.env.DBNAME)
    let item = await db.collection('xyz').findOne({name: 'test'})
    let result = await db.createCollection("log", {capped:true, size:10000, max:15}); 
    let stats = await db.collection('log').stats()
    
    if(!stats.capped) throw new Error('log collection is not capped')
    if(stats.max !== 15) throw new Error('log collection max is not 15') 
  } catch(err) {
    console.log(err.message)
    process.exit(1)
  }
})

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/api/latest/imagesearch', async (req, res) => {
  let results = await db.collection('log').find({}).project({_id: false}).sort({ $natural: -1}).toArray()
  res.json(results)
})

app.get('/api/imagesearch/:q', async (req, res) => {
  const {q} = req.params
  
  await db.collection('log').insertOne({term: q, when: new Date()})

  let key = process.env.API_KEY
  let cx = process.env.CSE_ID
  let start = Number(req.query.offset) || 1
  let searchType = 'image'
  let params = {key, cx, q, searchType}
  //return res.json({start, searchType})
  try {
    let result = await axios.get(endpoint, {params})
    let items = result.data.items.map(e => ({url: e.link, snippet: e.snippet, thumbnail: e.image.thumbnailLink, context: e.image.contextLink}))
    res.json(items)
  } catch(err) {
    res.status(500).send(err.message)
  }
})

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
