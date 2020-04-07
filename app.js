const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const fs = require('fs');
var bodyParser = require('body-parser');

app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

let database = {test:[{"test":"test","test":"test"}]};

// let comment={
//     text: "a",
//     emoji: "b",
//     dateTime: "01/01/20",
//     id: "second"
// };

fs.writeFile('database.json','{"submissions":[]}', (err) => {
    if (err) { console.log('error saving to file');
    return
};
    console.log('Default file setup complete');
});

let submission={
    id: 0,
    title:"This is a test!",
    message: "this is testing our placeholder submission on the back end",
    gif:"gif link here!",
    dateTime: "01/01/20",
    commentArray: ['comment test 1','comment test 2']
};
let comment={
    id: 1,
    message: 'THIS IS A COMMENT',
    dateTime: "01/01/20"
};

app.get('/', (req,res) => {
    app.render('index.html');
});


app.get('/submission', (req,res) => {
    
    fs.readFile('./database.json','utf8', (err,data)=>{
        if(err){
            console.log('error reading file!');
            return 
        };
        console.log('Reading from file...');
        let dataJson = JSON.parse(data);
        dataJson.submissions.push(submission);
        
        //Assign ID to each object
        for(let i = 0; i < dataJson.submissions.length - 1; i++){
            console.log('length is: ' + dataJson.submissions.length);
            dataJson.submissions[i]['id'] = i;
        };

        //Write JSON to database file
        let myJson=JSON.stringify(dataJson);
        fs.writeFile('database.json',myJson, (err) => {
            if (err) { console.log('error saving to file');
            return
        };
            console.log('Saved to file!');
        });
        
        res.send(myJson);
    });
});

app.get('/comments', (req,res) =>{
    fs.readFile('./database.json','utf8', (err,data)=>{
        if(err){
            console.log('error reading comment!');
            return 
        };
        console.log('Reading comment...');
        let dataJson = JSON.parse(data);
        dataJson.submissions[comment.id].commentArray.push(comment.message);
  
        //Write JSON to database file
        let myJson=JSON.stringify(dataJson);
        fs.writeFile('database.json',myJson, (err) => {
            if (err) { console.log('error saving to file');
            return
        };
            console.log('Saved to file!');
        });
        
        res.send(myJson);
    });

})




//idCounter++;

// let myJson=JSON.stringify(dataJson);
        // j=dataJson.test[1].submission[0]['id'];
        // j=Number(j);
        // console.log(Number(j));
        // j=j+1;
        // console.log(j);
        // j=j.toString();
        // console.log(typeof j);

//app.get('/comment', (req,res) => {

    

//});






app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

    
    
        
//         var idArray=[];
//         for(var i=0; i<database.length; i++){
//             idArray[i]=Number(database[i]); //Try to replace with i or database[i].id;

//         };
//         var maxId=Math.max(idArray);
//         //console.log(maxId);
//         database[maxId]=submission; //req.body...
//     }catch(e){
//         database[0]=submission; //database.push(submission)
//     };

    
  
//     fs.writeFile('database.txt',database,function (err) {
//   if (err) throw err;
//   console.log('Saved!');})
//     //var topDatabase={};
    
    
//     res.send(database);

// });
// //app.get('/comment', function(req,res){





  /*var dateTimes = [];
var dateTimeIndices = [];
for (var i=0;(i<Object.keys(database).length);i++){
    dateTimes[i]=database[i].dateTime;
    dateTimeIndices[i]=i;
};
console.log(dateTimeIndices);
//1) combine the arrays:
var list = [];
for (var j = 0; j < dateTimes.length; j++) 
    list.push({'dateTime': dateTimes[j], 'dateTimeIndex': dateTimeIndices[j]});
//2) sort:
list.sort(function(a, b) {
    return ((a.dateTime < b.dateTime) ? -1 : ((a.dateTime == b.dateTime) ? 0 : 1));
    //Sort could be modified to, for example, sort on the dateTimeIndex 
    // if the dateTime is the same.
});
//3) separate them back out:
for (var k = 0; k < list.length; k++) {
    dateTimes[k] = list[k].dateTime;
    dateTimeIndices[k] = list[k].dateTimeIndex;
};
console.log(dateTimeIndices);
   */

   //{"test":[{"test":"test"}]}