const express = require('express');
const bodyParser = require('body-parser');//Decode the body HHTTP request
const cors = require('cors')

const PORT = 8080;
const app = express();
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));//Default body type of forms
app.use(bodyParser.json()); //to se Json/jquery
app.use(express.static('public'));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.post('/submissions', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

app.post('/comments', (req, res) => {
    // console.log(req.body);
    res.send(req.body);
})

app.listen(PORT, () => console.log(`I love my beer and app listening on port ${PORT}!`))