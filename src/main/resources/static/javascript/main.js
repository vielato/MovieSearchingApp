//get element searchText
let input = document.getElementById('searchText');

// Init a timeout variable to be used below
let timeout = null;


// Listen for keystroke events
$(document).ready(() => {
    (input).addEventListener('keyup', function (e) {
        // Clear the timeout if it has already been set.
        // This will prevent the previous task from executing
        // if it has been less than <MILLISECONDS>
        clearTimeout(timeout);
        // Make a new timeout set to go off in 1000ms (1 second)
        timeout = setTimeout(function () {
            getMovies(input.value);
        }, 1000);
    });
});

function getMovies(searchText){
    $.ajax({
        /*make request to the api to return movies by search*/
        method:'GET',
        url:'http://www.omdbapi.com?s='+searchText +'&apikey=c950b0bd',
        datatype:'json'
    }).done((response) =>{
        console.log(response);
        let movies= response.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            $.ajax({
                /*make request to the api to return movies by search*/
                method:'GET',
                url:'http://www.omdbapi.com?i='+movie.imdbID +'&apikey=c950b0bd&plot=short',
                datatype:'json'
            }).done((response) =>{
                console.log(response);
                let movie= response;

                output += `
                    <div class="container">
                        <div class="container-box">
                            <img src="${movie.Poster}">
                            <h2>${movie.Title}</h2>
                            <p id="plot">${movie.Plot}</p><br>
                            <a onclick="movieSelected('${movie.imdbID}')" class="details-button" href="#">Details</a>
                            <a id="addForm" onclick="sendMovie('${movie.imdbID}')" class="bookmark-button" >Add +</a>
                        </div>
                    </div>
                `;

                /*display the results in index.html-> #movies*/
                $('#movies').html(output);
            })

            .catch((err)=>{
                console.log(err);
            });
        });

    })
    .catch((err)=>{
        console.log(err);
    });
}

function sendMovie(id){
    let movie=JSON.stringify(id);
    $.ajax({
        type : 'post',
        url : '/user/1/movie', // here you put the "Url" of your spring mvc controller
        data : '{ "imdbId" :'+movie+','
                   +'"userId": '+JSON.stringify(1)+ '}',
        //dataType: 'json',τη
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            alert("Bookmark Added!");
        },
        error: (error) => {
            alert("Already in bookmarks!");
        }
    }).catch((err)=>{
         console.log(err);
    });
}

function movieSelected(id, requester){

    sessionStorage.setItem('requester', requester);
    sessionStorage.setItem('movieId', id);
    /*set the path resolved by the controller*/
    let movie="/movie/";
    window.location = movie+id;
    return false;
}

function getMovie() {
    /*save the movieId and the origin*/
    let movieId = sessionStorage.getItem('movieId');
    let origin = sessionStorage.getItem('requester');

    $.ajax({
        /*make request to the api to return movie by id*/
        method:'GET',
        url:'http://www.omdbapi.com?i='+movieId +'&apikey=c950b0bd&plot=full',
        datatype:'json'
    }).done((response) =>{
        console.log(response);
        let movie = response;

        let output = `
            <div class="poster">
                <img src="${movie.Poster}">
            </div>
            <div class="movie_data1">
                <h1>${movie.Title}</h1>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                </ul>
            </div>
            <div class="movie_data2">
                <h2>Full Plot</h2>
                <p>${movie.Plot}</p>
            </div>
        `;
        $('#movie').html(output);


        if(origin=="bookmarks.html"){
            //hide the add Bookmark functionality
           document.getElementById("addBookmark").style.visibility = "hidden";
        }

    })
    .catch((err) =>{
         console.log(err);
    });
}


function movieSelected(id, requester){

    sessionStorage.setItem('requester', requester);
    sessionStorage.setItem('movieId', id);
    /*set the path resolved by the controller*/
    let movie="/movie/";
    window.location = movie+id;
    return false;
}

function getMovie() {
    /*save the movieId and the origin*/
    let movieId = sessionStorage.getItem('movieId');
    let origin = sessionStorage.getItem('requester');

    $.ajax({
        /*make request to the api to return movie by id*/
        method:'GET',
        url:'http://www.omdbapi.com?i='+movieId +'&apikey=c950b0bd&plot=full',
        datatype:'json'
    }).done((response) =>{
        console.log(response);
        let movie = response;

        let output = `
            <div class="poster">
                <img src="${movie.Poster}">
            </div>
            <div class="movie_data1">
                <h1>${movie.Title}</h1>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                </ul>
            </div>
            <div class="movie_data2">
                <h2>Full Plot</h2>
                <p>${movie.Plot}</p>
            </div>
        `;
        $('#movie').html(output);


        if(origin=="bookmarks.html"){
            //hide the add Bookmark functionality
           document.getElementById("addBookmark").style.visibility = "hidden";
        }

    })
    .catch((err) =>{
         console.log(err);
    });
}