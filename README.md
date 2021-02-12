# Viaplay-trailer-api-briefly
 Viaplay trailer api
 
 # Nordic Entertainment Group  Trailer Fetcher
 
 This is a simple Nodejs project created as  test project for a backend-developer.
 To run this project you need to set up environment. 
 ### Installation
   - Running Nodejs environment, preferably version 6.13.4 (use Any IDE of your choice)
   - Valid Movie DB API Key: [moviedb-api]
 
 ```sh
  git clone https://github.com/Dan-Ayettey/Viaplay-trailer-api-briefly.git
  cd Viaplay-trailer-api-briefly
  npm i 
  npm start
 ```
 if everything run successfully you should receive a message saying that the project is running on the port 3000 by defaut;
 
 ```sh
 Nodejs development server started: <http://127.0.0.1:3000>
 ```
 ### Requests
 This project one sample request which is a **GET** request to the following Route: **Base_url +"/api/v1/trailers?"url=_{movie_resource_url_from_viaplay}_**
 
 ##### Request URL 
   http://localhost:3000/api/v1/trailers?url=http://content.viaplay.se/pc-se/film
 | http://localhost:3000/api/v1/trailers?url=https://content.viaplay.se/pc-se/film/troja-2004
 ##### Some Youtube URL 
  
  https://www.youtube.com/watch?v=qsOwj0PR5Sk|https://www.youtube.com/watch?v=OiTiKOy59o4
 | https://www.youtube.com/watch?v=WcXt9aUMbBk|https://www.youtube.com/watch?v=btI7yHxn1NU
 | https://www.youtube.com/watch?v=a6O30nJ02PU|https://www.youtube.com/watch?v=akwGjUeU6YA
 | https://www.youtube.com/watch?v=YG_a8lw512A|https://www.youtube.com/watch?v=aNGhnNMSopI
 | https://www.youtube.com/watch?v=dSBsNeYqh-k|https://www.youtube.com/watch?v=bYEoQetO56E|
 | https://www.youtube.com/watch?v=EtpBbRsNr-M|https://www.youtube.com/watch?v=4w8lohkQtbY
 |  
 
 ### Development
 Platform: I decided to work with Nodejs, since I have a lot of experience with Express and Auth  protocols
 **Target: create REST API for providing client with Trailer URLs**
 Movie Resource Link as Input: https://content.viaplay.se/pc-se/film/arrival-2016 
 **Return Trailer as output**
 Within the movie resource, the IMDb information can be found at the following path:
 _embedded[“viaplay:blocks”][0]._embedded[“viaplay:product”].content.imdb
 Using the get rquest of the provided link doesn't return  with a movie resource!
 The output of the GET request of  https://content.viaplay.se/pc-se/film/arrival-2016
 ```json
 {
     "code": 5100,
     "redirectPath": "/pc-se/film",
     "url": "/pc-se/film/arrival-2016"
 }
 ```
 - I decided to use **"http://content.viaplay.se/pc-se/film" and https://content.viaplay.se/pc-se/film/troja-2004** to get movie resource instead.
 After getting the movie resource I extracted the IMDB id;
 - I called THE MOVIE DB API to get the movie id from IMDB id:
 https://api.themoviedb.org/3/find/{external_id}?api_key=<<api_key>>&language=en-US&external_source=imdb_id
 - I called the Movie DB API to get the trailler using themoviedb id:
 https://api.themoviedb.org/3/movie/603/videos?api_key=cf59e3834d8b8ef500ff73aa09dec848&language=en-US
 - After getting Youtube key, I store the viaplay movie resource url with youtube url in Redis, simple-cache, express compression modules
  for faster retrieval for the next call, for performance reasons using compressor and bunyan for debugging .
 
 ### Todos
  - little more test needed
  - shorten the response for the first time api call
  
  ####### Links to modules and middle-wares
 
 
 
    [download-express]: <https://www.npmjs.com/package/express>
     [download-express]: <https://www.npmjs.com/package/http>
      [download-express]: <https://www.npmjs.com/package/morgan>
       [download-express]: <https://www.npmjs.com/package/express-cache-middleware'>
       [download-express]: <https://www.npmjs.com/package/body-parser'>
       [download-express]: <https://www.npmjs.com/package/bunyan'>
    [download]:<https://www.npmjs.com/package/redis>
    
    #### third party links
    [moviedb-api]: <https://www.themoviedb.org/documentation/api>
    [download-here]: <https://getcomposer.org/download/>
 

