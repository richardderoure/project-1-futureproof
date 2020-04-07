//Send data from the form to back end
console.log('testing')
function fetchPosts(){
    fetch('/submissions', {method: 'GET'})
    .then(resp => resp.json())
    .then(renderPosts)
    //.then( posts => console.log(posts))
    //console.log(posts)
    }
    const renderPosts = (posts) => {
    console.log(posts)
    const x = `${posts.data}`;
    document.getElementsByClassName('post-title').innerHTML = x;
    // if ( window.history.replaceState ) {
    // window.history.replaceState( null, null, window.location.href );
    }
    fetchPosts();