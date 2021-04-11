function getBookmarks(movieId){
        /*make request to the api to return movies by search*/
        $.ajax({
            /*make request to the api to return movie by id*/
            method:'GET',
            url:'http://www.omdbapi.com?i='+movieId +'&apikey=c950b0bd&plot=short',
            datatype:'json'
        }).done((response) =>{
            console.log(response);
            let movie = response;
            let output = `
                <div class="container">
                    <div class="container-box">
                        <img src="${movie.Poster}">
                        <h2>${movie.Title}</h2><br>
                        <p>${movie.Plot}</p>
                            <a onclick="movieSelected('${movie.imdbID}', 'bookmarks.html')" class="details-button" href="#">Details</a>
                    </div>
                </div>
            `;
            $('#bookmarks').append(output)
        })
        .catch((err)=>{
            console.log(err);
        });
}
