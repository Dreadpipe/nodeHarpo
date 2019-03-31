// keeps keys secret from github
require("../dotenv").config();
// links the keys to HARPO
const keys = requre("./keys.js");
// stores the spotify key
const spotify = new spotify(keys.spotify);

/* HARPO must perfom the following:

1) node harpo.js concert-this <artist/band name here>

--searches bands in town API
--returns:
-name of Venue
-location of Venue
-date of event (MM/DD/YYYY)

2) node harpo.js spotify-this-song '<song name here>'
--searches Spotify API
--returns:
-Artist
-song name
-preview link
-album
-default: returns Ace of Base: The Sign

3) node harpo.js movie-this '<move name here>'
--searchs OMDB API (use axios here, key = "trilogy")
--returns:
-title
-year
-rating
-rotten tomatoes rating
-country where produced
-language of movie
-plot of movie
-actors in movie
-default: Mr. Nobody

4) node harpo.js do-what-it-says
--use "fs" node package (refers to writing and reading a txt doc)
-should read random.txt and do what it says


BONUS:
-output data to a log.txt