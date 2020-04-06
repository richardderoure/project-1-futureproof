const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const fs = require('fs');

var database ={

};

app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

var comment={
    "text": "a",
    "emoji": "b",
    "dateTime": "01/01/20",
    "id": "second"
};

var submission={
    "text": "a",
    "gif":"gif",
    "dateTime": "01/01/20"
};

app.get('/submission', function(req,res){
      
    try{
        database= fs.readFile('database.txt');
        var idArray=[];
        for(var i=0; i<database.length; i++){
            idArray[i]=Number(database[i]);

        };
        var maxId=Math.max(idArray);
        console.log(maxId);
        database[maxId]=submission;
    }catch(e){
        database[0]=submission;
    };

    
  
    fs.writeFile('database.txt',database,function (err) {
  if (err) throw err;
  console.log('Saved!');})
    //var topDatabase={};
    
    
    res.send(database);

});
//app.get('/comment', function(req,res){


//});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});




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