let idArray
try {
    idArray = JSON.parse(getCookie('idArray'));
} catch(err) {
    idArray = [1, 2, 3, 4, 5];
};

placeholderReturnObject = [
    {id: 1,
    title: "This is a test!",
    message: "This is a test!",
    gif: "https://media.giphy.com/media/5i7umUqAOYYEw/giphy.gif",
    dateTime: 1586283878681,
    commentArray: []
}];

$(document).ready(() => {
    // LISTEN FOR BUTTON CLICK ON SUBMIT
    $("#submit").click((event) => {
        event.preventDefault();
        // GET VALUES FROM SUBMISSION FORM
        let submission =  {
            id: null,
            title: $("#title").val(),
            message: $("#message").val(),
            gif: $("#gif").val(),
            dateTime: null,
            commentArray: null,
         
        };
        // POSTS SUBMISSION TO SERVER
        $.post('http://localhost:8000/submission', submission, (data) => {
            console.log(data);
            displayContent(data); //change to data later
        });
        

    });

    // LISTEN FOR BUTTON CLICK ON COMMENT
    for (let s= 0; s <5; s++){
        $(`#comment${s+1}`).click((event) => {
            event.preventDefault();
            commentFunction(s+1);
        });
    }
    $("#comment1").click(function(event) {
        event.preventDefault();
        commentFunction(1);
    });
    $("#comment2").click(function(event) {
        event.preventDefault();
        commentFunction(2);
    });
    $("#comment3").click(function(event) {
        event.preventDefault();
        commentFunction(3);
    });
    $("#comment4").click(function(event) {
        event.preventDefault();
        commentFunction(4);
    });
    $("#comment5").click(function(event) {
        event.preventDefault();
        commentFunction(5);
    });
});

const commentFunction = (number) => {
    event.preventDefault();
    // GET VALUES FROM COMMENT FORM
    let comment = {
        id: Number(idArray[number-1]),
        message: $(`#textarea${number}`).val(),
        dateTime: null
    };
    // POSTS COMMENT TO SERVER
    $.post('http://localhost:8000/comments', comment, (data) => {
        displayContent(data);
    })};

    const emojiFunction = (submissionID, emojiIndex) => {
        event.preventDefault();
        // GET VALUES FROM COMMENT FORM

        let emoji = [submissionID, emojiIndex ];
        
        // POSTS COMMENT TO SERVER
        $.post('http://localhost:8000/emojis', emoji, (data) => {
            displayContent(data);
        })};


const displayContent = (arg) => {
     //arg = JSON.parse(arg);
    console.log(arg);
    arg = JSON.parse(arg);
    console.log(arg.submissions);
    console.log(arg.submissions[0]['commentArray[]']);
    console.log(typeof(arg.submissions[0]['commentArray[]']));
    console.log(Object.keys(arg.submissions).length)
    for (let x =0; x < 5; x++ ){
        document.getElementById(`post-container${x+1}`).style.display = "none";
    }
    for (let i=0; i<Object.keys(arg.submissions).length; i++) {
        let id = arg.submissions[i].id;
        idArray[i] = id;
        document.getElementById(`post-title${i+1}`).innerHTML = arg.submissions[i].title;
        document.getElementById(`post-message${i+1}`).innerHTML = arg.submissions[i].message;
        document.getElementById(`post-gif${i+1}`).src = arg.submissions[i].gif;
        console.log(arg.submissions[i]['commentArray[]'].length)
        for (let j=0; j<arg.submissions[i]['commentArray[]'].length; j++) {
            document.getElementById(`display-comment${i+1}-${j+1}`).innerHTML = arg.submissions[i]['commentArray[]'][j];
        };
        // for (let k= 0; k < 3; k++){
        //     document.getElementById(`span${i+1}-${k+1}`).innerHTML = arg.submissions[i].emoji[k];
        //     $(`#post-emoji${i+1}-${k+1}`).click((event) => {
        //         event.preventDefault();
        //         emojiFunction(id, k);
        //     });
        // }    
        document.getElementById(`post-container${i+1}`).style.display = "flex";
    };
    //createCookie('idArray', JSON.stringify(idArray));


};