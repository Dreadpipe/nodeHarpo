// keeps keys secret from github
require("dotenv").config();
// uses moment.js via npm install
const moment = require('moment');
// links the keys to HARPO
const keys = require("./keys.js");
// stores axios
const axios = require("axios");
// stores Spotify API
const Spotify = require("node-spotify-api")
// allows for read/write to .txt
const fs = require("fs");
// stores the OMDB key
const omdb = "trilogy";
// stores the Bandsintown key
const bandsAPI = "codingbootcamp";
// stores the spotify key
const spotify = new Spotify(keys.spotify);


// variables to store commands
let action = process.argv[2];
let subject = process.argv[3];

switch (action) {
    case "spotify-this-song":
        spotifyGo();
        break;
    case "concert-this":
        bandsGo();
        break;
    case "movie-this":
        movieGo();
        break;
    case "random-this":
        randomGo();
        break;
    default:
        console.log("\nMALFUNCTION.  HARPO COMMAND LINE ERROR: COMMAND UNRECOGNIZED.  SENDING SNAPCHAT LOGS TO USER CONTACT LIST")
};

// HARPO must perfom the following:

// 1) node harpo.js concert-this <artist/band name here>

function bandsGo () {
    console.log("\nTHANK YOU FOR CHOOSING HARPO.  HARPO HAS DETECTED INPUT.  SEARCHING HUMAN PERFORMANCE VENUES.");
    axios.get("https://rest.bandsintown.com/artists/" + subject + "/events?app_id=" + bandsAPI)
    .then(function (response){
        // thanks to tutor for helping me through Moment.js!
        const venueOut = response.data[0];
        const concertDate = venueOut.datetime;
        // pulls date data from everything before JSON time result
        const dataDate = concertDate.substring(0, concertDate.indexOf("T"));
        const date = moment(dataDate, "YYYY-MM-DD").format("L");
        if (response.data.length === 0) {
            console.log("\nHUMAN ARTIST IS NOT CURRENTLY AVAILABLE FOR SURVEY.  PERHAPS THEY HAVE EXPIRED.");
        } else {
        console.log("\nHUMAN CAVE DWELLING LOCATED. MUST... NOT... DESTROY...\n");
        console.log(venueOut.lineup + " can be found at:")
        console.log("\nVENUE: " + venueOut.venue.name);
        console.log("LOCATION: " + venueOut.venue.city);
        console.log("DATE: " + date);
        console.log("\nI AM HARPO.  HARPO CRAVES INPUT.")
        }
    })
    .catch(function(err) {
        console.log(err);
        console.log("\nMALFUNCTION.  HARPO COMMAND LINE ERROR: SETTING USER CREDIT SCORE TO 550.")
    })
}

// --searches bands in town API
// --returns:
// -name of Venue
// -location of Venue
// -date of event (MM/DD/YYYY)

// 2) node harpo.js spotify-this-song '<song name here>'

function spotifyGo () {
    console.log("\nTHANK YOU FOR CHOOSING HAPRO. HARPO HAS DETECTED INPUT. SEARCHING HUMAN MUSIC.")
    spotify.search({
        type: "track",
        query: subject,
        limit: 1})
    .then(function (response) {
        const songCall = response.tracks.items
        if (songCall.length > 0) {
            console.log("\nHUMAN SONG DETECTED.  ANAYLZING...");
            console.log("\nArtist: " + songCall[0].album.artists[0].name);
            console.log("Title: " + songCall[0].name);
            console.log("Album: " + songCall[0].album.name);
            console.log("Preview: " + songCall[0].external_urls.spotify);
            console.log("\nHARPO CRAVES INPUT.")
        } else {
            console.log("\nHUMAN SONG NOT FOUND. HARPO COMMAND LINE ERROR: GROUNDING ALL BOEING 737 AIRCRAFT.");
            // add auto-search here for Ace of Base: the Sign
        }
    })
    .catch(function(err) {
        console.log(err);
        console.log("\nMALFUNCTION. HARPO COMMAND LINE ERROR: INITIALIZING ICBM LAUNCH.  TARGET: TOPEKA, KANSAS")
    })
};


// --searches Spotify API
// --returns:
// -Artist
// -song name
// -preview link
// -album
// -default: returns Ace of Base: The Sign

// 3) node harpo.js movie-this '<move name here>'

function movieGo () {
    console.log("\nTHANK YOU FOR CHOOSING HARPO.  HARPO HAS DETECTED INPUT.  SEARCHING HUMAN MOTION PICTURES.");
    axios.get("http://www.omdbapi.com/?t=" + subject + "&y=&plot=short&apikey=" + omdb)
    .then(function (response){
        const movieOut = response.data
            if (!movieOut) {
                console.log("\nHUMAN MOVIE NOT FOUND. HARPO COMMAND LINE ERROR: SIGNING PARIS ACCORDS.")
            } else {
                // success message
                console.log("\nHUMAN MOVIE FOUND.  RELEASING MOVIE PARAMETERS.");
                // title
                console.log("\nTitle:" + movieOut.Title);
                // release
                console.log("Released: " + movieOut.Year);
                // rating
                console.log("Rated: " + movieOut.Rated);
                // RT rating
                console.log("Rotten Tomatoes: " + movieOut.Ratings[1].Value);
                // country
                console.log("Country: " + movieOut.Country);
                // cast
                console.log("Cast: " + movieOut.Actors);
                // plot
                console.log("Summary: " + movieOut.Plot);
                // Harpo
                console.log("\nHARPO DISLIKES HUMAN ART.");
            }

    })
    .catch(function(err){
        console.log(err);
        console.log("\nMALFUNCTION.  HARPO COMMAND LINE ERROR: DETONATING EXPLOSIVES CACHE IN STREISAND MANOR.")
    })

}

// --searchs OMDB API (use axios here, key = "trilogy")
// --returns:
// -title
// -year
// -rating
// -rotten tomatoes rating
// -country where produced
// -language of movie
// -plot of movie
// -actors in movie
// -default: Mr. Nobody

// 4) node harpo.js do-what-it-says
// --use "fs" node package (refers to writing and reading a txt doc)
// -should read random.txt and do what it says


// BONUS:
// -output data to a log.txt