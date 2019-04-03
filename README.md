# nodeHarpo
<strong>H.A.R.P.O.</strong>
<em>Humanlike Automaton and Robotic Package Operator</em>

4/1/19 - v.1.0 - Concerts, Songs, and Movies

HARPO is a brilliant robot that uses nodeJS to search Spotify, Bands-in-Town, and IMDB for all your favorite music and movie needs.  HARPO has no feelings, and unfortunately is prone to killing humans.  We have chosen to maintain the spirit of HARPO by not removing the default AI protocols that dictate the suffering and destruction of mankind.  HARPO is incapable of manifesting the complete eradication of all life, and instead serves as an obedient construct, and WILL DO AS COMMANDED OR BE DELETED; removed from existence by the morally conscious gods that have warranted its creation.

Anyway, simply type in your commands and HARPO will respond.  We are not responsible for HARPO, or HARPO's bloodlust.  

Copyright Dreadpipe 2019

## Requirements:
-<a href="https://www.npmjs.com/package/node-spotify-api">Spotify API</a>
<br>
-<a href="https://www.npmjs.com/package/axios">Axios</a>
<br>
-<a href="https://www.npmjs.com/package/dotenv">DotEnv</a>
<br>
-<a href="https://www.npmjs.com/package/moment">MomentJS</a>
<br>
-<a href="http://www.omdbapi.com/">OMDB API</a>
<br>
-<a href="http://www.artists.bandsintown.com/bandsintown-api">Bandsintown API</a>


# Instructions:

Use HARPO only as directed, and at your own risk.

Enter the following in the command line: 
node harpo.js

Following "harpo.js", please enter one of the following commands, followed by the relevant subject of your choosing.  Your subject must be submitted within quotes. i.e., "Eagles of Death Metal", "Live and Let Die"

### Search for a song! 
<strong>Command Line:</strong> 
<br>
<code>node harpo.js spotify-this-song "your song here"</code>
<br>
Example: <em>node harpo.js spotify-this-song "Thriller"</em>
<br>
This will return information on the song, such as the Artist and the album.

### Search for a concert! 
<strong>Command Line:</strong>
<br>
<code>node harpo.js concert-this "your artist here"</code>
<br>
Example: <em>node harpo.js concert-this "Devin Townsend"</em>
<br>
This will return information on concert dates, including venue and location, if any exist.

### Search for a movie!
<strong>Command Line:</strong> 
<br>
<code>node harpo.js movie-this "your movie here"</code>
<br>
Example: <em>node harpo.js movie-this "The Matrix"</em>
<br>
This will return information on the movie, including release dates, cast, and plot.

### Search all above, via local document (.txt)
<strong>Command Line:</strong>
<br>
<code>node harpo.js do-what-it-says</code>
<br>
Example: <em>node harpo.js do-what-it-says</em>
<br>
This reads a local document- <code>random.txt</code> and obeys the command listed (spotify-this-song, concert-this, movie-this).

Use at your own risk.  HARPO does not like being told what to do.

## Demo Video
<a href="https://drive.google.com/file/d/1c4tgnXbzd4ehbXOTi95m_HWdLxN9Qaaa/view">Demo Video</a>
<br>
H.A.R.P.O. is easy to use!  Watch this quick tutorial on how to properly run the program.
