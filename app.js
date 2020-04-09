const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const fs = require('fs');
const cors = require('cors');
var bodyParser = require('body-parser');
let ejs = require('ejs');

app.use(express.urlencoded({
    extended: false
}));
app.use(express.static("public"));

//Writes default file structure ready to receive data
fs.writeFile('database.json', '{"submissions":[]}', (err) => {
    if (err) {
        console.log('error saving to file');
        return
    };
    console.log('Default file setup complete');
});

//Renders home page
app.get('/', (req, res) => {
    app.render('index.html');
});

//Gets data from form submission at the route /submission
app.post('/submission', (req, res) => {
    console.log(req.body);
    //console.log(JSON.parse(req.body));

    fs.readFile('./database.json', 'utf8', (err, data) => {
        if (err) {
            console.log('error reading file!');
            return
        };
        console.log('Reading from file...');
        
        let dataJson = JSON.parse(data);
        getTime(req.body);

        //Assign ID in one line
        req.body.id = dataJson.submissions.length;
        dataJson.submissions.push(req.body);
        console.log(dataJson['commentArray[]']);
        dataJson.submissions[req.body.id]['commentArray[]'] = [];
        //Write JSON to database file
        let myJson = JSON.stringify(dataJson);
        fs.writeFile('database.json', myJson, (err) => {
            if (err) {
                console.log('error saving to file');
                return
            };
            console.log('Saved submission to file!');
        });
        console.log(myJson);
        res.send(myJson);
    });
});

//Gets data from comments on posts at the route /comments
app.post('/comments', (req, res) => {
    fs.readFile('./database.json', 'utf8', (err, data) => {
        if (err) {
            console.log('error reading comment!');
            return
        };
        console.log('Reading comment...');

        let dataJson = JSON.parse(data);
        getTime(req.body);
        console.log(req.body);
        console.log(dataJson.submissions[req.body.id]);
        dataJson.submissions[req.body.id]['commentArray[]'].push(req.body.message);

        //Write JSON to database file
        let myJson = JSON.stringify(dataJson);
        fs.writeFile('database.json', myJson, (err) => {
            if (err) {
                console.log('error saving to file');
                return
            };
            console.log('Saved comment to file!');
        });
        
        res.send(myJson);
    });
});

//Function to get current data and time. Takes comment or submission as parameter, and updates dateTime value.
const getTime = (object) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    object.dateTime = date + ' ' + time;
    return;
};

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});