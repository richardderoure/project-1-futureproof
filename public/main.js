try {
    let idArray = document.idArray;
} catch {
    let idArray = [1, 2, 3, 4, 5];
};

$(document).ready(() => {
    // LISTEN FOR BUTTON CLICK ON SUBMIT
    $("#submit").click(function(event) {
        event.preventDefault();
        // GET VALUES FROM SUBMISSION FORM
        let submission = {
            id: null,
            title: $("#title").val(),
            message: $("#message").val(),
            gif: $("#gif").val(),
            dateTime: (new Date()).getTime(),
            commentArray: [1, 1]
        };
        console.log(submission);
        // POSTS SUBMISSION TO SERVER
        $.post('http://localhost:8080/submissions', submission, function(data) {
            // DO STUFF
            console.log(data);
            


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
        // DO STUFF

        console.log(data);



    })};