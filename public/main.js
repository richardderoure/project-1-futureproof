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
    commentArray: ["This is comment 1", "This is comment 2"]
}];

$(document).ready(() => {
    // LISTEN FOR BUTTON CLICK ON SUBMIT
    $("#submit").click(function(event) {
        event.preventDefault();
        // GET VALUES FROM SUBMISSION FORM
        let submission =  JSON.stringify([{
            id: null,
            title: $("#title").val(),
            message: $("#message").val(),
            gif: $("#gif").val(),
            dateTime: (new Date()).getTime(),
            commentArray: [1, 1]
        }]);
        // POSTS SUBMISSION TO SERVER
        $.post('http://localhost:8080/submissions', submission, function(data) {
            displayContent(placeholderReturnObject);
        });
    });

    // LISTEN FOR BUTTON CLICK ON COMMENT
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

function commentFunction (number) {
    event.preventDefault();
    // GET VALUES FROM COMMENT FORM
    let comment = {
        id: idArray[number-1],
        message: $(`#textarea${number}`).val(),
        dateTime: (new Date()).getTime()
    };
    // POSTS COMMENT TO SERVER
    $.post('http://localhost:8080/comments', comment, function(data) {
        displayContent(data);
    })};

function displayContent(arg) {
     //arg = JSON.parse(arg);
    console.log(arg);
    console.log(Object.keys(arg).length)
    for (let x =0; x < 5; x++ ){
        document.getElementById(`post-container${x+1}`).style.display = "none";
    }
    for (let i=0; i<Object.keys(arg).length; i++) {
        let id = arg[i].id;
        idArray[i] = id;
        document.getElementById(`post-title${i+1}`).innerHTML = arg[i].title;
        document.getElementById(`post-message${i+1}`).innerHTML = arg[i].message;
        document.getElementById(`post-gif${i+1}`).src = arg[i].gif;
        for (let j=0; j<arg[i].commentArray.length; j++) {
            document.getElementById(`display-comment${i+1}-${j+1}`).innerHTML = arg[i].commentArray[j];
        };
        for (let k=0; k<3; k++) {
            console.log(document.getElementById(`post-emoji${i+1}-${k+1}`));
            document.getElementById(`post-emoji${i+1}-${k+1}`).href = `http://localhost:8080/${id}/${k}`;
        };
        document.getElementById(`post-container${i+1}`).style.display = "flex";
    };
    createCookie('idArray', JSON.stringify(idArray));


};