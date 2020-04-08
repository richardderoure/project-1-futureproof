const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const fs = require('fs');
var bodyParser = require('body-parser');

app.use(express.urlencoded({
    extended: false
}));
app.use(express.static("public"));

//Writes default file structure ready to receive daya
fs.writeFile('database.json', '{"submissions":[]}', (err) => {
    if (err) {
        console.log('error saving to file');
        return
    };
    console.log('Default file setup complete');
});

//Testing submission format (this is format we will recieve data from front end) - REPLACE INSTANCES OF submission WITH req.body IN PRODUCTION CODE.
let submission = {
    id: 0,
    title: "This is a test!",
    message: "this is testing our placeholder submission on the back end",
    gif: "gif link here!",
    dateTime: "",
    commentArray: []
};

//Testing comment format (this is format we will receive data from front end) - REPLACE INSTANCES OF comment WITH req.body IN PRODUCTION CODE.
let comment = {
    id: 1,
    message: 'THIS IS A COMMENT',
    dateTime: ""
};

//Renders home page
app.get('/', (req, res) => {
    app.render('index.html');
});

//Gets data from form submission at the route /submission
app.get('/submission', (req, res) => {

    fs.readFile('./database.json', 'utf8', (err, data) => {
        if (err) {
            console.log('error reading file!');
            return
        };
        console.log('Reading from file...');

        let dataJson = JSON.parse(data);
        getTime(submission);

        //Assign ID in one line
        submission.id = dataJson.submissions.length;
        dataJson.submissions.push(submission);

        //Write JSON to database file
        let myJson = JSON.stringify(dataJson);
        fs.writeFile('database.json', myJson, (err) => {
            if (err) {
                console.log('error saving to file');
                return
            };
            console.log('Saved submission to file!');
        });

        res.send(myJson);
    });
});

//Gets data from comments on posts at the route /comments
app.get('/comments', (req, res) => {
    fs.readFile('./database.json', 'utf8', (err, data) => {
        if (err) {
            console.log('error reading comment!');
            return
        };
        console.log('Reading comment...');

        let dataJson = JSON.parse(data);
        getTime(comment)
        dataJson.submissions[comment.id].commentArray.push(comment);

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
};

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});