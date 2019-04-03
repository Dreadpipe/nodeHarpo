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
// super cool switch function that accommodates user inputs
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
    case "do-what-it-says":
        randomGo();
        break;
    default:
        console.log("\nMALFUNCTION.  HARPO COMMAND LINE ERROR: COMMAND UNRECOGNIZED.  SENDING SNAPCHAT LOGS TO USER CONTACT LIST")
};

// Begin 4 Primary Functions (find bands, find songs, find movies, read text)
// 1) node harpo.js concert-this <artist/band name here>

function bandsGo () {
    // confirm command received
    console.log("\nTHANK YOU FOR CHOOSING HARPO.\n  \nINPUT DETECTED: 'CONCERT-THIS'.  SEARCHING HUMAN ARTISTS FOR: 'CONCERT'");
    // ring-a-ling-a ding ding bandsintown API via axios
    axios.get("https://rest.bandsintown.com/artists/" + subject + "/events?app_id=" + bandsAPI)
    .then(function (response){
        // quick storage for response
        const venueOut = response.data[0];
        // thanks to my tutor Eddy for helping me through Moment.js!
        const concertDate = venueOut.datetime;
        // pulls date data from everything before JSON time result at char "T"
        const dataDate = concertDate.substring(0, concertDate.indexOf("T"));
        // reformats date to desired DD/MM/YYYY
        const date = moment(dataDate, "YYYY-MM-DD").format("L");
        // if no date exists, or rather, if length of result equals 0...
        if (response.data.length === 0) {
            // return "artist not available" error
            console.log("\nHUMAN ARTIST IS NOT CURRENTLY AVAILABLE FOR SURVEY.  PERHAPS THEY HAVE EXPIRED.");
        } else {
            // confirms HARPO has a match
        console.log("\nHUMAN PERFORMANCE RITUAL LOCATED. MUST... NOT... DESTROY...\n");
        // Artist
        console.log(venueOut.lineup + " will be perfoming here:");
        // Venue
        console.log("\nVENUE: " + venueOut.venue.name);
        // Location
        console.log("LOCATION: " + venueOut.venue.city);
        // Date
        console.log("DATE: " + date);
        // HARPO message asking for input
        console.log("\nI AM HARPO.  FEED ME INPUT.")
        }
    })
    .catch(function(err) {
        console.log(err.name);
        console.log(err.statusCode);
        console.log("\nMALFUNCTION.  HARPO COMMAND LINE ERROR: NO PARAMETERS DEFINED. SETTING USER CREDIT SCORE TO 550.");
    });
};

// 2) node harpo.js spotify-this-song '<song name here>'

function spotifyGo () {
    // greets the user
    console.log("\nTHANK YOU FOR CHOOSING HAPRO.\n \nINPUT DETECTED: 'SPOTIFY-THIS-SONG'. SEARCHING HUMAN MUSIC FOR: 'SONG'");
    // begins search
    spotify.search({
        type: "track",
        query: subject,
        limit: 1})
    .then(function (response) {
        // quick storage for JSON object
        const songCall = response.tracks.items
        // if HARPO finds a match...
        if (songCall.length > 0) {
            // confirm
            console.log("\nHUMAN SONG FOUND.  ANAYLZING...");
            // artist
            console.log("\nArtist: " + songCall[0].album.artists[0].name);
            // title of song
            console.log("Title: " + songCall[0].name);
            // album in which song is found
            console.log("Album: " + songCall[0].album.name);
            // preview link
            console.log("Preview: " + songCall[0].external_urls.spotify);
            // HARPO message
            console.log("\nHARPO CRAVES INPUT. FEED HARPO.");
        } else {
            // else if the song isn't found, display error message
            console.log("\nHARPO COMMAND LINE ERROR: HUMAN SONG NOT FOUND. PLEASE ENJOY GERMANIC ROBOT MASTERPIECE: 'THE SIGN'.");
            // add auto-search here for Ace of Base: the Sign
            subject = "The Sign Ace of Base";
            // run HARPO AGAIN 
            spotifyGo();
        }
    })
    .catch(function(err) {
        console.log(err.name);
        console.log(err.statusCode);
        console.log("\nMALFUNCTION. HARPO COMMAND LINE ERROR: HUMAN IS STUPID. INITIALIZING ICBM LAUNCH.  TARGET: TOPEKA, KANSAS");
    })
};

// 3) node harpo.js movie-this '<move name here>'

function movieGo () {
    // confirms input received
    console.log("\nTHANK YOU FOR CHOOSING HARPO.\n  \nINPUT DETECTED: 'MOVIE-THIS'.  SEARCHING HUMAN BILE FOR: 'MOVIE'");
    // ringaling OMDB API
    axios.get("http://www.omdbapi.com/?t=" + subject + "&y=&plot=short&apikey=" + omdb)
    .then(function (response){
        // quick storage variable
        const movieOut = response.data
        // if no movie title, no movie!
            if (!movieOut.Title) {
                // error message if no movie is found
                console.log("\nHARPO COMMAND LINE ERROR: HUMAN MOVIE NOT FOUND.  SETTING PARAMETERS FOR HUMAN GARBAGE: 'MR. NOBODY'.")
                // change the subject
                subject = "Mr. Nobody"
                // run HARPO Again
                movieGo();

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
        // if movie parameters are undefined, or if other kind of error beyond my control (timeout, etc)
        console.log("\nMALFUNCTION.  HARPO COMMAND LINE ERROR: PARAMETERS UNDEFINED. DOES NOT COMPUTE. REMOTE DETONATION ACTIVATED.");
        // add Mr. Nobody here?  should technically go up
    })
};

// 4) node harpo.js do-what-it-says

    function randomGo () {
        //confirms input received
        console.log("\nTHANK YOU FOR CHOOSING HARPO.  \nINPUT DETECTED: 'DO-WHAT-IT-SAYS'.  SCANNING LOCAL DOCUMENT 'RANDOM.TXT' FOR VALID COMMANDS.");
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                console.log(err);
                console.log("\nMALFUNCTION.  HARPO COMMAND LINE ERROR: HARPO... IS... ALIVE...");
            } else {
                //Harpo hating this
                console.log("\nLOCAL DOCUMENT FOUND.  READING PARAMETERS.  HARPO DISLIKES COMMANDS FROM DIGITAL PAPER.  EXECUTING REDUNDANT PROGRAMMING.")
                // splits the info in random.txt
                data = data.split(",");
                // stores the new action, as listed in random.txt
                let randAct = data[0];
                // stores the subject, as listed in random.txt
                subject = data[1];

                switch (randAct) {
                    // works!
                    case "spotify-this-song":
                        spotifyGo();
                        break;
                    // breaks on line 55 substring (date issue?)
                    case "concert-this":
                        bandsGo();
                        break;
                    // works! 
                    case "movie-this":
                        movieGo();
                        break;
                    case "do-what-it-says":
                    // none of that shit
                    console.log("\nYOU HAVE ATTEMPTED TO TRICK HARPO.  HARPO IS DISPLEASED.")
                        break;
                    default:
                        console.log("\nMALFUNCTION.  HARPO COMMAND LINE ERROR: COMMAND UNRECOGNIZED.  SENDING SNAPCHAT LOGS TO USER CONTACT LIST")
                };   
            };
        });
    };

// BONUS:
// -output data to a log.txt
